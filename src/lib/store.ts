import { Clock, ClockStore } from "./types";
import { persist } from "zustand/middleware";
import { StateCreator } from "zustand";
import { create } from "zustand";

const storeObject: StateCreator<ClockStore> = (set, get) => ({
  clocks: [],
  addClock: (clock: Clock) =>
    set((state) => ({ clocks: [...state.clocks, clock] })),
  deleteClock: (index: number) =>
    set((state) => ({ clocks: state.clocks.filter((_, i) => i !== index) })),
  clearClocks: () => set({ clocks: [] }),
});

const useClockStore = create(persist(storeObject, { name: "clock-store" }));

export default useClockStore;
