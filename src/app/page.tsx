"use client";

import { useState } from "react";
import { PlusCircle, Trash2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Component() {
  const [timers, setTimers] = useState([
    { id: 1, name: "Timer 1", time: 0 },
    { id: 2, name: "Timer 2", time: 0 },
  ]);

  const addTimer = () => {
    const newId = Math.max(...timers.map((t) => t.id), 0) + 1;
    setTimers([...timers, { id: newId, name: `Timer ${newId}`, time: 0 }]);
  };

  const removeTimer = (id: number) => {
    setTimers(timers.filter((timer) => timer.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="flex items-center justify-between p-4 bg-gray-800">
        <h1 className="text-2xl font-bold">MultiTimer</h1>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <User className="h-6 w-6" />
            <span className="sr-only">User profile</span>
          </Button>
        </div>
      </nav>

      <main className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Your Timers</h2>
          <Button onClick={addTimer} variant="outline" size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Timer
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {timers.map((timer) => (
            <Card key={timer.id} className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {timer.name}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeTimer(timer.id)}
                  className="h-6 w-6 text-gray-400 hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove timer</span>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">00:00:00</div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  Start
                </Button>
                <Button variant="outline" size="sm">
                  Reset
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
