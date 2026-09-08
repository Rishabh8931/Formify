import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Enter a valid email address")
    .describe("User's email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .describe("User's password"),
});

export const signupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long")
    .describe("User's full name"),

  email: z
    .string()
    .trim()
    .email("Enter a valid email address")
    .describe("User's email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password is too long")
    .describe("User's password"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export type SignupInput = z.infer<typeof signupSchema>;
