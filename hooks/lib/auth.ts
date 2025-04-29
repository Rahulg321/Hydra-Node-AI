import { auth } from "@/auth";
import { getUserById } from "@/prisma/queries";
import { User } from "@prisma/client";
import { Ratelimit } from "@upstash/ratelimit";
import { NextRequest } from "next/server";

export const currentUser = async () => {
  const session = await auth();
  return session?.user;
};

export const currentUserRole = async () => {
  const session = await auth();
  return session?.user.role;
};

/**
 * This function is used to wrap a request with authentication.
 * @param handler - The handler function to wrap.
 * @returns A wrapped function that returns the result of the handler function.
 */
export function withAuth(
  handler: (request: NextRequest, user: User) => Promise<Response>,
) {
  return async (request: NextRequest) => {
    const session = await auth();
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const user = await getUserById(session.user.id!);

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    return handler(request, user);
  };
}

/**
 * This function is used to wrap a server action with authentication.
 * @param handler - The handler function to wrap.
 * @returns A wrapped function that returns the result of the handler function.
 */
export function withServerActionAuth<Args extends any[], R>(
  handler: (user: User, ...args: Args) => R | Promise<R>,
): (...args: Args) => Promise<R> {
  return async (...args: Args) => {
    const session = await auth();
    if (!session) throw new Error("Unauthorized");
    if (!session?.user) throw new Error("Unauthorized");
    const user = await getUserById(session.user.id!);
    if (!user) throw new Error("User not found");
    return handler(user, ...args);
  };
}

/**
 * Wrap any async handler with a rate limit check.
 * @param limiter - an Upstash Ratelimit instance
 * @param keyFn - function to derive the rate-limit key (e.g. user ID or IP)
 * @param handler - your business logic handler
 * @returns a function that enforces rate limiting before invoking handler
 */
export function withRateLimit<Args extends any[], R>(
  limiter: Ratelimit,
  keyFn: (...args: Args) => string | Promise<string>,
  handler: (...args: Args) => Promise<R>,
): (...args: Args) => Promise<R> {
  return async (...args: Args) => {
    // derive the key (user ID, IP, etc.)
    const key = await keyFn(...args);

    // attempt to consume 1 token
    const { success } = await limiter.limit(key);
    if (!success) {
      // you can customize the error or return type here
      throw new Error("Rate limit exceeded. Please try again later.");
    }

    // delegate to the original handler
    return handler(...args);
  };
}
