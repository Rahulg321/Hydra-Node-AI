"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface HeaderProps {}

export default function CreateExamHeader({}: HeaderProps) {
  return (
    <header className="flex items-center justify-between border-b px-4 py-2">
      <div className="flex items-center">
        <Image
          src="/placeholder.svg"
          alt="Logo"
          width={32}
          height={32}
          className="mr-2"
        />
        <span className="text-xl font-semibold">ExamBuilder</span>
      </div>
      <Button
        variant="ghost"
        className="text-gray-500 hover:text-gray-700"
        asChild
      >
        <Link href={"/instructor/exams"}>
          <X className="mr-1 h-5 w-5" />
          Exit
        </Link>
      </Button>
    </header>
  );
}
