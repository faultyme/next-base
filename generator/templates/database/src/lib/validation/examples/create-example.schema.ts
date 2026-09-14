import { z } from "zod";

export const createExampleSchema = z.object({
  name: z.string().optional(),
});

export type CreateExampleInput = z.infer<typeof createExampleSchema>;
