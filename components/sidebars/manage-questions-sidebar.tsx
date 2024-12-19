"use client";

import React from "react";
import { GripVertical, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Question } from "@prisma/client";
import { usePathname } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import HtmlContent from "../html-content";

const ManageQuestionsSidebar = ({
  examId,
  examQuestions,
}: {
  examId: string;
  examQuestions: Question[];
}) => {
  const pathname = usePathname();
  const dragQuestion = React.useRef<number>(0);
  const draggedOverQuestion = React.useRef<number>(0);
  const [questions, setQuestions] = React.useState(examQuestions);
  const [isDragging, setIsDragging] = React.useState(false);

  const handleSort = () => {
    const updatedQuestions = [...questions];
    // Get the actual element that was dragged (not an array containing the element)
    const draggedItem = updatedQuestions.splice(dragQuestion.current, 1)[0];

    console.log("dragged item", draggedItem);
    // Insert the dragged item into its new position
    updatedQuestions.splice(draggedOverQuestion.current, 0, draggedItem);

    setQuestions(updatedQuestions);
    setIsDragging(false);
  };

  const isCurrentQuestion = (questionId: string) => {
    return pathname.includes(`/questions/${questionId}`);
  };

  return (
    <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-72 shrink-0 border-r border-border/40 bg-background dark:border-border md:sticky md:block">
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-border/40 p-4">
          <h3 className="text-lg font-semibold">Questions</h3>
          <Badge variant="secondary">{questions.length} Total</Badge>
        </div>
        <ScrollArea className="flex-grow px-4 py-2">
          <div className="space-y-2">
            {questions && questions.length > 0 ? (
              questions.map((question, index) => (
                <Link
                  key={question.id}
                  href={`/instructor/exam/${examId}/questions/${question.id}`}
                  className={`group flex items-center justify-between rounded-md p-3 text-sm transition-colors ${
                    isCurrentQuestion(question.id)
                      ? "text-primary-foreground bg-muted-foreground/20"
                      : "hover:bg-muted"
                  } ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
                  draggable="true"
                  onDragStart={() => {
                    dragQuestion.current = index;
                    setIsDragging(true);
                  }}
                  onDragEnter={() => {
                    draggedOverQuestion.current = index;
                  }}
                  onDragEnd={handleSort}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <div className="truncate">
                    <HtmlContent content={question.question} />
                  </div>
                  <GripVertical className="h-5 w-5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              ))
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="text-sm text-muted-foreground">
                  No questions found
                </span>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="border-t border-border/40 p-4">
          <Button variant="outline" size="sm" className="w-full" asChild>
            <Link href={`/instructor/exam/${examId}/questions/new`}>
              <Plus className="mr-2 h-4 w-4" />
              Add Question
            </Link>
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default ManageQuestionsSidebar;
