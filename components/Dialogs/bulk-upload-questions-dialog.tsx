"use client";

import React, { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import BulkUploadQuestionsFormButton from "../forms/bulk-upload-questions-form-button";

const BulkUploadQuestionsDialog = ({ examId }: { examId: string }) => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Bulk Upload Questions
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bulk Upload Questions</DialogTitle>
          <DialogDescription className="font-bold text-red-500">
            Bulk Upload Questions. Please adhere to a specific schema before
            uploading file.
          </DialogDescription>
        </DialogHeader>

        <BulkUploadQuestionsFormButton
          examId={examId}
          setDialogState={setOpenDialog}
        />
      </DialogContent>
    </Dialog>
  );
};

export default BulkUploadQuestionsDialog;
