import Pizza1 from "../assets/Pizza1.png";
import Pizza2 from "../assets/Pizza2.png";
import Pizza3 from "../assets/Pizza3.png";
import Pizza4 from "../assets/Pizza4.png";
import Pizza5 from "../assets/Pizza5.png";
import Pizza6 from "../assets/Pizza6.png";
import Cake7 from "../assets/Cake7.png";
import Cake8 from "../assets/Cake8.png";
import Cake9 from "../assets/Cake9.png";
import Cake10 from "../assets/Cake10.png";
import Cake11 from "../assets/Cake11.png";
import Cake12 from "../assets/Cake12.png";
import Soda13 from "../assets/Soda13.png";
import Soda14 from "../assets/Soda14.png";
import Soda15 from "../assets/Soda15.png";
import Soda16 from "../assets/Soda16.png";
import Soda17 from "../assets/Soda17.png";
import Soda18 from "../assets/Soda18.png";

type Category = "pizza" | "desserts" | "drinks";

export interface ListItemData {
  id: number;
  img: string;
  name: string;
  ingredients?: string;
  price: number;
  discount: number;
  category: Category;
}

const pizzas: ListItemData[] = [
  {
    id: 1,
    category: "pizza",
    img: Pizza1,
    name: "Spinach & Tomato",
    ingredients: "mozzarella cheese, cherry tomatoes, spinach",
    price: 18,
    discount: 0,
  },
  {
    id: 2,
    category: "pizza",
    img: Pizza2,
    name: "Herb Chicken",
    ingredients: "mozzarella cheese, chicken, parsley",
    price: 20,
    discount: 2,
  },
  {
    id: 3,
    category: "pizza",
    img: Pizza3,
    name: "Chicken Pepperoni",
    ingredients: "mozzarella cheese, chicken, pepperoni, bell pepper",
    price: 22,
    discount: 0,
  },
  {
    id: 4,
    category: "pizza",
    img: Pizza4,
    name: "Sweet & Sour Chicken",
    ingredients: "mozzarella cheese, chicken, sweet and sour sauce, parsley",
    price: 22,
    discount: 2,
  },
  {
    id: 5,
    category: "pizza",
    img: Pizza5,
    name: "Hawaiian",
    ingredients: "mozzarella cheese, pineapple",
    price: 16,
    discount: 0,
  },
  {
    id: 6,
    category: "pizza",
    img: Pizza6,
    name: "Chicken & Mushroom",
    ingredients:
      "mozzarella cheese, chicken, mushrooms, cherry tomatoes, green onions",
    price: 18,
    discount: 0,
  },
];

const desserts: ListItemData[] = [
  {
    id: 7,
    category: "desserts",
    img: Cake7,
    name: "Cherry Cheesecake",
    price: 8,
    discount: 0,
  },
  {
    id: 8,
    category: "desserts",
    img: Cake8,
    name: "Red Velvet Cake",
    price: 7,
    discount: 0,
  },
  {
    id: 9,
    category: "desserts",
    img: Cake9,
    name: "Chocolate Cake",
    price: 6,
    discount: 0,
  },
  {
    id: 10,
    category: "desserts",
    img: Cake10,
    name: "Raspberry Tartlet",
    price: 7,
    discount: 0,
  },
  {
    id: 11,
    category: "desserts",
    img: Cake11,
    name: "Fruit Tartlet",
    price: 8,
    discount: 2,
  },
  {
    id: 12,
    category: "desserts",
    img: Cake12,
    name: "Cheesecake Tartlet",
    price: 6,
    discount: 0,
  },
];

const drinks: ListItemData[] = [
  {
    id: 13,
    category: "drinks",
    img: Soda13,
    name: "Coca Cola",
    price: 2,
    discount: 0,
  },
  {
    id: 14,
    category: "drinks",
    img: Soda14,
    name: "Coca Cola Zero",
    price: 2,
    discount: 0,
  },
  {
    id: 15,
    category: "drinks",
    img: Soda15,
    name: "Pepsi Cola",
    price: 2,
    discount: 0,
  },
  {
    id: 16,
    category: "drinks",
    img: Soda16,
    name: "Dr. Pepper",
    price: 2,
    discount: 0,
  },
  {
    id: 17,
    category: "drinks",
    img: Soda17,
    name: "Fanta",
    price: 2,
    discount: 0,
  },
  {
    id: 18,
    category: "drinks",
    img: Soda18,
    name: "Sprite",
    price: 3,
    discount: 1,
  },
];

const allProducts = [...pizzas, ...desserts, ...drinks];

export const fetchPizzas = (): Promise<ListItemData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(pizzas);
    }, 2000);
  });
};

export const fetchDesserts = (): Promise<ListItemData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(desserts);
    }, 2000);
  });
};

export const fetchDrinks = (): Promise<ListItemData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(drinks);
    }, 2000);
  });
};

export const fetchProductById = (
  id: number,
): Promise<ListItemData | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(allProducts.find((item) => item.id === id));
    }, 1000);
  });
};

export const fetchByCategory = (category: Category) => {
  return new Promise<ListItemData[]>((resolve) => {
    setTimeout(() => {
      resolve(allProducts.filter((item) => item.category === category));
    }, 500);
  });
};
