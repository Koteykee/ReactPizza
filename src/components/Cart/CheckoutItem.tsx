import { Link } from "react-router-dom";
import { useCartStore } from "../../stores/useCartStore";
import type { ListItemData } from "../../api/products";

interface ListItemProps {
  item: ListItemData;
}

export const CheckoutItem = ({ item }: ListItemProps) => {
  const cartItem = useCartStore((state) => state.cart[item.id]);

  return (
    <Link
      to={`/itemPage/${item.id}`}
      style={{ textDecoration: "none" }}
      className="text-black"
    >
      <div className="relative p-2 bg-white shadow-md rounded-lg flex items-center justify-between">
        <div className="flex items-center gap-4">
          {item.discount > 0 && (
            <span className="absolute top-1 left-1 bg-red-500 text-white text-[8px] px-2 py-1 rounded z-10">
              DISCOUNT
            </span>
          )}
          <img src={item.img} alt={item.name} className="h-20 object-contain" />
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-[18px] my-1">{item.name}</p>
            <p>Quantity: {cartItem.quantity}</p>
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
        </div>
      </div>
    </Link>
  );
};
