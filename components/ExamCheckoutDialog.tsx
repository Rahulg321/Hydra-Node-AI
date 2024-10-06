"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

import React, { useCallback } from "react";
import { Session } from "next-auth";
import { Exam } from "@prisma/client";
import { cn } from "@/lib/utils";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

type CheckoutDialogProps = {
  exam: Exam;
  session: Session;
};

const ExamCheckoutDialog = ({ exam, session }: CheckoutDialogProps) => {
  const { stripePriceId: priceId } = exam;

  const fetchClientSecret = useCallback(() => {
    return fetch("/api/exam-checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        priceId,
        userId: session.user.id,
        examId: exam.id,
        examSlug: exam.slug,
        userEmail: session.user.email,
        mode: "payment",
      }),
    })
      .then((res) => res.json())
      .then((data) => data.client_secret);
  }, [session, priceId, exam.id, exam.slug]);

  const options = { fetchClientSecret };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={cn("bg-baseC")}>Buy ${exam.price}</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] w-full max-w-6xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{exam.name}</DialogTitle>
          <DialogDescription>
            Get the {exam.name} for ${exam.price}
          </DialogDescription>
        </DialogHeader>
        <div className="w-full">
          <div id="checkout">
            <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExamCheckoutDialog;
