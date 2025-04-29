"use client";
import { cn } from "@/hooks/lib/utils";

interface LampBarProps {
  className?: string;
  width?: string;
  glowColor?: string;
  barColor?: string;
  barThickness?: string;
}

export function LampBar({
  className,
  width = "30rem",
  glowColor = "hsla(30, 100%, 72%, 0.8)",
  barColor = "hsla(30, 100%, 72%, 0.8)",
  barThickness = "0.25rem",
}: LampBarProps) {
  return (
    <div className={cn("relative z-0 w-full overflow-hidden", className)}>
      <div className="relative isolate z-0 flex w-full items-center justify-center">
        <div
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="bg-gradient-conic absolute inset-auto right-1/2 h-56 w-[30rem] overflow-visible from-orange-400 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute bottom-0 left-0 z-20 h-40 w-[100%] bg-slate-950 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute bottom-0 left-0 z-20 h-[100%] w-40 bg-slate-950 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </div>
        <div
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="bg-gradient-conic absolute inset-auto left-1/2 h-56 w-[30rem] from-transparent via-transparent to-orange-400 text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute bottom-0 right-0 z-20 h-[100%] w-40 bg-slate-950 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute bottom-0 right-0 z-20 h-40 w-[100%] bg-slate-950 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </div>
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-slate-950 blur-2xl"></div>
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div
          className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full opacity-50 blur-3xl"
          style={{ backgroundColor: glowColor }}
        ></div>
        <div
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full blur-2xl"
          style={{ backgroundColor: glowColor }}
        ></div>
        <div
          className="absolute inset-auto z-50 -translate-y-[7rem]"
          style={{
            height: barThickness,
            width: width,
            backgroundColor: barColor,
            boxShadow:
              "0px 6.86px 37.01px 0px hsla(25, 100%, 50%, 0.8), 0px 0.43px 4.25px 0.43px hsla(0, 0%, 100%, 0.87) inset",
          }}
        ></div>

        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-slate-950"></div>
      </div>
    </div>
  );
}
