"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { GradientButton } from "../buttons/gradient-button";

const RefreshCourseButton = () => {
  const router = useRouter();

  return (
    <GradientButton
      onClick={() => {
        // router.refresh();
        window.location.reload();
      }}
      className="text-white"
    >
      Refresh Database
    </GradientButton>
  );
};

export default RefreshCourseButton;
