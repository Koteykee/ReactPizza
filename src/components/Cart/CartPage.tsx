import { useCartStore } from "../../stores/useCartStore";
import { CartItem } from "./CartItem";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export const CartPage = () => {
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalItems = Object.values(cart).reduce(
    (sum, { quantity }) => sum + quantity,
    0,
  );
  const totalPrice = Object.values(cart).reduce(
    (sum, { item, quantity }) =>
      sum + (item.price - (item.discount ?? 0)) * quantity,
    0,
  );

  if (!cart || Object.keys(cart).length === 0) {
    return <div className="pt-10 text-center text-2xl">Your cart is empty</div>;
  }

  return (
    <div className="container">
      <div className="pt-10 mx-3 flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Cart</h2>
        <button
          onClick={clearCart}
          className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors"
        >
          <DeleteOutlineIcon />
          Clear cart
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {Object.values(cart)
          .filter((entry) => entry?.item)
          .map(({ item }) => (
            <CartItem key={item.id} item={item} />
          ))}
      </div>
      <div className="mt-5 mb-2 flex justify-between">
        <p className="text-2xl">
          Products in cart: <span className="font-bold">{totalItems}</span>
        </p>
        <p className="text-2xl">
          Total price: <span className="font-bold">{totalPrice}$</span>
        </p>
      </div>
      <div className="flex justify-end">
        <button className="bg-[#f07e20] hover:bg-[#ffa734] text-white text-[16px] font-bold py-2 px-3 mb-5 w-31.5 rounded cursor-pointer transition-colors">
          Order Now
        </button>
      </div>
    </div>
  );
};
