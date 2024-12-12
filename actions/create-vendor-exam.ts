"use server";

import { auth } from "@/auth";
import {
  CreateExamFormType,
  createExamSchema,
} from "@/components/schemas/create-exam-schema";
import db from "@/lib/db";
import slugify from "slugify";
import { revalidatePath } from "next/cache";
import { stripe } from "@/lib/stripe";

export default async function createVendorExam(data: string) {
  try {
    let values = JSON.parse(data);

    console.log("values", values);
    // Authenticate the session and ensure we have a logged-in user.
    const session = await auth();
    if (!session) {
      return {
        type: "error",
        message: " An active session is required to create an exam.",
      };
    }

    const userId = session.user.id;

    // Verify that the user exists in the database.
    const userRecord = await db.user.findFirst({
      where: { id: userId },
      select: { firstName: true, lastName: true, name: true },
    });

    if (!userRecord) {
      return {
        type: "error",
        message: "User does not exist.",
      };
    }

    // Validate input form fields.
    const validatedFields = createExamSchema.safeParse(values);

    if (!validatedFields.success) {
      console.log("could not parse fields");

      return {
        type: "error",
        message: "Invalid exam data. Please provide valid exam details.",
        error: validatedFields.error.format(),
      };
    }

    console.log("Successfully parsed fields");

    const { examLevel, category, price, name, description, timeAllowed } =
      validatedFields.data;

    // Basic validation: ensure price is not negative.
    if (price < 0) {
      return {
        type: "error",
        message: "Price cannot be negative.",
      };
    }

    // Determine vendor name from user record.
    const vendorName =
      userRecord.name ??
      `${userRecord?.firstName ?? ""} ${userRecord?.lastName ?? ""}`.trim();
    const examSlug = slugify(name, { lower: true });

    console.log("vendor name", vendorName);

    // Ensure the user has a vendor record. Create one if not present.
    let vendorRecord = await db.vendor.findFirst({
      where: {
        userId,
        isUserVendor: true,
      },
      select: { id: true, name: true },
    });

    if (!vendorRecord) {
      vendorRecord = await db.vendor.create({
        data: {
          name: vendorName || "Unnamed Vendor",
          slug: slugify(vendorName || "unnamed-vendor", { lower: true }),
          userId,
          isUserVendor: true,
        },
      });
    }

    // Create Stripe product and price only if the price is greater than 0.
    let stripeProductId: string | undefined;
    let stripePriceId: string | undefined;

    if (price > 0) {
      const stripeProduct = await stripe.products.create({
        name,
        metadata: {
          vendorId: vendorRecord.id,
          examLevel: examLevel, // It's unclear if examLevel is suitable metadata, but provided here as originally.
        },
      });

      const stripePriceObj = await stripe.prices.create({
        unit_amount: Math.round(price * 100), // Convert to cents
        currency: "usd",
        product: stripeProduct.id,
        billing_scheme: "per_unit",
      });

      stripeProductId = stripeProduct.id;
      stripePriceId = stripePriceObj.id;
    }

    // Create the exam in the database.
    const createdExam = await db.exam.create({
      data: {
        name,
        slug: examSlug,
        examLevel,
        attempts: 0,
        vendorId: vendorRecord.id,
        timeAllowed,
        price,
        description,
        stripeProductId,
        stripePriceId,
      },
    });

    // Revalidate the cache for pages that might display the new exam.
    revalidatePath(`/instruction/exams`);

    return {
      type: "success",
      message: "Exam created successfully.",
      examId: createdExam.id,
    };
  } catch (error) {
    console.error("Error creating vendor exam:", error);
    return {
      type: "error",
      message:
        error instanceof Error && error.message
          ? error.message
          : "An error occurred while creating the exam.",
      error,
    };
  }
}
