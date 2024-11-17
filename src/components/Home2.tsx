"use client";

import * as React from "react";
import { Plus, MessageSquare, Timer } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

export default function HomeScreen() {
  const [timers, setTimers] = useState([
    { id: 1, time: "00:00:00" },
    { id: 2, time: "00:00:00" },
    { id: 3, time: "00:00:00" },
    { id: 4, time: "00:00:00" },
    { id: 5, time: "00:00:00" },
    { id: 6, time: "00:00:00" },
  ]);

  const addTimer = (id: number) => {
    const timer = timers.find((t) => t.id === id);
    if (timer) {
      // Timer exists, start it
      console.log("Start timer", id);
    }
  };

  const removeTimer = (id: number) => {
    const timer = timers.find((t) => t.id === id);
    if (timer) {
      // Timer exists, reset it
      console.log("Reset timer", id);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-2">
            <Timer className="h-6 w-6" />
            <span className="text-xl font-semibold">TimeMaster</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              Remove Timer
            </Button>
            <Button size="sm">Add Timer</Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="container py-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Timely Content</h2>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <MessageSquare className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {timers.map((timer) => (
            <Card key={timer.id} className="flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Timer {timer.id}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tracking-wider">
                  {timer.time}
                </div>
                <div className="mt-4">
                  {timer.id % 2 === 0 ? (
                    <Button
                      onClick={() => removeTimer(timer.id)}
                      variant="outline"
                      className="w-full"
                      size="sm"
                    >
                      Remove Timer
                    </Button>
                  ) : (
                    <Button
                      onClick={() => addTimer(timer.id)}
                      variant="outline"
                      className="w-full"
                      size="sm"
                    >
                      Add Timer
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
