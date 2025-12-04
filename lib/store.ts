import { create } from "zustand";

type Test = {
  count: number;
};
type TestAction = {
  incCount: () => void;
  decCount: () => void;
};

const resume = create<Test & TestAction>((set) => ({
  count: 0,
  incCount: () => set((state) => ({ count: state.count + 1 })),
  decCount: () => set((state) => ({ count: state.count - 1 })),
}));
