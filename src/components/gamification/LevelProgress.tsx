import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Trophy } from "lucide-react";

interface LevelProgressProps {
  currentLevel: number;
  currentXP: number;
  xpToNextLevel: number;
  totalXP: number;
}

export function LevelProgress({ currentLevel, currentXP, xpToNextLevel, totalXP }: LevelProgressProps) {
  const progressPercentage = (currentXP / xpToNextLevel) * 100;
  
  return (
    <Card className="bg-gradient-warm text-white shadow-glow border-0">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Trophy className="h-6 w-6" />
            <div>
              <div className="text-lg font-bold">Level {currentLevel}</div>
              <div className="text-xs opacity-80">Super Saver</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold">{currentXP} XP</div>
            <div className="text-xs opacity-80">{xpToNextLevel - currentXP} to next level</div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Progress 
            value={progressPercentage} 
            className="h-3 bg-white/20"
          />
          <div className="flex justify-between text-xs opacity-80">
            <span>Level {currentLevel}</span>
            <span>Level {currentLevel + 1}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 mt-3 justify-center">
          <Star className="h-4 w-4 text-yellow-300" />
          <span className="text-sm font-medium">Total: {totalXP} XP earned!</span>
        </div>
      </CardContent>
    </Card>
  );
}