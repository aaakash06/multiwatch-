"use client";

import useClockStore from "@/lib/store";
import { useEffect } from "react";
import { useState } from "react";
import { formatTime } from "@/lib/utils";
const CentisecondTimer = ({ id }: { id: number }) => {
  const { getClock, setClock } = useClockStore();
  const clock = getClock(id);
  const [centiseconds, setCentiseconds] = useState(clock.centiseconds || 0);
  useEffect(() => {
    console.log(clock.reset, "reset");
    setCentiseconds(clock.centiseconds);
  }, [clock.reset]);

  useEffect(() => {
    const handleBeforeUnload = (event: Event) => {
      event.preventDefault();
      setClock(id, { ...clock, isActive: false, centiseconds: centiseconds });
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [centiseconds]);

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
      <span className="relative">
        {time.slice(0, 8)}.
        <span className="absolute bottom-[6px] -right-5 text-sm">
          {time.split(":")[3]}
        </span>
      </span>
    </>
  );
};

export default CentisecondTimer;
