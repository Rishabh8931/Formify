# Your dashboard protection should not rely only on Next.js.

## You should have both:

```diagram

              Browser
                 │
                 ▼
        Next.js Dashboard
          │ server check
          │
       ┌──┴───────┐
       │ session? │
       └──┬───────┘
          │
     yes  │  no
          │   └──────→ /login
          ▼
       Dashboard
          │
          │ API request
          ▼
      Express API
          │
          │ requireAuth
          ▼
      Protected data


```

## useSession() is still useful — just inside Client Components.

For example, your dashboard navbar may need to display the user's name/avatar interactively:

```javascript
"use client";

import { authClient } from "@/lib/auth-client";

export function UserMenu() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return <div>{session.user.name}</div>;
}
```
