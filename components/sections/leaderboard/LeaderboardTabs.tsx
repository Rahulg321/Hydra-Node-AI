"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Book,
  Calculator,
  FlaskRoundIcon as Flask,
  Globe,
  Languages,
} from "lucide-react";

const categories = [
  { name: "Overall", icon: Globe },
  { name: "Math", icon: Calculator },
  { name: "Science", icon: Flask },
  { name: "History", icon: Book },
  { name: "Language", icon: Languages },
];

export default function LeaderboardTabs() {
  const [activeTab, setActiveTab] = useState("Overall");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
      <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
        {categories.map(({ name, icon: Icon }) => (
          <TabsTrigger
            key={name}
            value={name}
            className="flex items-center space-x-2"
          >
            <Icon className="h-4 w-4" />
            <span>{name}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
