import { create } from "zustand";

interface SignupStoreState {
  email: string;
  setEmail: (email: string) => void;
  nthForm: number;
  nextForm: () => void;
}

export const useSignupStore = create<SignupStoreState>((set, get) => ({
  email: "",
  nthForm: 0,
  setEmail: (email) => set({ email }),
  nextForm: () => set((state) => ({ nthForm: (state.nthForm + 1) % 4 })),
}));
