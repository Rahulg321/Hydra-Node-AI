"use client";

import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { cancelUserSubscription } from "@/actions/cancel-subscription";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

const CancelSubscriptionButton = ({ userId }: { userId: string }) => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const handleClick = () => {
    startTransition(async () => {
      const response = await cancelUserSubscription(userId);
      if (response.type === "error") {
        toast({
          title: "Error",
          variant: "destructive",
        });
      }

      if (response.type === "success") {
        toast({
          title: "Successfull Cancelled Subscription",
          variant: "default",
        });
        router.refresh();
      }
    });
  };

  return (
    <Button
      className="mb-4 w-full rounded-full border border-base bg-base px-10 py-6 text-base font-semibold text-white"
      onClick={handleClick}
      disabled={isPending}
    >
      {isPending ? "Cancelling Subscription" : "Cancel Subscription"}
    </Button>
  );
};

export default CancelSubscriptionButton;
