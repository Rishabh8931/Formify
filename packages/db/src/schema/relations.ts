import { relations } from "drizzle-orm";

import { user } from "./auth.js";
import { forms } from "./forms.js";
import { fields } from "./fields.js";
import { fieldAttributes } from "./fieldAttribute.js";

export const formsRelations = relations(forms, ({ one, many }) => ({
  user: one(user, {
    fields: [forms.userId],
    references: [user.id],
  }),

  fields: many(fields),
}));

export const fieldsRelations = relations(fields, ({ one, many }) => ({
  form: one(forms, {
    fields: [fields.formId],
    references: [forms.id],
  }),

  attributes: many(fieldAttributes),
}));

export const fieldAttributesRelations = relations(
  fieldAttributes,
  ({ one }) => ({
    field: one(fields, {
      fields: [fieldAttributes.fieldId],
      references: [fields.id],
    }),
  }),
);
