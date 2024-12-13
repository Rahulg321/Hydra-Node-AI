"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LogoDark from "../LogoDark";
import LogoLight from "../LogoLight";
interface HeaderProps {}

export default function CreateExamHeader({}: HeaderProps) {
  const [isLogoLoaded, setIsLogoLoaded] = useState(false);

  useEffect(() => {
    setIsLogoLoaded(true);
  }, []);

  return (
    <header className="flex items-center justify-between border-b px-4 py-2">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2"
      >
        <Link href={"/"}>
          {isLogoLoaded ? (
            <>
              <LogoDark className="h-8 w-auto dark:hidden" />
              <LogoLight className="hidden h-8 w-auto dark:block" />
            </>
          ) : (
            <div className="h-8 w-32 animate-pulse bg-gray-200 dark:bg-gray-700" />
          )}
        </Link>
      </motion.div>

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
