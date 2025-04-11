"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaAws, FaMicrosoft, FaQuestionCircle } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import {
  SiCisco,
  SiOracle,
  SiVmware,
  SiSnowflake,
  SiNvidia,
} from "react-icons/si";
import { SiDatabricks } from "react-icons/si";
import { GrVmware } from "react-icons/gr";

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

  switch (vendor.name) {
    case "Amazon":
      return (
        <VendorLogoButton
          id={vendor.id}
          name={vendor.name}
          slug={vendor.slug}
          logo={<FaAws className="h-14 w-14" />}
        />
      );
    case "Google":
      return (
        <VendorLogoButton
          id={vendor.id}
          name={vendor.name}
          slug={vendor.slug}
          logo={<FaGoogle className="h-14 w-14" />}
        />
      );
    case "Data bricks":
      return (
        <VendorLogoButton
          id={vendor.id}
          name={vendor.name}
          slug={vendor.slug}
          logo={<SiDatabricks className="h-14 w-14" />}
        />
      );
    case "Microsoft":
      return (
        <VendorLogoButton
          id={vendor.id}
          name={vendor.name}
          slug={vendor.slug}
          logo={<FaMicrosoft className="h-14 w-14" />}
        />
      );
    case "Cisco":
      return (
        <VendorLogoButton
          id={vendor.id}
          name={vendor.name}
          slug={vendor.slug}
          logo={<SiCisco className="h-14 w-14" />}
        />
      );
    case "Oracle":
      return (
        <VendorLogoButton
          id={vendor.id}
          name={vendor.name}
          slug={vendor.slug}
          logo={<SiOracle className="h-14 w-14" />}
        />
      );
    case "VMware":
      return (
        <VendorLogoButton
          id={vendor.id}
          name={vendor.name}
          slug={vendor.slug}
          logo={<GrVmware className="h-14 w-14" />}
        />
      );
    case "Snowflake":
      return (
        <VendorLogoButton
          id={vendor.id}
          name={vendor.name}
          slug={vendor.slug}
          logo={<SiSnowflake className="h-14 w-14" />}
        />
      );
    case "NVIDIA":
      return (
        <VendorLogoButton
          id={vendor.id}
          name={vendor.name}
          slug={vendor.slug}
          logo={<SiNvidia className="h-14 w-14" />}
        />
      );
    default:
      // add a default logo and vendor component
      return (
        <VendorLogoButton
          id={vendor.id}
          name={vendor.name}
          slug={vendor.slug}
          logo={<FaQuestionCircle className="h-14 w-14" />}
        />
      );
  }
}

function VendorLogoButton({
  id,
  name,
  slug,
  logo,
}: {
  id: string;
  name: string;
  slug: string;
  logo: React.ReactNode;
}) {
  const pathname = usePathname();
  const currentVendorId = pathname.split("/").pop();
  const isActive = currentVendorId === id;

  return (
    <Link
      href={`/vendors/${id}`}
      className={cn("flex flex-col items-center gap-2")}
    >
      <div
        className={cn("rounded-xl p-4 text-white/40", {
          "bg-[#FF8845] text-white": isActive,
        })}
      >
        {logo}
      </div>
      <span
        className={cn("text-sm text-white/50", {
          "text-white": isActive,
        })}
      >
        {name}
      </span>
    </Link>
  );
}
