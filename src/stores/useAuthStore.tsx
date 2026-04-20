import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "./useUserStore";

interface AuthStore {
  currentUserId: number | null;
  login: (
    email: string,
    password: string,
  ) => { success: boolean; message?: string };
  register: (
    email: string,
    password: string,
  ) => { success: boolean; message?: string };
  logout: () => void;
}

const USERS_DB = "users-db";

const saveToUsers = (users: User[]) => {
  localStorage.setItem(USERS_DB, JSON.stringify({ users }));
};

export const loadFromStorage = (): { users: User[] } => {
  const data = localStorage.getItem(USERS_DB);

  if (!data) return { users: [] };

  try {
    const parsed = JSON.parse(data);
    return { users: parsed.users ?? [] };
  } catch {
    return { users: [] };
  }
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      currentUserId: null,

      login: (email, password) => {
        const { users } = loadFromStorage();
        const user = users.find(
          (u) => u.email === email && u.password === password,
        );

        if (!user) {
          return { success: false, message: "Wrong email or password" };
        }

        set({ currentUserId: user.id });

        return { success: true };
      },

      register: (email, password) => {
        const { users } = loadFromStorage();

        const exists = users.find((u) => u.email === email);

        if (exists) {
          return { success: false, message: "User already exists" };
        }

        const newUser: User = {
          id: Date.now(),
          email,
          password,
        };

        saveToUsers([...users, newUser]);

        set({ currentUserId: newUser.id });

        return { success: true };
      },

      logout: () => {
        set({ currentUserId: null });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        currentUserId: state.currentUserId,
      }),
    },
  ),
);
