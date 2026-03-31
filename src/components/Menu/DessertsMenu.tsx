import { useEffect, useState } from "react";
import { fetchDesserts, type ListItemData } from "../../api/products";
import { List } from ".././MainPage/List/List";

export const DessertsMenu = () => {
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

  return (
    <div className="py-10">
      <List title="Desserts" items={desserts} />
    </div>
  );
};
