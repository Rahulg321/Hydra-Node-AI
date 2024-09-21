"use client";

import React, { createContext, useContext, useState } from "react";

export enum ExamModeValues {
  PRACTICE = "PRACTICE",
  MOCK = "MOCK",
}

type ExamMode = {
  examMode: ExamModeValues | null;
  setExamMode: (mode: ExamModeValues | null) => void;
};

export const ExamModeContext = createContext<ExamMode | null>(null);

export const useExamModeContext = () => {
  const context = useContext(ExamModeContext);

  if (!context) {
    throw new Error("useExamMode must be used within a ExamModeProvider");
  }

  return context;
};

export const ExamModeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [examMode, setExamMode] = useState<ExamModeValues | null>(null);

  return (
    <ExamModeContext.Provider value={{ examMode, setExamMode }}>
      {children}
    </ExamModeContext.Provider>
  );
};
