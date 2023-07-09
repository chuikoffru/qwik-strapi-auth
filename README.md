# Qwik Strapi.io Auth Plugin

## Motivation

Inspired by @qwik/auth, I made this plugin for speed up auth feature in my new Qwik projects with Strapi Admin Panel. This is beta, be careful using in production. Now supports only local credentials method, without providers. It'll be soon.

## Soon

- Secure cookies
- Providers

## How to use it?

1) `yarn add qwik-strapi-auth`
2) Create .env.local with 
``` STRAPI_URL=http://127.0.0.1:1337/ ```
3) Create `strapi@plugin.ts` with content 
```
export const { useAuthSignin, useAuthSession, useAuthLogout } = strapiAuth$(({ env }) => ({
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


