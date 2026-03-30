import { Link } from "react-router-dom";
import { useCartStore } from "../../stores/useCartStore";
import type { ListItemData } from "../../api/products";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface ListItemProps {
  item: ListItemData;
}

export const CartItem = ({ item }: ListItemProps) => {
  const cartItem = useCartStore((state) => state.cart[item.id]);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const increment = useCartStore((state) => state.increment);
  const decrement = useCartStore((state) => state.decrement);

  return (
    <Link
      to={`/itemPage/${item.id}`}
      style={{ textDecoration: "none" }}
      className="text-black"
    >
      <div className="relative p-2 bg-white shadow-md rounded-lg flex items-center justify-between">
        <div className="flex items-center gap-4">
          {item.discount > 0 && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
              DISCOUNT
            </span>
          )}

          <img src={item.img} alt={item.name} className="h-40 object-contain" />
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-[28px] my-1">{item.name}</p>
            {item.ingredients && (
              <p className="text-[18px] text-gray-600 my-0">
                {item.ingredients}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-5 mx-6">
          <div className="flex flex-col items-center leading-tight">
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
          {cartItem?.quantity > 0 ? (
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
                {cartItem.quantity}
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
          <div
            onClick={(e) => {
              e.preventDefault();
              removeFromCart(item.id);
            }}
            className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-red-500"
          >
            <DeleteOutlineIcon />
            <span className="text-sm">Delete</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
