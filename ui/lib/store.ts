import create, { UseBoundStore, StoreApi } from 'zustand';
// export type store = () => UseBoundStore<{ count: number, increment: () => void, decrement: () => void }, StoreApi<{ count: number, increment: () => void, decrement: () => void }>>;
// export type store = () => { count: number, increment: () => void, decrement: () => void };
type InitialState = {
  count: number,
  increment: () => void,
  decrement: () => void
}

const useStore = create<InitialState>(
  (set) => ({
    count: 0,
    increment: () => set(state => ({ count: state.count + 1 })),
    decrement: () => set(state => ({ count: state.count - 1 })),
  })
);

export default useStore;