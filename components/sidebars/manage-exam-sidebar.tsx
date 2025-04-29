"use client";

import Link from "next/link";
import { cn } from "@/hooks/lib/utils";
import { usePathname } from "next/navigation";
import { Book, DollarSign, Layout, Settings } from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

export default function ManageExamSidebar({ examId }: { examId: string }) {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      title: "Intended learners",
      href: `/instructor/exam/${examId}/manage/goals`,
      icon: Book,
    },
    {
      title: "Exam landing page",
      href: `/instructor/exam/${examId}/manage/basics`,
      icon: Layout,
    },
    {
      title: "Pricing",
      href: `/instructor/exam/${examId}/manage/pricing`,
      icon: DollarSign,
    },
    {
      title: "Settings",
      href: `/instructor/exam/${examId}/manage/settings`,
      icon: Settings,
    },
  ];

  return (
    <aside className="fixed top-14 z-30 hidden h-[calc(100vh-5rem)] w-full shrink-0 border-r border-border/40 dark:border-border md:sticky md:block">
      <div className="no-scrollbar h-full overflow-auto py-6 pr-6 lg:py-8">
        <div className="w-full">
          {navItems.map((item, index) => (
            <NavItem
              key={index}
              currentPathname={pathname}
              navLink={item.href}
              navLabel={item.title}
              icon={item.icon}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}

function NavItem({
  currentPathname,
  navLink,
  navLabel,
  icon: Icon,
}: {
  currentPathname: string;
  navLink: string;
  navLabel: string;
  icon: React.ElementType;
}) {
  const isActive = currentPathname === navLink;

  return (
    <Link
      className={cn(
        "flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium transition-colors",
        isActive
          ? "border-l-4 border-primary bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
      href={navLink}
    >
      <Icon className="h-4 w-4" />
      {navLabel}
    </Link>
  );
}
