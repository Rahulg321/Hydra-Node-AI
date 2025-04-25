"use client";

import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

import { DialogFooter } from "../ui/dialog";
import CancelSubscriptionButton from "../CancelSubscriptionButton";

const CancelSubscriptionDialog = ({ userId }: { userId: string }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Cancel Subscription</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="transducer-font text-center text-2xl font-bold uppercase">
            Are you sure you want to cancel your pro plan?
          </DialogTitle>
        </DialogHeader>
        <DialogFooter className="mt-4 justify-center">
          <DialogClose asChild>
            <Button
              variant="outline"
              size={"lg"}
              className="rounded-full border-2 border-[#4B4B4B]"
            >
              Keep plan active
            </Button>
          </DialogClose>
          <CancelSubscriptionButton
            userId={userId}
            manageDialogOpen={setIsOpen}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CancelSubscriptionDialog;
