import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ListItemData } from "../api/products";

interface FavoriteStore {
  favorites: ListItemData[];
  toggleFavorite: (item: ListItemData) => void;
  clearFavorites: () => void;
}

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set) => ({
      favorites: [],

      toggleFavorite: (item) =>
        set((state) => {
          const exists = state.favorites.some((fav) => fav.id === item.id);

          const newFavorites = exists
            ? state.favorites.filter((fav) => fav.id !== item.id)
            : [...state.favorites, item];

          return { favorites: newFavorites };
        }),

      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: "favorites-storage",
    },
  ),
);
