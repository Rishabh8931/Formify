import z from "zod";

export const formSchema = z.object({
  name: z.string().min(4).max(50),
  description: z.string().min(4).max(100),
});

export type FormSchemaType = z.infer<typeof formSchema>;