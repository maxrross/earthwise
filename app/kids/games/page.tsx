"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { GamepadIcon, Brain, Zap, Award, Star, Cloud, Umbrella, ShieldAlert } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface MatchPair {
  weather: string;
  safety: string;
  image?: string;
}

interface GameCard {
  content: string;
  type: "weather" | "safety";
  matched: boolean;
}

interface DetectiveCase {
  id: number;
  description: string;
  clues: string[];
  correctPattern: string;
  options: string[];
}

export default function GamesPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentGame, setCurrentGame] = useState<string>("");
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [gameCards, setGameCards] = useState<GameCard[]>([]);


  // Quiz Questions
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

  

  // Safety Match Game Pairs
  const matchPairs: MatchPair[] = [
    { weather: "Hurricane 🌀", safety: "Board up windows" },
    { weather: "Tornado 🌪️", safety: "Go to basement" },
    { weather: "Lightning ⚡", safety: "Stay indoors" },
    { weather: "Flood 🌊", safety: "Move to higher ground" },
    { weather: "Blizzard ❄️", safety: "Stock up on supplies" },
    { weather: "Heat Wave 🌡️", safety: "Stay hydrated" },
  ];

  // Weather Detective Cases
  const detectiveCases: DetectiveCase[] = [
    {
      id: 1,
      description: "Strange clouds are forming! Can you identify what's coming?",
      clues: [
        "Dark, low-hanging clouds",
        "Greenish sky color",
        "Rotating cloud base",
      ],
      correctPattern: "Tornado Warning",
      options: ["Rainfall", "Tornado Warning", "Snow Storm", "Heat Wave"],
    },
    {
      id: 2,
      description: "The beach is acting weird! What's happening?",
      clues: [
        "Water suddenly pulls back",
        "Animals acting strange",
        "Ground shaking",
      ],
      correctPattern: "Tsunami Warning",
      options: ["High Tide", "Storm Surge", "Tsunami Warning", "Normal Waves"],
    },
    {
      id: 3,
      description: "Something's up with the winter weather!",
      clues: [
        "Heavy snowfall",
        "Strong winds",
        "Very low visibility",
      ],
      correctPattern: "Blizzard",
      options: ["Light Snow", "Blizzard", "Frost", "Winter Rain"],
    },
  ];

  const initializeMatchGame = () => {
    // Create separate arrays for weather and safety cards
    const weatherCards = matchPairs.map(pair => ({
      content: pair.weather,
      type: "weather" as const,
      matched: false,
      pairIndex: matchPairs.indexOf(pair)
    }));

    const safetyCards = matchPairs.map(pair => ({
      content: pair.safety,
      type: "safety" as const,
      matched: false,
      pairIndex: matchPairs.indexOf(pair)
    }));

    // Shuffle each array separately
    const shuffledWeather = [...weatherCards].sort(() => Math.random() - 0.5);
    const shuffledSafety = [...safetyCards].sort(() => Math.random() - 0.5);

    setGameCards([...shuffledWeather, ...shuffledSafety]);
    setMatchedPairs([]);
    setSelectedCard(null);
    setScore(0);
  };

  const handleMatchCard = (index: number) => {
    if (gameCards[index].matched) return;
    if (selectedCard === index) return;

    if (selectedCard === null) {
      // First card selected
      setSelectedCard(index);
    } else {
      // Second card selected - check for match
      const firstCard = gameCards[selectedCard];
      const secondCard = gameCards[index];
      
      if (
        ((firstCard.type === "weather" && secondCard.type === "safety") ||
         (firstCard.type === "safety" && secondCard.type === "weather")) &&
        matchPairs.some(
          pair =>
            (pair.weather === firstCard.content && pair.safety === secondCard.content) ||
            (pair.weather === secondCard.content && pair.safety === firstCard.content)
        )
      ) {
        // Successful match
        const updatedCards = [...gameCards];
        updatedCards[selectedCard].matched = true;
        updatedCards[index].matched = true;
        setGameCards(updatedCards);
        setScore(score + 1);
        toast({
          title: "Perfect Match! 🎯",
          description: "You're getting better at this!",
        });

        // Check if game is complete
        if (score + 1 === matchPairs.length) {
          setShowResult(true);
        }
      } else {
        // No match
        toast({
          title: "Not quite! 🤔",
          description: "Try again!",
          variant: "destructive",
        });
      }
      
      setSelectedCard(null);
    }
  };

  const handleDetectiveCase = (selectedPattern: string, correctPattern: string) => {
    const correct = selectedPattern === correctPattern;
    
    if (correct) {
      setScore(score + 1);
      toast({
        title: "Great Detective Work! 🔍",
        description: "You solved the case!",
      });
    } else {
      toast({
        title: "Mystery Continues! 🤔",
        description: "Review the clues and try again!",
        variant: "destructive",
      });
    }

    if (currentQuestion + 1 < detectiveCases.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

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

  const startGame = (gameType: string) => {
    setGameStarted(true);
    setCurrentGame(gameType);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    if (gameType === "match") {
      initializeMatchGame();
    }
  };

  const restartGame = () => {
    startGame(currentGame);
  };

  const games = [
    {
      title: "Weather Whiz Quiz",
      description: "Show off how much you know about weather!",
      icon: Brain,
      color: "bg-purple-100 dark:bg-purple-900",
      action: () => startGame("quiz"),
    },
    {
      title: "Safety Match Game",
      description: "Match the right safety gear with each weather type!",
      icon: Zap,
      color: "bg-yellow-100 dark:bg-yellow-900",
      action: () => startGame("match"),
    },
    {
      title: "Weather Detective",
      description: "Can you spot different weather patterns?",
      icon: GamepadIcon,
      color: "bg-blue-100 dark:bg-blue-900",
      action: () => startGame("detective"),
    },
    {
      title: "Climate Explorer",
      description: "Travel the world and learn about different climates!",
      icon: Cloud,
      color: "bg-green-100 dark:bg-green-900",
      comingSoon: true,
    },
    {
      title: "Weather Hero",
      description: "Save the day by preparing for extreme weather!",
      icon: ShieldAlert,
      color: "bg-red-100 dark:bg-red-900",
      comingSoon: true,
    },
    {
      title: "Season Simulator",
      description: "Create your own weather and watch what happens!",
      icon: Umbrella,
      color: "bg-orange-100 dark:bg-orange-900",
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
                You got {score} out of {currentGame === "quiz" ? questions.length : 
                          currentGame === "match" ? matchPairs.length :
                          detectiveCases.length} stars! ⭐
              </h2>
              <Progress 
                value={(score / (currentGame === "quiz" ? questions.length : 
                               currentGame === "match" ? matchPairs.length :
                               detectiveCases.length)) * 100} 
                className="h-4 rounded-full"
              />
              <p className="text-xl">
                {score === (currentGame === "quiz" ? questions.length : 
                          currentGame === "match" ? matchPairs.length :
                          detectiveCases.length)
                  ? "WOW! You're a weather genius! 🌟"
                  : "Great job! Keep learning about weather! 📚"}
              </p>
              <div className="space-x-4">
                <Button 
                  onClick={restartGame}
                  className="text-lg px-8 py-6 rounded-full animate-bounce"
                >
                  Play Again! 🎮
                </Button>
                <Button 
                  onClick={() => {
                    setGameStarted(false);
                    setCurrentGame("");
                  }}
                  variant="outline"
                  className="text-lg px-8 py-6 rounded-full"
                >
                  Choose Another Game 🎯
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    if (currentGame === "quiz") {
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
    if (currentGame === "match") {
      // Split the cards into weather and safety
      const weatherCards = gameCards.filter(card => card.type === "weather");
      const safetyCards = gameCards.filter(card => card.type === "safety");
  
      return (
        <div className="container py-8 max-w-4xl mx-auto">
          <Card className="border-4 border-primary/20">
            <CardHeader className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-900 rounded-t-lg">
              <CardTitle className="text-2xl text-center">
                Match Weather Events with Safety Actions!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              <Progress
                value={(score / matchPairs.length) * 100}
                className="h-4 rounded-full"
              />
              <div className="grid grid-cols-2 gap-8">
                {/* Weather situations column */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-center mb-4">Weather Events</h3>
                  {weatherCards.map((card, index) => (
                    <Button
                      key={`weather-${index}`}
                      variant="outline"
                      className={`w-full h-auto p-6 text-lg rounded-xl transition-transform 
                        ${card.matched ? "bg-green-100 dark:bg-green-900" : 
                          selectedCard === gameCards.indexOf(card) ? "bg-blue-100 dark:bg-blue-900" : ""}`}
                      onClick={() => handleMatchCard(gameCards.indexOf(card))}
                      disabled={card.matched}
                    >
                      {card.content}
                    </Button>
                  ))}
                </div>
  
                {/* Safety actions column */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-center mb-4">Safety Actions</h3>
                  {safetyCards.map((card, index) => (
                    <Button
                      key={`safety-${index}`}
                      variant="outline"
                      className={`w-full h-auto p-6 text-lg rounded-xl transition-transform 
                        ${card.matched ? "bg-green-100 dark:bg-green-900" : 
                          selectedCard === gameCards.indexOf(card) ? "bg-blue-100 dark:bg-blue-900" : ""}`}
                      onClick={() => handleMatchCard(gameCards.indexOf(card))}
                      disabled={card.matched}
                    >
                      {card.content}
                    </Button>
                  ))}
                </div>
              </div>
  
              {/* Optional: Add instructions */}
              <div className="mt-6 text-center text-muted-foreground">
                <p>Click a weather event, then click its matching safety action!</p>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }
  

    if (currentGame === "detective") {
      return (
        <div className="container py-8 max-w-2xl mx-auto">
          <Card className="border-4 border-primary/20">
            <CardHeader className="bg-gradient-to-r from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900 rounded-t-lg">
              <CardTitle className="text-2xl">
                Case #{currentQuestion + 1}: Weather Mystery
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              <Progress
                value={((currentQuestion + 1) / detectiveCases.length) * 100}
                className="h-4 rounded-full"
              />
              <h2 className="text-2xl font-semibold">
                {detectiveCases[currentQuestion].description}
              </h2>
              <div className="bg-secondary/20 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">🔍 Clues:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  {detectiveCases[currentQuestion].clues.map((clue, index) => (
                    <li key={index} className="text-lg">{clue}</li>
                  ))}
                </ul>
              </div>
              <div className="grid gap-4">
                {detectiveCases[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left h-auto p-6 text-lg rounded-xl hover:scale-105 transition-transform"
                    onClick={() => handleDetectiveCase(option, detectiveCases[currentQuestion].correctPattern)}
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
  }

  return (
    <div className="container py-8 mx-auto">
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