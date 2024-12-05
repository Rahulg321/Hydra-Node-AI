"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { TableIcon as TableOfContents } from "lucide-react";
import { Vendor } from "@prisma/client";
import VendorSheetButton from "../ComponentButtons/sheet-vendor-button";

const VendorsSheet = ({ vendors }: { vendors: Vendor[] }) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="mt-2 w-fit md:hidden">
          <TableOfContents className="mr-2 size-4" />
          View Vendors
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Vendors</SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          {vendors.map((vendor) => (
            <VendorSheetButton
              key={vendor.id}
              vendor={vendor}
              onClose={handleClose}
            />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default VendorsSheet;
