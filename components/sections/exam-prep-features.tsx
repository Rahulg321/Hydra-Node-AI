import Image from "next/image";
import GraphRag from "@/public/logos/rag-graphics.png";
import DetailedExplanations from "@/public/illustrations/detailed-explanation.png";
import Scanning from "@/public/illustrations/scanning.png";
import Nodes from "@/public/illustrations/nodes.png";
import CardDotBackground from "@/public/logos/cards-dots-bg.svg";
import Ellipse from "@/public/logos/ellipse-logo.svg";
import Comment from "@/public/logos/comment.png";

export default function ExamPrepFeatures() {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="transducer-font mb-4 text-center text-3xl font-bold sm:text-4xl">
        HOW WE CAN HELP YOU FOR YOUR EXAM PREPARATION
      </h2>

      <p className="mx-auto mb-8 max-w-2xl text-center text-sm text-gray-400 lg:mb-12">
        Master your certification journey with intelligent tools. Practice
        smarter, not harder.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-12 lg:gap-8">
        {/* GraphRAG Feature - Large Card */}
        <div
          className="relative flex flex-col overflow-hidden rounded-lg backdrop-blur-md md:col-span-8"
          style={{
            background:
              "linear-gradient(113deg, rgba(255, 255, 255, 0.08) -6.68%, rgba(255, 255, 255, 0.02) 45.63%, rgba(255, 255, 255, 0.08) 103.45%)",
            boxShadow: "0px 22.528px 36.142px 0px rgba(0, 0, 0, 0.25)",
          }}
        >
          {/* Add background image div */}
          <div className="pointer-events-none absolute inset-0 z-[-10]">
            <Image
              src={CardDotBackground}
              alt=""
              width={200}
              height={200}
              className="rotate-90 transform"
              style={{
                flexShrink: 0,
                position: "absolute",
                right: 0,
                top: 50,
                left: 50,
              }}
            />
          </div>

          {/* <div className="pointer-events-none absolute inset-0 z-[-5]">
            <Image
              src={Ellipse}
              alt=""
              className="rotate-90 transform"
              style={{
                flexShrink: 0,
                position: "absolute",
                right: 0,
                left: 12,
                bottom: 0,
              }}
            />
          </div> */}
          <div className="relative flex-1 p-4 sm:p-6">
            <h3 className="mb-3 text-xl font-semibold sm:text-2xl">
              GraphRAG-based Q&A Generation
            </h3>
            <p className="mb-4 text-gray-400">
              Leveraging advanced GraphRAG technology, we provide intelligent
              and contextually relevant questions that enhance your
              understanding and retention.
            </p>
          </div>
          <div className="relative h-48 sm:h-64 lg:h-80">
            <Image
              src={GraphRag}
              alt="GraphRAG Q&A Generation diagram"
              className="h-full w-full object-contain"
              priority
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:col-span-4 lg:gap-8">
          <div className="rounded-lg bg-gradient-to-b from-zinc-900 to-zinc-800 p-4 sm:p-6">
            <h3 className="mb-3 text-lg font-semibold sm:text-xl">
              Real time exam engine
            </h3>
            <p className="mb-4 text-sm text-gray-400">
              Experience the actual exam interface, time limits, and question
              formats to build confidence and reduce test anxiety.
            </p>
            <div className="relative h-24 sm:h-32">
              <Image
                src={Comment}
                fill
                alt="Real-time exam engine interface"
                className="object-contain"
              />
            </div>
          </div>

          {/* Detailed Explanations */}
          <div className="rounded-lg bg-gradient-to-b from-zinc-900 to-zinc-800 p-4 sm:p-6">
            <h3 className="mb-3 text-lg font-semibold sm:text-xl">
              Detailed Explanations
            </h3>
            <p className="mb-4 text-sm text-gray-400">
              Every question comes with clear, concise explanations for each
              answer option, helping you grasp the core concepts.
            </p>
            <div className="relative h-24 sm:h-32">
              <Image
                src={DetailedExplanations}
                alt="Detailed explanations diagram"
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* Bottom Row - Two Equal Cards */}
        <div className="rounded-lg bg-gradient-to-b from-zinc-900 to-zinc-800 p-4 sm:p-6 md:col-span-6">
          <h3 className="mb-3 text-lg font-semibold sm:text-xl">
            AI-Curated Exam Materials
          </h3>
          <p className="mb-4 text-sm text-gray-400">
            Our AI constantly analyzes exam trends and updates our question bank
            to ensure you study the most relevant content.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src={Scanning}
              alt="AI scanning visualization"
              className="h-auto w-full object-contain"
            />
            <Image
              src={Nodes}
              alt="Network nodes visualization"
              className="h-auto w-full object-contain"
            />
          </div>
        </div>

        <div className="rounded-lg bg-gradient-to-b from-zinc-900 to-zinc-800 p-4 sm:p-6 md:col-span-6">
          <h3 className="mb-3 text-lg font-semibold sm:text-xl">
            AI-Powered Advanced Assessment
          </h3>
          <p className="mb-4 text-sm text-gray-400">
            Get detailed feedback and scoring on your practice exams.
          </p>
          <div className="relative h-32 sm:h-48">
            <Image
              src="/placeholder.svg?height=192&width=400"
              fill
              alt="AI-Powered Advanced Assessment with 80% score"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
