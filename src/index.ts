/* eslint-disable qwik/loader-location */

import { implicit$FirstArg, type QRL } from "@builder.io/qwik";

import {
  globalAction$,
  routeLoader$,
  type RequestEvent,
  type RequestEventCommon,
  z,
  zod$,
} from "@builder.io/qwik-city";

import { Credentials, RegisterProps, StrapiAuthConfig, StrapiAuthSession } from "./types";
import { connect, login, me, register } from "./api";

const providers = z.enum(["github", "google", "facebook"]);

export type StrapiProviders = z.infer<typeof providers>;

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

      if (typeof response === "string") {
        return { error: response };
      } else if ("error" in response) {
        return { error: response.error.message };
      } else {
        req.cookie.set("jwt", response.jwt);
        req.sharedMap.set("session", response);
        return response;
      }
    },
    zod$({
      callbackUrl: z.string().optional(),
    })
  );

  const useAuthSignup = globalAction$(
    async (_, req) => {
      const auth = await authOptions(req);

      const creds = (await req.parseBody()) as RegisterProps;

      const response = await register(creds, auth);

      if (typeof response === "string") {
        return { error: response };
      } else if ("error" in response) {
        return { error: response.error.message };
      } else {
        req.cookie.set("jwt", response.jwt);
        req.sharedMap.set("session", response);
        return response;
      }
    },
    zod$({
      callbackUrl: z.string().optional(),
    })
  );

  const useAuthConnect = globalAction$(
    async (_, req) => {
      const auth = await authOptions(req);
      const url = await connect(auth, "github");
      if ("error" in url) {
        return { error: url.error };
      } else {
        return { url: url.toString() };
      }
    },
    zod$({
      callbackUrl: z.string().optional(),
      provider: providers,
    })
  );

  const useAuthLogout = globalAction$(async (_, req) => {
    req.cookie.delete("jwt");
    req.sharedMap.delete("session");
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
    useAuthSignup,
    useAuthConnect,
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
