# Qwik Strapi.io Auth Plugin

## Motivation

Inspired by @qwik/auth, I made this plugin for speed up auth feature in my new Qwik projects with Strapi Admin Panel. This is beta, be careful using in production. Now supports only local credentials method, without providers. It'll be soon.

## Soon

- Secure cookies
- Registration
- Providers

## How to use it?

1) `yarn add qwik-strapi-auth`
2) Create .env.local with 
``` STRAPI_URL=http://127.0.0.1:1337/ ```
3) Create `strapi@plugin.ts` with content 
```
export const { 
  useAuthSignin,
  useAuthSignup,
  useAuthConnect,
  useAuthSession,
  useAuthLogout,
  callbackAuthMiddleware
} = strapiAuth$(({ env }) => ({
  url: env.get("STRAPI_URL") as string,
}));
```

On Sign-In page make a form:

```
export default component$(() => {
  const login = useAuthSignin();

  return (
    <Form action={login}>
      <input type="hidden" name="provider" value="local" />
      <input type="text" name="identifier" />
      <input type="password" name="password" />
      <button type="submit">Sign in</button>
    </Form>
  )
})

```

On Header component

```
export default component$(() => {
  const session = useAuthSession();
  const logout = useAuthLogout();

  return (
    <header>
    {session.value ? 
      (<div>
        Hello, {session.value.user.username}
        <Form action={logout}>
          <button type="submit">Sign out</button>
        </Form>
      </div>) : 
      (<Link href="/login">Login</Link>)
    }
    </header>
  )
})
```

## How to use Auth Providers?

```
export default component$(() => {
  const connect = useAuthConnect();
  const nav = useNavigate();

  const handleConnect = $((provider: StrapiProviders) => {
    connect.submit({ provider }).then((res) => nav(res.value.url));
  });

  return (
    <button onClick$={() => handleConnect("github")}>Connect github</button>
  );
});
```

## How to handle auth provider callback

Create `connect` folder with `[provider]` folder inside and `index.ts` file contains code below:

```
import type { RequestEvent } from "@builder.io/qwik-city";
import { callbackAuthMiddleware } from "~/routes/plugin@strapi";

export const onGet = async (req: RequestEvent) => {
  const response = await callbackAuthMiddleware(req);
  return req.json(200, response);
};
```