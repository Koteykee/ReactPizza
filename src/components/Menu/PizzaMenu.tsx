import { useEffect, useState } from "react";
import { fetchPizzas, type ListItemData } from "../../api/products";
import { List } from ".././MainPage/List/List";

export const PizzaMenu = () => {
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

  return (
    <div className="pt-10">
      <List title="Pizza" items={pizzas} />
    </div>
  );
};
