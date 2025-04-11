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

const ProfileLayoutSheet = ({ userId }: { userId: string }) => {
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
          <SheetTitle>Modules</SheetTitle>
        </SheetHeader>
        <div className="mt-4 flex flex-col items-start gap-4">
          <div>
            <LearningButton
              label="Home"
              icon={<Home />}
              href={`/profile/${userId}`}
            />
            <LearningButton
              label="My learnings"
              icon={<GraduationCap />}
              href={`/profile/${userId}/learnings`}
            />
            <LearningButton
              label="My Profile"
              icon={<UserRound />}
              href={`/profile/${userId}/info`}
            />
            <LearningButton
              label="Subscription"
              icon={<CreditCard />}
              href={`/profile/${userId}/subscription`}
            />
          </div>
          <LayoutLogoutButton />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ProfileLayoutSheet;
