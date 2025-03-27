import React from "react";
import { Card, CardContent } from "../../components/ui/card";
import Image from "next/image";
import GraphRag from "@/public/graph-rag.png";
import RealTimeExamQuality from "@/public/real-time-exam-quality.png";
import GoogleLogoBox from "@/public/google-logo-box.png";
import NvidiaBox from "@/public/nvidia-box.png";
import CiscoBox from "@/public/cisco-box.png";
import Detailed12 from "@/public/detailed12.png";
import Scanning from "@/public/scanning.png";
import Neurons from "@/public/neurons.png";
import Eight from "@/public/80.png";
import Bars from "@/public/bars.png";
import TimeClock from "@/public/time-clock.png";

const ExamPrepFeatures = () => {
  return (
    <section className="block-space big-container relative flex flex-col items-center justify-center">
      <div className="relative flex w-full flex-col items-center">
        <div className="relative flex w-full flex-col items-center self-stretch">
          <h1 className="transducer-font text-center text-2xl font-medium leading-tight tracking-[-1.44px] text-white sm:text-3xl md:text-4xl">
            HOW WE CAN HELP YOU FOR YOUR EXAM PREPARATION
          </h1>
          <p className="mx-auto mt-4 max-w-[600px] text-center text-gray-400 sm:leading-6">
            Master your certification journey with intelligent tools. Practice
            <br />
            smarter, not harder.
          </p>
        </div>

        <div className="mt-6 grid w-full grid-cols-1 gap-6 md:gap-4 lg:mt-8 lg:grid-cols-6">
          <Card className="col-span-1 overflow-hidden rounded-lg border-none bg-[linear-gradient(129deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_47%,rgba(255,255,255,0.08)_100%),linear-gradient(0deg,rgba(0,0,0,0.38)_0%,rgba(0,0,0,0.38)_100%)] shadow-lg lg:col-span-4">
            <CardContent className="relative p-3 sm:p-4 md:p-6">
              <div className="absolute left-4 top-2 z-0">
                <Image
                  className="pointer-events-none"
                  alt="Exam engine interface"
                  src="/exam-prep-features/mask-group-3.png"
                  width={300}
                  height={300}
                />
              </div>
              <h3>GraphRAG-based Q&amp;A Generation</h3>
              <p className="mt-2 bg-[linear-gradient(180deg,rgba(255,255,255,0.76)_0%,rgba(255,255,255,0.304)_100%)] bg-clip-text text-transparent">
                Leveraging advanced GraphRAG technology,
                <br /> we provide intelligent and contextually relevant
                <br />
                questions that enhance your understanding and retention.
              </p>
              <div className="mt-3 w-full">
                <Image src={GraphRag} alt="graph" className="min-w-full" />
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1 overflow-hidden rounded-lg border-none shadow-lg [background:linear-gradient(129deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_47%,rgba(255,255,255,0.08)_100%),linear-gradient(0deg,rgba(0,0,0,0.38)_0%,rgba(0,0,0,0.38)_100%)] lg:col-span-2">
            <CardContent className="relative h-full p-4">
              <div className="absolute inset-0">
                <Image
                  className="pointer-events-none"
                  alt="Exam engine interface"
                  src="/exam-prep-features/mask-group-3.png"
                  width={300}
                  height={300}
                />
              </div>
              <div className="mt-4">
                <h3>Real time exam engine</h3>
                <p className="mt-2 bg-[linear-gradient(180deg,rgba(255,255,255,0.76)_0%,rgba(255,255,255,0.304)_100%)] bg-clip-text text-transparent">
                  Experience the actual exam interface, time limits, and
                  question formats to build confidence and reduce test anxiety.
                </p>
              </div>
              <div className="absolute bottom-24 left-4 hidden lg:block">
                <Image
                  src={TimeClock}
                  alt="Real Time Exam Engine"
                  width={50}
                  height={50}
                />
              </div>
              <div className="absolute bottom-12 right-4 hidden lg:block">
                <Image
                  src={RealTimeExamQuality}
                  alt="Real Time Exam Engine"
                  width={200}
                  height={200}
                />
              </div>
            </CardContent>
          </Card>

          {/* 3 */}
          <Card className="col-span-1 overflow-hidden rounded-lg border-none shadow-lg [background:linear-gradient(129deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_47%,rgba(255,255,255,0.08)_100%),linear-gradient(0deg,rgba(0,0,0,0.38)_0%,rgba(0,0,0,0.38)_100%)] lg:col-span-4">
            <CardContent className="relative h-full p-4">
              <div className="absolute left-4 top-2 z-0">
                <Image
                  className="pointer-events-none"
                  alt="Exam engine interface"
                  src="/exam-prep-features/mask-group-3.png"
                  width={300}
                  height={300}
                />
              </div>
              <div className="flex h-full content-center items-center justify-between">
                <Image src={GoogleLogoBox} alt="Google" />
                <div>
                  <h3>AI Generated Practice Tests</h3>
                  <p className="mt-2 bg-[linear-gradient(180deg,rgba(255,255,255,0.76)_0%,rgba(255,255,255,0.304)_100%)] bg-clip-text text-transparent">
                    Dynamic question generation that adapts to your learning
                    style and knowledge gaps.
                  </p>
                </div>
              </div>
              <div className="absolute left-1/2 top-12 hidden lg:block">
                <Image src={NvidiaBox} alt="Nvidia" width={50} height={50} />
              </div>
              <div className="absolute bottom-12 left-1/2 hidden lg:block">
                <Image src={CiscoBox} alt="Cisco" width={35} height={35} />
              </div>
            </CardContent>
          </Card>

          {/* 4 */}
          <Card className="col-span-1 overflow-hidden rounded-lg border-none shadow-lg [background:linear-gradient(129deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_47%,rgba(255,255,255,0.08)_100%),linear-gradient(0deg,rgba(0,0,0,0.38)_0%,rgba(0,0,0,0.38)_100%)] lg:col-span-2">
            <CardContent className="relative p-3 sm:p-4 md:p-6">
              <div className="absolute inset-0">
                <Image
                  alt="Detailed explanations"
                  src="/exam-prep-features/mask-group-4.png"
                  width={250}
                  height={250}
                />
              </div>
              <h3>Detailed Explanations</h3>
              <p className="mt-2 bg-[linear-gradient(180deg,rgba(255,255,255,0.76)_0%,rgba(255,255,255,0.304)_100%)] bg-clip-text text-transparent">
                Every question comes with clear, concise explanations for each
                answer option, helping you grasp the underlying concepts.
              </p>
              <div className="mt-2 md:mt-4 lg:mt-8">
                <Image src={Detailed12} alt="" />
              </div>
            </CardContent>
          </Card>

          {/* 5 */}
          <Card className="col-span-1 overflow-hidden rounded-lg border-none shadow-lg [background:linear-gradient(129deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_47%,rgba(255,255,255,0.08)_100%),linear-gradient(0deg,rgba(0,0,0,0.38)_0%,rgba(0,0,0,0.38)_100%)] lg:col-span-3">
            <CardContent className="relative p-3 sm:p-4">
              <div className="absolute right-12 z-[-10]">
                <Image
                  alt="Detailed explanations"
                  src="/exam-prep-features/mask-group-4.png"
                  width={300}
                  height={300}
                />
              </div>
              <h3>AI-Curated Exam Materials</h3>
              <p className="mt-2 bg-[linear-gradient(180deg,rgba(255,255,255,0.76)_0%,rgba(255,255,255,0.304)_100%)] bg-clip-text text-transparent">
                Our AI constantly analyzes exam trends and updates our question
                bank to ensure you study the most relevant content.
              </p>
              <div className="mt-12 flex gap-4 md:gap-6">
                <Image src={Scanning} alt="" />
                <Image src={Neurons} alt="" />
              </div>
            </CardContent>
          </Card>

          {/* 6 */}
          <Card className="col-span-1 overflow-hidden rounded-lg border-none shadow-lg [background:linear-gradient(129deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_47%,rgba(255,255,255,0.08)_100%),linear-gradient(0deg,rgba(0,0,0,0.38)_0%,rgba(0,0,0,0.38)_100%)] lg:col-span-3">
            <CardContent className="relative p-3 sm:p-4">
              <div className="absolute left-24 z-[-10]">
                <Image
                  alt="Detailed explanations"
                  src="/exam-prep-features/mask-group-4.png"
                  width={300}
                  height={300}
                />
              </div>
              <h3>AI-Powered Advanced Assessment</h3>
              <p className="mt-2 bg-[linear-gradient(180deg,rgba(255,255,255,0.76)_0%,rgba(255,255,255,0.304)_100%)] bg-clip-text text-transparent">
                Get detailed feedback and <br />
                scoring on your practice exams.
              </p>
              <div className="mt-3 flex justify-between">
                <Image src={Eight} alt="" width={220} height={200} />
                <Image src={Bars} alt="" width={200} height={200} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ExamPrepFeatures;
