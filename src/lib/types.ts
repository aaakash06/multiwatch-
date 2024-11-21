export interface Clock {
  name: string;
  description: string;
  seconds: number;
  isActive: boolean;
}
export interface ClockStore {
  clocks: Clock[];
  addClock: (clock: Clock) => void;
  deleteClock: (index: number) => void;
  clearClocks: () => void;
}
