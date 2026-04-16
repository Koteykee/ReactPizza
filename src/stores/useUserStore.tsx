import { create } from "zustand";

export interface User {
  id: number;
  email: string;
  password: string;
  name?: string;
  address?: string;
}

interface UserStore {
  getUserProfile: () => User | null;
}

export const useUserStore = create<UserStore>(() => ({
  getUserProfile: () => {
    const data = localStorage.getItem("auth-storage");
    if (!data) return null;

    try {
      const parsed = JSON.parse(data);
      const state = parsed.state ?? parsed;

      const users = state.users ?? [];
      const currentUserId = state.currentUserId ?? null;

      return users.find((u: User) => u.id === currentUserId) || null;
    } catch {
      return null;
    }
  },
}));
