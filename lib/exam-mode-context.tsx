"use client";

import React, { createContext, useContext, useState } from "react";

// Define the enum properly for exam modes
export enum ExamModeValues {
  PRACTICE = "PRACTICE",
  MOCK = "MOCK",
}

// Define the type of the context
type ExamModeContextType = {
  examMode: ExamModeValues | undefined;
  setExamMode: (mode: ExamModeValues) => void;
};

// Create the context with the correct default type, but no default value initially
const ExamModeContext = createContext<ExamModeContextType | undefined>(
  undefined,
);

// Hook to use ExamModeContext, throwing an error if used outside of the provider
export const useExamModeContext = () => {
  const context = useContext(ExamModeContext);
  if (!context) {
    throw new Error("useExamMode must be used within a ExamModeProvider");
  }
  return context;
};

// Provider component to wrap around parts of the app that need access to exam mode
export const ExamModeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [examMode, setExamMode] = useState<ExamModeValues | undefined>(
    ExamModeValues.MOCK, // You can set an initial default mode if you prefer
  );

  return (
    <ExamModeContext.Provider value={{ examMode, setExamMode }}>
      {children}
    </ExamModeContext.Provider>
  );
};
