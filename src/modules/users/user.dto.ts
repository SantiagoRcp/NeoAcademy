import { z } from "zod";

export const CreateUserDto = z.object({
  firstName: z.string().min(1, "firstName is Required").trim(),
  lastName: z.string().min(1, "lastName is Required").trim(),
  email: z.string().min(1, "email is Required").email("Invalid email").trim(),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_?]).+$/,
      "Password must contain at least one uppercase letter, on number, and one special character !@#$%^&*()_?"
    )
    .min(8, "password must be at least 8 characters long")
    .trim(),
  avatarUrl: z.string().url("Invalid URL").trim().optional(),
  dateOfBirth: z.string(),
  phone: z.string().min(10, "phone is required").trim(),
  address: z.string().min(1, "address is required").trim(),
  roleId: z.number().min(1, "role is Required"),
  lastLogin: z.date().optional(),
});

export const UpadateUserDto = z.object({
  firstName: z.string().min(1, "firstName is Required").trim().optional(),
  lastName: z.string().min(1, "lastName is Required").trim().optional(),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_?]).+$/,
      "Password must contain at least one uppercase letter, on number, and one special character !@#$%^&*()_?"
    )
    .min(8, "password must be at least 8 characters long")
    .trim()
    .optional(),
  avatarUrl: z.string().url("Invalid URL").trim().optional(),
  dateOfBirth: z.string().optional(),
  phone: z.string().min(10, "phone is required").trim().optional(),
  address: z.string().min(1, "address is required").trim().optional(),
});

export type ICreateUser = z.infer<typeof CreateUserDto>;
export type IUserUpadate = z.infer<typeof UpadateUserDto>;
