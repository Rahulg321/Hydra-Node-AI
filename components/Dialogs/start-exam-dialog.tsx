"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import MockExamForm from "../forms/mock-exam-form";

const StartExamDialog = ({
  examId,
  examSlug,
  examTime,
  currentUserId,
  buttonLabel = "Start Exam",
}: {
  examId: string;
  examSlug: string;
  examTime: number;
  currentUserId: string;
  buttonLabel?: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="" variant={"hydraPrimary"} size={"lg"}>
          {buttonLabel}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Start Exam</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div>
          <MockExamForm
            examId={examId}
            examSlug={examSlug}
            currentUserId={currentUserId}
            examTime={examTime}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StartExamDialog;
