/**
 *
 *These are the routes that are used for authentication purposes
 *@type{string}
 */
export const AUTH_ROUTES = [
  "/login",
  "/signup",
  "/admin",
  "/auth/reset",
  "/auth/error",
  "/auth/new-password",
];

/**
 *
 *These are the routes that are protected and user cant access without being logged in
 *@type{string}
 */
export const PROTECTED_ROUTES = [
  "/settings",
  "/product",
  "/vendors",
  "/exam",
  "/dashboard",
  "/profile",
];

export const PROTECTED_BASE_ROUTES = ["/vendors", "/exam", "/profile"];

/**
 *
 *This is default login redirect that the user will go to after successful login and registration
 *@type{string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";

// export const PUBLIC_ROUTES = [""];
// export const PUBLIC_ROUTES = [""];
