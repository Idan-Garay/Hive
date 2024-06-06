import { create } from "zustand";

interface LoginStoreState {
  nthForm: number;
  nextForm: () => void;
}

export const useLoginStore = create<LoginStoreState>((set, get) => ({
  nthForm: 0,
  nextForm: () => set((state) => ({ nthForm: state.nthForm + 1 })),
}));
