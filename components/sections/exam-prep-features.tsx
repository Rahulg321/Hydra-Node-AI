import Image from "next/image";
import GraphRag from "@/public/logos/rag-graphics.png";
import DetailedExplanations from "@/public/illustrations/detailed-explanation.png";
import Scanning from "@/public/illustrations/scanning.png";
import Nodes from "@/public/illustrations/nodes.png";

export default function ExamPrepFeatures() {
  return (
    <div className="big-container block-space">
      <h2 className="mb-2 text-center text-4xl font-bold md:text-5xl">
        HOW WE CAN HELP YOU FOR YOUR EXAM PREPARATION
      </h2>

      <p className="mx-auto mb-12 max-w-2xl text-center text-gray-400">
        Master your certification journey with intelligent tools. Practice
        smarter, not harder.
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        <div
          className="flex flex-col overflow-hidden rounded-lg md:col-span-6 lg:col-span-8"
          style={{
            background:
              "linear-gradient(113deg, rgba(255, 255, 255, 0.08) -6.68%, rgba(255, 255, 255, 0.02) 45.63%, rgba(255, 255, 255, 0.08) 103.45%), rgba(0, 0, 0, 0.38)",
            boxShadow: "0px 22.528px 36.142px 0px rgba(0, 0, 0, 0.25);",
          }}
        >
          <div className="flex flex-1 flex-col p-6">
            <h3 className="mb-3 font-semibold">
              GraphRAG-based Q&A Generation
            </h3>
            <p className="mb-4 text-sm text-gray-400">
              Leveraging advanced GraphRAG technology, we provide intelligent
              and contextually relevant questions that enhance your
              understanding and retention.
            </p>
          </div>
          <div className="flex-1">
            <Image
              src={GraphRag}
              alt="GraphRAG Q&A Generation diagram"
              className=""
            />
          </div>
        </div>

        {/* Right column with stacked cards */}
        <div className="grid grid-cols-1 gap-6 md:col-span-6 lg:col-span-4">
          {/* Real time exam engine */}
          <div className="overflow-hidden rounded-lg bg-gradient-to-b from-zinc-900 to-zinc-800 p-6">
            <h3 className="mb-3 text-xl font-semibold">
              Real time exam engine
            </h3>
            <p className="mb-4 text-sm text-gray-400">
              Experience the actual exam interface, time limits, and question
              formats to build confidence and reduce test anxiety.
            </p>
            <div className="relative mt-2 h-32">
              <Image
                src="/placeholder.svg?height=128&width=400"
                fill
                alt="Real-time exam engine interface"
                className="object-contain"
              />
            </div>
          </div>

          {/* Detailed Explanations */}
          <div className="overflow-hidden rounded-lg bg-gradient-to-b from-zinc-900 to-zinc-800 p-6">
            <h3 className="mb-3 text-xl font-semibold">
              Detailed Explanations
            </h3>
            <p className="mb-4 text-sm text-gray-400">
              Every question comes with clear, concise explanations for each
              answer option, helping you grasp the core concepts.
            </p>
            <div className="flex-1">
              <Image
                src={DetailedExplanations}
                alt="Detailed explanations diagram"
                className=""
              />
            </div>
          </div>
        </div>

        {/* AI Generated Practice Tests - Full width */}
        {/* <div className="overflow-hidden rounded-lg bg-gradient-to-b from-zinc-900 to-zinc-800 p-6 md:col-span-12">
          <div className="md:flex md:items-center">
            <div className="md:w-1/3">
              <h3 className="mb-3 text-xl font-semibold">
                AI Generated Practice Tests
              </h3>
              <p className="mb-4 text-sm text-gray-400">
                Dynamic question generation that adapts to your learning style
                and knowledge gaps.
              </p>
            </div>
            <div className="relative h-48 md:w-2/3">
              <Image
                src="/placeholder.svg?height=192&width=600"
                fill
                alt="AI Generated Practice Tests interface"
                className="object-contain"
              />
            </div>
          </div>
        </div> */}

        {/* AI-Curated Exam Materials - Half width */}
        <div className="overflow-hidden rounded-lg bg-gradient-to-b from-zinc-900 to-zinc-800 p-6 md:col-span-6">
          <h3 className="mb-3 text-xl font-semibold">
            AI-Curated Exam Materials
          </h3>
          <p className="mb-4 text-sm text-gray-400">
            Our AI constantly analyzes exam trends and updates our question bank
            to ensure you study the most relevant content.
          </p>
          <div className="flex flex-1">
            <Image
              src={Scanning}
              alt="GraphRAG Q&A Generation diagram"
              className=""
            />
            <Image
              src={Nodes}
              alt="GraphRAG Q&A Generation diagram"
              className=""
            />
          </div>
        </div>

        {/* AI-Powered Advanced Assessment - Half width */}
        <div className="overflow-hidden rounded-lg bg-gradient-to-b from-zinc-900 to-zinc-800 p-6 md:col-span-6">
          <h3 className="mb-3 text-xl font-semibold">
            AI-Powered Advanced Assessment
          </h3>
          <p className="mb-4 text-sm text-gray-400">
            Get detailed feedback and scoring on your practice exams.
          </p>
          <div className="relative mt-4 h-48">
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
