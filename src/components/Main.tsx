"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { LayoutGrid, LayoutList, Trash } from "lucide-react";
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
import { Clock } from "@/lib/types";
import useClockStore from "@/lib/store";
import TimerCard from "./TimerCard";

const Main = () => {
  const { clocks, addClock, deleteClock, clearClocks } = useClockStore();
  const [gridView, setGridView] = useState<boolean>(true);

  // const container = {
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

  // const copyToClipboard = (content: string) => {
  //   navigator.clipboard.writeText(content);
  //   toast.success("Copied to clipboard!");
  // };

  const handleAddClock = () => {
    addClock();
    toast.success("Clock added successfully!");
  };

  const handleClearClocks = () => {
    clearClocks();
    toast.success("All clocks cleared.");
  };

  const handleDeleteClock = (index: number) => {
    deleteClock(index);
    toast.success("Clock deleted successfully!");
  };

  return (
    <div className="flex flex-col gap-4">
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
            className={`grid w-full gap-6 grid-cols-1 place-items-center col-span-1   ${
              gridView ? "md:grid-cols-2 lg:grid-cols-3" : ""
            }`}
          >
            {clocks.map((clock: Clock, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3 + index * 0.1,
                  duration: 0.3,
                  ease: "easeInOut",
                }}
                className="flex flex-col rounded-2xl   w-[22rem] border border-primary/10"
              >
                <div className="w-full hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 ">
                  <div className="flex justify-between px-8 pt-6">
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
                  <div className=" pb-4 rounded-2xl ">
                    <TimerCard id={index} />
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
