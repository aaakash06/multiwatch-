"use client";
import React, { useState, useEffect } from "react";
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
import { formatTime } from "@/lib/utils";
import useClockStore from "@/lib/store";
const TimerCard = ({ id }: { id: number }) => {
  const { getClock, setClock } = useClockStore();
  const clock = getClock(id);
  const [seconds, setSeconds] = useState(clock.seconds || 0);
  const [milliseconds, setMilliseconds] = useState(0);

  useEffect(() => {
    const handleBeforeUnload = (event: Event) => {
      event.preventDefault();
      setClock(id, { ...clock, isActive: false, seconds: seconds });
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [seconds]);

  useEffect(() => {
    let interval = null;
    if (clock.isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [clock.isActive]);

  const handleStart = () => {
    setClock(id, { ...clock, isActive: true });
  };

  const handlePause = () => {
    setClock(id, { ...clock, isActive: false });
  };

  const handleReset = () => {
    setSeconds(0);
    setClock(id, { ...clock, isActive: false });
  };

  return <div>{seconds}</div>;
};

export default SecondTimer;
