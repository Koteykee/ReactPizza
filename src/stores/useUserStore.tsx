import { create } from "zustand";
import { loadFromStorage } from "./useAuthStore";

export interface User {
  id: number;
  email: string;
  password: string;
  name?: string;
  phone?: string;
  address?: string;
  apartment?: string;
  entrance?: string;
  floor?: string;
  intercom?: string;
}

interface UserStore {
  getUserProfile: (userId: number) => User | null;
  updateUserProfile: (userId: number, data: Partial<User>) => void;
}

const USERS_DB = "users-db";

export const useUserStore = create<UserStore>(() => ({
  getUserProfile: (userId) => {
    const { users } = loadFromStorage();
    return users.find((u) => u.id === userId) || null;
  },

  updateUserProfile: (userId, data) => {
    const { users } = loadFromStorage();

    const updatedUsers = users.map((u) =>
      u.id === userId ? { ...u, ...data } : u,
    );

    const newState = {
      users: updatedUsers,
    };

    localStorage.setItem(USERS_DB, JSON.stringify(newState));
  },
}));
