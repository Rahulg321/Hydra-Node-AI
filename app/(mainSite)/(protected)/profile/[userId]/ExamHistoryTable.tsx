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
  percentageScored?: number;
  totalQuestions: number;
  difficultyLevel: string;
  correctAnswers: number;
  incorrectAnswers: number;
  passFailStatus: string; // Either "Pass" or "Fail"
  statusClass: string; // Dynamic class for coloring status
  link: string; // URL for viewing details
}

// Component Prop Types
interface ExamHistoryTableProps {
  examHistoryData: ExamHistory[];
}

// Example data with the new fields required
const examHistoryData = [
  {
    id: "#5489",
    examName: "Cloud Engineer Exam",
    date: "6th April, 2024",
    percentageScored: 40,
    totalQuestions: 50,
    difficultyLevel: "Intermediate",
    correctAnswers: 20,
    incorrectAnswers: 30,
    passFailStatus: "Fail", // Could be "Pass" or "Fail"
    statusClass: "text-red-500", // Dynamic class based on pass/fail status
    link: "/exam/5489",
  },
  {
    id: "#5490",
    examName: "API Development Exam",
    date: "25th May, 2024",
    percentageScored: 75,
    totalQuestions: 50,
    difficultyLevel: "Advanced",
    correctAnswers: 38,
    incorrectAnswers: 12,
    passFailStatus: "Pass", // Pass status
    statusClass: "text-green-500", // Class for pass status
    link: "/exam/5490",
  },
  // Add more records as needed
];

const ExamHistoryTable = ({ examHistoryData }: ExamHistoryTableProps) => {
  return (
    <Table>
      <TableCaption>A list of your recent exams.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Exam Name</TableHead>
          <TableHead>Date</TableHead>
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
