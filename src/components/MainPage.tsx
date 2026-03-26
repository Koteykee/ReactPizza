import { CarouselElement } from "./CarouselElement";
import { DessertsList } from "./DessertsList";
import { PizzaList } from "./PizzaList";
import { DrinksList } from "./DrinksList";

export const MainPage = () => {
  return (
    <div className="container py-1">
      <div className="my-10">
        <CarouselElement />
      </div>
      <PizzaList />
      <DessertsList />
      <DrinksList />
    </div>
  );
};
