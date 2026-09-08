import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  unique,
  index,
  jsonb,
} from "drizzle-orm/pg-core";

import { fields } from "./fields.js";

export const fieldAttributes = pgTable(
  "field_attributes",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    fieldId: uuid("field_id")
      .notNull()
      .references(() => fields.id, {
        onDelete: "cascade",
      }),

    key: varchar("key", { length: 100 }).notNull(),

    value: jsonb("value").$type<unknown>().notNull(),

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

  (table) => ({
    fieldIdIdx: index("field_attributes_field_id_idx").on(table.fieldId),

    fieldKeyUnique: unique("field_attributes_field_key_unique").on(
      table.fieldId,
      table.key,
    ),
  }),
);
