import { useEffect, useState } from "react";
import { fetchDesserts, type ListItemData } from "../../api/products";
import { List } from "./List/List";

export const DessertsList = () => {
  const [desserts, setDesserts] = useState<ListItemData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDesserts().then((data) => {
      setDesserts(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  return <List title="Popular desserts" items={desserts.slice(0, 5)} />;
};
