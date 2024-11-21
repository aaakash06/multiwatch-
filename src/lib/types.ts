export interface Clock {
  name: string;
  description: string;
  seconds: number;
  id: number;
  isActive: boolean;
}
export interface ClockStore {
  clocks: Clock[];
  addClock: (clock: Clock) => void;
}
