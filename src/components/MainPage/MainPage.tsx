import { useEffect, useState } from "react";
import {
  fetchDesserts,
  fetchDrinks,
  fetchPizzas,
  type ListItemData,
} from "../../api/products";
import LinearProgress from "@mui/material/LinearProgress";
import { CarouselElement } from "./CarouselElement";
import { List } from "./List/List";

export const MainPage = () => {
  const [desserts, setDesserts] = useState<ListItemData[]>([]);
  const [drinks, setDrinks] = useState<ListItemData[]>([]);
  const [pizzas, setPizzas] = useState<ListItemData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchDesserts(), fetchDrinks(), fetchPizzas()]).then(
      ([dessertsData, drinksData, pizzasData]) => {
        setDesserts(dessertsData);
        setDrinks(drinksData);
        setPizzas(pizzasData);
        setLoading(false);
      },
    );
  }, []);

  return (
    <div className="container py-1">
      <div className="my-10">
        <CarouselElement />
      </div>
      {loading ? (
        <div className="container">
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
        <>
          <List title="Popular pizza" items={pizzas.slice(0, 5)} />
          <List title="Popular desserts" items={desserts.slice(0, 5)} />
          <List title="Popular drinks" items={drinks.slice(0, 5)} />
        </>
      )}
    </div>
  );
};
