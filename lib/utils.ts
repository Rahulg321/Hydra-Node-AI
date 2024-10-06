import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import db from "./db";
import { stripe } from "./stripe";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getSession(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session;
  } catch (error) {
    console.error("Error retrieving session:", error);
    return null;
  }
}

export function shuffleArray<T>(array: T[]): T[] {
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export function formatDateWithSuffix(date: Date): string {
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  const hours = date.getHours() % 12 || 12; // Convert 24-hour to 12-hour format
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const period = date.getHours() >= 12 ? "pm" : "am";

  // Get ordinal suffix for the day
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
          ? "rd"
          : "th";

  return `${day}${suffix} ${month}, ${year} at ${hours}:${minutes}${period}`;
}

/**
 * Utility function to format a date into a readable format: '24th Feb, 2024'
 * @param {number|string|Date} dateInput - The input date (can be a timestamp, string, or Date object)
 * @returns {string} Formatted date in the format '24th Feb, 2024'
 */
// export function formatDateWithSuffix(dateInput: Date) {
//   const date = new Date(dateInput);

//   // Format the date to '24th Feb, 2024'
//   const options = { day: "numeric", month: "short", year: "numeric" };
//   const formattedDate = date.toLocaleDateString("en-GB", options as any);

//   // Extract the day and append appropriate suffix
//   const day = date.getDate();
//   const daySuffix = (day: any) => {
//     if (day > 3 && day < 21) return "th"; // Covers the teens (11th-19th)
//     switch (day % 10) {
//       case 1:
//         return "st";
//       case 2:
//         return "nd";
//       case 3:
//         return "rd";
//       default:
//         return "th";
//     }
//   };

//   const dayWithSuffix = `${day}${daySuffix(day)}`;
//   const [month, year] = formattedDate.split(" ").slice(1); // Split and take the month and year

//   return `${dayWithSuffix} ${month}, ${year}`;
// }

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

export async function checkIfUserHasAccessToExam(
  userId: string,
  examId: string,
) {
  try {
    const userHasPurchasedExam = await checkIfUserHasPurchasedExam(
      userId,
      examId,
    );

    const userHasSubscription = await checkIfUserHasSubscription(userId);

    const userHasExamAccess =
      userHasPurchasedExam.status || userHasSubscription.status;

    return {
      hasAccess: userHasExamAccess ? true : false,
      message: userHasExamAccess
        ? "user has Access to exam"
        : "user does not have access to exam",
    };
  } catch (error) {
    console.error("An error occurred while checking exam access:", error);
    return {
      hasAccess: false,
      message: "An error occurred while checking access to the exam.",
    };
  }
}

export async function checkIfUserHasSubscription(userId: string) {
  try {
    const currentUser = await db.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!currentUser) {
      console.log(
        "could not find current user while checking for subscription",
      );
      return {
        status: false,
        message: "could not find current user while checking for subscription",
      };
    }

    const hasActiveSubscription =
      currentUser.stripeCurrentPeriodEnd &&
      new Date(currentUser.stripeCurrentPeriodEnd) > new Date();

    return {
      status: hasActiveSubscription,
      message: hasActiveSubscription
        ? "User has active subscription"
        : "user does not active subscription",
    };
  } catch (error) {
    console.error("an error occured while trying to check for subscription");
    return {
      status: false,
      message: "an error occured while trying to check for subscription",
    };
  }
}

export async function checkIfUserHasPurchasedExam(
  userId: string,
  examId: string,
) {
  try {
    // Query the Purchase table to see if the user has purchased the exam
    const purchase = await db.purchase.findFirst({
      where: {
        userId: userId,
        examId: examId,
      },
    });

    // If purchase exists, user has access to the exam
    return {
      status: !!purchase,
      message: purchase
        ? "User has purchased the exam. Access granted."
        : "User has not purchased the exam. Access denied.",
    };
  } catch (error) {
    console.error("Error checking exam purchase:", error);
    return {
      status: false,
      message: "An error occurred while checking the exam purchase.",
    };
  }
}
