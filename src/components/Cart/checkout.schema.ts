import { z } from "zod";

export const checkoutSchema = z.object({
  name: z
    .string()
    .trim()
    .max(30, { message: "Name must be at most 30 characters" })
    .nonempty("Name is required"),
  phone: z
    .string()
    .trim()
    .nonempty("Phone is required")
    .regex(/^\+?[0-9\s\-()]{7,20}$/, {
      message: "Invalid phone number",
    }),
  address: z
    .string()
    .trim()
    .max(60, { message: "Address must be at most 60 characters" })
    .nonempty("Address is required"),
  apartment: z
    .string()
    .trim()
    .max(10, { message: "Apartment must be at most 10 characters" })
    .nonempty("Apartment is required"),
  entrance: z.string().trim().max(10).optional(),
  floor: z.string().trim().max(2).optional(),
  intercom: z.string().trim().max(10).optional(),
  instructions: z.string().trim().max(50).optional(),
  email: z.string().trim().email("Invalid email").optional(),
  promo: z.string().trim().optional(),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
