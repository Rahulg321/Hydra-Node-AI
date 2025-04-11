"use client";

import { DoorOpen } from "lucide-react";
import { signOut } from "next-auth/react";
import React from "react";

const LayoutLogoutButton = () => {
  return (
    <button
      className="mb-4 mt-auto flex cursor-pointer items-center gap-2 text-[#898E9C] hover:text-white"
      onClick={() => {
        signOut();
      }}
    >
      <DoorOpen className="h-4 w-4" />
      Log out
    </button>
  );
};

export default LayoutLogoutButton;
