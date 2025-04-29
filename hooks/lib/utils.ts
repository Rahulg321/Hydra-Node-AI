import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import db from "./db";
import { stripe } from "./stripe";
import { format } from "date-fns"; // Assuming you're using date-fns or similar for date formatting

/**
 * Parses the userAnswer string based on question type (assuming Question data is available)
 * @param answerString - The userAnswer string
 * @param isMultiSelect - Whether the question is a multi-select question
 * @returns The parsed userAnswer as an array of numbers
 */
export const parseUserAnswer = (
  answerString: string | null,
  isMultiSelect: boolean,
): number[] => {
  if (!answerString) return [];
  if (isMultiSelect) {
    return answerString
      .split(",")
      .map(Number)
      .filter((n) => !isNaN(n));
  } else {
    const num = parseInt(answerString, 10);
    return isNaN(num) ? [] : [num];
  }
};

/**
 * Formats the selected options array into a string for DB storage
 * @param selectedOptions - The selected options as an array of numbers
 * @param isMultiSelect - Whether the question is a multi-select question
 * @returns The formatted string for DB storage
 */
export const formatUserAnswer = (
  selectedOptions: number[],
  isMultiSelect: boolean,
): string => {
  if (!selectedOptions || selectedOptions.length === 0) return "";
  if (isMultiSelect) {
    return selectedOptions.sort((a, b) => a - b).join(",");
  } else {
    return selectedOptions[0]?.toString() ?? ""; // Take the first element for single choice
  }
};

/**
 * Checks if the user's answer is correct for a multiple choice question
 * @param correctAnswersStr - The correct answers as a comma-separated string
 * @param userAnswer - The user's answer as an array of numbers
 * @returns true if the user's answer is correct, false otherwise
 */
export function areAnswersCorrect(
  correctAnswersStr: string,
  userAnswer: number[],
) {
  // Step 1: Convert correctAnswersStr to an array of numbers and sort it
  const correctAnswersArr = correctAnswersStr
    .split(",")
    .map(Number)
    .sort((a, b) => a - b);

  // Step 2: Sort the userAnswer array as well
  const sortedUserAnswer = [...userAnswer].sort((a, b) => a - b);

  // Step 3: Compare both arrays for equality
  if (correctAnswersArr.length !== sortedUserAnswer.length) {
    return false;
  }

  return correctAnswersArr.every(
    (val, index) => val === sortedUserAnswer[index],
  );
}

/**
 * Utility function to format a duration in milliseconds into a readable format: '1h 30min'
 * @param {number} milliseconds - The duration in milliseconds
 * @returns {string} Formatted duration in the format '1h 30min'
 */
export function formatDuration(milliseconds: number): string {
  if (milliseconds < 0) {
    return "Invalid duration";
  }

  const seconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  let result = "";

  if (hours > 0) {
    result += `${hours}h `;
  }

  if (minutes > 0 || hours === 0) {
    // include minutes even if 0 hours, but not if just 0 minutes and hours
    result += `${minutes} min`;
  }

  return result.trim(); // Remove trailing space if only hours are present.
}

// Helper function to compare dates
const isTrialExpired = (trialEndDate: Date): boolean => {
  const currentDate = new Date();
  return currentDate > trialEndDate; // Returns true if the trial end date is in the past
};

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

  return `${day}${suffix} ${month}, ${year}`;
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

/**
 * Checks whether a user has access to a specific exam.
 *
 * @param {string} userId - The ID of the user.
 * @param {string} examId - The ID of the exam.
 * @returns {Promise<{hasAccess: boolean, message: string}>} - An object indicating if the user has access and a corresponding message.
 */
export async function checkIfUserHasAccessToExam(
  userId: string,
  examId: string,
) {
  try {
    // 1. Check for Lifetime Access first

    const examIsFree = await checkIfUserExamIsFree(userId, examId);
    console.log("the exam is free", examIsFree);
    if (examIsFree.status) {
      return {
        hasAccess: true,
        message: "Exam is free. Access granted.",
      };
    }

    const userHasLifeTimeAccess = await checkIfUserHasLifeTimeAcess(userId);
    console.log("user has lifetime access", userHasLifeTimeAccess);
    if (userHasLifeTimeAccess.status) {
      return {
        hasAccess: true,
        message: "User has lifetime access. Access granted.",
      };
    }

    // 3. Check for Cancelled Subscription
    const userHasCancelledSubscription =
      await checkIfUserCancelledSubscription(userId);
    console.log(
      "user has cancelled subscription",
      userHasCancelledSubscription,
    );
    if (userHasCancelledSubscription.status) {
      return {
        hasAccess: true,
        message: "User has a cancelled subscription. Access denied.",
      };
    }
    // 2. Check for Active Subscription
    const userHasSubscription = await checkIfUserHasSubscription(userId);
    console.log("user has subscription", userHasSubscription);
    if (userHasSubscription.status) {
      return {
        hasAccess: true,
        message: "User has an active subscription. Access granted.",
      };
    }

    // 4. Check for Individual Exam Purchase
    const userHasPurchasedExam = await checkIfUserHasPurchasedExam(
      userId,
      examId,
    );
    console.log("user has purchased exam", userHasPurchasedExam);
    if (userHasPurchasedExam.status) {
      return {
        hasAccess: true,
        message: "User has purchased the exam. Access granted.",
      };
    }

    return {
      hasAccess: false,
      message: "User does not have access to this exam.",
    };
  } catch (error) {
    console.error("Error checking exam access:", error);
    return {
      hasAccess: false,
      message: "An error occurred while checking access to the exam.",
    };
  }
}

/**
 * Checks if the user has a cancelled subscription that is still within its current period.
 *
 * @param {string} userId - The ID of the user.
 * @returns {Promise<{status: boolean, message: string, periodEnd?: Date}>} - An object indicating if the user has a cancelled subscription that's still active and a corresponding message.
 */
export async function checkIfUserCancelledSubscription(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      stripeCurrentPeriodEnd: true,
      hasActiveSubscription: true,
      stripeSubscriptionId: true,
    },
  });

  if (!user) {
    return {
      status: false,
      message: "User not found",
    };
  }

  // Check if user has a subscription ID but has cancelled it (hasActiveSubscription is false)
  // and the current period hasn't ended yet
  if (
    user.stripeSubscriptionId && // User has a subscription
    !user.hasActiveSubscription && // But it's cancelled
    user.stripeCurrentPeriodEnd && // Has an end date
    new Date(user.stripeCurrentPeriodEnd) > new Date() // Current period hasn't ended
  ) {
    console.log(
      "user has a cancelled subscription that is still within its current period",
      user.stripeCurrentPeriodEnd,
    );
    return {
      status: true,
      message:
        "User has a cancelled subscription that is still within its current period",
      periodEnd: user.stripeCurrentPeriodEnd,
    };
  }

  return {
    status: false,
    message: "User does not have a cancelled subscription that is still active",
  };
}

/**
 * Checks if the user is within the trial period and has access to the exam.
 *
 * @param {string} userId - The ID of the user.
 * @returns {Promise<{status: boolean, message: string}>} - An object indicating trial access status and a corresponding message.
 */
export async function checkIfUserHasTrialAccess(userId: string) {
  try {
    // Query the Purchase table to check the trial period
    const currentUser = await db.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        trialEndsAt: true,
      },
    });

    if (!currentUser) {
      throw new Error("Could not find user");
    }

    let hasTrialAccess;

    if (isTrialExpired(currentUser.trialEndsAt!)) {
      console.log("users trial period has expired");
      hasTrialAccess = false;
    } else {
      console.log("users has access to the exam for this trial period");
      hasTrialAccess = true;
    }

    return {
      status: hasTrialAccess,
      message: hasTrialAccess
        ? "User has trial access."
        : "User's trial period has expired.",
    };
  } catch (error) {
    console.error("Error checking trial access:", error);
    return {
      status: false,
      message: "An error occurred while checking the trial access.",
    };
  }
}

/**
 * Checks if the user has an active subscription.
 *
 * @param {string} userId - The ID of the user.
 * @returns {Promise<{status: boolean, message: string}>} - An object indicating the subscription status and a corresponding message.
 */
export async function checkIfUserHasSubscription(userId: string) {
  try {
    const currentUser = await db.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        hasActiveSubscription: true,
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

    return {
      status: currentUser.hasActiveSubscription,
      message: currentUser.hasActiveSubscription
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

/**
 * Checks if the user has purchased a specific exam.
 *
 * @param {string} userId - The ID of the user.
 * @param {string} examId - The ID of the exam.
 * @returns {Promise<{status: boolean, message: string}>} - An object indicating if the user has purchased the exam and a corresponding message.
 */
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
      select: {
        id: true,
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

/**
 * Checks if the user has lifetime access to the platform or product.
 *
 * @param {string} userId - The ID of the user.
 * @returns {Promise<{status: boolean, message: string}>} - An object indicating if the user has lifetime access and a corresponding message.
 */
export async function checkIfUserHasLifeTimeAcess(userId: string) {
  try {
    const currentUser = await db.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        hasLifetimeAccess: true,
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

    if (currentUser.hasLifetimeAccess) {
      console.log("user has lifetime access to this exam");
      return {
        status: true,
        message: currentUser.hasLifetimeAccess
          ? "User has lifetime access to the product. Access granted."
          : "User does not have lifetime access. Access denied.",
      };
    } else {
      throw new Error("User does not have lifetime access.");
    }
  } catch (error) {
    console.error("Error checking liftime acceess:", error);
    return {
      status: false,
      message: "An error occurred while checking for lifetime access",
    };
  }
}

/**
 * Checks if the exam user is trying to access is free
 *
 * @param {string} userId - The ID of the user.
 * @param {string} examId - The ID of the exam.
 * @returns {Promise<{status: boolean, message: string}>} - An object indicating if the exam is free and a corresponding message.
 */
export async function checkIfUserExamIsFree(userId: string, examId: string) {
  try {
    const exam = await db.exam.findFirst({
      where: {
        id: examId,
      },
      select: {
        examLevel: true,
      },
    });

    if (exam?.examLevel === "FREE") {
      return {
        status: true,
        message: "Exam is free. Access granted.",
      };
    } else {
      return {
        status: false,
        message: "Exam is not free. Access denied.",
      };
    }
  } catch (error) {
    console.error("Error checking if the exam is free:", error);
    return {
      status: false,
      message: "An error occurred while checking if the exam is free",
    };
  }
}
