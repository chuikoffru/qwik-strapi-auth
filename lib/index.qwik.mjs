import { z, globalActionQrl, zodQrl, routeLoaderQrl } from "@builder.io/qwik-city";
import { inlinedQrl, useLexicalScope, implicit$FirstArg } from "@builder.io/qwik";
async function me({ url }, jwt) {
  try {
    const response = await fetch(new URL("api/users/me", url), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`
      }
    });
    return await response.json();
  } catch (error) {
    return error;
  }
}
async function connect({ url }, provider) {
  try {
    const response = await fetch(new URL(`/api/connect/${provider}`, url));
    return new URL(decodeURIComponent(decodeURI(response.url)));
  } catch (error) {
    return {
      error: error.message
    };
  }
}
async function callback({ url }, provider, code) {
  try {
    const response = await fetch(new URL(`/api/auth/${provider}/callback?code=${code}`, url));
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      error: error.message
    };
  }
}
async function login({ identifier, password }, { url }) {
  try {
    const response = await fetch(new URL("api/auth/local", url), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        identifier,
        password
      })
    });
    return await response.json();
  } catch (error) {
    return error.response ? error.response : error.message;
  }
}
async function register({ username, email, password }, { url }) {
  try {
    const response = await fetch(new URL("/api/auth/local/register", url), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        email,
        password
      })
    });
    return await response.json();
  } catch (error) {
    return error.response ? error.response : error.message;
  }
}
const providers = z.enum([
  "github",
  "google",
  "facebook"
]);
function strapiAuthQrl(authOptions) {
  const useAuthSignin = globalActionQrl(/* @__PURE__ */ inlinedQrl(async (_, req) => {
    const [authOptions2] = useLexicalScope();
    const jwt = req.cookie.get("jwt");
    if (jwt)
      return {
        error: "Already logged in"
      };
    const auth = await authOptions2(req);
    const creds = await req.parseBody();
    const response = await login(creds, auth);
    if (typeof response === "string")
      return {
        error: response
      };
    else if ("error" in response)
      return {
        error: response.error.message
      };
    else {
      req.cookie.set("jwt", response.jwt);
      req.sharedMap.set("session", response);
      return response;
    }
  }, "strapiAuthQrl_useAuthSignin_globalAction_GT0VcnLOs0Y", [
    authOptions
  ]), zodQrl(/* @__PURE__ */ inlinedQrl({
    callbackUrl: z.string().optional()
  }, "strapiAuthQrl_useAuthSignin_globalAction_zod_UMQHrGNhHIE")));
  const useAuthSignup = globalActionQrl(/* @__PURE__ */ inlinedQrl(async (_, req) => {
    const [authOptions2] = useLexicalScope();
    const auth = await authOptions2(req);
    const creds = await req.parseBody();
    const response = await register(creds, auth);
    if (typeof response === "string")
      return {
        error: response
      };
    else if ("error" in response)
      return {
        error: response.error.message
      };
    else {
      req.cookie.set("jwt", response.jwt);
      req.sharedMap.set("session", response);
      return response;
    }
  }, "strapiAuthQrl_useAuthSignup_globalAction_9VhOf0hpqpE", [
    authOptions
  ]), zodQrl(/* @__PURE__ */ inlinedQrl({
    callbackUrl: z.string().optional()
  }, "strapiAuthQrl_useAuthSignup_globalAction_zod_uywt74ITEOw")));
  const useAuthConnect = globalActionQrl(/* @__PURE__ */ inlinedQrl(async (_, req) => {
    const [authOptions2] = useLexicalScope();
    const auth = await authOptions2(req);
    const url = await connect(auth, "github");
    if ("error" in url)
      return {
        error: url.error
      };
    else
      return {
        url: url.toString()
      };
  }, "strapiAuthQrl_useAuthConnect_globalAction_0DGNXx2zlvQ", [
    authOptions
  ]), zodQrl(/* @__PURE__ */ inlinedQrl({
    provider: providers
  }, "strapiAuthQrl_useAuthConnect_globalAction_zod_RSt3KVYnsMo")));
  const useAuthLogout = globalActionQrl(/* @__PURE__ */ inlinedQrl(async (_, req) => {
    req.cookie.delete("jwt");
    req.sharedMap.delete("session");
  }, "strapiAuthQrl_useAuthLogout_globalAction_InG00zb4tZE"));
  const useAuthSession = routeLoaderQrl(/* @__PURE__ */ inlinedQrl(async (req) => {
    const [authOptions2] = useLexicalScope();
    const session = req.sharedMap.get("session");
    if (session)
      return session;
    const jwt = req.cookie.get("jwt");
    if (jwt) {
      const user = await me(await authOptions2(req), jwt.value);
      req.sharedMap.set("session", {
        jwt: jwt.value,
        user
      });
      return {
        jwt: jwt.value,
        user
      };
    }
    return null;
  }, "strapiAuthQrl_useAuthSession_routeLoader_APxobKI0Yv4", [
    authOptions
  ]));
  const callbackAuthMiddleware = async (req) => {
    const auth = await authOptions(req);
    const provider = req.pathname.replace("/connect/", "");
    const access_token = req.query.get("access_token");
    if (!access_token)
      throw req.error(403, "No access token");
    const user = await callback(auth, provider, access_token);
    return user;
  };
  return {
    useAuthSignin,
    useAuthSignup,
    useAuthConnect,
    useAuthSession,
    useAuthLogout,
    callbackAuthMiddleware
  };
}
const strapiAuth$ = /* @__PURE__ */ implicit$FirstArg(strapiAuthQrl);
const ensureAuthMiddleware = (req) => {
  const isLoggedIn = req.sharedMap.has("session");
  if (!isLoggedIn)
    throw req.error(403, "sfs");
};
export {
  providers as _auto_providers,
  ensureAuthMiddleware,
  strapiAuth$,
  strapiAuthQrl
};
