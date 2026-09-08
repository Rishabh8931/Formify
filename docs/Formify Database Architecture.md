# Formify Database Architecture

## 1. Overview

Formify uses a relational PostgreSQL database managed through Drizzle ORM.

The core Formify data model is hierarchical:

```text
User
  │
  │ 1 : N
  ▼
Forms
  │
  │ 1 : N
  ▼
Fields
  │
  │ 1 : N
  ▼
Field Attributes
```

This structure separates authentication data from application data while maintaining strong ownership and referential integrity.

The database is responsible for maintaining structural consistency, while the application/service layer is responsible for business rules.

---

## 2. Database Architecture

### 2.1 User

The `user` table is provided by Better Auth.

Important characteristics:

- User IDs are `text`.
- A user can own multiple forms.
- Authentication-related tables (`session`, `account`, `verification`) remain independent of Formify's application tables.

We do not modify the Better Auth schema just to add Formify-specific relations.

The Formify `forms` table references `user.id`.

```text
user.id
   ▲
   │
   │ foreign key
   │
forms.user_id
```

---

## 3. Forms Table

The `forms` table represents a form created by a user.

Conceptually:

```text
forms
├── id
├── user_id
├── name
├── slug
├── description
├── status
├── settings
├── created_at
└── updated_at
```

### Primary Key

```text
forms.id → UUID
```

Formify-owned entities use UUIDs independently of Better Auth's user IDs.

Therefore:

```text
user.id      → text
forms.id     → uuid
fields.id    → uuid
```

There is no requirement for every table to use the same ID type.

### Owner

```text
forms.user_id → user.id
```

This is a real PostgreSQL foreign key.

It guarantees that a form cannot reference a non-existent user.

The relationship uses:

```text
ON DELETE CASCADE
```

Therefore, if a user is deleted, their forms are automatically deleted.

---

## 4. Form Status

Forms have a controlled status:

```text
draft
published
archived
```

This is represented using a PostgreSQL enum:

```text
form_status
```

This prevents arbitrary status values from being stored in the database.

For example:

```text
draft       ✓
published   ✓
archived    ✓
random      ✗
```

---

## 5. Form Slugs

Every form has a slug:

```text
customer-feedback
job-application
event-registration
```

The uniqueness rule is:

```text
(user_id, slug) → UNIQUE
```

This means a user cannot have two forms with the same slug.

However, different users can have the same slug.

Example:

```text
User A
└── customer-feedback ✓

User B
└── customer-feedback ✓
```

But:

```text
User A
├── customer-feedback ✓
└── customer-feedback ✗
```

### Why user-scoped uniqueness?

A slug belongs to a user's form namespace. There is no need to force every user in the entire system to choose globally different slugs.

The database enforces this using a composite unique constraint:

```text
UNIQUE(user_id, slug)
```

This is important because application-level checks alone are not sufficient under concurrent requests.

---

## 6. Fields Table

A form contains multiple fields.

```text
fields
├── id
├── form_id
├── type
├── label
├── description
├── required
├── position
├── created_at
└── updated_at
```

Relationship:

```text
forms.id
   ▲
   │
   │ foreign key
   │
fields.form_id
```

The relationship is:

```text
Form 1 : N Fields
```

A field belongs to exactly one form.

---

## 7. Field Ordering

Fields contain a `position` column.

Example:

```text
Form
│
├── position 0 → Name
├── position 1 → Email
├── position 2 → Rating
└── position 3 → Feedback
```

An index exists on:

```text
(form_id, position)
```

This makes retrieving fields in form order efficient.

The position is application-level ordering data; the database index helps query it efficiently.

---

## 8. Field Attributes

Field-specific configuration is stored separately in `field_attributes`.

```text
field_attributes
├── id
├── field_id
├── key
├── value
├── created_at
└── updated_at
```

Relationship:

```text
fields.id
   ▲
   │
   │ foreign key
   │
field_attributes.field_id
```

The relationship is:

```text
Field 1 : N Field Attributes
```

---

## 9. JSONB Field Attribute Values

The `value` column uses PostgreSQL `jsonb`.

This allows different field types to have different configuration.

For example, a rating field can have:

```json
{
  "min": 1,
  "max": 5,
  "step": 1
}
```

A select field can have:

```json
{
  "options": [
    {
      "label": "Yes",
      "value": "yes"
    },
    {
      "label": "No",
      "value": "no"
    }
  ]
}
```

An email field can have:

```json
{
  "placeholder": "you@example.com"
}
```

This avoids adding a new PostgreSQL column every time a new field type needs a new configuration property.

---

## 10. Attribute Key Uniqueness

A field cannot have the same attribute key twice.

The database enforces:

```text
(field_id, key) → UNIQUE
```

Therefore:

```text
Field: Rating

min → 1       ✓
max → 5       ✓
step → 1      ✓
```

but:

```text
min → 1
min → 2       ✗
```

This prevents duplicate configuration keys.

---

# 11. Referential Integrity

The complete foreign-key chain is:

```text
user
  │
  │ forms.user_id → user.id
  ▼
forms
  │
  │ fields.form_id → forms.id
  ▼
fields
  │
  │ field_attributes.field_id → fields.id
  ▼
field_attributes
```

All relationships use foreign keys with cascading deletes.

Therefore:

```text
Delete User
    ↓
Delete Forms
    ↓
Delete Fields
    ↓
Delete Field Attributes
```

Likewise:

```text
Delete Form
    ↓
Delete Fields
    ↓
Delete Field Attributes
```

And:

```text
Delete Field
    ↓
Delete Field Attributes
```

This prevents orphan records.

---

# 12. Database Constraints vs Drizzle Relations

Formify uses two different mechanisms.

## Foreign Keys

Defined with:

```ts
.references(...)
```

These create actual PostgreSQL constraints.

They provide database-level integrity.

Example:

```ts
formId: uuid("form_id")
  .notNull()
  .references(() => forms.id, {
    onDelete: "cascade",
  });
```

## Drizzle Relations

Defined with:

```ts
relations(...)
```

These are ORM-level relationships used for querying and navigation.

They do not replace PostgreSQL foreign keys.

Therefore we use both:

```text
PostgreSQL Foreign Keys
        +
Drizzle Relations
```

---

# 13. Ownership and API Security

Database relationships alone are not enough to secure the API.

Every form operation must also be scoped to the authenticated user.

Incorrect:

```ts
findById(formId);
```

This only checks whether the form exists.

Correct:

```ts
findByIdAndUserId(formId, userId);
```

Conceptually:

```sql
WHERE
  forms.id = :formId
  AND forms.user_id = :authenticatedUserId
```

This prevents a user from accessing another user's form merely by knowing its UUID.

Therefore Formify uses two layers of protection:

```text
Authentication
      ↓
Who is the user?
      ↓
Ownership authorization
      ↓
Does this form belong to this user?
      ↓
Database operation
```

---

# 14. Consistency Model

Formify maintains consistency through multiple layers.

### Layer 1 — Type Validation

TypeScript provides compile-time guarantees.

### Layer 2 — Zod Validation

Incoming API data is validated before reaching the business logic.

```text
HTTP Request
     ↓
Zod
     ↓
Validated data
```

### Layer 3 — Service Rules

Business rules are handled by the service layer.

Examples:

- A user can only modify their own forms.
- Slugs are generated according to the application's rules.
- Form status transitions can be controlled here.

### Layer 4 — Database Constraints

PostgreSQL provides final integrity guarantees:

```text
PRIMARY KEY
FOREIGN KEY
UNIQUE
NOT NULL
ENUM
```

This is especially important under concurrent requests.

---

# 15. Preventing Conflicts

Consider two simultaneous requests:

```text
Request A
User A creates "Customer Feedback"

Request B
User A creates "Customer Feedback"
```

Both requests might check:

```text
Does customer-feedback already exist?
```

and both could see:

```text
No
```

An application-only check could therefore create a race condition.

The database constraint solves this:

```text
UNIQUE(user_id, slug)
```

One request succeeds.

The other violates the database constraint.

Therefore:

```text
Application validation
        +
Database constraint
        =
Strong consistency
```

The application should still handle the unique-constraint error and return an appropriate API error.

---

# 16. Indexing Strategy

Indexes currently exist for common access patterns.

### Forms

```text
forms(user_id)
```

Useful for:

```text
Get all forms belonging to a user
```

```text
forms(user_id, status)
```

Useful for:

```text
Get user's published forms
Get user's draft forms
Get user's archived forms
```

### Fields

```text
fields(form_id)
```

Useful for:

```text
Get all fields belonging to a form
```

```text
fields(form_id, position)
```

Useful for:

```text
Get fields of a form in their stored order
```

### Field Attributes

```text
field_attributes(field_id)
```

Useful for:

```text
Get all attributes belonging to a field
```

Indexes are primarily for query performance; uniqueness constraints additionally provide integrity guarantees.

---

# 17. Seed Data Architecture

Development seed data follows the same relationship hierarchy:

```text
Existing Better Auth User
        ↓
Seed Forms
        ↓
Seed Fields
        ↓
Seed Field Attributes
```

The seed does not create arbitrary authentication data.

Instead, it uses an existing development user.

The seed user is selected using:

```text
SEED_USER_EMAIL
```

Example:

```env
SEED_USER_EMAIL=dev@formify.local
```

---

# 18. Repeatable Development Seeding

Before inserting seed data, the seed script removes existing Formify data belonging to the seed user.

Conceptually:

```text
Existing Forms
      ↓
Existing Fields
      ↓
Existing Field Attributes
      ↓
Delete
      ↓
Insert fresh seed data
```

This prevents repeated seed executions from producing duplicate development data.

The seed therefore remains predictable:

```text
Run 1 → clean dataset
Run 2 → same clean dataset
Run 3 → same clean dataset
```

---

# 19. Seed Slugs vs Production Slugs

Seed data uses explicit slugs:

```text
customer-feedback
job-application
event-registration
product-survey
newsletter-signup
```

This is intentional.

Seed data represents known fixtures, so deterministic values are useful.

Production form creation will generate slugs from form names and resolve collisions according to the application's slug-generation rules.

Regardless of the application logic, PostgreSQL remains the final authority through:

```text
UNIQUE(user_id, slug)
```

---

# 20. Complete Architecture

The current database architecture can be summarized as:

```text
                    PostgreSQL
                         │
          ┌──────────────┴──────────────┐
          │                             │
       Better Auth                 Formify Data
          │                             │
        user                          forms
          │                             │
          │ 1:N                         │ 1:N
          └─────────────────────────────┤
                                        ▼
                                      fields
                                        │
                                        │ 1:N
                                        ▼
                                field_attributes
```

The application architecture around it is:

```text
HTTP Request
     │
     ▼
Authentication
     │
     ▼
Zod Validation
     │
     ▼
Controller
     │
     ▼
Service
     │
     ▼
Repository
     │
     ▼
Drizzle ORM
     │
     ▼
PostgreSQL
     │
     ├── Primary Keys
     ├── Foreign Keys
     ├── Unique Constraints
     ├── NOT NULL constraints
     ├── PostgreSQL Enums
     └── Indexes
```

This layered design ensures that consistency is not dependent on a single layer.

---

# 21. Key Design Decisions

| Decision                         | Reason                                       |
| -------------------------------- | -------------------------------------------- |
| Better Auth owns `user`          | Authentication remains isolated              |
| Form IDs use UUID                | Formify entities are independent of auth IDs |
| `forms.user_id` is a FK          | Guarantees valid ownership                   |
| `ON DELETE CASCADE`              | Prevents orphaned child records              |
| Form status uses PostgreSQL enum | Prevents invalid status values               |
| Slug is unique per user          | Allows the same slug for different users     |
| `(user_id, slug)` is UNIQUE      | Database-level conflict prevention           |
| Fields have `position`           | Preserves form ordering                      |
| `(form_id, position)` index      | Efficient ordered field retrieval            |
| Attributes use JSONB             | Flexible field-specific configuration        |
| `(field_id, key)` is UNIQUE      | Prevents duplicate attributes                |
| Application ownership checks     | Prevents cross-user access                   |
| Database constraints             | Final integrity guarantee                    |
| Seed uses an existing user       | Avoids coupling seed data to auth creation   |
| Seed resets Formify data         | Keeps development data repeatable            |

---

# 22. Final Principle

The central design principle of Formify's database architecture is:

> **Application logic should enforce business rules, while PostgreSQL should enforce data integrity.**

We do not rely exclusively on the API to keep the database consistent.

Instead:

```text
TypeScript
    ↓
Zod
    ↓
Service Rules
    ↓
Drizzle
    ↓
PostgreSQL Constraints
```

Each layer has a specific responsibility.

This makes the system more predictable, resistant to race conditions, and easier to evolve as Formify grows.
