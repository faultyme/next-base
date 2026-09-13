import { z } from "zod";

export const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Invalid email format").optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
