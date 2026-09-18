import { integer, pgEnum, pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";

// Users
export const userRoleEnum = pgEnum("user_role", ["SUPER_ADMIN", "ADMIN", "USER"]);

export const userStatusEnum = pgEnum("user_status", ["ACTIVE", "DISABLED"]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),

  role: userRoleEnum("role").notNull().default("USER"),

  email: text("email").unique(),
  mobile: text("mobile").unique(),

  emailVerified: timestamp("email_verified", {
    withTimezone: true,
  }),

  mobileVerified: timestamp("mobile_verified", {
    withTimezone: true,
  }),

  status: userStatusEnum("status").default("ACTIVE").notNull(),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

//Verification Token
export const verificationIdentifierTypeEnum = pgEnum("verification_identifier_type", [
  "EMAIL",
  "MOBILE",
]);

export const verificationTokens = pgTable(
  "verification_tokens",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),

    identifierType: verificationIdentifierTypeEnum("identifier_type").notNull(),

    tokenHash: text("token_hash").notNull().unique(),

    expiresAt: timestamp("expires_at", {
      withTimezone: true,
    }).notNull(),

    resendCount: integer("resend_count").notNull().default(0),

    verificationAttempts: integer("verification_attempts").notNull().default(0),

    lockedUntil: timestamp("locked_until", {
      withTimezone: true,
    }),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  table => [
    uniqueIndex("verification_tokens_user_id_type_unique").on(table.userId, table.identifierType),
  ]
);

export type VerificationToken = typeof verificationTokens.$inferSelect;
export type NewVerificationToken = typeof verificationTokens.$inferInsert;

//Refresh Token
export const refreshTokens = pgTable("refresh_tokens", {
  id: uuid("id").primaryKey().defaultRandom(),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),
  tokenHash: text("token_hash").notNull().unique(),

  expiresAt: timestamp("expires_at", {
    withTimezone: true,
  }).notNull(),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),

  revokedAt: timestamp("revoked_at", {
    withTimezone: true,
  }),
});

export type RefreshToken = typeof refreshTokens.$inferSelect;
export type NewRefreshToken = typeof refreshTokens.$inferInsert;
