"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Cloud, GamepadIcon, Home, Music, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const routes = [
    { href: "/", label: "Home", icon: Home, color: "text-pink-500" },
    { href: "/lessons", label: "Lessons", icon: BookOpen, color: "text-blue-500" },
    { href: "/games", label: "Games", icon: GamepadIcon, color: "text-green-500" },
    { href: "/calming-corner", label: "Relax", icon: Cloud, color: "text-purple-500" },
  ];

  return (
    <div className="sticky top-0 z-50 w-full border-b-4 border-primary/20 bg-background/95 backdrop-blur bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Cloud className="h-8 w-8 animate-bounce text-primary" />
            <span className="hidden text-2xl font-bold sm:inline-block rainbow-text">
              EarthWise Kids
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-lg font-medium">
            {routes.map((route) => {
              const Icon = route.icon;
              return (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "transition-all hover:scale-110",
                    pathname === route.href
                      ? route.color
                      : "text-muted-foreground"
                  )}
                >
                  <span className="flex items-center gap-x-2">
                    <Icon className="h-5 w-5" />
                    {route.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
        <Button
          className="inline-flex items-center md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="sr-only">Open menu</span>
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </Button>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <ModeToggle />
          </nav>
        </div>
      </div>
      {isOpen && (
        <div className="border-b-4 border-primary/20 bg-background md:hidden">
          <nav className="flex flex-col space-y-4 p-4">
            {routes.map((route) => {
              const Icon = route.icon;
              return (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "transition-all hover:scale-110 text-lg",
                    pathname === route.href
                      ? route.color
                      : "text-muted-foreground"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="flex items-center gap-x-2">
                    <Icon className="h-6 w-6" />
                    {route.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
}