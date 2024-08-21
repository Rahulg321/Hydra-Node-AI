import db from "@/lib/db";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

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

function VendorButton({
  vendor,
}: {
  vendor: {
    id: string;
    name: string;
    slug: string;
  };
}) {
  return (
    <Link
      className={cn(
        "block rounded-md border-l-4 border-base bg-[#F5F8FE] px-4 py-2 text-muted-foreground",
      )}
      href={`/vendors/${vendor.slug}`}
    >
      {vendor.name}
    </Link>
  );
}
