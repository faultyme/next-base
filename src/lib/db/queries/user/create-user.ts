// src/lib/db/queries/user/create-user.ts

import { db } from "@/lib/db";
import { users, type NewUser, type User } from "@/lib/db/schemas/user.schema";

export async function createUser(input: NewUser): Promise<User> {
  const [user] = await db.insert(users).values(input).returning();

  return user;
}
