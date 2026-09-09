import { and, asc, eq } from "drizzle-orm";

import { db, fields, type DatabaseExecutor } from "@formify/db";

export class FieldRepository {
  async create(
    data: typeof fields.$inferInsert,
    database: DatabaseExecutor = db,
  ) {
    const [field] = await database.insert(fields).values(data).returning();

    return field;
  }

  async findAllByFormId(formId: string, database = db) {
    return database
      .select()
      .from(fields)
      .where(eq(fields.formId, formId))
      .orderBy(asc(fields.position));
  }

  async findByIdAndFormId(fieldId: string, formId: string, database = db) {
    const [field] = await database
      .select()
      .from(fields)
      .where(and(eq(fields.id, fieldId), eq(fields.formId, formId)))
      .limit(1);

    return field ?? null;
  }

  async updateByIdAndFormId(
    fieldId: string,
    formId: string,
    data: Partial<typeof fields.$inferInsert>,
    database = db,
  ) {
    const [field] = await database
      .update(fields)
      .set(data)
      .where(and(eq(fields.id, fieldId), eq(fields.formId, formId)))
      .returning();

    return field ?? null;
  }

  async deleteByIdAndFormId(fieldId: string, formId: string, database = db) {
    const [field] = await database
      .delete(fields)
      .where(and(eq(fields.id, fieldId), eq(fields.formId, formId)))
      .returning();

    return field ?? null;
  }
}

export const fieldRepository = new FieldRepository();
