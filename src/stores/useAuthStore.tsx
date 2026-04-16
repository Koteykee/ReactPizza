import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "./useUserStore";

interface AuthStore {
  users: User[];
  currentUserId: number | null;
  login: (
    email: string,
    password: string,
  ) => {
    success: boolean;
    message?: string;
  };
  register: (
    email: string,
    password: string,
  ) => {
    success: boolean;
    message?: string;
  };
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      users: [],
      currentUserId: null,

      logout: () => {
        set({
          currentUserId: null,
        });
      },

      login: (email, password) => {
        const { users } = get();

        const user = users.find(
          (u) => u.email === email && u.password === password,
        );

        if (!user) {
          return { success: false, message: "Wrong email or password" };
        }

        set({
          currentUserId: user.id,
        });

        return { success: true };
      },

      register: (email, password) => {
        const { users } = get();

        const existingUser = users.find((u) => u.email === email);

        if (existingUser) {
          return { success: false, message: "User already exists" };
        }

        const newUser: User = {
          id: Date.now(),
          email,
          password,
        };

        set({
          users: [...users, newUser],
          currentUserId: newUser.id,
        });

        return { success: true };
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
