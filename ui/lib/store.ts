import create, { UseBoundStore, StoreApi } from 'zustand';
export type InitialState = {
  count: number,
  increment: () => void,
  decrement: () => void
}

type store = UseBoundStore<InitialState, StoreApi<InitialState>>

const useStore: store = create<InitialState>(
  (set) => ({
    count: 0,
    increment: () => set(state => ({ count: state.count + 1 })),
    decrement: () => set(state => ({ count: state.count - 1 })),
  })
);

export default useStore;