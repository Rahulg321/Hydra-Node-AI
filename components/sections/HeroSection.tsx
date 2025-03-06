import * as React from "react";
import { cn } from "../../lib/utils";
import { ChevronRight } from "lucide-react";
import { GradientButton } from "./gradient-button";
import { HeroVideoDialog } from "./hero-video-dialog";
import { Button } from "../ui/button";
import { RainbowButton } from "../rainbow-button";

interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: {
    regular: string;
    gradient: string;
  };
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  bottomImage?: {
    light: string;
    dark: string;
  };
  gridOptions?: {
    angle?: number;
    cellSize?: number;
    opacity?: number;
    lightLineColor?: string;
    darkLineColor?: string;
  };
}

const RetroGrid = ({
  angle = 65,
  cellSize = 60,
  opacity = 0.8,
  lightLineColor = "rgba(147, 51, 234, 0.3)",
  darkLineColor = "rgba(147, 51, 234, 0.3)",
}) => {
  const gridStyles = {
    "--grid-angle": `${angle}deg`,
    "--cell-size": `${cellSize}px`,
    "--opacity": opacity,
    "--light-line": lightLineColor,
    "--dark-line": darkLineColor,
  } as React.CSSProperties;

  return (
    <div
      className={cn(
        "pointer-events-none absolute size-full overflow-hidden [perspective:200px]",
        `opacity-[var(--opacity)]`,
      )}
      style={gridStyles}
    >
      <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
        <div className="animate-grid [background-image:linear-gradient(to_right,var(--light-line)_1px,transparent_0),linear-gradient(to_bottom,var(--light-line)_1px,transparent_0)] [background-repeat:repeat] [background-size:var(--cell-size)_var(--cell-size)] [height:300vh] [inset:0%_0px] [margin-left:-200%] [transform-origin:100%_0_0] [width:600vw] dark:[background-image:linear-gradient(to_right,var(--dark-line)_1px,transparent_0),linear-gradient(to_bottom,var(--dark-line)_1px,transparent_0)]" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent to-90% dark:from-[#0A051E]" />
    </div>
  );
};

const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  (
    {
      className,
      title = "Build products for everyone",
      subtitle = {
        regular: "Designing your projects faster with ",
        gradient: "the largest figma UI kit.",
      },
      description = "Sed ut perspiciatis unde omnis iste natus voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae.",
      ctaText = "Browse courses",
      ctaHref = "#",
      bottomImage = {
        light: "https://farmui.vercel.app/dashboard-light.png",
        dark: "https://farmui.vercel.app/dashboard.png",
      },
      gridOptions,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        className={cn("relative overflow-hidden overflow-x-hidden", className)}
        ref={ref}
        {...props}
      >
        <div className="0 absolute top-0 z-[0] h-screen w-screen" />
        <section className="z-1 relative mx-auto overflow-x-hidden">
          <RetroGrid {...gridOptions} />
          <div className="z-10 mx-auto max-w-screen-xl gap-12 px-4 py-16 md:px-8 md:py-28">
            <div className="leading-0 mx-auto max-w-3xl space-y-5 text-center lg:leading-5">
              <h2 className="mx-auto text-3xl tracking-tighter text-gray-900 dark:text-white md:text-4xl lg:text-6xl">
                {subtitle.regular}
                <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent dark:from-purple-300 dark:to-orange-200">
                  {subtitle.gradient}
                </span>
              </h2>
              <p className="mx-auto max-w-2xl text-base text-gray-600 dark:text-gray-300 md:text-lg">
                {description}
              </p>
              <div className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
                <Button className="text-white">
                  Start your free practice exam
                </Button>
              </div>
            </div>
            {/* <div className="relative z-10 mx-4 mt-16 md:mx-10 md:mt-32">
              <HeroVideoDialog
                animationStyle="from-center"
                videoSrc="https://www.youtube.com/embed/EqCpT3bLgBM?si=trg5SHJbgq0cme2H"
                thumbnailSrc="/app-dark.png"
                thumbnailAlt="Watch Demo Video"
                className="w-full"
              />
            </div> */}
          </div>
        </section>
      </div>
    );
  },
);
HeroSection.displayName = "HeroSection";

export { HeroSection };
