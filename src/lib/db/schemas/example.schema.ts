import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

// Define examples table
export const examples = pgTable("examples", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Export type for TypeScript
export type Example = typeof examples.$inferSelect;
export type NewExample = typeof examples.$inferInsert;
