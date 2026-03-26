import { useCartStore } from "../stores/useCartStore";
import { ListItem } from "../components/ListItem";

export const CartPage = () => {
  const cart = useCartStore((state) => state.cart);

  if (!cart || Object.keys(cart).length === 0) {
    return <div className="pt-10 text-center text-lg">Your cart is empty</div>;
  }

  return (
    <div className="pt-10 container grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {Object.values(cart)
        .filter((entry) => entry?.item)
        .map(({ item }) => (
          <ListItem key={item.id} item={item} />
        ))}
    </div>
  );
};
