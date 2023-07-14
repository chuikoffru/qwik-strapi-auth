import {
  AuthError,
  Credentials,
  RegisterProps,
  StrapiAuthConfig,
  StrapiAuthSession,
} from "./types";

export async function me({ url }: StrapiAuthConfig, jwt: string) {
  try {
    const response = await fetch(new URL("api/users/me", url), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });

    return await response.json();
  } catch (error) {
    return error;
  }
}

export async function connect({ url }: StrapiAuthConfig, provider: string) {
  try {
    const response = await fetch(new URL(`/api/connect/${provider}`, url), {
      method: "GET",
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return new URL(decodeURIComponent(decodeURI(response.url)));
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function login({ identifier, password }: Credentials, { url }: StrapiAuthConfig) {
  try {
    const response = await fetch(new URL("api/auth/local", url), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier, password }),
    });

    return (await response.json()) as StrapiAuthSession;
  } catch (error: any) {
    return (error.response ? error.response : error.message) as AuthError | string;
  }
}

export async function register(
  { username, email, password }: RegisterProps,
  { url }: StrapiAuthConfig
) {
  try {
    const response = await fetch(new URL("/api/auth/local/register", url), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
    return (await response.json()) as StrapiAuthSession;
  } catch (error: any) {
    return (error.response ? error.response : error.message) as AuthError | string;
  }
}
