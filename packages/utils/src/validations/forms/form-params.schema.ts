import { z } from "zod";

export const formIdParamsSchema = z.object({
  formId: z.uuid("Invalid form ID"),
});

export type FormIdParams = z.infer<typeof formIdParamsSchema>;
