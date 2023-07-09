/* eslint-disable qwik/loader-location */

import { implicit$FirstArg, type QRL } from "@builder.io/qwik";
import {
  globalAction$,
  routeLoader$,
  type RequestEvent,
  type RequestEventCommon,
  z,
  zod$,
  RequestEventAction,
} from "@builder.io/qwik-city";

export type AuthError = {
  data: null;
  error: {
    status: number;
    message: string;
    name: string;
  };
};

export type StrapiAuthConfig = {
  url: string;
  callbackUrl?: string;
};

export type Credentials = {
  identifier: string;
  password: string;
};

export type RegisterProps = {
  username: string;
  email: string;
  password: string;
};

export interface StrapiAuthSession {
  jwt: string;
  user: {
    id: string;

    username: string;

    email: string;

    provider: string;

    confirmed: boolean;

    blocked: boolean;

    role: {
      id: number;
      name: string;
    };
  };
}

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
    console.log("error :>> ", error.response);
    return error as AuthError;
  }
}

export async function register(data: RegisterProps, { url }: StrapiAuthConfig) {
  const response = await fetch(`${url}/api/auth/local/register`, {
    method: "POST",
    body: new URLSearchParams(data),
  });
  try {
    return await response.json();
  } catch (error) {
    return await response.text();
  }
}

export async function logout(req: RequestEventAction) {
  req.cookie.delete("jwt");
  req.sharedMap.delete("session");
}

export function strapiAuthQrl(authOptions: QRL<(ev: RequestEventCommon) => StrapiAuthConfig>) {
  const useAuthSignin = globalAction$(
    async (_, req) => {
      const jwt = req.cookie.get("jwt");

      if (jwt) {
        return { error: "Already logged in" };
      }

      const auth = await authOptions(req);

      const creds = (await req.parseBody()) as Credentials;

      const response = await login(creds, auth);

      if ("error" in response) {
        return { error: response.error.message };
      } else {
        req.cookie.set("jwt", response.jwt);
        req.sharedMap.set("session", response);
        return response;
      }
    },
    zod$({
      provider: z.enum(["local", "github"]),
      callbackUrl: z.string().optional(),
      authorizationParams: z.custom<URLSearchParams>().optional(),
    })
  );

  const useAuthLogout = globalAction$(async (_, req) => {
    await logout(req);
  });

  const useAuthSession = routeLoader$(async (req) => {
    const session = req.sharedMap.get("session") as StrapiAuthSession | null;

    if (session) {
      return session;
    }

    const jwt = req.cookie.get("jwt");

    if (jwt) {
      const user = await me(await authOptions(req), jwt.value);

      req.sharedMap.set("session", {
        jwt: jwt.value,
        user,
      });

      return {
        jwt: jwt.value,
        user,
      } as StrapiAuthSession;
    }

    return null;
  });

  return {
    useAuthSignin,
    useAuthSession,
    useAuthLogout,
  };
}

export const strapiAuth$ = /*#__PURE__*/ implicit$FirstArg(strapiAuthQrl);

export const ensureAuthMiddleware = (req: RequestEvent) => {
  const isLoggedIn = req.sharedMap.has("session");
  if (!isLoggedIn) {
    throw req.error(403, "sfs");
  }
};
