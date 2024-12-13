import PerformanceHeader from "@/components/headers/performance-header";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <PerformanceHeader />
      <div>{children}</div>
    </div>
  );
};

export default layout;
