import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Trophy, Star, Gift } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: number;
}

interface QuizProps {
  onQuizComplete?: (score: number, earnedXP: number) => void;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: "1",
    question: "What does it mean to 'save money'?",
    options: [
      "Spending all your money right away",
      "Keeping money to use later",
      "Giving money to friends",
      "Losing your money"
    ],
    correctAnswer: 1,
    explanation: "Saving money means keeping it safe to use for something important later!",
    points: 10
  },
  {
    id: "2", 
    question: "Which is the best way to keep your money safe?",
    options: [
      "Under your pillow",
      "In your pocket",
      "In a bank or savings account",
      "Give it to strangers"
    ],
    correctAnswer: 2,
    explanation: "Banks keep your money safe and can even help it grow!",
    points: 15
  },
  {
    id: "3",
    question: "If you want to buy a toy that costs $20 and you have $5, what should you do?",
    options: [
      "Take money from someone else",
      "Save money until you have enough",
      "Forget about the toy",
      "Ask for a loan"
    ],
    correctAnswer: 1,
    explanation: "Saving money to reach your goals is a smart choice!",
    points: 20
  },
  {
    id: "4",
    question: "What is a 'goal' when it comes to money?",
    options: [
      "Something you want to buy or save for",
      "A type of bank",
      "A way to lose money",
      "Something only adults can have"
    ],
    correctAnswer: 0,
    explanation: "Having money goals helps you make smart decisions about saving and spending!",
    points: 15
  },
  {
    id: "5",
    question: "Why is it good to learn about money when you're young?",
    options: [
      "It's not important for kids",
      "It helps you make smart choices",
      "Only adults need to know about money",
      "Money is too hard to understand"
    ],
    correctAnswer: 1,
    explanation: "Learning about money early helps you become really good at making smart choices!",
    points: 25
  }
];

export function Quiz({ onQuizComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(quizQuestions.length).fill(null));
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { toast } = useToast();

  const currentQ = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);

    if (selectedAnswer === currentQ.correctAnswer) {
      setScore(score + currentQ.points);
    }

    setShowResult(true);
  };

  const handleContinue = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Quiz completed
      const totalEarnedXP = score;
      setQuizCompleted(true);
      onQuizComplete?.(score, totalEarnedXP);
      
      toast({
        title: "🎉 Quiz Complete!",
        description: `You earned ${totalEarnedXP} XP! Great job learning about money!`,
      });
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers(new Array(quizQuestions.length).fill(null));
    setQuizCompleted(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.reduce((sum, q) => sum + q.points, 0)) * 100;
    if (percentage >= 90) return "🌟 Amazing! You're a money expert!";
    if (percentage >= 70) return "🎉 Great job! You know a lot about money!";
    if (percentage >= 50) return "👍 Good work! Keep learning!";
    return "💪 Nice try! Practice makes perfect!";
  };

  if (quizCompleted) {
    return (
      <div className="space-y-6">
        <Card className="bg-gradient-success text-white shadow-glow border-0">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Trophy className="h-16 w-16 text-yellow-300" />
            </div>
            <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="text-4xl font-bold">{score} XP</div>
            <div className="text-lg">{getScoreMessage()}</div>
            <div className="flex items-center justify-center gap-2">
              <Star className="h-5 w-5 text-yellow-300" />
              <span>You answered {answers.filter((answer, index) => answer === quizQuestions[index].correctAnswer).length} out of {quizQuestions.length} questions correctly!</span>
            </div>
            <Button 
              onClick={restartQuiz}
              variant="secondary"
              className="mt-4"
            >
              Take Quiz Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5" />
              Money Quiz
            </CardTitle>
            <Badge variant="secondary">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </Badge>
          </div>
          <Progress value={progress} className="h-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          {!showResult ? (
            <>
              <div className="text-lg font-medium">{currentQ.question}</div>
              <div className="grid gap-3">
                {currentQ.options.map((option, index) => (
                  <Button
                    key={index}
                    variant={selectedAnswer === index ? "default" : "outline"}
                    className="text-left justify-start h-auto p-4"
                    onClick={() => handleAnswerSelect(index)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Worth {currentQ.points} XP
                </div>
                <Button 
                  onClick={handleNext}
                  disabled={selectedAnswer === null}
                  className="ml-auto"
                >
                  Submit Answer
                </Button>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                {selectedAnswer === currentQ.correctAnswer ? (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-500" />
                )}
                <div className="text-lg font-medium">
                  {selectedAnswer === currentQ.correctAnswer ? "Correct!" : "Not quite right"}
                </div>
              </div>
              
              {selectedAnswer !== currentQ.correctAnswer && (
                <div className="text-sm text-muted-foreground">
                  The correct answer was: <strong>{currentQ.options[currentQ.correctAnswer]}</strong>
                </div>
              )}
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="text-sm">{currentQ.explanation}</div>
              </div>
              
              {selectedAnswer === currentQ.correctAnswer && (
                <div className="flex items-center gap-2 text-green-600">
                  <Star className="h-4 w-4" />
                  <span className="text-sm font-medium">+{currentQ.points} XP earned!</span>
                </div>
              )}
              
              <Button onClick={handleContinue} className="w-full">
                {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">Current Score</div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="font-bold">{score} XP</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}