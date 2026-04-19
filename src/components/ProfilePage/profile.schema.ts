import { z } from "zod";

export const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .max(30, { message: "Name must be at most 30 characters" })
    .optional(),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s\-()]{7,20}$/, {
      message: "Invalid phone number",
    })
    .optional(),
  address: z
    .string()
    .trim()
    .max(60, { message: "Address must be at most 60 characters" })
    .optional(),
  apartment: z
    .string()
    .trim()
    .max(10, { message: "Apartment must be at most 10 characters" })
    .optional(),
  entrance: z.string().trim().max(10).optional(),
  floor: z.string().trim().max(2).optional(),
  intercom: z.string().trim().max(10).optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
