"use client";
import React, { useState, useEffect } from "react";
import {
  PlayCircle,
  PauseCircle,
  RefreshCcw,
  LayoutGrid,
  LayoutList,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const formatTime = (seconds: number) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hrs.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

const TimerCard = ({
  id,
  onAdd,
  onRemove,
  hasTimer,
}: {
  id: number;
  onAdd: (id: number) => void;
  onRemove: (id: number) => void;
  hasTimer: boolean;
}) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, isPaused]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleReset = () => {
    setSeconds(0);
    setIsActive(false);
    setIsPaused(false);
  };

  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Timer {id}</CardTitle>
        <Badge variant="secondary">{hasTimer ? "Active" : "Inactive"}</Badge>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-center my-4">
          {formatTime(seconds)}
        </div>
        {hasTimer ? (
          <div className="space-y-3">
            <div className="flex justify-center space-x-2">
              {!isActive || isPaused ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleStart}
                      >
                        <PlayCircle className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Start Timer</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handlePause}
                      >
                        <PauseCircle className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Pause Timer</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" onClick={handleReset}>
                      <RefreshCcw className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Reset Timer</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => onRemove(id)}
            >
              Remove Timer
            </Button>
          </div>
        ) : (
          <Button
            variant="default"
            className="w-full"
            onClick={() => onAdd(id)}
          >
            Add Timer
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

const HomeScreen = () => {
  const [activeTimers, setActiveTimers] = useState([1, 4, 6]);
  const [isGridView, setIsGridView] = useState(true);

  const handleAddTimer = (id: number) => {
    setActiveTimers((prev) => [...prev, id]);
  };

  const handleRemoveTimer = (id: number) => {
    setActiveTimers((prev) => prev.filter((timerId) => timerId !== id));
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <Card className="border-0 shadow-none">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="text-primary text-xl font-semibold">▽</div>
              <h1 className="text-xl font-semibold">TimeMaster</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline">Remove Timer</Button>
              <Button>Add Timer</Button>
              <div className="w-8 h-8 rounded-full bg-gray-200"></div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Timely Content</CardTitle>
            <div className="flex space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setIsGridView(false)}
                    >
                      <LayoutList
                        className={cn("h-4 w-4", !isGridView && "text-primary")}
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>List View</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setIsGridView(true)}
                    >
                      <LayoutGrid
                        className={cn("h-4 w-4", isGridView && "text-primary")}
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Grid View</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div
            className={cn(
              "grid gap-6 transition-all duration-300",
              isGridView
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            )}
          >
            {[1, 2, 3, 4, 5, 6].map((id) => (
              <TimerCard
                key={id}
                id={id}
                hasTimer={activeTimers.includes(id)}
                onAdd={handleAddTimer}
                onRemove={handleRemoveTimer}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomeScreen;
