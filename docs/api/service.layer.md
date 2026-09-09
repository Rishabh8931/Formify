# form.service.ts

```
createForm()
    ├── unique slug
    └── default values

getForm()
    └── user ownership

getForms()
    └── user's forms only

updateForm()
    ├── user ownership
    └── unique slug

deleteForm()
    └── user ownership
```

## Transaction Strategy — Form Duplication

### Why a transaction is required

Duplicating a form is not a single database operation. A form consists of multiple related records:

```
forms
  │
  ├── fields
  │     │
  │     └── field_attributes
  │
  └── ...
```

When duplicating a form, we must create:

1. A new forms record.
2. A new record for every field.
3. A new record for every attribute belonging to those fields.

These operations together represent one logical business operation:

```diagram
| Duplicate the complete form configuration.
```

Therefore, the operation must be atomic.
Without a transaction, a failure in the middle could leave partially duplicated data.
For example:

```
Create duplicated form          ✓
Create field 1                 ✓
Create field 2                 ✓
Create field 3                 ✗ ERROR
```

The database would then contain:

```
Original Form
     │
     └── Duplicated Form
           ├── Field 1
           ├── Field 2
           └── Field 3 missing
```

This is an invalid/incomplete duplicate.

### Transaction boundary

The transaction starts before creating the duplicated form and ends only after all fields and their attributes have been successfully copied.

```
BEGIN TRANSACTION
        │
        ▼
Create new form
        │
        ▼
Read source fields
        │
        ▼
For each field
        │
        ├── Create new field
        │
        └── Copy its attributes
        │
        ▼
COMMIT
```

If any operation fails:

```
BEGIN TRANSACTION
        │
        ▼
Create form ✓
        │
Create field ✓
        │
Create attribute ✗
        │
        ▼
ROLLBACK
        │
        ▼
No partial duplicate remains

```

PostgreSQL, through the Drizzle transaction, guarantees this atomicity.

### Why repositories accept DatabaseExecutor

A normal repository call uses the application's database instance:

```Typescript
formRepository.create(data);
```

But during a transaction, it must use the transaction executor:

```Typescript
formRepository.create(data, tx);
```

Therefore repositories use a shared executor type:

```Typescript
export type Database = typeof db;

export type Transaction = Parameters<
  Parameters<Database["transaction"]>[0]
>[0];

export type DatabaseExecutor = Database | Transaction;
```

Repository methods can consequently work with either:

```
Database
   OR
Transaction
```

### Final architectural rule for Formify

```
Any operation that creates, updates, or deletes multiple related records as one logical business operation must use a database transaction.
```

duplicateForm() is the first concrete example of this principle.
This gives us:

- Atomicity — all changes succeed or none do.
- Consistency — foreign-key relationships remain valid.
- Isolation — intermediate states aren't exposed as committed data.
- Durability — once committed, the duplicate persists normally.
