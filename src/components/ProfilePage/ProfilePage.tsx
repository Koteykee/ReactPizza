import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "@mui/material/TextField";
import { useAuthStore } from "../../stores/useAuthStore";
import { useUserStore } from "../../stores/useUserStore";
import { profileSchema, type ProfileFormData } from "./profile.schema";
import { useOrderStore } from "../../stores/useOrderStore";
import { fetchProductById, type ListItemData } from "../../api/products";
import { OrderItem } from "./OrderItem";

export const ProfilePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const currentUserId = useAuthStore((s) => s.currentUserId);
  const getUserProfile = useUserStore((s) => s.getUserProfile);
  const updateUser = useUserStore((s) => s.updateUserProfile);

  useEffect(() => {
    if (!currentUserId) return;

    const user = getUserProfile(currentUserId);

    if (user) {
      reset({
        name: user.name,
        phone: user.phone,
        address: user.address,
        apartment: user.apartment,
        entrance: user.entrance,
        floor: user.floor,
        intercom: user.intercom,
      });
    }
  }, [currentUserId]);

  const onSubmit = (data: ProfileFormData) => {
    if (!currentUserId) return;
    updateUser(currentUserId, data);
    setIsEditing(false);
    alert("Saved!");
  };

  const getUserOrders = useOrderStore((s) => s.getUserOrders);
  const orders = currentUserId ? getUserOrders(currentUserId) : [];
  const [productsList, setProductsList] = useState<ListItemData[]>([]);

  useEffect(() => {
    if (!orders || orders.length === 0) return;

    const loadProducts = async () => {
      const idList = orders.flatMap((order) =>
        order.items.map((item) => item.productId),
      );

      const products = await Promise.all(
        idList.map((id) => fetchProductById(id)),
      );

      const validProducts = products.filter(Boolean) as ListItemData[];

      setProductsList(validProducts);
    };

    loadProducts();
  }, [orders]);

  return (
    <div className="container py-1">
      <h2 className="px-2.5 pt-10 pb-4">My Profile</h2>
      <form className="flex gap-3 justify-between pb-10">
        <div className="bg-white p-4 rounded-2xl w-full">
          <div className="flex justify-between items-center mb-3">
            <p className="text-[18px] font-bold mb-0">My info</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  if (isEditing) {
                    handleSubmit(onSubmit)();
                  } else {
                    setIsEditing(true);
                  }
                }}
                className="px-4 py-2 font-medium rounded transition duration-200
                  bg-[#f07e20] text-white hover:bg-[#ffa734]"
              >
                {isEditing ? "Save" : "Edit"}
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    const user = getUserProfile(currentUserId!);
                    if (user) reset(user);
                  }}
                  className="px-4 py-2 font-medium rounded transition duration-200
                  bg-[#f07e20] text-white hover:bg-[#ffa734]"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
          <TextField
            label="Your name"
            variant="outlined"
            fullWidth
            disabled={!isEditing}
            sx={{
              "& .MuiInputBase-root.Mui-disabled": {
                backgroundColor: "#eeeeee",
              },
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "#4b4b4b",
                opacity: 1,
              },
            }}
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            label="Phone"
            variant="outlined"
            fullWidth
            disabled={!isEditing}
            sx={{
              mt: 2,
              "& .MuiInputBase-root.Mui-disabled": {
                backgroundColor: "#eeeeee",
              },
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "#4b4b4b",
                opacity: 1,
              },
            }}
            {...register("phone")}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
          <p className="mt-3 text-[18px] font-bold">My address</p>
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            disabled={!isEditing}
            sx={{
              "& .MuiInputBase-root.Mui-disabled": {
                backgroundColor: "#eeeeee",
              },
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "#4b4b4b",
                opacity: 1,
              },
            }}
            {...register("address")}
            error={!!errors.address}
            helperText={errors.address?.message}
          />
          <div className="flex gap-3 mt-3">
            <TextField
              label="Apartment"
              variant="outlined"
              fullWidth
              disabled={!isEditing}
              sx={{
                "& .MuiInputBase-root.Mui-disabled": {
                  backgroundColor: "#eeeeee",
                },
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "#4b4b4b",
                  opacity: 1,
                },
              }}
              {...register("apartment")}
              error={!!errors.apartment}
              helperText={errors.apartment?.message}
            />
            <TextField
              label="Entrance"
              variant="outlined"
              fullWidth
              disabled={!isEditing}
              sx={{
                "& .MuiInputBase-root.Mui-disabled": {
                  backgroundColor: "#eeeeee",
                },
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "#4b4b4b",
                  opacity: 1,
                },
              }}
              {...register("entrance")}
              error={!!errors.entrance}
            />
            <TextField
              label="Floor"
              variant="outlined"
              fullWidth
              disabled={!isEditing}
              sx={{
                "& .MuiInputBase-root.Mui-disabled": {
                  backgroundColor: "#eeeeee",
                },
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "#4b4b4b",
                  opacity: 1,
                },
              }}
              {...register("floor")}
              error={!!errors.floor}
            />
          </div>
          <TextField
            label="Intercom"
            variant="outlined"
            fullWidth
            disabled={!isEditing}
            sx={{
              mt: 2,
              "& .MuiInputBase-root.Mui-disabled": {
                backgroundColor: "#eeeeee",
              },
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "#4b4b4b",
                opacity: 1,
              },
            }}
            {...register("intercom")}
            error={!!errors.intercom}
          />
        </div>
      </form>
      <h2 className="px-2.5 pb-4">Order history</h2>
      <div className="bg-white p-3 rounded-2xl w-full mb-5">
        <div className="flex flex-col gap-4 mx-2.5">
          {orders.length === 0 && <p>No orders yet</p>}
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} products={productsList} />
          ))}
        </div>
      </div>
    </div>
  );
};
