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
import { cn } from "@/hooks/lib/utils";
import { PricingTier } from "./sections/pricing/pricing-cards";
import clsx from "clsx";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { GradientButton } from "./buttons/gradient-button";

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
        <GradientButton className="mb-4 w-full" size={"lg"}>
          Get Started
        </GradientButton>
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
