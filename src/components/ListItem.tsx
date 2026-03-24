interface ListItemData {
  id: number;
  img: string;
  name: string;
  ingredients?: string;
  cost: number;
  discount: number;
}

interface ListItemProps<T extends ListItemData> {
  item: T;
}

export const ListItem = <T extends ListItemData>({
  item,
}: ListItemProps<T>) => {
  return (
    <div className="relative w-54 p-2 bg-white shadow-md rounded-lg overflow-hidden flex flex-col justify-between h-full">
      <div className="flex flex-col items-center text-center">
        {item.discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
            DISCOUNT
          </span>
        )}
        <img
          src={item.img}
          alt={item.name}
          className="w-full h-40 object-contain"
        />
        <p className="font-semibold text-[18px] leading-tight mt-1">
          {item.name}
        </p>
        {item.ingredients && (
          <p className="text-[14px] text-gray-600 mt-1">{item.ingredients}</p>
        )}
      </div>
      <div className="flex items-end justify-evenly mt-1">
        <div className="flex flex-col leading-tight">
          <p className="text-[15px] text-gray-600">Cost:</p>
          {item.discount > 0 ? (
            <>
              <p className="text-gray-400 line-through text-[16px]">
                {item.cost}$
              </p>
              <p className="text-red-500 font-bold text-[20px]">
                {item.cost - item.discount}$
              </p>
            </>
          ) : (
            <p className="font-bold text-[20px]">{item.cost}$</p>
          )}
        </div>
        <button className="bg-[#f07e20] hover:bg-[#ffa734] text-white text-[16px] py-2 px-4 rounded cursor-pointer transition-colors">
          Add to cart
        </button>
      </div>
    </div>
  );
};
