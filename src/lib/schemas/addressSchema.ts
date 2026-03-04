import { z } from "zod";

const phoneRegex = /^\d{10}$/;
const pinRegex = /^\d{6}$/;

export const shippingAddressSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .transform((s) => s.trim()),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .transform((s) => s.trim().toLowerCase()),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .refine((val) => phoneRegex.test(val.replace(/\s/g, "")), {
      message: "Phone must be 10 digits",
    })
    .transform((s) => s.replace(/\s/g, "").trim()),
  pinCode: z
    .string()
    .min(1, "PIN code is required")
    .refine((val) => pinRegex.test(val.trim()), {
      message: "PIN code must be 6 digits",
    })
    .transform((s) => s.trim()),
  city: z
    .string()
    .min(1, "City is required")
    .transform((s) => s.trim()),
  state: z
    .string()
    .min(1, "State is required")
    .transform((s) => s.trim()),
});

export type ShippingAddressSchema = z.infer<typeof shippingAddressSchema>;
