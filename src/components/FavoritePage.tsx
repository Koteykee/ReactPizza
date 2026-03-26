import { useFavoriteStore } from "../stores/useFavoriteStore";
import { List } from "./List";

export const FavoritePage = () => {
  const favorite = useFavoriteStore((state) => state.favorites);

  return (
    <div className="pt-10">
      <List title="Your favorites" items={favorite} />
    </div>
  );
};
