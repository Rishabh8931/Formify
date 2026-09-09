# apis we have

```
POST   /api/v1/forms
GET    /api/v1/forms

GET    /api/v1/forms/:formId
PATCH  /api/v1/forms/:formId
DELETE /api/v1/forms/:formId

POST   /api/v1/forms/:formId/duplicate
```

# REquest flow

POST /api/v1/forms

```
                    POST /api/v1/forms
                            │
                            ▼
                     API root router
                            │
                            ▼
                       /v1 router
                            │
                            ▼
                      /forms router
                            │
                            ▼
                    authMiddleware
                            │
                    ┌───────┴───────┐
                    │               │
              no session        session
                    │               │
                    ▼               ▼
                  401          req.user
                                    │
                                    ▼
                              Zod validation
                                    │
                                    ▼
                             formController
                                    │
                                    ▼
                              formService
                                    │
                                    ▼
                            formRepository
                                    │
                                    ▼
                                Drizzle
                                    │
                                    ▼
                              PostgreSQL
```
