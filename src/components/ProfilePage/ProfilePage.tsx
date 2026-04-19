import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "@mui/material/TextField";
import { useAuthStore } from "../../stores/useAuthStore";
import { useUserStore } from "../../stores/useUserStore";
import { profileSchema, type ProfileFormData } from "./profile.schema";

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
    alert("Saved!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container">
      <h2 className="px-2.5 pt-10 pb-4">My Profile</h2>
      <div className="flex gap-3 justify-between pb-10">
        <div className="bg-white p-4 rounded-2xl w-full">
          <div className="flex justify-between items-center mb-3">
            <p className="text-[18px] font-bold mb-0">My info</p>
            <button
              type="submit"
              className="px-4 py-2 font-medium rounded transition duration-200
                  bg-[#f07e20] text-white hover:bg-[#ffa734]"
            >
              Edit
            </button>
          </div>
          <TextField
            label="Your name"
            variant="outlined"
            fullWidth
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            label="Phone"
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
            {...register("phone")}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
          <p className="mt-3 text-[18px] font-bold">My address</p>
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            {...register("address")}
            error={!!errors.address}
            helperText={errors.address?.message}
          />
          <div className="flex gap-3 mt-3">
            <TextField
              label="Apartment"
              variant="outlined"
              fullWidth
              {...register("apartment")}
              error={!!errors.apartment}
              helperText={errors.apartment?.message}
            />
            <TextField
              label="Entrance"
              variant="outlined"
              fullWidth
              {...register("entrance")}
              error={!!errors.entrance}
            />
            <TextField
              label="Floor"
              variant="outlined"
              fullWidth
              {...register("floor")}
              error={!!errors.floor}
            />
          </div>
          <TextField
            label="Intercom"
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
            {...register("intercom")}
            error={!!errors.intercom}
          />
        </div>
      </div>
      {/* <div className="bg-white p-4 rounded-2xl w-full">
        <p className="text-[18px] font-bold">Order history</p>
        <div className="flex flex-col gap-4 mx-2.5">
            {Object.values(cart)
              .filter((entry) => entry?.item)
              .map(({ item }) => (
                <CheckoutItem key={item.id} item={item} />
              ))}
          </div>
      </div> */}
    </form>
  );
};
