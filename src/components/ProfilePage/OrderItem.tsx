import type { ListItemData } from "../../api/products";
import type { Order } from "../../stores/useOrderStore";

interface OrderItemProps {
  order: Order;
  products: ListItemData[];
}

export const OrderItem = ({ order, products }: OrderItemProps) => {
  const productsMap: Record<number, ListItemData> = Object.fromEntries(
    products.map((p) => [p.id, p]),
  );

  return (
    <div className="border py-3 px-4 rounded">
      <p className="font-medium">Order #{order.id}</p>
      {order.items.map((item) => {
        const product = productsMap[item.productId];
        return (
          <div key={item.id} className="flex items-center justify-between">
            {product && (
              <>
                <div className="flex items-center gap-3">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-10 h-10"
                  />
                  <div>{product.name}</div>
                </div>
                <div className="w-[15%]">
                  Price: {item.quantity} × {item.price}$ ={" "}
                  {item.quantity * item.price}$
                </div>
              </>
            )}
          </div>
        );
      })}
      <p className="font-bold mt-3 mb-0">Total: {order.total}$</p>
      <p className="text-sm m-0 text-gray-500">
        {new Date(order.createdAt).toLocaleString()}
      </p>
    </div>
  );
};
