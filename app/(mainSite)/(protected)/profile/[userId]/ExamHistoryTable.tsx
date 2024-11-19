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

interface ExamHistory {
  id: string;
  examName: string;
  date: string;
  totalQuestions: number;
  difficultyLevel: string;
  examMode: string;
  link: string; // URL for viewing details
}

// Component Prop Types
interface ExamHistoryTableProps {
  examHistoryData: ExamHistory[];
}

// Example data with the new fields required
const ExamHistoryTable = ({ examHistoryData }: ExamHistoryTableProps) => {
  return (
    <Table>
      <TableCaption>A list of your recent exams.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Exam Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Exam Mode</TableHead>
          <TableHead>Total Questions</TableHead>
          <TableHead>Difficulty Level</TableHead>
          <TableHead className="text-right">Details</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {examHistoryData.map((exam, index) => (
          <TableRow key={index}>
            <TableCell>{exam.examName}</TableCell>
            <TableCell>{exam.date}</TableCell>
            <TableCell>{exam.examMode}</TableCell>
            <TableCell>{exam.totalQuestions}</TableCell>
            <TableCell>
              {exam.difficultyLevel ? exam.difficultyLevel : "-"}
            </TableCell>

            <TableCell className="text-right text-primary">
              <a
                href={exam.link}
                className="flex items-center justify-end gap-2"
              >
                View Details <MoveUpRight />
              </a>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ExamHistoryTable;
