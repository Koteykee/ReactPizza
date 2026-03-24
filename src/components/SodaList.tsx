import { ListItem } from "./ListItem";
import Soda13 from "../assets/Soda13.png";
import Soda14 from "../assets/Soda14.png";
import Soda15 from "../assets/Soda15.png";
import Soda16 from "../assets/Soda16.png";
import Soda17 from "../assets/Soda17.png";
import Soda18 from "../assets/Soda18.png";

export const SodaList = () => {
  const sodas = [
    {
      id: 13,
      img: Soda13,
      name: "Coca Cola",
      cost: 2,
      discount: 0,
    },
    {
      id: 14,
      img: Soda14,
      name: "Coca Cola Zero",
      cost: 2,
      discount: 0,
    },
    {
      id: 15,
      img: Soda15,
      name: "Pepsi Cola",
      cost: 2,
      discount: 0,
    },
    {
      id: 16,
      img: Soda16,
      name: "Dr. Pepper",
      cost: 2,
      discount: 0,
    },
    {
      id: 17,
      img: Soda17,
      name: "Fanta",
      cost: 2,
      discount: 0,
    },
    {
      id: 18,
      img: Soda18,
      name: "Sprite",
      cost: 3,
      discount: 1,
    },
  ];

  return (
    <div className="container">
      <h2 className="text-[26px] font-bold my-5">Popular sodas</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 justify-items-center mb-10">
        {sodas.slice(0, 5).map((soda) => (
          <ListItem key={soda.id} item={soda} />
        ))}
      </div>
    </div>
  );
};
