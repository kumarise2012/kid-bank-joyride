import { Card, CardContent } from "@/components/ui/card";
import { Flame, Calendar } from "lucide-react";

interface StreakCounterProps {
  currentStreak: number;
  bestStreak: number;
  lastActivity?: string;
}

export function StreakCounter({ currentStreak, bestStreak, lastActivity }: StreakCounterProps) {
  return (
    <Card className="bg-gradient-success text-white shadow-glow border-0">
      <CardContent className="p-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Flame className="h-6 w-6 text-orange-300" />
          <span className="text-2xl font-bold">{currentStreak}</span>
        </div>
        <div className="text-sm font-medium mb-1">Day Streak!</div>
        <div className="text-xs opacity-80 flex items-center justify-center gap-1">
          <Calendar className="h-3 w-3" />
          Best: {bestStreak} days
        </div>
        {lastActivity && (
          <div className="text-xs opacity-60 mt-1">
            Last: {lastActivity}
          </div>
        )}
      </CardContent>
    </Card>
  );
}