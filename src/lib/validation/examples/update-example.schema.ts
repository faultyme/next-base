import { z } from "zod";

export const updateExampleSchema = z.object({
  name: z.string().optional(),
});

export type UpdateExampleInput = z.infer<typeof updateExampleSchema>;
