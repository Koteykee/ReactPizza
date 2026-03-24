import { ListItem } from "./ListItem";
import Pizza1 from "../assets/Pizza1.png";
import Pizza2 from "../assets/Pizza2.png";
import Pizza3 from "../assets/Pizza3.png";
import Pizza4 from "../assets/Pizza4.png";
import Pizza5 from "../assets/Pizza5.png";
import Pizza6 from "../assets/Pizza6.png";

export const PizzaList = () => {
  const pizzas = [
    {
      id: 1,
      img: Pizza1,
      name: "Spinach & Tomato",
      ingredients: "mozzarella cheese, cherry tomatoes, spinach",
      cost: 18,
      discount: 0,
    },
    {
      id: 2,
      img: Pizza2,
      name: "Herb Chicken",
      ingredients: "mozzarella cheese, chicken, parsley",
      cost: 20,
      discount: 2,
    },
    {
      id: 3,
      img: Pizza3,
      name: "Chicken Pepperoni",
      ingredients: "mozzarella cheese, chicken, pepperoni, bell pepper",
      cost: 22,
      discount: 0,
    },
    {
      id: 4,
      img: Pizza4,
      name: "Sweet & Sour Chicken",
      ingredients: "mozzarella cheese, chicken, sweet and sour sauce, parsley",
      cost: 22,
      discount: 2,
    },
    {
      id: 5,
      img: Pizza5,
      name: "Hawaiian",
      ingredients: "mozzarella cheese, pineapple",
      cost: 16,
      discount: 0,
    },
    {
      id: 6,
      img: Pizza6,
      name: "Chicken & Mushroom",
      ingredients:
        "mozzarella cheese, chicken, mushrooms, cherry tomatoes, green onions",
      cost: 18,
      discount: 0,
    },
  ];

  return (
    <div className="container">
      <h2 className="text-[26px] font-bold mb-5">Popular pizza</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 justify-items-center">
        {pizzas.slice(0, 5).map((pizza) => (
          <ListItem key={pizza.id} item={pizza} />
        ))}
      </div>
    </div>
  );
};
