import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { users, type User } from "@/lib/db/schemas/user.schema";

type FindUserInput =
  | { type: "id"; value: string }
  | { type: "email"; value: string }
  | { type: "mobile"; value: string };

export async function findUser(input: FindUserInput): Promise<User | null> {
  const condition =
    input.type === "id"
      ? eq(users.id, input.value)
      : input.type === "email"
        ? eq(users.email, input.value)
        : eq(users.mobile, input.value);

  const [user] = await db.select().from(users).where(condition).limit(1);

  return user ?? null;
}
