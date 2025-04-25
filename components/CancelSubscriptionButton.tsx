"use client";

import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { cancelSubscription } from "@/actions/cancel-subscription";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

const CancelSubscriptionButton = ({
  userId,
  manageDialogOpen,
}: {
  userId: string;
  manageDialogOpen: (open: boolean) => void;
}) => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const handleClick = () => {
    startTransition(async () => {
      try {
        const response = await cancelSubscription(userId);
        if (response.type === "error") {
          toast({
            title: "Error",
            variant: "destructive",
            description: `Could not cancel subscription. Please try again later.`,
          });
        }

        if (response.type === "success") {
          toast({
            title: "Successfull Cancelled Subscription",
            variant: "default",
          });
          manageDialogOpen(true);
          router.refresh();
        }
      } catch (error) {
        console.error("Error cancelling subscription:", error);
        toast({
          title: "Error",
          variant: "destructive",
          description: "An error occurred while cancelling the subscription.",
        });
      }
    });
  };

  return (
    <Button
      variant="destructive"
      size={"lg"}
      className="rounded-full border-2"
      onClick={handleClick}
      disabled={isPending}
    >
      {isPending ? "Cancelling Subscription..." : "Cancel Subscription"}
    </Button>
  );
};

export default CancelSubscriptionButton;
