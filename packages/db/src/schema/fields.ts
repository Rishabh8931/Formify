import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  integer,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

import { forms } from "./forms.js";

export const fields = pgTable(
  "fields",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    formId: uuid("form_id")
      .notNull()
      .references(() => forms.id, {
        onDelete: "cascade",
      }),

    type: varchar("type", { length: 50 }).notNull(),

    label: varchar("label", { length: 255 }).notNull(),

    description: text("description"),

    required: boolean("required").notNull().default(false),

    position: integer("position").notNull(),

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
    formIdIdx: index("fields_form_id_idx").on(table.formId),

    formPositionIdx: index("fields_form_position_idx").on(
      table.formId,
      table.position,
    ),
  }),
);
