import { Clock } from "./types";
import { persist } from "zustand/middleware";
import { StateCreator } from "zustand";
import { create } from "zustand";
interface ClockStore {
  clocks: Clock[];
  addClock: (clock: Clock) => void;
}

const storeObject: StateCreator<ClockStore> = (set, get) => ({
  clocks: [],
  addClock: (clock: Clock) =>
    set((state) => ({ clocks: [...state.clocks, clock] })),
});

const useClockStore = create(persist(storeObject, { name: "clock-store" }));

export default useClockStore;
