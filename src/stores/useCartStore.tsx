import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ListItemData } from "../api/products";

interface CartItem {
  item: ListItemData;
  quantity: number;
}

interface CartStore {
  cart: Record<number, CartItem>;
  addToCart: (item: ListItemData) => void;
  removeFromCart: (itemId: number) => void;
  increment: (itemId: number) => void;
  decrement: (itemId: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: {},

      addToCart: (item) =>
        set((state) => {
          const newCart = { ...state.cart };

          if (newCart[item.id]) {
            newCart[item.id] = {
              ...newCart[item.id],
              quantity: newCart[item.id].quantity + 1,
            };
          } else {
            newCart[item.id] = { item, quantity: 1 };
          }

          return { cart: newCart };
        }),

      removeFromCart: (itemId) =>
        set((state) => {
          const newCart = { ...state.cart };

          delete newCart[itemId];

          return { cart: newCart };
        }),

      increment: (itemId) =>
        set((state) => {
          const newCart = { ...state.cart };

          if (newCart[itemId]) {
            newCart[itemId] = {
              ...newCart[itemId],
              quantity: newCart[itemId].quantity + 1,
            };
          }

          return { cart: newCart };
        }),

      decrement: (itemId) =>
        set((state) => {
          const newCart = { ...state.cart };

          if (!newCart[itemId]) return state;

          const newQuantity = newCart[itemId].quantity - 1;

          if (newQuantity > 0) {
            newCart[itemId] = {
              ...newCart[itemId],
              quantity: newQuantity,
            };
          } else {
            delete newCart[itemId];
          }

          return { cart: newCart };
        }),

      clearCart: () => set({ cart: {} }),
    }),
    {
      name: "cart-storage",
    },
  ),
);
