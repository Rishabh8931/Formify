import { z } from "zod";

export const updateFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Form name cannot be empty")
    .max(255, "Form name must not exceed 255 characters")
    .optional(),

  slug: z
    .string()
    .trim()
    .min(1, "Form slug cannot be empty")
    .max(255, "Form slug must not exceed 255 characters")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must contain only lowercase letters, numbers, and hyphens",
    )
    .optional(),

  description: z
    .string()
    .trim()
    .max(5000, "Description must not exceed 5000 characters")
    .nullable()
    .optional(),

  status: z.enum(["draft", "published", "archived"]).optional(),

  settings: z.record(z.string(), z.unknown()).optional(),
});

export type UpdateFormInput = z.infer<typeof updateFormSchema>;
