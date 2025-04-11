"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Home,
  CreditCard,
  GraduationCap,
  TableIcon as TableOfContents,
  UserRound,
} from "lucide-react";
import LearningButton from "../learning-button";
import LayoutLogoutButton from "../buttons/layout-logout-button";
import CorrectQuestionGrid from "../correct-question-grid";

const ExamGridResultSheet = ({
  userAttempts,
  totalQuestions,
}: {
  userAttempts: {
    skipped: boolean | null;
    isCorrect: boolean | null;
  }[];
  totalQuestions: number;
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="mt-2 w-fit md:hidden" variant="ghost">
          <TableOfContents className="" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Results</SheetTitle>
        </SheetHeader>
        <div className="mt-6 flex flex-col gap-4">
          <h4 className="transducer-font">Current Question Grid</h4>
          <CorrectQuestionGrid
            totalQuestions={totalQuestions}
            questionStatus={userAttempts.map((attempt) =>
              attempt.skipped
                ? "skipped"
                : attempt.isCorrect
                  ? "correct"
                  : "incorrect",
            )}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ExamGridResultSheet;
