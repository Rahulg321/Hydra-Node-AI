"use client";

import { toast } from "@/components/ui/use-toast";

export const showSubscriptionToast = () => {
  toast({
    variant: "destructive",
    title: "Not Subscribed ❌",
    description:
      "Subscribe to one of our pricing plans to start taking the exam.",
  });
};

export const showSuccessfulPurchase = () => {
  toast({
    variant: "success",
    title: "Payment Made",
    description: "Your Exam Purchase was Successfully done",
  });
};
