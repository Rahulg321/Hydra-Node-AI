import db from "@/lib/db";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import VendorButton from "./VendorButton";
import VendorsSheet from "@/components/Sheets/VendorsSheet";
import { unstable_cache } from "next/cache";

const getAllSystemVendors = unstable_cache(
  async () => {
    return await db.vendor.findMany({
      where: {
        isUserVendor: false,
      },
    });
  },
  ["vendors"],
  { revalidate: 3600, tags: ["vendors"] },
);

const layout = async ({ children }: { children: React.ReactNode }) => {
  //   const vendors = await getAllSystemVendors();
  const vendors = await db.vendor.findMany({
    where: {
      isUserVendor: false,
    },
  });

  return (
    <div className="">
      <VendorsSheet vendors={vendors} />
      <div className="grid min-h-screen md:grid-cols-[220px_1fr]">
        <aside className="fixed top-14 z-30 hidden h-[calc(100vh-5rem)] w-full shrink-0 border-r border-border/40 dark:border-border md:sticky md:block">
          <div className="no-scrollbar h-full overflow-auto py-6 pr-6 lg:py-8">
            <div className="w-full">
              {vendors.map((vendor) => (
                <VendorButton key={vendor.id} vendor={vendor} />
              ))}
            </div>
          </div>
        </aside>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default layout;
