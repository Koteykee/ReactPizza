import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";

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

export const useUserStore = create<UserStore>(() => ({
  getUserProfile: (userId) => {
    const users = useAuthStore.getState().users;
    return users.find((u) => u.id === userId) || null;
  },

  updateUserProfile: (userId, data) => {
    const auth = useAuthStore.getState();

    const updatedUsers = auth.users.map((u) =>
      u.id === userId ? { ...u, ...data } : u,
    );

    const newState = {
      users: updatedUsers,
      currentUserId: auth.currentUserId,
    };

    useAuthStore.setState(newState);

    localStorage.setItem("auth-storage", JSON.stringify(newState));
  },
}));
