import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, GamepadIcon, Music, Shield } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: BookOpen,
      title: "Fun Lessons",
      description: "Join our adventure to learn about earthquakes, hurricanes, and more!",
      color: "bg-pink-100 dark:bg-pink-900",
      href: "/kids/lessons"
    },
    {
      icon: GamepadIcon,
      title: "Cool Games",
      description: "Play awesome games and become a weather superhero!",
      color: "bg-blue-100 dark:bg-blue-900",
      href: "/kids/games"
    },
    {
      icon: Shield,
      title: "Safety Squad",
      description: "Learn super important tips to keep you and your family safe!",
      color: "bg-green-100 dark:bg-green-900",
      href: "/kids/lessons"
    },
    {
      icon: Music,
      title: "Relaxation Station",
      description: "Take a break with calming sounds and fun breathing exercises!",
      color: "bg-purple-100 dark:bg-purple-900",
      href: "/kids/calming-corner"
    },
  ];

  return (
    <div className="mx-auto container px-4 py-8 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold tracking-tight lg:text-6xl mb-6 rainbow-text">
          Welcome to EarthWise Kids!
        </h1>
        <div className="bubble max-w-[800px] mx-auto">
          <p className="text-2xl text-muted-foreground">
            Hey there, young explorer! 🌎 Ready to discover amazing things about our Earth?
            Let's learn and have fun together! ⭐
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Link key={feature.title} href={feature.href}>
              <Card className={`card-hover h-full ${feature.color} border-4 border-primary/20`}>
                <CardHeader>
                  <Icon className="h-12 w-12 mb-2 text-primary animate-bounce" />
                  <CardTitle className="text-2xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg">{feature.description}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center">
        <Link href="/kids/lessons">
          <Button size="lg" className="w-full md:w-auto text-lg px-8 py-6 rounded-full animate-pulse bg-secondary hover:bg-secondary/80">
            Start Your Adventure! 🚀
          </Button>
        </Link>
        <Link href="/kids/calming-corner">
          <Button size="lg" variant="outline" className="w-full md:w-auto text-lg px-8 py-6 rounded-full">
            Visit Relaxation Station 🌈
          </Button>
        </Link>
      </div>
    </div>
  );
}
