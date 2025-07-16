import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PiggyBank, Star, Shield } from "lucide-react";
import piggyBankHero from "@/assets/piggy-bank-hero.png";

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple demo login - in real app would validate credentials
    if (username.trim() && password.trim()) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="flex justify-center animate-bounce-slow">
            <img 
              src={piggyBankHero} 
              alt="Piggy Bank" 
              className="w-32 h-32 object-contain"
            />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-fun bg-clip-text text-transparent">
              KidBank
            </h1>
            <p className="text-muted-foreground text-lg">
              Your awesome money adventure starts here! 🌟
            </p>
          </div>
        </div>

        {/* Login Card */}
        <Card className="shadow-card border-2 border-primary/20 bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl text-primary">Welcome Back!</CardTitle>
            <CardDescription className="text-base">
              Ready to check your savings? 🏦
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-base font-medium">
                  Your Name
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your awesome name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-12 text-base border-2 border-primary/30 focus:border-primary bg-background/80"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-base font-medium">
                  Secret Code
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Your super secret code"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 text-base border-2 border-primary/30 focus:border-primary bg-background/80"
                  required
                />
              </div>
              <Button
                type="submit"
                variant="fun"
                size="lg"
                className="w-full font-semibold text-lg"
              >
                <PiggyBank className="mr-2 h-5 w-5" />
                Let's Go Banking! 🚀
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-2">
            <div className="flex justify-center">
              <div className="p-3 rounded-full bg-success/20">
                <Star className="h-6 w-6 text-success" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground font-medium">
              Fun Rewards
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-center">
              <div className="p-3 rounded-full bg-secondary/20">
                <PiggyBank className="h-6 w-6 text-secondary" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground font-medium">
              Smart Saving
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-center">
              <div className="p-3 rounded-full bg-accent/20">
                <Shield className="h-6 w-6 text-accent" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground font-medium">
              Super Safe
            </p>
          </div>
        </div>

        {/* Demo Note */}
        <div className="text-center p-4 bg-warning/10 rounded-lg border border-warning/30">
          <p className="text-sm text-warning-foreground">
            <strong>Demo Mode:</strong> Use any name and password to login! 🎮
          </p>
        </div>
      </div>
    </div>
  );
}