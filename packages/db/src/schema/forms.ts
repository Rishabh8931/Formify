import {
  pgEnum,
  pgTable,
  text,
  varchar,
  jsonb,
  timestamp,
  index,
  uuid,
  unique,
} from "drizzle-orm/pg-core";

import { user } from "./auth.js";

export const formStatusEnum = pgEnum("form_status", [
  "draft",
  "published",
  "archived",
]);

export const forms = pgTable(
  "forms",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: text("user_id")
      .notNull()
      .references(() => user.id, {
        onDelete: "cascade",
      }),

    name: varchar("name", { length: 255 }).notNull(),

    slug: varchar("slug", { length: 255 }).notNull(),

    description: text("description"),

    status: formStatusEnum("status").notNull().default("draft"),

    settings: jsonb("settings")
      .$type<Record<string, unknown>>()
      .notNull()
      .default({}),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),

    updatedAt: timestamp("updated_at", {
      withTimezone: true,
    })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("forms_user_id_idx").on(table.userId),

    index("forms_user_status_idx").on(table.userId, table.status),

    unique("forms_user_slug_unique").on(table.userId, table.slug),
  ],
);
