import { create } from "zustand";

interface SignupStoreState {
  email: string;
  setEmail: (email: string) => void;
  nthForm: number;
  nextForm: () => void;
  resetNthForm: () => void;
  isFormComplete: boolean;
  completeForm: () => void;
}

export const useSignupStore = create<SignupStoreState>((set, get) => ({
  email: "",
  nthForm: 0,
  setEmail: (email) => set({ email }),
  nextForm: () => set((state) => ({ nthForm: (state.nthForm + 1) % 4 })),
  resetNthForm: () => set((state) => ({ nthForm: 0 })),
  isFormComplete: false,
  completeForm: () => set((state) => ({ isFormComplete: true })),
}));
