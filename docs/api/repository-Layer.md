# forms.repository.ts

## 1.One important thing about create()

Notice this:

```Javascript
data: typeof forms.$inferInsert
```

Drizzle already knows what can be inserted into forms, so we don't need to manually recreate the database type here.

For example:

```js
await formRepository.create({
  userId,
  name: "Customer Feedback",
  slug: "customer-feedback",
  status: "draft",
});
```

Drizzle's type system will catch invalid fields/types.

However, this is not our API validation.

Our eventual flow will still be:

```
HTTP body
   ↓
Zod schema          ← validates external input
   ↓
Controller
   ↓
Service             ← business rules
   ↓
Repository          ← DB operation
   ↓
Drizzle types
   ↓
PostgreSQL constraints
```

So we get validation at multiple boundaries without mixing responsibilities.

## 2.Why every form-specific query has userId

This is the security invariant we're establishing now.

Instead of:

```js
findById(formId);
```

we deliberately have:

```js
findByIdAndUserId(formId, userId);
```

Same for update/delete.

Therefore, even if Alice sends Bob's formId, the query becomes:

```sql
WHERE
  forms.id = formId
  AND forms.user_id = aliceUserId
```

and returns nothing.

That means the service can simply treat null as form not found / not accessible, without leaking whether the form belongs to another user.

# field.repostiory.ts

## 1.Why formId is required

Notice we're not doing:

```javascript
findById(fieldId);
```

Instead:

```javascript
findByIdAndFormId(fieldId, formId);
```

This gives us a hierarchical ownership check:

```
User
  │
  └── Form
       │
       └── Field
            │
            └── Field Attribute

```

Eventually the service will establish:

```
authenticated user
↓
owns form
↓
form owns field
↓
field owns attribute

```

We don't want a client to be able to manipulate a field merely because it knows its UUID.
