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
  clearClocks: () => set({ clocks: [], activeClocks: [] }),
  activeClocks: [],
  addActiveClock: (clock: Clock) =>
    set((state) => ({ activeClocks: [...state.activeClocks, clock] })),
  removeActiveClock: (index: number) =>
    set((state) => ({
      activeClocks: state.activeClocks.filter((_, i) => i !== index),
    })),
  getClock: (index: number) => get().clocks.find((_, i) => i === index),
  isRehydrating: true,
  setIsRehydrating: (value: boolean) => set({ isRehydrating: value }),
});

const useClockStore = create(
  persist(storeObject, {
    name: "clock-store",
    onRehydrateStorage: () => (state) => {
      state?.setIsRehydrating(false);
    },
  })
);

export default useClockStore;
