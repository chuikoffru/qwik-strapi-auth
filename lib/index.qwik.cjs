"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const qwikCity = require("@builder.io/qwik-city");
const qwik = require("@builder.io/qwik");
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
    console.log("error :>> ", error.response);
    return error;
  }
}
async function register(data, { url }) {
  const response = await fetch(`${url}/api/auth/local/register`, {
    method: "POST",
    body: new URLSearchParams(data)
  });
  try {
    return await response.json();
  } catch (error) {
    return await response.text();
  }
}
async function logout(req) {
  req.cookie.delete("jwt");
  req.sharedMap.delete("session");
}
function strapiAuthQrl(authOptions) {
  const useAuthSignin = qwikCity.globalActionQrl(/* @__PURE__ */ qwik.inlinedQrl(async (_, req) => {
    const [authOptions2] = qwik.useLexicalScope();
    const jwt = req.cookie.get("jwt");
    if (jwt)
      return {
        error: "Already logged in"
      };
    const auth = await authOptions2(req);
    const creds = await req.parseBody();
    const response = await login(creds, auth);
    if ("error" in response)
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
  ]), qwikCity.zodQrl(/* @__PURE__ */ qwik.inlinedQrl({
    provider: qwikCity.z.enum([
      "local",
      "github"
    ]),
    callbackUrl: qwikCity.z.string().optional(),
    authorizationParams: qwikCity.z.custom().optional()
  }, "strapiAuthQrl_useAuthSignin_globalAction_zod_UMQHrGNhHIE")));
  const useAuthLogout = qwikCity.globalActionQrl(/* @__PURE__ */ qwik.inlinedQrl(async (_, req) => {
    await logout(req);
  }, "strapiAuthQrl_useAuthLogout_globalAction_InG00zb4tZE"));
  const useAuthSession = qwikCity.routeLoaderQrl(/* @__PURE__ */ qwik.inlinedQrl(async (req) => {
    const [authOptions2] = qwik.useLexicalScope();
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
  return {
    useAuthSignin,
    useAuthSession,
    useAuthLogout
  };
}
const strapiAuth$ = /* @__PURE__ */ qwik.implicit$FirstArg(strapiAuthQrl);
const ensureAuthMiddleware = (req) => {
  const isLoggedIn = req.sharedMap.has("session");
  if (!isLoggedIn)
    throw req.error(403, "sfs");
};
exports.ensureAuthMiddleware = ensureAuthMiddleware;
exports.login = login;
exports.logout = logout;
exports.me = me;
exports.register = register;
exports.strapiAuth$ = strapiAuth$;
exports.strapiAuthQrl = strapiAuthQrl;
