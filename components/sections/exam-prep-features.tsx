import Image from "next/image";

export default function ExamPrepFeatures() {
  return (
    <div className="bg-black px-4 py-16 text-white">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-2 text-center text-4xl font-bold md:text-5xl">
          HOW WE CAN HELP YOU FOR YOUR EXAM PREPARATION
        </h2>

        <p className="mx-auto mb-12 max-w-2xl text-center text-gray-400">
          Master your certification journey with intelligent tools. Practice
          smarter, not harder.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          {/* GraphRAG-based Q&A Generation - Takes up half width */}
          <div className="overflow-hidden rounded-lg bg-gradient-to-b from-zinc-900 to-zinc-800 p-6 md:col-span-6">
            <h3 className="mb-3 text-xl font-semibold">
              GraphRAG-based Q&A Generation
            </h3>
            <p className="mb-4 text-sm text-gray-400">
              Leveraging advanced GraphRAG technology, we provide intelligent
              and contextually relevant questions that enhance your
              understanding and retention.
            </p>
            <div className="relative mt-4 h-48">
              <Image
                src="/placeholder.svg?height=192&width=400"
                fill
                alt="GraphRAG Q&A Generation diagram"
                className="object-contain"
              />
            </div>
          </div>

          {/* Right column with stacked cards */}
          <div className="grid grid-cols-1 gap-6 md:col-span-6">
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
              <div className="relative mt-2 h-32">
                <Image
                  src="/placeholder.svg?height=128&width=400"
                  fill
                  alt="Detailed explanations diagram"
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* AI Generated Practice Tests - Full width */}
          <div className="overflow-hidden rounded-lg bg-gradient-to-b from-zinc-900 to-zinc-800 p-6 md:col-span-12">
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
          </div>

          {/* AI-Curated Exam Materials - Half width */}
          <div className="overflow-hidden rounded-lg bg-gradient-to-b from-zinc-900 to-zinc-800 p-6 md:col-span-6">
            <h3 className="mb-3 text-xl font-semibold">
              AI-Curated Exam Materials
            </h3>
            <p className="mb-4 text-sm text-gray-400">
              Our AI constantly analyzes exam trends and updates our question
              bank to ensure you study the most relevant content.
            </p>
            <div className="relative mt-4 h-48">
              <Image
                src="/placeholder.svg?height=192&width=400"
                fill
                alt="AI-Curated Exam Materials visualization"
                className="object-contain"
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
    </div>
  );
}
