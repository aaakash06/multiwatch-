export interface Clock {
  id: string;
  name: string;
  description: string;
  centiseconds: number;
  isActive: boolean;
  reset: boolean;
}
export interface ClockStore {
  clocks: Clock[];
  addClock: () => void;
  deleteClock: (index: number) => void;
  clearClocks: () => void;
  activeClocks: Clock[];
  addActiveClock: (clock: Clock) => void;
  removeActiveClock: (index: number) => void;
  getClock: (index: number) => Clock;
  setClock: (index: number, clock: Clock) => void;
  isRehydrating: boolean;
  setIsRehydrating: (value: boolean) => void;
  setReset: (index: number | string) => void;
  reorderClocks: (newOrder: Clock[]) => void;
}
