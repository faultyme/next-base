import { pgEnum, pgTable, text, timestamp, uuid, jsonb } from "drizzle-orm/pg-core";
import { users } from "./user.schema";

export const auditActionEnum = pgEnum("audit_action", ["USER_CREATED"]);

export const auditEntityTypeEnum = pgEnum("audit_entity_type", ["USER"]);

export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").primaryKey().defaultRandom(),

  actorUserId: uuid("actor_user_id").references(() => users.id, { onDelete: "set null" }),

  action: auditActionEnum("action").notNull(),

  entityType: auditEntityTypeEnum("entity_type").notNull(),

  entityId: uuid("entity_id"),

  previousValue: jsonb("previous_value"),

  currentValue: jsonb("current_value"),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});

export type AuditLog = typeof auditLogs.$inferSelect;
export type NewAuditLog = typeof auditLogs.$inferInsert;
