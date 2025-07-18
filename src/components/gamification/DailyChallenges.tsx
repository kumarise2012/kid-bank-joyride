import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Star } from "lucide-react";

interface Challenge {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  xpReward: number;
  completed: boolean;
  icon: string;
}

interface DailyChallengesProps {
  challenges: Challenge[];
}

export function DailyChallenges({ challenges }: DailyChallengesProps) {
  const completedCount = challenges.filter(c => c.completed).length;
  
  return (
    <Card className="shadow-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-primary">
            <Clock className="h-5 w-5" />
            Daily Challenges
          </CardTitle>
          <Badge variant="secondary">
            {completedCount}/{challenges.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {challenges.map((challenge) => (
          <div key={challenge.id} className={`p-3 rounded-lg border-2 transition-all ${
            challenge.completed 
              ? "bg-success/10 border-success/30" 
              : "bg-muted/30 border-muted"
          }`}>
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{challenge.icon}</span>
                <div>
                  <div className="font-medium flex items-center gap-2">
                    {challenge.title}
                    {challenge.completed && (
                      <CheckCircle className="h-4 w-4 text-success" />
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {challenge.description}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-warning">
                  <Star className="h-3 w-3" />
                  <span className="text-xs font-medium">{challenge.xpReward} XP</span>
                </div>
              </div>
            </div>
            
            {!challenge.completed && (
              <div className="space-y-1">
                <Progress 
                  value={(challenge.progress / challenge.target) * 100} 
                  className="h-2"
                />
                <div className="text-xs text-muted-foreground text-right">
                  {challenge.progress}/{challenge.target}
                </div>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}