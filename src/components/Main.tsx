"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  LayoutGrid,
  LayoutList,
  PauseCircle,
  PlayCircle,
  RefreshCcw,
  Trash,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn, formatTime } from "@/lib/utils";

interface Tempus {
  name: string;
  description: string;
  time: number; // in seconds
}

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
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
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

const Main = () => {
  const [clocks, setClocks] = useState<Tempus[]>([]);

  const [gridView, setGridView] = useState<boolean>(true);

  // const container = {
  //   hidden: { opacity: 0 },
  //   show: {
  //     opacity: 1,
  //     transition: {
  //       delayChildren: 0.3,
  //       staggerChildren: 0.1,
  //     },
  //   },
  // };

  // const item = {
  //   hidden: { opacity: 0 },
  //   show: { opacity: 1 },
  // };

  useEffect(() => {
    const storedClocks = localStorage.getItem("clocks");

    if (storedClocks) {
      setClocks(JSON.parse(storedClocks));
    }
  }, []);

  // const copyToClipboard = (content: string) => {
  //   navigator.clipboard.writeText(content);
  //   toast.success("Copied to clipboard!");
  // };

  const handleAddClock = () => {
    const updatedClocks = [
      ...clocks,
      { name: "New Clock", description: "New Clock", time: 0 },
    ];
    localStorage.setItem("clocks", JSON.stringify(updatedClocks));
    setClocks(updatedClocks);
    toast.success("Clock added successfully!");
  };

  const handleClearClocks = () => {
    localStorage.removeItem("clocks");
    setClocks([]);
    toast.success("All clocks cleared.");
  };

  const handleDeleteClock = (index: number) => {
    const updatedClocks = [...clocks].filter((_, i) => i !== index);
    localStorage.setItem("clocks", JSON.stringify(updatedClocks));
    setClocks(updatedClocks);
    toast.success("Clock deleted successfully!");
  };

  const [activeTimers, setActiveTimers] = useState<number[]>([]);

  const handleAddTimer = (id: number) => {
    setActiveTimers((prev) => [...prev, id]);
  };

  const handleRemoveTimer = (id: number) => {
    setActiveTimers((prev) => prev.filter((timerId) => timerId !== id));
  };

  return (
    <div className="flex flex-col gap-4">
      {/* {wallets.length === 0 && (
        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        >
          <div className="flex flex-col gap-4">
            {pathTypes.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
                className="flex gap-4 flex-col my-12"
              >
                <div className="flex flex-col gap-2">
                  <h1 className="tracking-tighter text-4xl md:text-5xl font-black">
                    Multiple blockchains supported.
                  </h1>
                  <p className="text-primary/80 font-semibold text-lg md:text-xl">
                    Choose a blockchain to get started.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size={"lg"}
                    onClick={() => {
                      setPathTypes(["501"]);
                      toast.success(
                        "Wallet selected. Please generate a wallet to continue."
                      );
                    }}
                  >
                    Solana
                  </Button>
                  <Button
                    size={"lg"}
                    onClick={() => {
                      setPathTypes(["60"]);
                      toast.success(
                        "Wallet selected. Please generate a wallet to continue."
                      );
                    }}
                  >
                    Ethereum
                  </Button>
                </div>
              </motion.div>
            )}
            {pathTypes.length !== 0 && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
                className="flex flex-col gap-4 my-12"
              >
                <div className="flex flex-col gap-2">
                  <h1 className="tracking-tighter text-4xl md:text-5xl font-black">
                    Secret Recovery Phrase
                  </h1>
                  <p className="text-primary/80 font-semibold text-lg md:text-xl">
                    Save these words in a safe place.
                  </p>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <Input
                    type="password"
                    placeholder="Enter your secret phrase (or leave blank to generate)"
                    onChange={(e) => setMnemonicInput(e.target.value)}
                    value={mnemonicInput}
                  />
                  <Button size={"lg"} onClick={() => handleGenerateWallet()}>
                    {mnemonicInput ? "Add Wallet" : "Generate Wallet"}
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )} */}

      {/* Display Secret Phrase */}
      {/* {
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className="group flex flex-col items-center gap-4 cursor-pointer rounded-lg border border-primary/10 p-8"
        >
          <div
            className="flex w-full justify-between items-center"
            onClick={() => setShowMnemonic(!showMnemonic)}
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter">
              Your Secret Phrase
            </h2>
            <Button
              onClick={() => setShowMnemonic(!showMnemonic)}
              variant="ghost"
            >
              {showMnemonic ? (
                <ChevronUp className="size-4" />
              ) : (
                <ChevronDown className="size-4" />
              )}
            </Button>
          </div>

          {showMnemonic && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className="flex flex-col w-full items-center justify-center"
              onClick={() => copyToClipboard(mnemonicWords.join(" "))}
            >
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 justify-center w-full items-center mx-auto my-8"
              >
                {mnemonicWords.map((word, index) => (
                  <motion.p
                    variants={item}
                    key={index}
                    className="md:text-lg bg-foreground/5 hover:bg-foreground/10 transition-all duration-300 rounded-lg p-4"
                  >
                    {word}
                  </motion.p>
                ))}
              </motion.div>
              <div className="text-sm md:text-base text-primary/50 flex w-full gap-2 items-center group-hover:text-primary/80 transition-all duration-300">
                <Copy className="size-4" /> Click Anywhere To Copy
              </div>
            </motion.div>
          )}
        </motion.div>
      } */}

      {/* Display wallet pairs */}
      {
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.3,
            ease: "easeInOut",
          }}
          className="flex flex-col gap-8 mt-6"
        >
          <div className="flex md:flex-row flex-col justify-between w-full gap-4 md:items-center">
            <h2 className="tracking-tighter text-3xl md:text-4xl font-extrabold">
              Tempus
            </h2>
            <div className="flex gap-2">
              {clocks.length > 1 && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="bg-transparent border-0"
                        onClick={() => setGridView(!gridView)}
                      >
                        {gridView ? (
                          <LayoutGrid
                            className={`h-4 w-4 ${!gridView && "text-primary"}`}
                          />
                        ) : (
                          <LayoutList
                            className={`h-4 w-4 ${!gridView && "text-primary"}`}
                          />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {gridView ? "List View" : "Grid View"}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}

              <Button onClick={() => handleAddClock()}>Add Clock</Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="self-end">
                    Clear Clocks
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to delete all clocks?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your clocks from local storage.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleClearClocks()}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
          <div
            className={`grid gap-6 grid-cols-1 col-span-1  ${
              gridView ? "md:grid-cols-2 lg:grid-cols-3" : ""
            }`}
          >
            {clocks.map((clock: Tempus, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3 + index * 0.1,
                  duration: 0.3,
                  ease: "easeInOut",
                }}
                className="flex flex-col rounded-2xl border border-primary/10"
              >
                <div className="flex justify-between px-8 py-6">
                  <h3 className="font-bold text-2xl md:text-3xl tracking-tighter ">
                    Clock {index + 1}
                  </h3>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        className="flex gap-2 items-center"
                      >
                        <Trash className="size-4 text-destructive" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure you want to delete this clock?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete this clock from local storage.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteClock(index)}
                          className="text-destructive"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
                <div className="flex flex-col gap-8 px-8 py-4 rounded-2xl bg-secondary/50">
                  <div
                    className={cn(
                      "grid gap-6 transition-all duration-300",
                      gridView
                        ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                        : "grid-cols-1"
                    )}
                  >
                    <TimerCard
                      key={index}
                      id={index}
                      hasTimer={activeTimers.includes(index)}
                      onAdd={handleAddTimer}
                      onRemove={handleRemoveTimer}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      }
    </div>
  );
};

export default Main;
