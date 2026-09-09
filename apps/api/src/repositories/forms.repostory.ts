import { and, desc, eq } from "drizzle-orm";

import {
  db,
  fieldAttributes,
  fields,
  forms,
  type DatabaseExecutor,
} from "@formify/db";

export class FormRepository {
  async create(
    data: typeof forms.$inferInsert,
    database: DatabaseExecutor = db,
  ) {
    const [form] = await database.insert(forms).values(data).returning();

    return form;
  }

  async findByIdAndUserId(
    formId: string,
    userId: string,
    database: DatabaseExecutor = db,
  ) {
    const [form] = await database
      .select()
      .from(forms)
      .where(and(eq(forms.id, formId), eq(forms.userId, userId)))
      .limit(1);

    return form ?? null;
  }

  async findAllByUserIdWithRelations(
    userId: string,
    database: DatabaseExecutor = db,
  ) {
    const rows = await database
      .select({
        form: forms,
        field: fields,
        attribute: fieldAttributes,
      })
      .from(forms)
      .leftJoin(fields, eq(fields.formId, forms.id))
      .leftJoin(fieldAttributes, eq(fieldAttributes.fieldId, fields.id))
      .where(eq(forms.userId, userId))
      .orderBy(forms.updatedAt, fields.position, fieldAttributes.createdAt);

    const formsMap = new Map<
      string,
      {
        id: string;
        userId: string;
        name: string;
        slug: string;
        description: string | null;
        status: "draft" | "published" | "archived";
        settings: Record<string, unknown>;
        createdAt: Date;
        updatedAt: Date;
        fields: Array<
          typeof fields.$inferSelect & {
            attributes: (typeof fieldAttributes.$inferSelect)[];
          }
        >;
      }
    >();

    for (const row of rows) {
      let form = formsMap.get(row.form.id);

      if (!form) {
        form = {
          ...row.form,
          fields: [],
        };

        formsMap.set(row.form.id, form);
      }

      if (!row.field) {
        continue;
      }

      let field = form.fields.find((item) => item.id === row.field!.id);

      if (!field) {
        field = {
          ...row.field,
          attributes: [],
        };

        form.fields.push(field);
      }

      if (row.attribute) {
        field.attributes.push(row.attribute);
      }
    }

    return Array.from(formsMap.values());
  }
  async findByIdAndUserIdWithRelations(
    formId: string,
    userId: string,
    database: DatabaseExecutor = db,
  ) {
    const rows = await database
      .select({
        form: forms,

        field: fields,

        attribute: fieldAttributes,
      })
      .from(forms)
      .leftJoin(fields, eq(fields.formId, forms.id))
      .leftJoin(fieldAttributes, eq(fieldAttributes.fieldId, fields.id))
      .where(and(eq(forms.id, formId), eq(forms.userId, userId)))
      .orderBy(fields.position, fieldAttributes.createdAt);

    if (rows.length === 0) {
      return null;
    }

    const form = rows[0]!.form;

    const fieldsMap = new Map<
      string,
      {
        id: string;
        formId: string;
        type: string;
        label: string;
        description: string | null;
        required: boolean;
        position: number;
        createdAt: Date;
        updatedAt: Date;
        attributes: (typeof fieldAttributes.$inferSelect)[];
      }
    >();

    for (const row of rows) {
      if (!row.field) {
        continue;
      }

      let field = fieldsMap.get(row.field.id);

      if (!field) {
        field = {
          ...row.field,
          attributes: [],
        };

        fieldsMap.set(row.field.id, field);
      }

      if (row.attribute) {
        field.attributes.push(row.attribute);
      }
    }

    return {
      ...form,
      fields: Array.from(fieldsMap.values()),
    };
  }

  async findAllByUserId(userId: string, database: DatabaseExecutor = db) {
    return database
      .select()
      .from(forms)
      .where(eq(forms.userId, userId))
      .orderBy(desc(forms.updatedAt));
  }

  async updateByIdAndUserId(
    formId: string,
    userId: string,
    data: Partial<typeof forms.$inferInsert>,
    database: DatabaseExecutor = db,
  ) {
    const [form] = await database
      .update(forms)
      .set(data)
      .where(and(eq(forms.id, formId), eq(forms.userId, userId)))
      .returning();

    return form ?? null;
  }

  async deleteByIdAndUserId(
    formId: string,
    userId: string,
    database: DatabaseExecutor = db,
  ) {
    const [form] = await database
      .delete(forms)
      .where(and(eq(forms.id, formId), eq(forms.userId, userId)))
      .returning();

    return form ?? null;
  }

  async existsBySlug(
    userId: string,
    slug: string,
    database: DatabaseExecutor = db,
  ) {
    const [form] = await database
      .select({
        id: forms.id,
      })
      .from(forms)
      .where(and(eq(forms.userId, userId), eq(forms.slug, slug)))
      .limit(1);

    return !!form;
  }
}

export const formRepository = new FormRepository();
