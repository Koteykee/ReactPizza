import { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
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

  return (
    <div className="container py-10!">
      {loading ? (
        <div className="px-2.5">
          <LinearProgress
            sx={{
              backgroundColor: "#f07e20",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#ffa734",
              },
            }}
          />
        </div>
      ) : (
        <List title="Pizza" items={pizzas} />
      )}
    </div>
  );
};
