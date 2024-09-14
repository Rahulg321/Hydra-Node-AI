import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import db from "./db";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
};

export async function hasAccess(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      hasLifetimeAccess: true,
      stripeCurrentPeriodEnd: true,
    },
  });

  if (!user) return false;

  const hasActiveSubscription =
    user.stripeCurrentPeriodEnd &&
    new Date(user.stripeCurrentPeriodEnd) > new Date();

  return user.hasLifetimeAccess || hasActiveSubscription;
}
