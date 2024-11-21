export interface Clock {
  name: string;
  description: string;
  time: number; // in seconds
}
export interface ClockStore {
  clocks: Clock[];
  addClock: (clock: Clock) => void;
}
