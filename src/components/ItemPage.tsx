import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchByCategory,
  fetchProductById,
  type ListItemData,
} from "../api/products";
import { useCartStore } from "../stores/useCartStore";
import { useFavoriteStore } from "../stores/useFavoriteStore";
import { IconButton } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { List } from "./MainPage/List/List";

export const ItemPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState<ListItemData | null>(null);
  const cartItem = useCartStore((state) => state.cart[Number(id)]);
  const quantity = cartItem?.quantity ?? 0;
  const addToCart = useCartStore((state) => state.addToCart);
  const increment = useCartStore((state) => state.increment);
  const decrement = useCartStore((state) => state.decrement);
  const liked = useFavoriteStore((state) =>
    state.favorites.some((fav) => fav.id === Number(id)),
  );
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);
  const [related, setRelated] = useState<ListItemData[]>([]);
  const [loadingRelated, setLoadingRelated] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    fetchProductById(Number(id)).then((data) => {
      if (data) setItem(data);
    });
  }, [id]);

  useEffect(() => {
    if (!item) return;

    fetchByCategory(item.category).then((data) => {
      setRelated(data.filter((el) => el.id !== item.id));
      setLoadingRelated(false);
    });
  }, [item]);

  if (!item)
    return (
      <div className="container px-4 py-10!">
        <LinearProgress
          sx={{
            backgroundColor: "#f07e20",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#ffa734",
            },
          }}
        />
      </div>
    );

  return (
    <div className="container flex flex-col gap-10 py-1">
      <div className="flex gap-5 mt-10 px-3">
        <div className="relative">
          {item.discount > 0 && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
              DISCOUNT
            </span>
          )}
          <img src={item.img} alt={item.name} className="w-80" />
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold m-0">{item.name}</h1>
          <div className="flex gap-4 items-center">
            <div className="flex flex-col leading-tight">
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
            {quantity > 0 ? (
              <div className="flex items-center border rounded overflow-hidden w-31.5 h-10">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    decrement(item.id);
                  }}
                  className="h-full w-10.5 bg-[#ec992c] hover:bg-[#fab75f]"
                >
                  <span className="text-2xl font-bold leading-none">−</span>
                </button>
                <span className="text-[18px] text-center w-10.5 font-bold">
                  {quantity}
                </span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    increment(item.id);
                  }}
                  className="h-full w-10.5 bg-[#ec992c] hover:bg-[#fab75f]"
                >
                  <span className="text-2xl font-bold leading-none">+</span>
                </button>
              </div>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(item);
                }}
                className="bg-[#f07e20] hover:bg-[#ffa734] text-white text-[16px] py-2 px-3 w-31.5 rounded cursor-pointer transition-colors"
              >
                Add to cart
              </button>
            )}
            <div className="flex items-center">
              <IconButton
                onClick={() => {
                  toggleFavorite(item);
                }}
                sx={{
                  "&:hover": { backgroundColor: "#ffe5d1" },
                }}
              >
                {liked ? (
                  <FavoriteIcon sx={{ color: "red" }} />
                ) : (
                  <FavoriteBorderIcon sx={{ color: "gray" }} />
                )}
              </IconButton>
              <p
                className={
                  liked ? "text-red-500 text-[18px] m-0" : "text-[18px] m-0"
                }
              >
                {liked ? "In favorites" : "Add to favorites"}
              </p>
            </div>
          </div>
          {item.ingredients && (
            <div className="flex gap-2">
              <p className="font-bold m-0">Ingredients:</p>
              <p className="text-gray-600 m-0">{item.ingredients}</p>
            </div>
          )}
          <p className="font-bold">{item.size}</p>
        </div>
      </div>
      {loadingRelated ? (
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
        <List title={`More ${item.category}`} items={related.slice(0, 5)} />
      )}
    </div>
  );
};
