import React from 'react';
import create, { StoreApi, UseBoundStore } from 'zustand';
export type store = UseBoundStore<{ count: number, increment: () => void, decrement: () => void }, StoreApi<{ count: number, increment: () => void, decrement: () => void }>>;
const useStore: store;
export default useStore;