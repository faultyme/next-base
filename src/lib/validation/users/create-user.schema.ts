import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Invalid email format").optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
