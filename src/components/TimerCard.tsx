"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { PauseCircle, PlayCircle, RefreshCcw } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
import useClockStore from "@/lib/store";
import CentisecondTimer from "./CentiSecondTimer";
const TimerCard = ({ id }: { id: number }) => {
  const { getClock, setClock, setReset } = useClockStore();
  const clock = getClock(id);

  const handleStart = () => {
    setClock(id, { ...clock, isActive: true });
  };

  const handlePause = () => {
    setClock(id, { ...clock, isActive: false });
  };

  const handleReset = () => {
    setReset(id);
    setClock(id, { ...clock, isActive: false, centiseconds: 0 });
  };

  return (
    <Card className="transition-all duration-300 bg-transparent border-0 shadow-none ">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        {/* <Badge variant="secondary">{hasTimer ? "Active" : "Inactive"}</Badge> */}
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold text-center my-4">
          <CentisecondTimer id={id} />
        </div>

        <div className="space-y-3 mt-7">
          <div className="flex justify-center space-x-2">
            {!clock.isActive ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" onClick={handleStart}>
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
                    <Button variant="outline" size="icon" onClick={handlePause}>
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
          {/* <Button
            variant="destructive"
            className="w-full"
            onClick={() => onRemove(id)}
          >
            Remove Timer
          </Button> */}
        </div>
      </CardContent>
    </Card>
  );
};

export default TimerCard;
