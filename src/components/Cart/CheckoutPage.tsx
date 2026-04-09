import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { useCartStore } from "../../stores/useCartStore";
import { CheckoutItem } from "./CheckoutItem";
import { checkoutSchema, type CheckoutFormData } from "./checkout.schema";

export const CheckoutPage = () => {
  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors, isValid },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: "onChange",
  });
  const [selected, setSelected] = useState<string>("Card online");
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState<
    "now" | "deliverBy"
  >("now");
  const [promoStatus, setPromoStatus] = useState<"idle" | "success" | "error">(
    "idle",
  );
  const promocodes: Record<string, { discount: number; message?: string }> = {
    MINUS10: { discount: 10, message: "Promo applied" },
    SUMMER5: { discount: 5, message: "Summer discount!" },
  };
  const [promoMessage, setPromoMessage] = useState<string>("");
  const cart = useCartStore((state) => state.cart);
  const subtotal = useMemo(() => {
    return Object.values(cart).reduce(
      (sum, { item, quantity }) =>
        sum + (item.price - (item.discount ?? 0)) * quantity,
      0,
    );
  }, [cart]);
  const discount =
    promoStatus === "success" && getValues("promo")
      ? promocodes[getValues("promo")!.toUpperCase()].discount
      : 0;
  const isFreeDelivery = subtotal - discount >= 25;
  const deliveryPrice = isFreeDelivery ? 0 : 5;
  const totalPrice = subtotal + deliveryPrice - discount;
  const [now, setNow] = useState(dayjs());
  const minDateTime = now.add(1, "hour");
  const maxDateTime = now.add(7, "day");
  const [initialDate] = useState(() => {
    const now = dayjs();
    const nextHour = now.add(1, "hour");
    const roundedMinutes = Math.ceil(nextHour.minute() / 15) * 15;
    return nextHour.minute(roundedMinutes).second(0);
  });
  const [date, setDate] = useState<dayjs.Dayjs>(initialDate);
  const [muiError, setMuiError] = useState<string | null>(null);
  const [dateError, setDateError] = useState<boolean>(false);
  const hasError =
    selectedDeliveryTime === "deliverBy" && (!!muiError || dateError);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(dayjs());
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const isDeliveryTimeValid = (selectedDate: dayjs.Dayjs) => {
    const hour = selectedDate.hour();

    return (
      selectedDate.isAfter(minDateTime) &&
      selectedDate.isBefore(maxDateTime) &&
      hour >= 11 &&
      hour <= 22
    );
  };

  const handleApplyPromo = async () => {
    const isValid = await trigger("promo");
    if (!isValid) return;

    const promo = getValues("promo")?.toUpperCase();

    if (promo && promocodes[promo]) {
      setPromoStatus("success");
      setPromoMessage(promocodes[promo].message || "Promo applied");
    } else {
      setPromoStatus("error");
      setPromoMessage("Invalid promo");
    }
  };

  const onSubmit = () => {
    if (selectedDeliveryTime === "deliverBy" && !isDeliveryTimeValid(date)) {
      setDateError(true);
      alert("Invalid delivery time!");
      return;
    }
    setDateError(false);
    alert("Successes");
  };

  useEffect(() => {
    trigger();
  }, [trigger]);

  useEffect(() => {
    if (selectedDeliveryTime === "deliverBy") {
      setDateError(!isDeliveryTimeValid(date));
    }
  }, [date, now, selectedDeliveryTime]);

  if (Object.keys(cart).length === 0) {
    return <div className="pt-10 text-center text-2xl">Your cart is empty</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container">
      <h2 className="px-2.5 pt-10 pb-4">Checkout</h2>
      <div className="flex gap-3 justify-between pb-10">
        <div className="bg-white p-4 rounded-2xl w-full">
          <p className="text-[18px] font-bold">My info</p>
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
            sx={{ mt: 2 }}
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
          <TextField
            label="Delivery instructions"
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
            {...register("instructions")}
            error={!!errors.instructions}
          />
          <p className="mt-3 text-[18px] font-bold">Delivery time</p>
          <div className="inline-flex gap-3">
            <button
              type="button"
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
              type="button"
              className={`px-4 py-2 font-medium rounded transition duration-200 ${
                selectedDeliveryTime === "deliverBy"
                  ? "bg-[#f07e20] text-white"
                  : "bg-[#eeeeee]"
              }`}
              onClick={() => setSelectedDeliveryTime("deliverBy")}
            >
              Deliver by
            </button>
            {selectedDeliveryTime === "deliverBy" && (
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="en-gb"
              >
                <DateTimePicker
                  label="Date & time"
                  value={date}
                  minDateTime={minDateTime}
                  maxDateTime={maxDateTime}
                  shouldDisableTime={(time, view) => {
                    if (view === "hours") {
                      const hour = time.hour();
                      return hour < 11 || hour > 22;
                    }
                    return false;
                  }}
                  minutesStep={15}
                  onChange={(newValue) => {
                    if (newValue) {
                      setDate(newValue);
                    }
                  }}
                  onError={(reason) => {
                    setMuiError(reason);
                  }}
                  slotProps={{
                    textField: {
                      error: hasError,
                      helperText: hasError
                        ? dateError
                          ? "Invalid delivery time"
                          : "Invalid date or time"
                        : "",
                    },
                    popper: {
                      sx: {
                        "& .Mui-selected": {
                          backgroundColor: "#f07e20 !important",
                          color: "#fff !important",
                        },
                        "& .MuiPickersDay-root:hover": {
                          backgroundColor: "#f07e20 !important",
                          color: "#fff !important",
                        },
                        "& .Mui-selected:hover": {
                          backgroundColor: "#ffa734 !important",
                        },
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            )}
          </div>
          <p className="mt-3 text-[18px] font-bold">Payment method</p>
          <FormControl fullWidth>
            <InputLabel id="payment-label">Choose payment method</InputLabel>
            <Select
              labelId="payment-label"
              id="payment"
              value={selected}
              label="Choose payment method"
              onChange={(e) => setSelected(e.target.value)}
            >
              <MenuItem value={"Cash"}>Cash</MenuItem>
              <MenuItem value={"Card online"}>Card online</MenuItem>
              <MenuItem value={"Card on delivery"}>Card on delivery</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Email for receipt"
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
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
          <div className="flex gap-4 mt-3">
            <TextField
              label="Promo code"
              variant="outlined"
              fullWidth
              {...register("promo")}
              onChange={() => setPromoStatus("idle")}
            />
            <button
              type="button"
              onClick={handleApplyPromo}
              className="px-4 py-2 font-medium rounded bg-[#f07e20] hover:bg-[#ffa734] text-white"
            >
              Apply
            </button>
          </div>
          {promoStatus !== "idle" && (
            <div
              className={`text-[16px] mt-1 ${
                promoStatus === "success" ? "text-green-600" : "text-red-500"
              }`}
            >
              {promoMessage}
            </div>
          )}
          <div className="flex justify-between mt-3">
            <p>Subtotal</p>
            <p>{subtotal}$</p>
          </div>
          {promoStatus === "success" && (
            <div className="flex justify-between">
              <p>Promo code</p>
              <p className="text-red-500">-{discount}$</p>
            </div>
          )}
          <div className="flex justify-between">
            <p>Delivery</p>
            <p className={isFreeDelivery ? "text-green-600" : ""}>
              {isFreeDelivery ? "Free" : `${deliveryPrice}$`}
            </p>
          </div>
          <div className="border-t border-gray-200"></div>
          <div className="flex justify-between mt-3">
            <p className="font-medium text-[20px]">Total</p>
            <p className="font-medium text-[20px]">{totalPrice}$</p>
          </div>
          <button
            type="submit"
            disabled={
              !isValid || (selectedDeliveryTime === "deliverBy" && dateError)
            }
            className={`text-center w-full px-4 py-2 font-medium rounded ${
              !isValid || (selectedDeliveryTime === "deliverBy" && dateError)
                ? "bg-[#d3d3d3] cursor-not-allowed"
                : "bg-[#f07e20] hover:bg-[#ffa734] text-white"
            }`}
          >
            Order
          </button>
        </div>
      </div>
    </form>
  );
};
