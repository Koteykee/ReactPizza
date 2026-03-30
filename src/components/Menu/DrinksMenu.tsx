import { useEffect, useState } from "react";
import { fetchDrinks, type ListItemData } from "../../api/products";
import { List } from ".././MainPage/List/List";

export const DrinksMenu = () => {
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

  return (
    <div className="pt-10">
      <List title="Drinks" items={drinks} />
    </div>
  );
};
