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

const ExamPrepFeatures = () => {
  return (
    <section className="block-space big-container relative flex flex-col items-center justify-center">
      <div className="relative flex w-full flex-col items-center">
        {/* Header Section */}
        <div className="relative flex w-full flex-col items-center self-stretch">
          <h1 className="transducer-font relative mt-[-1.00px] self-stretch text-center text-2xl font-medium leading-tight tracking-[-1.44px] text-white sm:text-3xl sm:leading-[45px] md:text-4xl">
            HOW WE CAN HELP YOU FOR YOUR EXAM PREPARATION
          </h1>
          <p className="relative mx-auto mt-4 text-center font-normal leading-5 tracking-[-0.32px] text-gray-400 sm:leading-6">
            Master your certification journey with intelligent tools. Practice
            <br />
            smarter, not harder.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-4 grid w-full grid-cols-1 gap-4 sm:gap-5 md:mt-6 lg:mt-8 lg:grid-cols-6">
          {/* 1 */}
          <Card className="col-span-1 overflow-hidden rounded-[10.85px] border-none bg-[linear-gradient(129deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_47%,rgba(255,255,255,0.08)_100%),linear-gradient(0deg,rgba(0,0,0,0.38)_0%,rgba(0,0,0,0.38)_100%)] shadow-[0px_8.91px_14.3px_#00000040] lg:col-span-4">
            <CardContent className="p-4 sm:p-0">
              <div className="overflow-hidden px-2 pt-2 sm:px-5 sm:pt-5">
                <div className="p-4">
                  <h3 className="">GraphRAG-based Q&amp;A Generation</h3>
                  <p className="mt-4 bg-[linear-gradient(180deg,rgba(255,255,255,0.76)_0%,rgba(255,255,255,0.304)_100%)] bg-clip-text text-transparent">
                    Leveraging advanced GraphRAG technology, we provide
                    intelligent and contextually relevant questions that enhance
                    your understanding and retention.
                  </p>
                  <div className="p-4">
                    <Image src={GraphRag} alt="graph" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 2 */}
          <Card className="col-span-1 w-full overflow-hidden rounded-[10.85px] border-none shadow-[0px_8.91px_14.3px_#00000040] [background:linear-gradient(129deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_47%,rgba(255,255,255,0.08)_100%),linear-gradient(0deg,rgba(0,0,0,0.38)_0%,rgba(0,0,0,0.38)_100%)] lg:col-span-2">
            <CardContent className="relative h-full p-4 md:p-6">
              <div className="absolute z-[-10]">
                <Image
                  className=""
                  height={174}
                  width={214}
                  alt="Exam engine interface"
                  src="/exam-prep-features/mask-group-3.png"
                />
              </div>
              <div className="">
                <h3 className="">Real time exam engine</h3>
                <p className="mt-4 bg-[linear-gradient(180deg,rgba(255,255,255,0.76)_0%,rgba(255,255,255,0.304)_100%)] bg-clip-text text-transparent">
                  Experience the actual exam interface, time limits, and
                  question formats to build confidence and reduce test anxiety.
                </p>
                <div className="bottom-4 right-0 hidden md:absolute">
                  <Image
                    src={RealTimeExamQuality}
                    alt=""
                    width={200}
                    height={200}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 3 */}
          <Card className="col-span-1 w-full overflow-hidden rounded-[10.85px] border-none shadow-[0px_8.91px_14.3px_#00000040] [background:linear-gradient(129deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_47%,rgba(255,255,255,0.08)_100%),linear-gradient(0deg,rgba(0,0,0,0.38)_0%,rgba(0,0,0,0.38)_100%)] lg:col-span-4">
            <CardContent className="h-full">
              <div className="relative h-full p-4 md:p-6">
                <div className="absolute inset-0 z-[-10]">
                  <Image
                    className=""
                    alt="AI Practice Tests"
                    src="/exam-prep-features/mask-group-1.png"
                    width={214}
                    height={215}
                  />
                </div>
                <div className="flex h-full items-center gap-4 md:gap-6">
                  <Image src={GoogleLogoBox} alt="" />
                  <div>
                    <h3 className="">AI Generated Practice Tests</h3>
                    <p className="mt-2 bg-[linear-gradient(180deg,rgba(255,255,255,0.76)_0%,rgba(255,255,255,0.304)_100%)] bg-clip-text text-transparent">
                      Dynamic question generation that adapts to your learning
                      style and knowledge gaps.
                    </p>
                  </div>
                  <div className="left-1/2 top-12 hidden md:absolute">
                    <Image src={NvidiaBox} alt="" />
                  </div>
                  <div className="bottom-12 left-1/2 hidden md:absolute">
                    <Image src={CiscoBox} alt="" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 4 */}
          <Card className="col-span-1 w-full overflow-hidden rounded-[10.85px] border-none shadow-[0px_8.91px_14.3px_#00000040] [background:linear-gradient(129deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_47%,rgba(255,255,255,0.08)_100%),linear-gradient(0deg,rgba(0,0,0,0.38)_0%,rgba(0,0,0,0.38)_100%)] lg:col-span-2">
            <CardContent className="relative p-4 md:p-6">
              <div className="absolute inset-0">
                <Image
                  className=""
                  height={296}
                  width={214}
                  alt="Detailed explanations"
                  src="/exam-prep-features/mask-group-4.png"
                />
              </div>
              <div>
                <h3 className="">Detailed Explanations</h3>
                <p className="mt-2 bg-[linear-gradient(180deg,rgba(255,255,255,0.76)_0%,rgba(255,255,255,0.304)_100%)] bg-clip-text text-transparent">
                  Every question comes with clear, concise explanations for each
                  answer option, helping you grasp the underlying concepts.
                </p>
                <Image src={Detailed12} alt="" />
              </div>
            </CardContent>
          </Card>

          {/* 5 */}
          <Card className="col-span-1 w-full overflow-hidden rounded-[10.85px] border-none shadow-[0px_8.91px_14.3px_#00000040] [background:linear-gradient(129deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_47%,rgba(255,255,255,0.08)_100%),linear-gradient(0deg,rgba(0,0,0,0.38)_0%,rgba(0,0,0,0.38)_100%)] lg:col-span-3">
            <CardContent className="relative p-4 md:p-6">
              <div className="absolute inset-0 h-full">
                <Image
                  className=""
                  alt="AI-Curated Materials"
                  src="/exam-prep-features/mask-group-2.png"
                  width={192}
                  height={259}
                />
              </div>
              <div className="h-full">
                <h3 className="">AI-Curated Exam Materials</h3>
                <p className="mt-2 bg-[linear-gradient(180deg,rgba(255,255,255,0.76)_0%,rgba(255,255,255,0.304)_100%)] bg-clip-text text-transparent">
                  Our AI constantly analyzes exam trends and updates our
                  question bank to ensure you study the most relevant content.
                </p>
                <div className="mt-12 flex gap-4 md:gap-6">
                  <Image src={Scanning} alt="" />
                  <Image src={Neurons} alt="" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 6 */}
          <Card className="col-span-1 w-full overflow-hidden rounded-[10.85px] border-none shadow-[0px_8.91px_14.3px_#00000040] [background:linear-gradient(129deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_47%,rgba(255,255,255,0.08)_100%),linear-gradient(0deg,rgba(0,0,0,0.38)_0%,rgba(0,0,0,0.38)_100%)] lg:col-span-3">
            <CardContent className="relative p-4 md:p-6">
              <div className="absolute">
                <Image
                  className=""
                  alt="Assessment visualization"
                  height={259}
                  width={214}
                  src="/exam-prep-features/mask-group-5.png"
                />
              </div>
              <div>
                <h3 className="">AI-Powered Advanced Assessment</h3>
                <p className="mt-2 bg-[linear-gradient(180deg,rgba(255,255,255,0.76)_0%,rgba(255,255,255,0.304)_100%)] bg-clip-text text-transparent">
                  Get detailed feedback and scoring on your practice exams.
                </p>
                <div className="mt-12 flex gap-4 md:gap-6">
                  <Image src={Eight} alt="" />
                  <Image src={Bars} alt="" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ExamPrepFeatures;
