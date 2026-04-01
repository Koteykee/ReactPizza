import { useState } from "react";
import { useCartStore } from "../../stores/useCartStore";
import { CheckoutItem } from "./CheckoutItem";

export const CheckoutPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("Choose payment method");
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState<
    "now" | "deliverBy"
  >("now");
  const options = ["Cash", "Card online", "Card to delivery"];
  const cart = useCartStore((state) => state.cart);
  const productsPrice = Object.values(cart).reduce(
    (sum, { item, quantity }) =>
      sum + (item.price - (item.discount ?? 0)) * quantity,
    0,
  );
  const deliveryPrice = 5;
  const totalPrice = productsPrice + deliveryPrice;

  return (
    <div className="container">
      <h2 className="px-2.5 pt-10 pb-4">Checkout</h2>
      <div className="flex gap-3 justify-between">
        <div className="bg-white p-4 rounded-2xl w-full">
          <input
            type="text"
            placeholder="Your name"
            className="bg-[#eeeeee] w-full rounded px-3 py-1"
          />
          <p className="mt-3 text-[18px] font-bold">My address</p>
          <input
            type="text"
            placeholder="Enter address"
            className="bg-[#eeeeee] w-full rounded px-3 py-1"
          />
          <div className="flex gap-3 my-3">
            <input
              type="text"
              placeholder="Apartment"
              className="bg-[#eeeeee] rounded px-3 py-1"
            />
            <input
              type="text"
              placeholder="Entrance"
              className="bg-[#eeeeee] rounded px-3 py-1"
            />
            <input
              type="text"
              placeholder="Floor"
              className="bg-[#eeeeee] rounded px-3 py-1"
            />
          </div>
          <input
            type="text"
            placeholder="Intercom"
            className="bg-[#eeeeee] w-full rounded px-3 py-1"
          />
          <input
            type="text"
            placeholder="Delivery instructions"
            className="bg-[#eeeeee] w-full rounded px-3 py-1 mt-3"
          />
          <p className="mt-3 text-[18px] font-bold">Delivery time</p>
          <div className="inline-flex gap-3">
            <button
              className={`px-4 py-2 font-medium rounded transition duration-200 ${
                selectedDeliveryTime === "now"
                  ? "bg-[#f07e20] text-white"
                  : "bg-[#eeeeee]"
              }`}
              onClick={() => setSelectedDeliveryTime("now")}
            >
              Now
            </button>
            <button
              className={`px-4 py-2 font-medium rounded transition duration-200 ${
                selectedDeliveryTime === "deliverBy"
                  ? "bg-[#f07e20] text-white"
                  : "bg-[#eeeeee]"
              }`}
              onClick={() => setSelectedDeliveryTime("deliverBy")}
            >
              Deliver by
            </button>
          </div>
          <p className="mt-3 text-[18px] font-bold">Payment method</p>
          <div
            className="flex justify-between items-center bg-[#eeeeee] px-3 py-1 rounded cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span>{selected}</span>
            <span>{isOpen ? "▲" : "▼"}</span>
          </div>
          {isOpen && (
            <div className="bg-white border rounded shadow-md">
              {options.map((option) => (
                <div
                  key={option}
                  className="px-3 py-2 hover:bg-[#f07e20] hover:text-white cursor-pointer"
                  onClick={() => {
                    setSelected(option);
                    setIsOpen(false);
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
          <input
            type="text"
            placeholder="Email for receipt"
            className="bg-[#eeeeee] w-full rounded px-3 py-1 mt-3"
          />
        </div>
        <div className="bg-white p-4 rounded-2xl w-full">
          <p className="text-[18px] font-bold">Your order</p>
          <div className="flex flex-col gap-4 mx-2.5">
            {Object.values(cart)
              .filter((entry) => entry?.item)
              .map(({ item }) => (
                <CheckoutItem key={item.id} item={item} />
              ))}
          </div>
          <div className="flex gap-4 my-3">
            <input
              type="text"
              placeholder="Promocode"
              className="bg-[#eeeeee] w-full rounded px-3 py-1"
            />
            <button className="px-4 py-2 font-medium rounded bg-[#f07e20] hover:bg-[#ffa734] text-white">
              Apply
            </button>
          </div>
          <div className="flex justify-between">
            <p>Products price</p>
            <p>{productsPrice}$</p>
          </div>
          <div className="flex justify-between">
            <p>Delivery price</p>
            <p>{deliveryPrice}$</p>
          </div>
          <div className="border-t border-gray-200"></div>
          <div className="flex justify-between mt-3">
            <p className="font-medium text-[20px]">Total price</p>
            <p className="font-medium text-[20px]">{totalPrice}$</p>
          </div>
          <button className="text-center w-full px-4 py-2 font-medium rounded bg-[#f07e20] hover:bg-[#ffa734] text-white">
            Order
          </button>
        </div>
      </div>
    </div>
  );
};
