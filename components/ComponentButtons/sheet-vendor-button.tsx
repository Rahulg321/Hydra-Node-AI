"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Vendor } from "@prisma/client";

interface VendorButtonProps {
  vendor: Vendor;
  onClose: () => void;
}

const VendorSheetButton: React.FC<VendorButtonProps> = ({
  vendor,
  onClose,
}) => {
  const router = useRouter();

  const handleClick = () => {
    onClose();
    router.push(`/vendors/${vendor.slug}`);
  };

  return (
    <Button
      variant="ghost"
      className="mb-2 w-full justify-start text-left"
      onClick={handleClick}
    >
      {vendor.name}
      <ChevronRight className="ml-auto h-4 w-4" />
    </Button>
  );
};

export default VendorSheetButton;
