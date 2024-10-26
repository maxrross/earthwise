"use client"
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { 
  Cloud, 
  GamepadIcon, 
  Home, 
  BookOpen, 
  Users, 
  Phone, 
  Info,
  Sprout
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isKidsMode, setIsKidsMode] = useState(pathname.includes("/kids"));

  const kidsRoutes = [
    { href: "/kids", label: "Home", icon: Home, color: "text-pink-500" },
    { href: "/kids/lessons", label: "Lessons", icon: BookOpen, color: "text-blue-500" },
    { href: "/kids/games", label: "Games", icon: GamepadIcon, color: "text-green-500" },
    { href: "/kids/calming-corner", label: "Relax", icon: Cloud, color: "text-purple-500" },
  ];

  const regularRoutes = [
    { href: "/", label: "Home", icon: Home, color: "text-green-600" },
    { href: "/about", label: "About", icon: Info, color: "text-blue-600" },
    { href: "/contact", label: "Contact", icon: Phone, color: "text-purple-600" },
    { href: "/community", label: "Community", icon: Users, color: "text-orange-600" },
  ];

  const routes = isKidsMode ? kidsRoutes : regularRoutes;

  return (
    <div className="sticky top-0 z-50 w-full border-b-4 border-primary/20 bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center mx-auto">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className={cn(
              "hidden text-2xl font-bold sm:inline-block",
              isKidsMode ? "rainbow-text" : "text-primary"
            )}>
              EarthWise {isKidsMode && "Kids"}
            </span>
          </Link>
          <div className="flex items-center space-x-6 text-lg font-medium">
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
          </div>
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
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </Button>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => setIsKidsMode(!isKidsMode)}
          >
            <Sprout className="h-4 w-4" />
            {isKidsMode ? "Adult Mode" : "Kids Mode"}
          </Button>
          <div className="flex items-center space-x-2">
            <ModeToggle />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="border-b-4 border-primary/20 bg-background md:hidden">
          <div className="flex flex-col space-y-4 p-4">
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
          </div>
        </div>
      )}
    </div>
  );
}