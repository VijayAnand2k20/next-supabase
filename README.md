# NextJS and Supabase

#### What is the difference between SERVICE_ROLE_KEY and ANON_KEY?

- `SERVICE_ROLE_KEY` is supposed to be used for the admin
- You shouldn't use `SERVICE_ROLE_KEY` in the client side
- `ANON_KEY` is supposed to be used in the client side

## Middleware

- `middleware` is a function that runs before the request is processed by the handler
- In `supabase/auth-helpers-nextjs`, we have a middleware that checks if the user is authenticated

## Auth Client(14:00)

One thing to be noted is, the package that you use to create your middleware client, should be the same package that you use to create your auth client

Don't worry if signup doesn't work, it's because, the email limit is reached
