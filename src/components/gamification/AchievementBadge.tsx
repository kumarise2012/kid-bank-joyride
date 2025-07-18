import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

interface AchievementBadgeProps {
  achievement: Achievement;
  size?: "sm" | "md" | "lg";
}

export function AchievementBadge({ achievement, size = "md" }: AchievementBadgeProps) {
  const sizeClasses = {
    sm: "w-16 h-16 text-xs",
    md: "w-20 h-20 text-sm", 
    lg: "w-24 h-24 text-base"
  };

  const iconSizes = {
    sm: "text-2xl",
    md: "text-3xl",
    lg: "text-4xl"
  };

  return (
    <div className="relative">
      <Card className={`${sizeClasses[size]} flex flex-col items-center justify-center p-2 ${
        achievement.unlocked 
          ? "bg-gradient-fun text-white shadow-glow border-0" 
          : "bg-muted/50 text-muted-foreground"
      } transition-all duration-300 ${achievement.unlocked ? "animate-pulse-fun" : ""}`}>
        <div className={iconSizes[size]}>{achievement.icon}</div>
        {size !== "sm" && (
          <div className="text-center mt-1">
            <div className="font-bold leading-tight">{achievement.title}</div>
            {size === "lg" && (
              <div className="text-xs opacity-80 leading-tight">{achievement.description}</div>
            )}
          </div>
        )}
      </Card>
      
      {achievement.unlocked && achievement.unlockedAt && (
        <Badge 
          variant="secondary" 
          className="absolute -top-2 -right-2 text-xs bg-success text-success-foreground"
        >
          New!
        </Badge>
      )}
    </div>
  );
}