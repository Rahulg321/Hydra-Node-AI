"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, File, AlertCircle, Loader2, CheckCircle } from "lucide-react";
import { cn } from "@/hooks/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
// import { TransformedDeal } from "@/app/types";
import { useToast } from "@/hooks/use-toast";
import { set } from "date-fns";
import BulkUploadQuestionsInstructor from "@/actions/bulk-upload-questions-instructor";
// import BulkUploadDealsToDB from "@/app/actions/bulk-upload-deal";

interface RawQuestionRow {
  Question?: string;
  "Question Type"?: string;
  "Answer Option 1"?: string;
  "Explanation 1"?: string;
  "Answer Option 2"?: string;
  "Explanation 2"?: string;
  "Answer Option 3"?: string;
  "Explanation 3"?: string;
  "Answer Option 4"?: string;
  "Explanation 4"?: string;
  "Answer Option 5"?: string;
  "Explanation 5"?: string;
  "Answer Option 6"?: string;
  "Explanation 6"?: string;
  "Correct Answers"?: string;
  "Overall Explanation"?: string;
  Domain?: string;
}

export type TransformedQuestion = {
  question: string;
  questionType: "multi_select" | "multiple_choice"; // Enum-like type
  answerOption1: string;
  explanation1: string;
  answerOption2: string;
  explanation2: string;
  answerOption3: string;
  explanation3: string;
  answerOption4: string;
  explanation4: string;
  answerOption5: string | null; // Nullable fields
  explanation5: string | null;
  answerOption6: string | null;
  explanation6: string | null;
  correctAnswers: string;
  overallExplanation: string;
  domain: string;
  examId: string; // Assuming examId is a string
};

export function BulkImportDialog({ examId }: { examId: string }) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [deals, setDeals] = useState<RawQuestionRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      if (
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "text/csv" ||
        file.name.endsWith(".xlsx") ||
        file.name.endsWith(".csv")
      ) {
        setFile(file);
        setError(null);
        parseFile(file);
      } else {
        setError("Please upload a valid Excel (.xlsx) or CSV file.");
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const parseFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet) as RawQuestionRow[];
      setDeals(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  const transformDeals = (
    questions: RawQuestionRow[],
  ): TransformedQuestion[] => {
    console.log("transforming questions........");
    return questions.map((row, index) => ({
      question: row["Question"] || "", // Transform the column name
      questionType:
        row["Question Type"] === "multi-select"
          ? "multi_select"
          : "multiple_choice", // Convert type to match enum
      answerOption1: row["Answer Option 1"] || "",
      explanation1: row["Explanation 1"] || "",
      answerOption2: row["Answer Option 2"] || "",
      explanation2: row["Explanation 2"] || "",
      answerOption3: row["Answer Option 3"] || "",
      explanation3: row["Explanation 3"] || "",
      answerOption4: row["Answer Option 4"] || "",
      explanation4: row["Explanation 4"] || "",
      answerOption5: row["Answer Option 5"] || null, // Nullable field
      explanation5: row["Explanation 5"] || null,
      answerOption6: row["Answer Option 6"] || null,
      explanation6: row["Explanation 6"] || null,
      correctAnswers: String(row["Correct Answers"] || ""),
      overallExplanation: row["Overall Explanation"] || "",
      domain: row["Domain"] || "",
      examId, // Attach the provided examId
    }));
  };

  const handleUpload = async () => {
    if (!file || deals.length === 0) return;

    setUploading(true);

    console.log("questions to upload", deals);

    //Transform the questions into the required format
    const formattedQuestions = transformDeals(deals);

    console.log("Formatted questions to Upload", formattedQuestions);

    const response = await BulkUploadQuestionsInstructor(
      examId,
      formattedQuestions,
    );

    if (response.type === "success") {
      setSuccess(response.message);
      toast({
        title: "Deals uploaded successfully",
        description: response.message,
      });
    }

    if (response.type === "error") {
      setError(response.message);
      toast({
        title: "Error uploading deals ",
        variant: "destructive",
        description: response.message,
      });
    }

    // if (response.type === "partial_success") {
    //   setError(response.message);
    //   toast({
    //     title: "Partial Deals Uploaded",
    //     variant: "destructive",
    //     description: response.message,
    //   });
    // }

    setUploading(false);
    setUploadComplete(true);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="" variant={"secondary"}>
            <Upload className="mr-2 h-4 w-4" />
            Bulk Import Deals
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[90vw] sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Bulk Import Deals</DialogTitle>
          </DialogHeader>
          <ScrollArea>
            <div className="grid gap-4 py-4">
              <div
                {...getRootProps()}
                className={cn(
                  "cursor-pointer rounded-lg border-2 border-dashed p-6 text-center",
                  isDragActive ? "border-primary" : "border-muted-foreground",
                )}
              >
                <input {...getInputProps()} />
                {file ? (
                  <div className="flex items-center justify-center">
                    <File className="mr-2 h-6 w-6" />
                    <span>{file.name}</span>
                  </div>
                ) : (
                  <p>
                    Drag & drop an Excel or CSV file here, or click to select
                    one
                  </p>
                )}
              </div>
              {success && (
                <div className="flex items-center text-green-600 dark:text-green-400">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  <span>{success}</span>
                </div>
              )}
              {error && (
                <div className="flex items-center text-destructive">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  <span>{error}</span>
                </div>
              )}
              {deals.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  {deals.length} deals found in the file
                </p>
              )}
              {uploading && (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              )}
            </div>
          </ScrollArea>
          <Button
            onClick={handleUpload}
            disabled={!file || deals.length === 0 || uploading}
          >
            {uploading ? "Uploading..." : "Upload Deals"}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
