import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import db from "./db";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Utility function to format a date into a readable format: '24th Feb, 2024'
 * @param {number|string|Date} dateInput - The input date (can be a timestamp, string, or Date object)
 * @returns {string} Formatted date in the format '24th Feb, 2024'
 */
export function formatDateWithSuffix(dateInput: Date) {
  const date = new Date(dateInput);

  // Format the date to '24th Feb, 2024'
  const options = { day: "numeric", month: "short", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-GB", options as any);

  // Extract the day and append appropriate suffix
  const day = date.getDate();
  const daySuffix = (day: any) => {
    if (day > 3 && day < 21) return "th"; // Covers the teens (11th-19th)
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const dayWithSuffix = `${day}${daySuffix(day)}`;
  const [month, year] = formattedDate.split(" ").slice(1); // Split and take the month and year

  return `${dayWithSuffix} ${month}, ${year}`;
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
