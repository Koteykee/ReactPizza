import { create } from "zustand";

export interface OrderItem {
  id: number;
  productId: number;
  price: number;
  quantity: number;
}

export interface Order {
  id: number;
  userId: number;
  items: OrderItem[];
  total: number;
  createdAt: string;
}

interface OrderStore {
  getUserOrders: (userId: number) => Order[];
}

const ORDERS_DB = "orders-db";

const loadFromStorage = (): { orders: Order[] } => {
  const data = localStorage.getItem(ORDERS_DB);

  if (!data) return { orders: [] };

  try {
    const parsed = JSON.parse(data);
    return { orders: parsed.orders ?? [] };
  } catch {
    return { orders: [] };
  }
};

export const useOrderStore = create<OrderStore>(() => ({
  getUserOrders: (userId) => {
    const { orders } = loadFromStorage();
    return orders.filter((o) => o.userId === userId);
  },
}));
