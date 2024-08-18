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
import Link from "next/link";
import { MoveUpRight } from "lucide-react";

const examHistoryData = [
  {
    id: "#5489",
    examName: "Cloud Engineer Exam",
    date: "6th April, 2024",
    marks: 10,
    type: "Practice",
    status: "Fail",
    statusClass: "text-red-500", // Additional property for dynamic class
    link: "/exam/5489",
  },
  // Add more exam records here as needed
  {
    id: "#5490",
    examName: "API Development Exam",
    date: "25th May, 2024",
    marks: 15,
    type: "Final",
    status: "Pending",
    statusClass: "text-yellow-500", // Class for pass status
    link: "/exam/5490",
  },
  {
    id: "#5490",
    examName: "Full Stack Developer Exam",
    date: "10th May, 2024",
    marks: 15,
    type: "Final",
    status: "Pass",
    statusClass: "text-green-500", // Class for pass status
    link: "/exam/5490",
  },
];

const ExamHistoryTable = () => {
  return (
    <Table>
      <TableCaption>A list of your recent exams.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>Exam Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Marks</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {examHistoryData.map((exam, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{exam.id}</TableCell>
            <TableCell>{exam.examName}</TableCell>
            <TableCell>{exam.date}</TableCell>
            <TableCell>{exam.marks}</TableCell>
            <TableCell>{exam.type}</TableCell>
            <TableCell className={exam.statusClass}>{exam.status}</TableCell>
            <TableCell className="text-right text-purple-700">
              <Link
                href={exam.link}
                className="flex items-center justify-end gap-2"
              >
                View Details <MoveUpRight />
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ExamHistoryTable;
