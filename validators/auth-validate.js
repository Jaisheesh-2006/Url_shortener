import z from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "Name should be atleast 3 characters long" })
    .max(100, { message: "Name should be no more than 100 characters long" }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be atleast 6 characters long" })
    .max(12, { message: "Password should not be more than 12 characters" }),
});
