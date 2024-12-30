"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function VendorButton({
  vendor,
}: {
  vendor: {
    id: string;
    name: string;
    slug: string;
  };
}) {
  const pathname = usePathname();
  const currentVendorId = pathname.split("/").pop();
  const isActive = currentVendorId === vendor.id;

  return (
    <Link
      className={cn(
        "block rounded-md px-4 py-2 text-muted-foreground transition-colors hover:bg-muted",
        {
          "border-l-4 border-base bg-[#F5F8FE] dark:bg-dark-card": isActive,
        },
      )}
      href={`/vendors/${vendor.id}`}
    >
      {vendor.name}
    </Link>
  );
}
