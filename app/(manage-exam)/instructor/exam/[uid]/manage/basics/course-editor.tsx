"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

export default function CourseEditor() {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    language: "English (US)",
    level: "",
    category: "Business",
    subcategory: "",
    primaryTopic: "",
  });

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold">Course landing page</h1>
        <p className="mt-2 text-muted-foreground">
          Your course landing page is crucial to your success. If it's done
          right, it can also help you gain visibility in search engines like
          Google. As you complete this section, think about creating a
          compelling Course Landing Page that demonstrates why someone would
          want to enroll in your course.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <Label htmlFor="title">Course title</Label>
          <div className="relative">
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              maxLength={38}
              placeholder="Learn Machine Learning"
            />
            <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">
              {formData.title.length}/38
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Your title should be a mix of attention-grabbing, informative, and
            optimized for search
          </p>
        </div>

        <div className="space-y-4">
          <Label htmlFor="subtitle">Course subtitle</Label>
          <div className="relative">
            <Input
              id="subtitle"
              value={formData.subtitle}
              onChange={(e) =>
                setFormData({ ...formData, subtitle: e.target.value })
              }
              maxLength={120}
              placeholder="Insert your course subtitle"
            />
            <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">
              {formData.subtitle.length}/120
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Use 1-2 related keywords, and mention 3-4 of the most important
            areas that you've covered during your course.
          </p>
        </div>

        <div className="space-y-4">
          <Label htmlFor="description">Course description</Label>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Basic info</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <Label>Language</Label>
              <Select
                value={formData.language}
                onValueChange={(value) =>
                  setFormData({ ...formData, language: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English (US)">English (US)</SelectItem>
                  <SelectItem value="Spanish">Spanish</SelectItem>
                  <SelectItem value="French">French</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Level</Label>
              <Select
                value={formData.level}
                onValueChange={(value) =>
                  setFormData({ ...formData, level: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Subcategory</Label>
              <Select
                value={formData.subcategory}
                onValueChange={(value) =>
                  setFormData({ ...formData, subcategory: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select subcategory" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="entrepreneurship">
                    Entrepreneurship
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="primary-topic">
              What is primarily taught in your course?
            </Label>
            <InfoIcon className="h-4 w-4 text-muted-foreground" />
          </div>
          <Input
            id="primary-topic"
            value={formData.primaryTopic}
            onChange={(e) =>
              setFormData({ ...formData, primaryTopic: e.target.value })
            }
            placeholder="e.g. Landscape Photography"
          />
        </div>

        <div className="space-y-4">
          <Label>Course image</Label>
        </div>

        <div className="space-y-4">
          <Label>Promotional video</Label>

          <p className="text-sm text-muted-foreground">
            Your promo video is a quick and compelling way for students to
            preview what they'll learn in your course. Students considering your
            course are more likely to enroll if your promo video is well-made.
          </p>
        </div>

        <Alert>
          <InfoIcon className="h-4 w-4" />
          <AlertDescription>
            All visible instructors of this course must complete their profile
            before the course can be published. This includes name, image, and a
            short summary of your background 50 words minimum.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
