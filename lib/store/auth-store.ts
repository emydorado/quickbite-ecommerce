import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthUser {
  name: string;
  email: string;
}

interface AuthState {
  user: AuthUser | null;
  signUp: (user: AuthUser) => void;
  logIn: (email: string) => void;
  logOut: () => void;
}

/**
 * Simulated auth only: no real backend or password check, per the PRD
 * ("cuenta de usuario simulada"). logIn just seeds a plausible session
 * from the email since there is nothing to authenticate against.
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      signUp: (user) => set({ user }),
      logIn: (email) =>
        set({
          user: {
            name: email.split("@")[0].replace(/[._-]/g, " "),
            email,
          },
        }),
      logOut: () => set({ user: null }),
    }),
    { name: "quickbite-auth" }
  )
);
