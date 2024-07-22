import { NextRequest, NextResponse } from "next/server";
import authConfig from "./auth.config";
import NextAuth from "next-auth";
import {
  AUTH_ROUTES,
  DEFAULT_LOGIN_REDIRECT,
  PROTECTED_ROUTES,
} from "./routes";

// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)

// 2. Wrapped middleware option
const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req) {
  // Your custom middleware logic goes here
  const currentPathname = req.nextUrl.pathname;
  //   !! converts the value into its boolean equivalent
  const isLoggedIn = !!req.auth;

  console.log("req auth is", req.auth);
  console.log("isLoggedIn->", isLoggedIn);
  console.log("CURRENT PATHNAME->", currentPathname);

  if (AUTH_ROUTES.includes(currentPathname)) {
    // we are accessing an auth route
    if (isLoggedIn) {
      console.log("already logged in and trying to access an auth route");
      // we are already logged in so we cant access the auth routes anymore
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url));
    }
  }

  if (PROTECTED_ROUTES.includes(currentPathname)) {
    // we are accessing a protected routes
    // check for valid sessions
    // redirect unauthorized users
    console.log("you accessed a protected route in middleware");

    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
