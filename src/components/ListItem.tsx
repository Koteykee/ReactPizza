import { useFavoriteStore } from "../stores/useFavoriteStore";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import type { ListItemData } from "../api/products";

interface ListItemProps {
  item: ListItemData;
}

export const ListItem = ({ item }: ListItemProps) => {
  const liked = useFavoriteStore((state) =>
    state.favorites.some((fav) => fav.id === item.id),
  );

  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);

  return (
    <div className="relative w-56 p-2 bg-white shadow-md rounded-lg overflow-hidden flex flex-col justify-between h-full">
      <div className="flex flex-col items-center text-center">
        {item.discount > 0 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
            DISCOUNT
          </span>
        )}
        <IconButton
          onClick={() => toggleFavorite(item)}
          sx={{
            position: "absolute",
            top: 2,
            right: 2,
            zIndex: 10,
            "&:hover": { backgroundColor: "#ffe5d1" },
          }}
        >
          {liked ? (
            <FavoriteIcon sx={{ color: "red" }} />
          ) : (
            <FavoriteBorderIcon sx={{ color: "gray" }} />
          )}
        </IconButton>
        <img
          src={item.img}
          alt={item.name}
          className="w-full h-40 object-contain"
        />
        <p className="font-semibold text-[18px] leading-tight my-1">
          {item.name}
        </p>
        {item.ingredients && (
          <p className="text-[14px] text-gray-600 my-0">{item.ingredients}</p>
        )}
      </div>
      <div className="flex items-end justify-evenly">
        <div className="flex flex-col leading-tight">
          <p className="text-[15px] text-gray-600 my-1">Price:</p>
          {item.discount > 0 ? (
            <>
              <p className="text-gray-400 line-through text-[16px] my-0">
                {item.price}$
              </p>
              <p className="text-red-500 font-bold text-[20px] my-0">
                {item.price - item.discount}$
              </p>
            </>
          ) : (
            <p className="font-bold text-[20px] my-1">{item.price}$</p>
          )}
        </div>
        <button className="bg-[#f07e20] hover:bg-[#ffa734] text-white text-[16px] py-2 px-4 rounded cursor-pointer transition-colors">
          Add to cart
        </button>
      </div>
    </div>
  );
};
