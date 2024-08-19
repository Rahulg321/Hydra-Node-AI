import React from "react";
import { ErrorCard } from "./FormInfoCards";

type RoleGateProps = {
  role?: string;
  children: React.ReactNode;
};

const RoleGate = ({ role = "USER", children }: RoleGateProps) => {
  if (role !== "ADMIN") {
    return <ErrorCard urlError="You are not authorized to access this page" />;
  }
  return <div>{children}</div>;
};

export default RoleGate;
