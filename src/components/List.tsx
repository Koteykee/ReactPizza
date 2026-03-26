import type { ListItemData } from "../api/products";
import { ListItem } from "./ListItem";

interface ListProps {
  title: string;
  items: ListItemData[];
}

export const List = ({ title, items }: ListProps) => {
  return (
    <div className="container">
      <h2 className="text-[26px] font-bold">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 justify-items-center my-5">
        {items.map((item) => (
          <ListItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
