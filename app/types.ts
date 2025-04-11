import { Exam } from "@prisma/client";

export type QuizSessionHistory = {
  id: string;
  createdAt: Date;
  examMode: string;
  passFailStatus: boolean | null;
  percentageScored: number | null;
  correctAnswers: number | null;
  questionCount: number;
  exam: {
    id: string;
    name: string;
    examLevel: string;
  };
};

export type GetFilteredQuizSessionsHistory = {
  data: QuizSessionHistory[];
  totalCount: number;
  totalPages: number;
};
