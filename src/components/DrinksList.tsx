import { useEffect, useState } from "react";
import { fetchDrinks, type ListItemData } from "../api/products";
import { List } from "./List";

export const DrinksList = () => {
  const [drinks, setDrinks] = useState<ListItemData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDrinks().then((data) => {
      setDrinks(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  return <List title="Popular drinks" items={drinks.slice(0, 5)} />;
};
