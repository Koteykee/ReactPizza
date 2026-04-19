import { create } from "zustand";
import type { User } from "./useUserStore";

interface AuthStore {
  users: User[];
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

const STORAGE_KEY = "auth-storage";

const saveToStorage = (state: {
  users: User[];
  currentUserId: number | null;
}) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

const loadFromStorage = (): { users: User[]; currentUserId: number | null } => {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) return { users: [], currentUserId: null };

  try {
    const parsed = JSON.parse(data);

    return {
      users: parsed.users ?? [],
      currentUserId: parsed.currentUserId ?? null,
    };
  } catch {
    return { users: [], currentUserId: null };
  }
};

export const useAuthStore = create<AuthStore>((set, get) => {
  const initial = loadFromStorage();

  return {
    ...initial,

    login: (email, password) => {
      const user = get().users.find(
        (u) => u.email === email && u.password === password,
      );

      if (!user) {
        return { success: false, message: "Wrong email or password" };
      }

      const newState = {
        users: get().users,
        currentUserId: user.id,
      };

      set(newState);
      saveToStorage(newState);

      return { success: true };
    },

    register: (email, password) => {
      const users = get().users;

      const exists = users.find((u) => u.email === email);

      if (exists) {
        return { success: false, message: "User already exists" };
      }

      const newUser: User = {
        id: Date.now(),
        email,
        password,
      };

      const newState = {
        users: [...users, newUser],
        currentUserId: newUser.id,
      };

      set(newState);
      saveToStorage(newState);

      return { success: true };
    },

    logout: () => {
      const newState = {
        users: get().users,
        currentUserId: null,
      };

      set(newState);
      saveToStorage(newState);
    },
  };
});
