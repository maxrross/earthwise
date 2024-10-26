"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { GamepadIcon, Brain, Zap, Award, Star } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export default function GamesPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: "What's in the middle of a hurricane? 🌪️",
      options: [
        "The strongest winds ever!",
        "A super calm spot called the eye",
        "A bunch of rain clouds",
        "Lightning and thunder",
      ],
      correctAnswer: 1,
    },
    {
      id: 2,
      question: "Which is NOT a good way to stay safe? 🤔",
      options: [
        "Pack an emergency kit",
        "Ignore weather warnings",
        "Make a family plan",
        "Know where to go",
      ],
      correctAnswer: 1,
    },
    {
      id: 3,
      question: "What makes big waves called tsunamis? 🌊",
      options: [
        "Lots of rain",
        "Super strong wind",
        "Earthquakes under the ocean",
        "Really hot weather",
      ],
      correctAnswer: 2,
    },
  ];

  const handleAnswer = (selectedAnswer: number) => {
    const correct = selectedAnswer === questions[currentQuestion].correctAnswer;
    
    if (correct) {
      setScore(score + 1);
      toast({
        title: "AWESOME! 🌟",
        description: "You're super smart! Keep going!",
      });
    } else {
      toast({
        title: "Oops! Not quite right 🤔",
        description: "Don't worry, you'll get it next time!",
        variant: "destructive",
      });
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const restartGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setGameStarted(true);
  };

  const games = [
    {
      title: "Weather Whiz Quiz",
      description: "Show off how much you know about weather!",
      icon: Brain,
      color: "bg-purple-100 dark:bg-purple-900",
      action: () => setGameStarted(true),
    },
    {
      title: "Safety Match Game",
      description: "Match the right safety gear with each weather type!",
      icon: Zap,
      color: "bg-yellow-100 dark:bg-yellow-900",
      comingSoon: true,
    },
    {
      title: "Weather Detective",
      description: "Can you spot different weather patterns?",
      icon: GamepadIcon,
      color: "bg-blue-100 dark:bg-blue-900",
      comingSoon: true,
    },
  ];

  if (gameStarted) {
    if (showResult) {
      return (
        <div className="container py-8 max-w-2xl mx-auto">
          <Card className="text-center border-4 border-primary/20">
            <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-t-lg">
              <CardTitle className="flex items-center justify-center gap-2 text-3xl">
                <Award className="h-8 w-8" />
                You Did It! 🎉
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              <h2 className="text-3xl font-bold">
                You got {score} out of {questions.length} stars! ⭐
              </h2>
              <Progress 
                value={(score / questions.length) * 100} 
                className="h-4 rounded-full"
              />
              <p className="text-xl">
                {score === questions.length
                  ? "WOW! You're a weather genius! 🌟"
                  : "Great job! Keep learning about weather! 📚"}
              </p>
              <Button 
                onClick={restartGame}
                className="text-lg px-8 py-6 rounded-full animate-bounce"
              >
                Play Again! 🎮
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    return (
      <div className="container py-8 max-w-2xl mx-auto">
        <Card className="border-4 border-primary/20">
          <CardHeader className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-t-lg">
            <CardTitle className="text-2xl">
              Question {currentQuestion + 1} of {questions.length}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-8">
            <Progress
              value={((currentQuestion + 1) / questions.length) * 100}
              className="h-4 rounded-full"
            />
            <h2 className="text-2xl font-semibold">
              {questions[currentQuestion].question}
            </h2>
            <div className="grid gap-4">
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full text-left h-auto p-6 text-lg rounded-xl hover:scale-105 transition-transform"
                  onClick={() => handleAnswer(index)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 rainbow-text">Fun Game Zone!</h1>
        <p className="text-2xl text-muted-foreground">
          Ready to play some super fun games? Let's go! 🎮
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {games.map((game, index) => (
          <Card key={index} className={`card-hover border-4 border-primary/20 ${game.color}`}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <game.icon className="h-8 w-8 animate-bounce" />
                <CardTitle className="text-2xl">{game.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg">{game.description}</p>
              <Button
                className="w-full text-lg py-6 rounded-full"
                onClick={game.action}
                disabled={game.comingSoon}
              >
                {game.comingSoon ? "Coming Soon! 🚧" : "Play Now! 🎮"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}