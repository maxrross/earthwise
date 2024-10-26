"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, Cloud, Sun, Moon, Trees } from "lucide-react";

interface Sound {
  title: string;
  description: string;
  duration: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  src: string;
}

function SoundscapeCard({ 
  sound, 
  isPlaying, 
  onPlayPause 
}: { 
  sound: Sound; 
  isPlaying: boolean;
  onPlayPause: () => void;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);

  // Update audio play state when isPlaying prop changes
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [isPlaying]);

  return (
    <Card
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
            onClick={onPlayPause}
          >
            {isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6" />
            )}
          </Button>
          <span className="text-lg ml-auto">{sound.duration}</span>
        </div>
        {/* Hidden audio element */}
        <audio ref={audioRef} src={sound.src} loop />
      </CardContent>
    </Card>
  );
}

export default function CalmingCornerPage() {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null);

  const soundscapes = [
    {
      title: "Gentle Rain",
      description: "Listen to soft raindrops falling",
      duration: "1 hour",
      icon: Cloud,
      color: "bg-blue-100 dark:bg-blue-900",
      src: "../sounds/gentle-rain.mp3",
    },
    {
      title: "Ocean Waves",
      description: "Hear the peaceful ocean waves",
      duration: "1 hour",
      icon: Moon,
      color: "bg-cyan-100 dark:bg-cyan-900",
      src: "../sounds/ocean-waves.mp3",
    },
    {
      title: "Forest Friends",
      description: "Birds singing in the forest",
      duration: "1 hour",
      icon: Trees,
      color: "bg-green-100 dark:bg-green-900",
      src: "../sounds/forest-friends.mp3",
    },
    {
      title: "Sleepy Time",
      description: "Soft music to help you relax",
      duration: "15 minutes",
      icon: Sun,
      color: "bg-purple-100 dark:bg-purple-900",
      src: "../sounds/sleepy-time.mp3",
    },
  ];

  const handlePlayPause = (index: number) => {
    if (currentlyPlaying === index) {
      setCurrentlyPlaying(null);
    } else {
      setCurrentlyPlaying(index);
    }
  };

  return (
    <div className="container py-8 mx-auto">
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
          <SoundscapeCard 
            key={index} 
            sound={sound} 
            isPlaying={currentlyPlaying === index}
            onPlayPause={() => handlePlayPause(index)}
          />
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
              <p className="animate-bounce">
                👆 Breathe in through your nose for 4 seconds
              </p>
              <p className="animate-pulse">
                ✋ Hold your breath for 4 seconds
              </p>
              <p className="animate-bounce">
                👇 Blow out slowly like you're making a bubble
              </p>
              <p>🔄 Let's do it again!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}