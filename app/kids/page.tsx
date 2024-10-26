import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, GamepadIcon, Music, Shield } from "lucide-react";

export default function KidsPage() {
  return (
    <div className="mx-auto container px-4 py-8 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold tracking-tight lg:text-6xl mb-6 rainbow-text">
          Welcome to EarthWise Kids!
        </h1>
        <div className="bubble max-w-[800px] mx-auto">
          <p className="text-2xl text-muted-foreground">
            Ready to start your adventure? Explore fun lessons, cool games, and more!
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/lessons">
          <Card className="card-hover border-4 border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <BookOpen className="h-8 w-8 animate-bounce" />
                <CardTitle className="text-2xl">Fun Lessons</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg">Learn about natural disasters and how to stay safe!</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/games">
          <Card className="card-hover border-4 border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <GamepadIcon className="h-8 w-8 animate-bounce" />
                <CardTitle className="text-2xl">Cool Games</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg">Play fun and educational games about weather and safety!</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/calming-corner">
          <Card className="card-hover border-4 border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Music className="h-8 w-8 animate-bounce" />
                <CardTitle className="text-2xl">Relaxation Station</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg">Find peace and calm with our relaxation activities!</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/safety-squad">
          <Card className="card-hover border-4 border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-8 w-8 animate-bounce" />
                <CardTitle className="text-2xl">Safety Squad</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg">Join the Safety Squad and learn how to stay safe!</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
