import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  PiggyBank, 
  Coins, 
  Target, 
  TrendingUp, 
  Gift, 
  Star,
  Home,
  History,
  Settings,
  LogOut,
  DollarSign,
  Plus
} from "lucide-react";

interface DashboardProps {
  onLogout: () => void;
}

const mockTransactions = [
  { id: 1, type: "deposit", amount: 10, description: "Weekly allowance", date: "Today" },
  { id: 2, type: "withdrawal", amount: 5, description: "Ice cream treat", date: "Yesterday" },
  { id: 3, type: "deposit", amount: 15, description: "Helped with chores", date: "2 days ago" },
  { id: 4, type: "deposit", amount: 8, description: "Birthday money", date: "1 week ago" },
];

const savingsGoals = [
  { id: 1, title: "New Bike", target: 200, current: 87, emoji: "🚲" },
  { id: 2, title: "Video Game", target: 60, current: 45, emoji: "🎮" },
  { id: 3, title: "Art Supplies", target: 30, current: 28, emoji: "🎨" },
];

export default function Dashboard({ onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState("home");
  const totalBalance = 145.50;
  const totalSavings = mockTransactions
    .filter(t => t.type === "deposit")
    .reduce((sum, t) => sum + t.amount, 0);

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="space-y-6">
            {/* Balance Card */}
            <Card className="bg-gradient-fun text-white shadow-glow border-0">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardDescription className="text-white/80 text-sm">
                      Your Total Balance
                    </CardDescription>
                    <CardTitle className="text-3xl font-bold">
                      ${totalBalance.toFixed(2)}
                    </CardTitle>
                  </div>
                  <div className="animate-bounce-slow">
                    <PiggyBank className="h-12 w-12 text-white/90" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold">${totalSavings}</div>
                    <div className="text-xs text-white/80">Earned This Month</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold">⭐ {Math.floor(totalBalance / 10)}</div>
                    <div className="text-xs text-white/80">Star Points</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <Button variant="success" size="lg" className="h-20 flex-col space-y-1">
                <Plus className="h-6 w-6" />
                <span className="text-sm font-medium">Add Money</span>
              </Button>
              <Button variant="playful" size="lg" className="h-20 flex-col space-y-1">
                <Gift className="h-6 w-6" />
                <span className="text-sm font-medium">Rewards</span>
              </Button>
            </div>

            {/* Savings Goals */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Target className="h-5 w-5" />
                  Savings Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {savingsGoals.map((goal) => (
                  <div key={goal.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{goal.emoji}</span>
                        <span className="font-medium">{goal.title}</span>
                      </div>
                      <Badge variant="secondary">
                        ${goal.current}/${goal.target}
                      </Badge>
                    </div>
                    <Progress 
                      value={(goal.current / goal.target) * 100} 
                      className="h-2"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        );

      case "transactions":
        return (
          <div className="space-y-4">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <History className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${
                        transaction.type === "deposit" 
                          ? "bg-success/20 text-success" 
                          : "bg-accent/20 text-accent"
                      }`}>
                        {transaction.type === "deposit" ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <DollarSign className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{transaction.description}</div>
                        <div className="text-sm text-muted-foreground">{transaction.date}</div>
                      </div>
                    </div>
                    <div className={`font-bold ${
                      transaction.type === "deposit" ? "text-success" : "text-accent"
                    }`}>
                      {transaction.type === "deposit" ? "+" : "-"}${transaction.amount}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        );

      default:
        return (
          <Card className="shadow-card">
            <CardContent className="flex items-center justify-center h-40">
              <div className="text-center text-muted-foreground">
                <Settings className="h-12 w-12 mx-auto mb-2" />
                <p>Coming soon! 🚧</p>
              </div>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-primary/10 sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-fun rounded-full flex items-center justify-center">
              <PiggyBank className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-primary">KidBank</h1>
              <p className="text-xs text-muted-foreground">Welcome back! 👋</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 pb-20">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-primary/10">
        <div className="grid grid-cols-4 gap-1 p-2">
          {[
            { id: "home", icon: Home, label: "Home" },
            { id: "transactions", icon: History, label: "Activity" },
            { id: "goals", icon: Target, label: "Goals" },
            { id: "settings", icon: Settings, label: "Settings" },
          ].map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              size="sm"
              className={`h-14 flex-col space-y-1 ${
                activeTab === item.id ? "bg-primary/10 text-primary" : ""
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </Button>
          ))}
        </div>
      </nav>
    </div>
  );
}