import { ListItem } from "./ListItem";
import Cake7 from "../assets/Cake7.png";
import Cake8 from "../assets/Cake8.png";
import Cake9 from "../assets/Cake9.png";
import Cake10 from "../assets/Cake10.png";
import Cake11 from "../assets/Cake11.png";
import Cake12 from "../assets/Cake12.png";

export const DessertsList = () => {
  const desserts = [
    {
      id: 7,
      img: Cake7,
      name: "Cherry Cheesecake",
      cost: 8,
      discount: 0,
    },
    {
      id: 8,
      img: Cake8,
      name: "Red Velvet Cake",
      cost: 7,
      discount: 0,
    },
    {
      id: 9,
      img: Cake9,
      name: "Chocolate Cake",
      cost: 6,
      discount: 0,
    },
    {
      id: 10,
      img: Cake10,
      name: "Raspberry Tartlet",
      cost: 7,
      discount: 0,
    },
    {
      id: 11,
      img: Cake11,
      name: "Fruit Tartlet",
      cost: 8,
      discount: 2,
    },
    {
      id: 12,
      img: Cake12,
      name: "Cheesecake Tartlet",
      cost: 6,
      discount: 0,
    },
  ];

  return (
    <div className="container">
      <h2 className="text-[26px] font-bold my-5">Popular desserts</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 justify-items-center">
        {desserts.slice(0, 5).map((dessert) => (
          <ListItem key={dessert.id} item={dessert} />
        ))}
      </div>
    </div>
  );
};
