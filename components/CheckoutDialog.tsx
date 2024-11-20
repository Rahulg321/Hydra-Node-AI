"use client";

import React, { useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { PricingTier } from "./sections/pricing/pricing-cards";
import clsx from "clsx";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

type CheckoutDialogProps = {
  priceId: string;
  userId: string;
  email: string;
  name: string;
  mode: string;
  trialPeriodDays?: number;
  popular?: boolean;
  lifetime?: boolean;
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

const CheckoutDialog = ({
  priceId,
  mode,
  popular,
  lifetime,
  name,
  trialPeriodDays,
  userId,
  email,
}: CheckoutDialogProps) => {
  const fetchClientSecret = useCallback(() => {
    return fetch("/api/embedded-checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        priceId: priceId,
        userId: userId,
        userEmail: email,
        mode: mode,
        trialPeriodDays: trialPeriodDays,
        isLifetime: name === "Lifetime Billing" ? true : false,
      }),
    })
      .then((res) => res.json())
      .then((data) => data.client_secret);
  }, [mode, name, priceId, trialPeriodDays, userId, email]);

  const options = { fetchClientSecret };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={`mb-8 w-full rounded-lg px-6 py-3 font-medium transition-all duration-300 ${
            popular || lifetime
              ? "bg-primary text-white hover:bg-primary-dark"
              : "bg-gray-100 hover:bg-gray-200 dark:bg-dark-lighter dark:hover:bg-dark-card"
          }`}
        >
          Get Started
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] w-full max-w-6xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
          <DialogDescription>Get {name}</DialogDescription>
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

export default CheckoutDialog;
