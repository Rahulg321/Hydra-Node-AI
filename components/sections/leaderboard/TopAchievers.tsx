import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Brain, Zap } from "lucide-react";

const achievers = [
  { name: "Alice Johnson", achievement: "Highest Score", icon: Award },
  { name: "Bob Smith", achievement: "Most Improved", icon: Zap },
  { name: "Charlie Brown", achievement: "Most Exams Taken", icon: Brain },
];

export default function TopAchievers() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Achievers</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {achievers.map(({ name, achievement, icon: Icon }) => (
            <li key={name} className="flex items-center space-x-3">
              <Icon className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">{name}</p>
                <Badge variant="secondary">{achievement}</Badge>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
