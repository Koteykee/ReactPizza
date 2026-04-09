import { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { fetchDesserts, type ListItemData } from "../../api/products";
import { List } from ".././MainPage/List/List";

export const DessertsMenu = () => {
  const [desserts, setDesserts] = useState<ListItemData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchDesserts().then((data) => {
      setDesserts(data);
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
        <List title="Desserts" items={desserts} />
      )}
    </div>
  );
};
