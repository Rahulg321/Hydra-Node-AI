import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoveUpRight } from "lucide-react";
import { cn } from "@/hooks/lib/utils";

interface ExamHistory {
  id: string;
  examName: string;
  date: string;
  totalQuestions: number;
  difficultyLevel: string;
  examMode: string;
  link: string;
}

interface ExamHistoryTableProps {
  examHistoryData: ExamHistory[];
}

const ExamHistoryTable = ({ examHistoryData }: ExamHistoryTableProps) => {
  return (
    <div className="w-full overflow-auto">
      {/* Mobile View */}
      <div className="block md:hidden">
        <div className="space-y-4">
          {examHistoryData.map((exam, index) => (
            <div
              key={index}
              className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">{exam.examName}</h3>
                    <p className="text-sm text-muted-foreground">{exam.date}</p>
                  </div>
                  <a
                    href={exam.link}
                    className="flex items-center gap-1 text-sm text-primary hover:underline"
                  >
                    View <MoveUpRight className="h-4 w-4" />
                  </a>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Mode: </span>
                    {exam.examMode}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Questions: </span>
                    {exam.totalQuestions}
                  </div>
                  <div className="col-span-2">
                    <span className="text-muted-foreground">Difficulty: </span>
                    {exam.difficultyLevel || "-"}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <Table>
          <TableCaption>A list of your recent exams.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[200px]">Exam Name</TableHead>
              <TableHead className="min-w-[120px]">Date</TableHead>
              <TableHead className="min-w-[100px]">Exam Mode</TableHead>
              <TableHead className="min-w-[80px]">Questions</TableHead>
              <TableHead className="min-w-[120px]">Difficulty</TableHead>
              <TableHead className="w-[100px] text-right">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {examHistoryData.map((exam, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{exam.examName}</TableCell>
                <TableCell>{exam.date}</TableCell>
                <TableCell>{exam.examMode}</TableCell>
                <TableCell>{exam.totalQuestions}</TableCell>
                <TableCell>{exam.difficultyLevel || "-"}</TableCell>
                <TableCell className="text-right">
                  <a
                    href={exam.link}
                    className="flex items-center justify-end gap-1 text-primary hover:underline"
                  >
                    View <MoveUpRight className="h-4 w-4" />
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ExamHistoryTable;
