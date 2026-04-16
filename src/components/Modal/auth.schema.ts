import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email("Invalid email").nonempty("Email is required"),
  password: z
    .string()
    .trim()
    .min(4, { message: "Password must be at least 4 characters" })
    .max(30, { message: "Password must be at most 30 characters" })
    .nonempty("Password is required"),
});

export const registrationSchema = z
  .object({
    email: z
      .string()
      .trim()
      .email("Invalid email")
      .nonempty("Email is required"),
    password: z
      .string()
      .trim()
      .min(4, { message: "Password must be at least 4 characters" })
      .max(30, { message: "Password must be at most 30 characters" })
      .nonempty("Password is required"),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegistrationFormData = z.infer<typeof registrationSchema>;
