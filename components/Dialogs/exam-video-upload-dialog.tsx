"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import ProfilePicUploadForm from "../forms/ProfilePicUploadForm";
import UploadExamCoverImageForm from "../forms/upload-exam-cover-image-form";
import UploadExamCoverVideoForm from "../forms/upload-exam-cover-video-form";

export default function ExamVideoUploadDialog({ examId }: { examId: string }) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Upload Video</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] md:max-w-2xl lg:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Upload Exam Cover Video</DialogTitle>
            <DialogDescription>
              Add a cover image to your exam here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <UploadExamCoverVideoForm
            examId={examId}
            setDialogOpenState={setOpen}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Upload Video</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Upload Exam Cover Video</DrawerTitle>
          <DrawerDescription>
            Upload cover video for your exam here
          </DrawerDescription>
        </DrawerHeader>
        <UploadExamCoverVideoForm
          examId={examId}
          setDialogOpenState={setOpen}
        />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
