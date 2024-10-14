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
  product: PricingTier;
  session: Session;
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

const CheckoutDialog = ({ product, session }: CheckoutDialogProps) => {
  const { isFeatured } = product;

  const fetchClientSecret = useCallback(() => {
    return fetch("/api/embedded-checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        priceId: product.priceId,
        userId: session.user.id,
        userEmail: session.user.email,
        mode: product.mode,
        trialPeriodDays: product.trialPeriodDays,
        isLifetime: product.name === "Lifetime Billing" ? true : false,
      }),
    })
      .then((res) => res.json())
      .then((data) => data.client_secret);
  }, [product, session]);

  const options = { fetchClientSecret };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={clsx("w-full rounded-full bg-base p-6 text-lg font-bold", {
            "bg-white text-baseC hover:bg-slate-300": isFeatured === true,
          })}
        >
          Buy Now
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] w-full max-w-6xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>
            Get the {product.name} for {product.duration}
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

export default CheckoutDialog;
