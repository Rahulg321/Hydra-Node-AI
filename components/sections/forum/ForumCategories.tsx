import { Button } from "@/components/ui/button";

const categories = [
  "All Topics",
  "Math",
  "Science",
  "History",
  "Language",
  "Test Strategies",
];

export default function ForumCategories() {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Button key={category} variant="outline" size="sm">
          {category}
        </Button>
      ))}
    </div>
  );
}
