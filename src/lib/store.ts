import { create } from "domain";
import { Clock } from "./types";
interface ClockStore {
  clocks: Clock[];
  addClock: (clock: Clock) => void;
}

const useClockStore = create<ClockStore>((set) => ({
  clocks: [],
  addClock: (clock) => set((state) => ({ clocks: [...state.clocks, clock] })),
}));

export default useClockStore;
