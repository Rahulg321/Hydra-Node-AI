import { Trophy } from "lucide-react";

export default function LeaderboardHero() {
  return (
    <div className="text-primary-foreground py-12 text-center">
      <Trophy className="mb-4 inline-block h-16 w-16" />
      <h1 className="mb-2 text-4xl font-bold">Exam Leaderboards</h1>
      <p className="text-xl">Compete, Excel, and Rise to the Top!</p>
    </div>
  );
}
