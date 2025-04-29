"use client";

import type React from "react";

import { X } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/hooks/lib/utils";

interface PaymentDetailsProps {
  plan: string;
  nextPaymentDate: string;
  amount: string;
  billingCycle: string;
  billingType: string;
  className?: string;
  trigger?: React.ReactNode;
}

export function PaymentDetailsDialog({
  plan = "Pro",
  nextPaymentDate = "Apr 1, 2026",
  amount = "$199",
  billingCycle = "Yearly",
  billingType = "One time",
  className,
  trigger,
}: PaymentDetailsProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || <Button variant="link">View Payment Details</Button>}
      </DialogTrigger>
      <DialogContent
        className={cn(
          "max-w-md overflow-hidden border-0 bg-black p-0",
          "before:absolute before:left-0 before:right-0 before:top-0 before:h-1 before:bg-gradient-to-r before:from-orange-400 before:to-orange-500 before:content-['']",
          className,
        )}
      >
        <div className="relative h-full w-full">
          {/* Orange decorative shape */}
          <div className="absolute bottom-0 right-0 h-64 w-64 translate-x-1/3 translate-y-1/3 rounded-full bg-gradient-to-br from-orange-500 to-orange-400 opacity-90" />

          <div className="relative p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold uppercase tracking-wider text-white">
                Payment Details
              </h2>
            </div>

            <div className="space-y-5">
              <div>
                <p className="text-base text-white">Plan: {plan}</p>
                <div className="my-4 h-px bg-gray-800" />
              </div>

              <div>
                <p className="text-base text-white">
                  Next payment: {nextPaymentDate} / {amount}
                </p>
              </div>

              <div>
                <p className="text-base text-white">
                  Billing Cycle: {billingCycle} / {billingType}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-400">
                  *Additional taxes may apply
                </p>
              </div>

              <div className="pt-2">
                <Button className="rounded-full border-0 bg-gradient-to-r from-orange-500 to-orange-400 px-8 text-white hover:from-orange-600 hover:to-orange-500">
                  Ok
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Custom close button component
function DialogClose() {
  return (
    <button className="rounded-full p-1 text-gray-400 hover:text-white focus:outline-none">
      <X className="h-6 w-6" />
      <span className="sr-only">Close</span>
    </button>
  );
}
