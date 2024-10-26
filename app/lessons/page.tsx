"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Wind, Waves, Cloud, Flame } from "lucide-react";

export default function LessonsPage() {
  const [activeLesson, setActiveLesson] = useState("hurricanes");

  const lessons = {
    hurricanes: {
      icon: Wind,
      title: "Hurricanes",
      content: "Let's learn about these super strong spinning storms! 🌪️",
      color: "bg-blue-100 dark:bg-blue-900",
      facts: [
        "Hurricanes are like giant spinning tops in the sky!",
        "They form over warm ocean water - it's like their food!",
        "The eye of the hurricane is super quiet and calm!",
      ],
      safetyTips: [
        "Always listen to grown-ups about weather updates",
        "Keep a special emergency backpack ready",
        "Know where your safe spot is",
      ],
    },
    floods: {
      icon: Waves,
      title: "Floods",
      content: "Splash! Let's discover what makes floods happen! 🌊",
      color: "bg-cyan-100 dark:bg-cyan-900",
      facts: [
        "Floods happen more than any other weather event!",
        "They can happen anywhere in the world",
        "Some floods come super fast - zoom!",
      ],
      safetyTips: [
        "Never play in flood water",
        "Stay away from electric wires",
        "Go to high places when water rises",
      ],
    },
    tornadoes: {
      icon: Cloud,
      title: "Tornadoes",
      content: "Whoosh! These spinning air columns are amazing! 🌪️",
      color: "bg-purple-100 dark:bg-purple-900",
      facts: [
        "Tornadoes can spin faster than a race car!",
        "They can pop up anywhere!",
        "The USA sees more tornadoes than anywhere else",
      ],
      safetyTips: [
        "Hide in a basement or safe room",
        "Stay away from windows",
        "Listen to your weather radio friend",
      ],
    },
    wildfires: {
      icon: Flame,
      title: "Wildfires",
      content: "Time to learn about fire safety! 🔥",
      color: "bg-orange-100 dark:bg-orange-900",
      facts: [
        "Lightning often starts wildfires - zap!",
        "They can run faster than you!",
        "Some plants need fire to grow - cool, right?",
      ],
      safetyTips: [
        "Keep your yard clean and safe",
        "Know how to get out quickly",
        "Keep important stuff ready to grab",
      ],
    },
  };

  return (
    <div className="container py-8">
      <h1 className="text-5xl font-bold mb-8 text-center rainbow-text">
        Weather Adventure Zone! 
      </h1>
      
      <Tabs defaultValue="hurricanes" className="w-full" onValueChange={setActiveLesson}>
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 p-4 gap-4 bg-muted rounded-xl">
          {Object.entries(lessons).map(([key, lesson]) => (
            <TabsTrigger 
              key={key} 
              value={key} 
              className={`flex items-center gap-2 p-4 text-lg rounded-lg transition-all ${lesson.color}`}
            >
              <lesson.icon className="h-6 w-6" />
              {lesson.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(lessons).map(([key, lesson]) => (
          <TabsContent key={key} value={key}>
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="card-hover border-4 border-primary/20">
                <CardHeader className={`${lesson.color} rounded-t-lg`}>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <lesson.icon className="h-8 w-8" />
                    Cool Facts!
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-4">
                    {lesson.facts.map((fact, index) => (
                      <li key={index} className="flex items-center gap-2 text-lg">
                        <span className="text-2xl">🌟</span> {fact}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="card-hover border-4 border-primary/20">
                <CardHeader className={`${lesson.color} rounded-t-lg`}>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Shield className="h-8 w-8" />
                    Safety Super Tips!
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-4">
                    {lesson.safetyTips.map((tip, index) => (
                      <li key={index} className="flex items-center gap-2 text-lg">
                        <span className="text-2xl">🛡️</span> {tip}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6 flex justify-center">
              <Button className="text-lg px-8 py-6 rounded-full animate-bounce">
                Download Fun Activity Sheet! 🎨
              </Button>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}