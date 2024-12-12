"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Settings, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface HeaderProps {
  title: string;
  subtitle?: string;
  backLink?: string;
  backText?: string;
  isDraft?: boolean;
  className?: string;
}

export default function ManageCourseHeader({
  title,
  subtitle,
  backLink = "/",
  backText = "Back to exams",
  isDraft = false,
  className,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-10 flex flex-col border-b bg-background px-4 py-2 transition-all duration-200 ease-in-out dark:bg-gray-950 lg:h-14 lg:flex-row lg:items-center lg:px-6 lg:py-0",
        isSticky && "shadow-md",
        className,
      )}
    >
      <div className="flex items-center justify-between lg:flex-1">
        <Link
          href={backLink}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">{backText}</span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:bg-accent hover:text-accent-foreground lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>
      <div className="flex flex-col items-start gap-2 py-2 lg:flex-1 lg:flex-row lg:items-center lg:justify-center lg:py-0">
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
        {isDraft && (
          <span className="rounded bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
            DRAFT
          </span>
        )}
      </div>
      <div
        className={cn(
          "flex flex-col gap-2 py-2 lg:flex-1 lg:flex-row lg:items-center lg:justify-end lg:py-0",
          isMenuOpen ? "flex" : "hidden lg:flex",
        )}
      >
        {subtitle && (
          <span className="text-sm text-muted-foreground lg:mr-2">
            {subtitle}
          </span>
        )}
        <Button
          variant="outline"
          size="sm"
          className="w-full bg-background text-foreground hover:bg-accent hover:text-accent-foreground lg:w-auto"
        >
          Preview
        </Button>
        <Button variant="secondary" size="sm" className="w-full lg:w-auto">
          Save
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="hidden text-muted-foreground hover:bg-accent hover:text-accent-foreground lg:inline-flex"
        >
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Button>
      </div>
    </header>
  );
}
