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
  const examSlug = pathname.split("/").pop();
  const isActive = examSlug === vendor.slug;

  return (
    <Link
      className={cn("block rounded-md px-4 py-2 text-muted-foreground", {
        "border-l-4 border-base bg-[#F5F8FE]": isActive,
      })}
      href={`/vendors/${vendor.slug}`}
    >
      {vendor.name}
    </Link>
  );
}
