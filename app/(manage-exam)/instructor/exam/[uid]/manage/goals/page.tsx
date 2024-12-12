"use client";

import { Plus, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ExamGoals() {
  const [learningObjectives, setLearningObjectives] = useState<string[]>([
    "Master key concepts and theories required for the exam",
    "Develop problem-solving strategies for complex exam questions",
    "Practice time management techniques for exam completion",
    "Build confidence through mock exam exercises",
  ]);

  const addLearningObjective = () => {
    setLearningObjectives([...learningObjectives, ""]);
  };

  const updateLearningObjective = (index: number, value: string) => {
    const updated = [...learningObjectives];
    updated[index] = value;
    setLearningObjectives(updated);
  };

  const removeLearningObjective = (index: number) => {
    setLearningObjectives(learningObjectives.filter((_, i) => i !== index));
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Exam Goals and Requirements</CardTitle>
          <CardDescription>
            Define your exam preparation goals and requirements. This will help
            create a structured study plan tailored to your needs.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label className="text-base font-semibold">
                What are your learning objectives?
              </Label>
              <p className="mb-4 text-sm text-muted-foreground">
                List at least 4 key objectives you aim to achieve through your
                exam preparation.
              </p>
              <div className="space-y-3">
                {learningObjectives.map((objective, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={objective}
                      onChange={(e) =>
                        updateLearningObjective(index, e.target.value)
                      }
                      placeholder="Enter a learning objective"
                      className="flex-1"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeLearningObjective(index)}
                      className="shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                onClick={addLearningObjective}
                variant="outline"
                className="mt-3"
                disabled={learningObjectives.length >= 8}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add more objectives
              </Button>
            </div>

            <div className="space-y-2">
              <Label className="text-base font-semibold">
                What are your current knowledge prerequisites?
              </Label>
              <p className="mb-2 text-sm text-muted-foreground">
                List your current skill level and any relevant background
                knowledge you have for this exam.
              </p>
              <Textarea
                placeholder="Example: Basic understanding of mathematics, Familiarity with statistical concepts..."
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-base font-semibold">
                What is your target score or goal?
              </Label>
              <p className="mb-2 text-sm text-muted-foreground">
                Define your target score and any specific areas you want to
                excel in.
              </p>
              <Textarea
                placeholder="Example: Aiming for a score above 85%, with particular focus on theoretical concepts..."
                className="min-h-[100px]"
              />
            </div>
          </div>

          <Button className="w-full sm:w-auto">Save Goals</Button>
        </CardContent>
      </Card>
    </div>
  );
}
