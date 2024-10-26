"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Home,
  ShoppingBag,
  ArrowRight,
  Cloud,
  Droplets,
  Wind,
  Flame,
  AlertTriangle
} from 'lucide-react';

const disasters = [
  {
    id: 'flood',
    name: 'Flood',
    icon: Droplets,
    beforeImage: '/api/placeholder/500/300',
    afterImage: '/api/placeholder/500/300',
    supplies: [
      { item: 'Sandbags', stores: ['Home Depot', 'Lowes'], inStock: true },
      { item: 'Water Pump', stores: ['Home Depot'], inStock: true },
      { item: 'Flood Barriers', stores: ['Home Depot', 'Lowes'], inStock: false },
    ]
  },
  {
    id: 'hurricane',
    name: 'Hurricane',
    icon: Wind,
    beforeImage: '/api/placeholder/500/300',
    afterImage: '/api/placeholder/500/300',
    supplies: [
      { item: 'Plywood', stores: ['Home Depot', 'Lowes'], inStock: true },
      { item: 'Generator', stores: ['Home Depot', 'Costco'], inStock: true },
      { item: 'Emergency Radio', stores: ['Walmart', 'Target'], inStock: true },
    ]
  },
  {
    id: 'wildfire',
    name: 'Wildfire',
    icon: Flame,
    beforeImage: '/api/placeholder/500/300',
    afterImage: '/api/placeholder/500/300',
    supplies: [
      { item: 'Air Purifier', stores: ['Home Depot', 'Target'], inStock: true },
      { item: 'N95 Masks', stores: ['CVS', 'Walgreens'], inStock: false },
      { item: 'Fire Extinguisher', stores: ['Home Depot', 'Lowes'], inStock: true },
    ]
  }
];

export default function Homepage() {
  const [selectedDisaster, setSelectedDisaster] = useState(disasters[0]);
  const [showAfter, setShowAfter] = useState(false);

  return (
    <div className="container mx-auto py-8 space-y-12">
      {/* Disaster Simulation Section */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">Disaster Preparedness Simulation</h2>
          <div className="flex gap-2">
            {disasters.map((disaster) => {
              const Icon = disaster.icon;
              return (
                <Button
                  key={disaster.id}
                  variant={selectedDisaster.id === disaster.id ? "default" : "outline"}
                  onClick={() => {
                    setSelectedDisaster(disaster);
                    setShowAfter(false);
                  }}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {disaster.name}
                </Button>
              );
            })}
          </div>
        </div>

        <Card className="w-full">
          <CardContent className="p-6">
            <div className="relative aspect-video">
              <img
                src={showAfter ? selectedDisaster.afterImage : selectedDisaster.beforeImage}
                alt={`${selectedDisaster.name} ${showAfter ? 'after' : 'before'}`}
                className="rounded-lg w-full h-full object-cover"
              />
              <Button 
                className="absolute bottom-4 right-4"
                onClick={() => setShowAfter(!showAfter)}
              >
                Show {showAfter ? 'Before' : 'After'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Emergency Supplies Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">Emergency Supplies</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedDisaster.supplies.map((supply, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  {supply.item}
                </CardTitle>
                <CardDescription>
                  Available at: {supply.stores.join(', ')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className={`flex items-center gap-2 ${supply.inStock ? 'text-green-500' : 'text-red-500'}`}>
                  <AlertTriangle className="h-4 w-4" />
                  {supply.inStock ? 'In Stock' : 'Low Stock/Out of Stock'}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Kids Section */}
      <section className="relative overflow-hidden">
        <Card className="bg-gradient-to-r from-purple-500 to-pink-500">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white">EarthWise Kids Corner</h2>
                <p className="text-white/90 max-w-lg">
                  School closed due to weather? Join EarthWise Kids to learn about natural disasters 
                  through fun interactive games and activities! Perfect for ages 5-12.
                </p>
                <Link href="/kids">
                  <Button size="lg" variant="secondary" className="gap-2 mt-2">
                    Go to Kids Corner
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="hidden lg:block">
                <Cloud className="h-32 w-32 text-white/20" />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}