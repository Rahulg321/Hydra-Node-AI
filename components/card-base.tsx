import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface CardBaseProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
}

export function CardBase({ title, icon, children, className }: CardBaseProps) {
  return (
    <div className={cn("rounded-2xl border bg-[#0C0C0C] p-4", className)}>
      <div className="mb-4 flex items-center gap-3">
        <div className="text-orange-500">{icon}</div>
        <h5 className="transducer-font uppercase tracking-wider">{title}</h5>
      </div>
      <div>{children}</div>
    </div>
  );
}
