import { and, asc, eq } from "drizzle-orm";

import { db, fields } from "@formify/db";

export class FieldRepository {
  /**
   * Create a field for a form.
   */
  async create(data: typeof fields.$inferInsert) {
    const [field] = await db.insert(fields).values(data).returning();

    return field;
  }

  /**
   * Find a field by ID while verifying that it belongs
   * to the specified form.
   */
  async findByIdAndFormId(fieldId: string, formId: string) {
    const [field] = await db
      .select()
      .from(fields)
      .where(and(eq(fields.id, fieldId), eq(fields.formId, formId)))
      .limit(1);

    return field ?? null;
  }

  /**
   * Get all fields belonging to a form.
   */
  async findAllByFormId(formId: string) {
    return db
      .select()
      .from(fields)
      .where(eq(fields.formId, formId))
      .orderBy(asc(fields.position));
  }

  /**
   * Update a field while ensuring it belongs to the form.
   */
  async updateByIdAndFormId(
    fieldId: string,
    formId: string,
    data: Partial<typeof fields.$inferInsert>,
  ) {
    const [field] = await db
      .update(fields)
      .set(data)
      .where(and(eq(fields.id, fieldId), eq(fields.formId, formId)))
      .returning();

    return field ?? null;
  }

  /**
   * Delete a field while ensuring it belongs to the form.
   *
   * Its field_attributes are automatically deleted because
   * field_attributes.field_id has ON DELETE CASCADE.
   */
  async deleteByIdAndFormId(fieldId: string, formId: string) {
    const [field] = await db
      .delete(fields)
      .where(and(eq(fields.id, fieldId), eq(fields.formId, formId)))
      .returning();

    return field ?? null;
  }

  /**
   * Delete all fields belonging to a form.
   *
   * Useful when replacing an entire form definition.
   */
  async deleteAllByFormId(formId: string) {
    return db.delete(fields).where(eq(fields.formId, formId)).returning();
  }
}

export const fieldRepository = new FieldRepository();
