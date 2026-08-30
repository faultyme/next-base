import { pgTable, uuid, text, timestamp, pgEnum } from "drizzle-orm/pg-core";

// Define enum for user roles
export const roleEnum = pgEnum("role", ["USER", "ADMIN"]);

// Define users table
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name"),
  email: text("email").unique(),
  role: roleEnum("role").default("USER"),
  createdAt: timestamp("created_at").defaultNow(),
  createdBy: uuid("created_by"),
  updatedAt: timestamp("updated_at").defaultNow(),
  updatedBy: uuid("updated_by"),
});

// Export type for TypeScript
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
