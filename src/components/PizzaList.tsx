import { useEffect, useState } from "react";
import { fetchPizzas, type ListItemData } from "../api/products";
import { List } from "./List";

export const PizzaList = () => {
  const [pizzas, setPizzas] = useState<ListItemData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchPizzas().then((data) => {
      setPizzas(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  return <List title="Popular pizza" items={pizzas.slice(0, 5)} />;
};
