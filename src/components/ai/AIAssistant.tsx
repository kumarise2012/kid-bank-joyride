import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  Send, 
  Lightbulb, 
  Target,
  TrendingUp,
  Sparkles,
  MessageCircle
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  isAI: boolean;
  timestamp: Date;
  suggestions?: string[];
}

interface AIAssistantProps {
  balance: number;
  goals: Array<{ title: string; target: number; current: number; emoji: string }>;
  transactions: Array<{ type: string; amount: number; description: string }>;
}

const smartSuggestions = [
  "How can I save faster?",
  "What should I buy first?",
  "Explain compound interest",
  "Why is saving important?",
];

const getAIResponse = (question: string, balance: number, goals: any[], transactions: any[]): Message => {
  const lowerQuestion = question.toLowerCase();
  
  // Smart responses based on user data
  if (lowerQuestion.includes("save faster") || lowerQuestion.includes("save more")) {
    const weeklyEarnings = transactions
      .filter(t => t.type === "deposit")
      .reduce((sum, t) => sum + t.amount, 0) / 4; // approximate weekly
    
    return {
      id: Date.now().toString(),
      text: `Great question! 💡 Based on your activity, you earn about $${weeklyEarnings.toFixed(0)} per week. Here are some tips to save faster:\n\n• Set up automatic savings - even $2 per week adds up!\n• Look for extra chores around the house\n• Save birthday and holiday money\n• Use the 50/30/20 rule: Save 50%, spend 30%, give 20%`,
      isAI: true,
      timestamp: new Date(),
      suggestions: ["Tell me about the 50/30/20 rule", "What are good saving habits?"]
    };
  }
  
  if (lowerQuestion.includes("buy first") || lowerQuestion.includes("which goal")) {
    const closestGoal = goals.reduce((closest, goal) => {
      const progress = goal.current / goal.target;
      const closestProgress = closest.current / closest.target;
      return progress > closestProgress ? goal : closest;
    }, goals[0]);
    
    return {
      id: Date.now().toString(),
      text: `Looking at your goals, I recommend focusing on your ${closestGoal.emoji} ${closestGoal.title}! You're ${((closestGoal.current / closestGoal.target) * 100).toFixed(0)}% there. You only need $${(closestGoal.target - closestGoal.current).toFixed(0)} more! 🎯`,
      isAI: true,
      timestamp: new Date(),
      suggestions: ["How long until I reach this goal?", "Should I save for multiple goals?"]
    };
  }
  
  if (lowerQuestion.includes("compound interest") || lowerQuestion.includes("interest")) {
    return {
      id: Date.now().toString(),
      text: `Compound interest is like magic money! ✨ It's when your savings earn money, and then that earned money earns money too!\n\nImagine planting a money tree 🌱:\n• You plant $10 (your savings)\n• It grows to $11 (earned $1 interest)\n• Next year, the $11 grows to $12.10\n• The extra 10¢ came from your earned $1!\n\nThe earlier you start, the bigger your money tree grows! 🌳💰`,
      isAI: true,
      timestamp: new Date(),
      suggestions: ["Show me a compound interest example", "How do banks pay interest?"]
    };
  }
  
  if (lowerQuestion.includes("why save") || lowerQuestion.includes("saving important")) {
    return {
      id: Date.now().toString(),
      text: `Saving is like having superpowers! 🦸‍♀️ Here's why it's awesome:\n\n🎯 **Freedom**: Buy what you really want without asking\n🛡️ **Safety**: Have money for emergencies\n📈 **Growth**: Your money can make more money\n🎉 **Achievement**: Feel proud when you reach your goals\n⏰ **Time**: The sooner you start, the easier it gets\n\nPlus, saving teaches you patience and smart decision-making! 🧠💪`,
      isAI: true,
      timestamp: new Date(),
      suggestions: ["How much should kids save?", "What's an emergency fund?"]
    };
  }
  
  if (lowerQuestion.includes("rule") && lowerQuestion.includes("50")) {
    return {
      id: Date.now().toString(),
      text: `The 50/30/20 rule is a simple way to manage your money! 📊\n\nFor every $10 you get:\n• $5 (50%) → SAVE for goals 💰\n• $3 (30%) → SPEND on fun stuff 🎮\n• $2 (20%) → GIVE to help others 💝\n\nThis helps you save lots, enjoy some treats, and be generous! Try it with your next allowance! 🌟`,
      isAI: true,
      timestamp: new Date(),
      suggestions: ["What if I want to spend more?", "Ideas for giving money?"]
    };
  }
  
  // Default responses for other questions
  const defaultResponses = [
    {
      text: "That's a great question! 🤔 Money management is all about making smart choices. Keep asking questions - learning about money is one of the best investments you can make! 💡",
      suggestions: ["What's the best age to start saving?", "How do I resist spending temptations?"]
    },
    {
      text: "I love your curiosity about money! 🌟 Remember, every small step you take now builds good habits for the future. You're already doing amazing by asking questions! 🎉",
      suggestions: ["What are some kid-friendly investments?", "How do successful people manage money?"]
    },
    {
      text: "Smart thinking! 🧠 Financial literacy is a superpower that will help you throughout your life. Keep exploring these concepts - you're building a strong foundation! 💪",
      suggestions: ["What should I know about credit?", "How does money work in other countries?"]
    }
  ];
  
  const randomResponse = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  
  return {
    id: Date.now().toString(),
    text: randomResponse.text,
    isAI: true,
    timestamp: new Date(),
    suggestions: randomResponse.suggestions
  };
};

export function AIAssistant({ balance, goals, transactions }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: `Hi there! 👋 I'm your AI money mentor! I can help you make smart financial decisions and answer questions about saving, spending, and reaching your goals. What would you like to know? 🤖💰`,
      isAI: true,
      timestamp: new Date(),
      suggestions: smartSuggestions
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isAI: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = getAIResponse(text, balance, goals, transactions);
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  return (
    <Card className="shadow-card h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-primary">
          <Bot className="h-5 w-5" />
          AI Money Mentor
        </CardTitle>
        <CardDescription>
          Your smart financial assistant 🤖✨
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col gap-4">
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
          {messages.map((message) => (
            <div key={message.id} className="space-y-2">
              <div className={`flex ${message.isAI ? "justify-start" : "justify-end"}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  message.isAI 
                    ? "bg-muted text-foreground" 
                    : "bg-primary text-primary-foreground"
                }`}>
                  {message.isAI && (
                    <div className="flex items-center gap-2 mb-2">
                      <Bot className="h-4 w-4" />
                      <span className="text-xs font-medium">AI Mentor</span>
                    </div>
                  )}
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                </div>
              </div>
              
              {/* AI Suggestions */}
              {message.isAI && message.suggestions && (
                <div className="flex flex-wrap gap-2 ml-4">
                  {message.suggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs h-7"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <Lightbulb className="h-3 w-3 mr-1" />
                      {suggestion}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted p-3 rounded-lg flex items-center gap-2">
                <Bot className="h-4 w-4 animate-pulse" />
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                  <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Smart Suggestions */}
        {messages.length === 1 && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-medium">💡 Try asking:</p>
            <div className="flex flex-wrap gap-2">
              {smartSuggestions.map((suggestion) => (
                <Badge 
                  key={suggestion}
                  variant="secondary" 
                  className="cursor-pointer hover:bg-primary/20 transition-colors"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <Sparkles className="h-3 w-3 mr-1" />
                  {suggestion}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {/* Input */}
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about money! 💰"
            disabled={isLoading}
            className="flex-1"
          />
          <Button 
            onClick={() => handleSendMessage(inputValue)}
            disabled={isLoading || !inputValue.trim()}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}