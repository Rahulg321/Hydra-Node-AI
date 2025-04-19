import { getAllSystemVendors } from "@/prisma/queries";
import React from "react";
import VendorButton from "./VendorButton";
import VendorsSheet from "@/components/Sheets/VendorsSheet";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const vendors = await getAllSystemVendors();

  return (
    <div className="">
      <VendorsSheet vendors={vendors} />
      <div className="grid min-h-screen md:grid-cols-[280px_1fr]">
        <aside className="fixed top-14 z-30 hidden h-[calc(100vh-5rem)] w-full shrink-0 border-r border-border/40 dark:border-border md:sticky md:block">
          <div className="no-scrollbar h-full overflow-auto py-6 pr-6 lg:py-8">
            <div className="w-full px-2">
              <h4 className="ml-2">Vendors</h4>
              <div className="mt-6 grid grid-cols-2 gap-2 gap-y-4">
                {vendors.map((vendor) => (
                  <VendorButton key={vendor.id} vendor={vendor} />
                ))}
              </div>
            </div>
          </div>
        </aside>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default layout;
