import ForumCategories from "@/components/sections/forum/ForumCategories";
import ForumHeader from "@/components/sections/forum/ForumHeader";
import PopularTags from "@/components/sections/forum/PopularTags";
import QuestionList from "@/components/sections/forum/QuestionsList";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Forum",
  description: "Ask questions and get your doubts cleared by the community.",
};

export default function ForumPage() {
  return (
    <div className="min-h-screen bg-background">
      <ForumHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="space-y-6 md:col-span-3">
            <ForumCategories />
            <QuestionList />
          </div>
          <div className="space-y-6">
            <PopularTags />
          </div>
        </div>
      </div>
    </div>
  );
}
