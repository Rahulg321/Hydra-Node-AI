import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";

const activities = [
  { name: "Diana Ross", action: "moved up", change: 2 },
  { name: "Ethan Hunt", action: "moved down", change: 1 },
  { name: "Fiona Apple", action: "joined the leaderboard", change: 0 },
];

export default function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activities.map(({ name, action, change }) => (
            <li key={name} className="flex items-center space-x-3">
              {change > 0 ? (
                <ArrowUp className="h-5 w-5 text-green-600" />
              ) : change < 0 ? (
                <ArrowDown className="h-5 w-5 text-red-600" />
              ) : (
                <div className="h-5 w-5 rounded-full bg-blue-500" />
              )}
              <p>
                <span className="font-medium">{name}</span> {action}
                {change !== 0 &&
                  ` by ${Math.abs(change)} ${change === 1 ? "position" : "positions"}`}
              </p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
