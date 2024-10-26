import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, GamepadIcon, Music, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="mx-auto container px-4 py-8 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold tracking-tight lg:text-6xl mb-6 rainbow-text">
          Welcome to EarthWise!
        </h1>
        <div className="bubble max-w-[800px] mx-auto">
          <p className="text-2xl text-muted-foreground">
            Welcome to EarthWise, your go-to resource for learning about our amazing planet. Explore our site to discover fascinating information and fun activities for all ages.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center">
        <Link href="/kids">
          <Button size="lg" className="w-full md:w-auto text-lg px-8 py-6 rounded-full animate-pulse bg-secondary hover:bg-secondary/80">
            Visit Kids Page! 🚀
          </Button>
        </Link>
      </div>
    </div>
  );
}
