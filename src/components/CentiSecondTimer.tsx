"use client";

import useClockStore from "@/lib/store";
import { useEffect } from "react";
import { useState } from "react";
import { formatTime } from "@/lib/utils";
const CentisecondTimer = ({ id }: { id: number }) => {
  const { getClock } = useClockStore();
  const clock = getClock(id);
  const [centiseconds, setCentiseconds] = useState(0);

  // useEffect(() => {
  //   const handleBeforeUnload = (event: Event) => {
  //     event.preventDefault();
  //     setClock(id, { ...clock, isActive: false, seconds: seconds });
  //   };
  //   window.addEventListener("beforeunload", handleBeforeUnload);
  //   return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  // }, [seconds]);

  useEffect(() => {
    let interval = null;
    if (clock.isActive) {
      interval = setInterval(() => {
        setCentiseconds((centiseconds) => centiseconds + 1);
      }, 10);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [clock.isActive]);

  const time = formatTime(centiseconds);

  return (
    <>
      <span>{time.slice(0, 8)}.</span>

      <span className="px-1 text-sm">{time.split(":")[3]}</span>
    </>
  );
};

export default CentisecondTimer;
