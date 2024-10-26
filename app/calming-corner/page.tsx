"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Volume2, VolumeX, Play, Pause, Cloud, Sun, Moon, Tree } from "lucide-react";

export default function CalmingCornerPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([50]);

  const soundscapes = [
    {
      title: "Gentle Rain",
      description: "Listen to soft raindrops falling",
      duration: "1 hour",
      icon: Cloud,
      color: "bg-blue-100 dark:bg-blue-900",
    },
    {
      title: "Ocean Waves",
      description: "Hear the peaceful ocean waves",
      duration: "1 hour",
      icon: Moon,
      color: "bg-cyan-100 dark:bg-cyan-900",
    },
    {
      title: "Forest Friends",
      description: "Birds singing in the forest",
      duration: "1 hour",
      icon: Tree,
      color: "bg-green-100 dark:bg-green-900",
    },
    {
      title: "Sleepy Time",
      description: "Soft music to help you relax",
      duration: "15 minutes",
      icon: Sun,
      color: "bg-purple-100 dark:bg-purple-900",
    },
  ];

  return (
    <div className="container py-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 rainbow-text">
          Relaxation Station 🌈
        </h1>
        <p className="text-2xl text-muted-foreground">
          Time to relax and feel peaceful! 🌟
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {soundscapes.map((sound, index) => (
          <Card 
            key={index} 
            className={`card-hover border-4 border-primary/20 overflow-hidden ${sound.color}`}
          >
            <CardHeader>
              <div className="flex items-center gap-2">
                <sound.icon className="h-8 w-8 animate-bounce" />
                <CardTitle className="text-2xl">{sound.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg mb-6">{sound.description}</p>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6" />
                  )}
                </Button>
                <div className="flex items-center gap-4 flex-1">
                  <VolumeX className="h-6 w-6" />
                  <Slider
                    value={volume}
                    onValueChange={setVolume}
                    max={100}
                    step={1}
                    className="h-4"
                  />
                  <Volume2 className="h-6 w-6" />
                </div>
                <span className="text-lg">
                  {sound.duration}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12">
        <Card className="border-4 border-primary/20 max-w-2xl mx-auto bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900">
          <CardHeader>
            <CardTitle className="text-3xl text-center">
              Bubble Breathing 🫧
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <p className="text-xl mb-6">
              Let's practice our special bubble breathing! 
            </p>
            <div className="space-y-4 text-lg">
              <p className="animate-bounce">👆 Breathe in through your nose for 4 seconds</p>
              <p className="animate-pulse">✋ Hold your breath for 4 seconds</p>
              <p className="animate-bounce">👇 Blow out slowly like you're making a bubble</p>
              <p>🔄 Let's do it again!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}