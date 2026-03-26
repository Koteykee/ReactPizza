import { useFavoriteStore } from "../stores/useFavoriteStore";
import { List } from "./List";
import DeleteIcon from "@mui/icons-material/Delete";

export const FavoritePage = () => {
  const favorite = useFavoriteStore((state) => state.favorites);
  const clearFavorites = useFavoriteStore((state) => state.clearFavorites);

  return (
    <div className="pt-10">
      <div className="container flex items-center justify-between mb-4">
        {favorite.length > 0 ? (
          <>
            <h2 className="text-2xl font-bold">Your favorites</h2>
            <button
              onClick={clearFavorites}
              className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors"
            >
              <DeleteIcon fontSize="small" />
              Clear all favorites
            </button>
          </>
        ) : (
          <h2 className="text-2xl font-bold">
            You don't have any favorites yet.
          </h2>
        )}
      </div>
      <List title="" items={favorite} />
    </div>
  );
};
