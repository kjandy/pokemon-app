import { create } from 'zustand';

// Create Store
const useCounterStore = create((set) => ({
  //initial
  count: 0,
  //Increment：method(setter)
  increment: () => set((state) => ({ count: state.count + 1 })),
  //Decrement：method(setter)
  decrement: () => set((state) => ({ count: state.count - 1 })),
  //count reset
  reset: () => set({ count: 0 }),
}));

export default useCounterStore;
