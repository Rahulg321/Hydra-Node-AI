import db from "@/lib/db";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import VendorButton from "./VendorButton";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const vendors = await db.vendor.findMany();

  return (
    <div className="">
      <div className="grid min-h-screen grid-cols-[220px_1fr]">
        <div className="space-y-4 border-r-2 p-4">
          {vendors.map((vendor) => (
            <VendorButton key={vendor.id} vendor={vendor} />
          ))}
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default layout;
