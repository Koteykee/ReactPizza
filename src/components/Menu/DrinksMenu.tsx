import { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { fetchDrinks, type ListItemData } from "../../api/products";
import { List } from ".././MainPage/List/List";

export const DrinksMenu = () => {
  const [drinks, setDrinks] = useState<ListItemData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchDrinks().then((data) => {
      setDrinks(data);
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
        <List title="Drinks" items={drinks} />
      )}
    </div>
  );
};
