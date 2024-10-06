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
  percentageScored?: number | string;
  totalQuestions: number;
  difficultyLevel: string;
  correctAnswers: number;
  incorrectAnswers: number;
  examMode: string;
  passFailStatus: string; // Either "Pass" or "Fail"
  statusClass: string; // Dynamic class for coloring status
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
          <TableHead>Percentage Scored</TableHead>
          <TableHead>Total Questions</TableHead>
          <TableHead>Difficulty Level</TableHead>
          <TableHead>Correct Answers</TableHead>
          <TableHead>Incorrect Answers</TableHead>
          <TableHead>Pass/Fail Status</TableHead>
          <TableHead className="text-right">Details</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {examHistoryData.map((exam, index) => (
          <TableRow key={index}>
            <TableCell>{exam.examName}</TableCell>
            <TableCell>{exam.date}</TableCell>
            <TableCell>{exam.examMode}</TableCell>
            <TableCell>{exam.percentageScored}%</TableCell>
            <TableCell>{exam.totalQuestions}</TableCell>
            <TableCell>
              {exam.difficultyLevel ? exam.difficultyLevel : "-"}
            </TableCell>
            <TableCell>{exam.correctAnswers}</TableCell>
            <TableCell>{exam.incorrectAnswers}</TableCell>
            <TableCell className={exam.statusClass}>
              {exam.passFailStatus}
            </TableCell>
            <TableCell className="text-right text-purple-700">
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
