import { Clock, ClockStore } from "./types";
import { persist } from "zustand/middleware";
import { StateCreator } from "zustand";
import { create } from "zustand";

const storeObject: StateCreator<ClockStore> = (set, get) => ({
  clocks: [],
  addClock: () =>
    set((state) => ({
      clocks: [
        ...state.clocks,
        {
          name: `Clock ${state.clocks.length + 1}`,
          description: "New Clock",
          centiseconds: 0,
          isActive: false,
          reset: false,
          id: crypto.randomUUID(),
        },
      ],
    })),
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
  getClock: (index: number) => get().clocks[index],
  setClock: (index: number, clock: Clock) =>
    set((state) => ({
      clocks: state.clocks.map((c, i) => (i === index ? clock : c)),
    })),
  isRehydrating: true,
  setIsRehydrating: (value: boolean) => set({ isRehydrating: value }),
  setReset: (index: number | string) =>
    set((state) => ({
      clocks: state.clocks.map((c, i) =>
        i === index ? { ...c, reset: !c.reset } : c
      ),
    })),
  reorderClocks: (newOrder: Clock[]) => set({ clocks: newOrder }),
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
