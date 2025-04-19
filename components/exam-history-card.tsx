"use client";

import type React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FaAws, FaGoogle, FaMicrosoft, FaQuestionCircle } from "react-icons/fa";
import {
  SiCisco,
  SiDatabricks,
  SiNvidia,
  SiOracle,
  SiSnowflake,
} from "react-icons/si";
import { GrVmware } from "react-icons/gr";

interface ExamHistoryCardProps {
  icon?: React.ReactNode;
  iconLetter?: string;
  title: string;
  status: string;
  marks: string;
  date: string;
  mode: string;
  link: string;
  className?: string;
  vendorName?: string;
}

export const ExamHistoryCard = ({
  icon,
  iconLetter = "G",
  title = "EXPERT MACHINE LEARNING ENGINEER",
  status = "Passed",
  marks = "80/100",
  date = "12th Mar, 25",
  mode = "Practice",
  link = "/",
  className,
  vendorName,
}: ExamHistoryCardProps) => {
  return (
    <div
      className={cn(
        "flex flex-shrink-0 flex-col rounded-3xl border bg-[#0C0C0C] p-5 shadow-md transition-transform hover:scale-[1.02]",
        className,
      )}
    >
      <div className="mb-4 flex justify-start">
        {icon || <RenderVendorLogo vendorName={vendorName} />}
      </div>

      <h4 className="transducer-font mb-4 line-clamp-2 text-wrap break-words font-semibold">
        {title}
      </h4>

      <div className="mb-4 grid grid-cols-2 gap-x-3 gap-y-2">
        <div className="text-sm text-white/50">
          Status: <span className="font-medium text-white">{status}</span>
        </div>
        <div className="text-sm text-white/50">
          Marks: <span className="font-medium text-white">{marks}</span>
        </div>
        <div className="text-sm text-white/50">
          Date: <span className="font-medium text-white">{date}</span>
        </div>
        <div className="text-sm text-white/50">
          Mode: <span className="font-medium text-white">{mode}</span>
        </div>
      </div>

      <div className="mt-auto">
        <Link
          href={link}
          className="inline-flex items-center gap-1 text-sm font-medium text-[#FF9266] transition-colors"
        >
          View details <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

function RenderVendorLogo({ vendorName }: { vendorName: string | undefined }) {
  console.log(vendorName);
  switch (vendorName) {
    case "Amazon":
      return <VendorCircleLogo logo={<FaAws className="size-6" />} />;
    case "Google":
      return <VendorCircleLogo logo={<FaGoogle className="size-6" />} />;
    case "Data bricks":
      return <VendorCircleLogo logo={<SiDatabricks className="size-6" />} />;
    case "Microsoft":
      return <VendorCircleLogo logo={<FaMicrosoft className="size-6" />} />;
    case "Cisco":
      return <VendorCircleLogo logo={<SiCisco className="size-6" />} />;
    case "Oracle":
      return <VendorCircleLogo logo={<SiOracle className="size-6" />} />;
    case "VMware":
      return <VendorCircleLogo logo={<GrVmware className="size-6" />} />;
    case "Snowflake":
      return <VendorCircleLogo logo={<SiSnowflake className="size-6" />} />;
    case "NVIDIA":
      return <VendorCircleLogo logo={<SiNvidia className="size-6" />} />;
    default:
      // add a default logo and vendor component
      return (
        <VendorCircleLogo logo={<FaQuestionCircle className="size-6" />} />
      );
  }
}

function VendorCircleLogo({ logo }: { logo: React.ReactNode }) {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-400 text-xl font-bold text-white shadow-sm">
      {logo}
    </div>
  );
}
