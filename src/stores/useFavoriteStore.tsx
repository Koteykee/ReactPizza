import { create } from "zustand";
import type { ListItemData } from "../api/products";

interface FavoriteStore {
  favorites: ListItemData[];
  toggleFavorite: (item: ListItemData) => void;
  clearFavorites: () => void;
}

const FAVORITES_KEY = "favorites";

export const useFavoriteStore = create<FavoriteStore>((set) => ({
  favorites: JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]"),

  toggleFavorite: (item) =>
    set((state) => {
      const exists = state.favorites.some((fav) => fav.id === item.id);
      const newFavorites = exists
        ? state.favorites.filter((fav) => fav.id !== item.id)
        : [...state.favorites, item];

      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      return { favorites: newFavorites };
    }),

  clearFavorites: () =>
    set(() => {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify([]));
      return { favorites: [] };
    }),
}));
