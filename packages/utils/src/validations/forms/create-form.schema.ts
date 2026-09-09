import { z } from "zod";

export const createFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Form name is required")
    .max(255, "Form name must not exceed 255 characters"),

  slug: z
    .string()
    .trim()
    .min(1, "Form slug is required")
    .max(255, "Form slug must not exceed 255 characters")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must contain only lowercase letters, numbers, and hyphens",
    ),

  description: z
    .string()
    .trim()
    .max(5000, "Description must not exceed 5000 characters")
    .optional(),

  status: z.enum(["draft", "published", "archived"]).optional(),

  settings: z.record(z.string(), z.unknown()).optional(),
});

export type CreateFormInput = z.infer<typeof createFormSchema>;
