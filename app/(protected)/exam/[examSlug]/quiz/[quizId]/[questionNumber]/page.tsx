import React from "react";
import Option from "./Option";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PiDivideBold } from "react-icons/pi";

function TimeLeft() {
  return (
    <div className="rounded-lg bg-base p-4 text-center text-white">
      <h4>Time Left</h4>
      <h3>01:18:45</h3>
    </div>
  );
}

function CorrectQuestionGrid() {
  return (
    <div className="bg-muted p-4">
      <div className="grid grid-cols-6 gap-2">
        {
          // using array constructor map out 3 divs
          Array.from({ length: 42 }).map((_, index) => {
            return (
              <div
                key={index}
                className="size-8 rounded-lg border border-base"
              ></div>
            );
          })
        }
      </div>
    </div>
  );
}

const page = ({
  params,
}: {
  params: {
    examSlug: string;
    questionNumber: string;
  };
}) => {
  return (
    <section className="grid min-h-screen grid-cols-5">
      <div className="block-space container col-span-1">
        <TimeLeft />
        <CorrectQuestionGrid />
      </div>
      <div className="container col-span-4 space-y-4 bg-[#F5F4FA] py-4">
        <h5>Question 1</h5>
        <h2>
          ML pipeline needs to process and analyze data stored in multiple cloud
          platforms, including AWS and Google Cloud. How would you design your
          pipeline to handle this multi-cloud scenario?
        </h2>
        <span className="block">Select the correct option(s)</span>
        <div className="space-y-4">
          <Option value="Cloud Vision Api" />
          <Option value="Natural Language Api" />
          <Option value="Cloud Speech to Text Api" />
          <Option value="Transition Api" />
        </div>
        <div className="flex justify-between">
          <Button
            className="mb-4 rounded-full bg-green-600 px-10 py-6 text-base"
            asChild
          >
            <Link href={`#`}>Show Answer</Link>
          </Button>

          <div className="space-x-4">
            <Button
              className="mb-4 rounded-full bg-base px-10 py-6 text-base"
              asChild
            >
              <Link href={`#`}>Next Question</Link>
            </Button>

            <Button
              className="mb-4 rounded-full bg-base px-10 py-6 text-base"
              asChild
            >
              <Link href={`#`}>Previous Question</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
