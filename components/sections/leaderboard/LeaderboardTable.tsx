"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown, Medal } from "lucide-react";

type LeaderboardEntry = {
  rank: number;
  name: string;
  score: number;
  examsTaken: number;
  change: number;
};

const dummyData: LeaderboardEntry[] = [
  { rank: 1, name: "Alice Johnson", score: 985, examsTaken: 15, change: 0 },
  { rank: 2, name: "Bob Smith", score: 950, examsTaken: 14, change: 2 },
  { rank: 3, name: "Charlie Brown", score: 925, examsTaken: 13, change: -1 },
  { rank: 4, name: "Diana Ross", score: 900, examsTaken: 12, change: 1 },
  { rank: 5, name: "Ethan Hunt", score: 875, examsTaken: 11, change: -2 },
];

export default function LeaderboardTable() {
  const [data, setData] = useState(dummyData);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof LeaderboardEntry;
    direction: "asc" | "desc";
  } | null>(null);

  const sortData = (key: keyof LeaderboardEntry) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setData(sortedData);
    setSortConfig({ key, direction });
  };

  const renderRankCell = (rank: number) => {
    if (rank === 1) return <Medal className="h-6 w-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-6 w-6 text-gray-400" />;
    if (rank === 3) return <Medal className="h-6 w-6 text-amber-600" />;
    return rank;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[60px] px-2 sm:w-[100px] sm:px-4">
            Rank
          </TableHead>
          <TableHead className="px-2 sm:px-4">Name</TableHead>
          <TableHead className="px-2 sm:px-4">
            <Button
              variant="ghost"
              onClick={() => sortData("score")}
              className="p-0 sm:p-2"
            >
              <span className="hidden sm:inline">Score</span>
              <span className="sm:hidden">Scr</span>
              {sortConfig?.key === "score" &&
                (sortConfig.direction === "asc" ? (
                  <ChevronUp className="ml-1 h-4 w-4" />
                ) : (
                  <ChevronDown className="ml-1 h-4 w-4" />
                ))}
            </Button>
          </TableHead>
          <TableHead className="px-2 sm:px-4">
            <Button
              variant="ghost"
              onClick={() => sortData("examsTaken")}
              className="p-0 sm:p-2"
            >
              <span className="hidden sm:inline">Exams Taken</span>
              <span className="sm:hidden">Exams</span>
              {sortConfig?.key === "examsTaken" &&
                (sortConfig.direction === "asc" ? (
                  <ChevronUp className="ml-1 h-4 w-4" />
                ) : (
                  <ChevronDown className="ml-1 h-4 w-4" />
                ))}
            </Button>
          </TableHead>
          <TableHead className="px-2 sm:px-4">Change</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((entry) => (
          <TableRow
            key={entry.rank}
            className="transition-colors hover:bg-muted/50"
          >
            <TableCell className="px-2 sm:px-4">
              {renderRankCell(entry.rank)}
            </TableCell>
            <TableCell className="px-2 sm:px-4">{entry.name}</TableCell>
            <TableCell className="px-2 sm:px-4">{entry.score}</TableCell>
            <TableCell className="px-2 sm:px-4">{entry.examsTaken}</TableCell>
            <TableCell className="px-2 sm:px-4">
              {entry.change > 0 ? (
                <span className="text-green-600">↑{entry.change}</span>
              ) : entry.change < 0 ? (
                <span className="text-red-600">↓{Math.abs(entry.change)}</span>
              ) : (
                <span>-</span>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
