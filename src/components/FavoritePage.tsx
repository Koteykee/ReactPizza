import { useFavoriteStore } from "../stores/useFavoriteStore";
import { List } from "./MainPage/List/List";
import DeleteIcon from "@mui/icons-material/Delete";

export const FavoritePage = () => {
  const favorite = useFavoriteStore((state) => state.favorites);
  const clearFavorites = useFavoriteStore((state) => state.clearFavorites);

  return (
    <div className="container py-1">
      <div className="pt-10 mx-3 flex items-center justify-between mb-4">
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
<<<<<<< HEAD
          <div className="text-2xl font-bold text-center">
=======
          <h2 className="text-2xl font-bold text-center">
>>>>>>> 8758cf94e9161a405a3a66749d508340659f550c
            You don't have any favorites yet.
          </div>
        )}
      </div>
      <List title="" items={favorite} />
    </div>
  );
};
