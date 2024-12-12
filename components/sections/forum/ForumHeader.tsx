import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search } from "lucide-react";

export default function ForumHeader() {
  return (
    <div className="text-primary-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <h1 className="text-3xl font-bold">Exam Prep Forum</h1>
          <div className="flex w-full space-x-2 md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search questions..." className="pl-8" />
            </div>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Ask Question
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
