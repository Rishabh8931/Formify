import { and, eq } from "drizzle-orm";

import { db, fieldAttributes } from "@formify/db";

export class FieldAttributeRepository {
  /**
   * Create an attribute for a field.
   */
  async create(data: typeof fieldAttributes.$inferInsert) {
    const [attribute] = await db
      .insert(fieldAttributes)
      .values(data)
      .returning();

    return attribute;
  }

  /**
   * Find an attribute by ID while verifying that it
   * belongs to the specified field.
   */
  async findByIdAndFieldId(attributeId: string, fieldId: string) {
    const [attribute] = await db
      .select()
      .from(fieldAttributes)
      .where(
        and(
          eq(fieldAttributes.id, attributeId),
          eq(fieldAttributes.fieldId, fieldId),
        ),
      )
      .limit(1);

    return attribute ?? null;
  }

  /**
   * Get all attributes belonging to a field.
   */
  async findAllByFieldId(fieldId: string) {
    return db
      .select()
      .from(fieldAttributes)
      .where(eq(fieldAttributes.fieldId, fieldId));
  }

  /**
   * Find a specific attribute by its key.
   */
  async findByKey(fieldId: string, key: string) {
    const [attribute] = await db
      .select()
      .from(fieldAttributes)
      .where(
        and(eq(fieldAttributes.fieldId, fieldId), eq(fieldAttributes.key, key)),
      )
      .limit(1);

    return attribute ?? null;
  }

  /**
   * Update an attribute while ensuring it belongs
   * to the specified field.
   */
  async updateByIdAndFieldId(
    attributeId: string,
    fieldId: string,
    data: Partial<typeof fieldAttributes.$inferInsert>,
  ) {
    const [attribute] = await db
      .update(fieldAttributes)
      .set(data)
      .where(
        and(
          eq(fieldAttributes.id, attributeId),
          eq(fieldAttributes.fieldId, fieldId),
        ),
      )
      .returning();

    return attribute ?? null;
  }

  /**
   * Delete an attribute while ensuring it belongs
   * to the specified field.
   */
  async deleteByIdAndFieldId(attributeId: string, fieldId: string) {
    const [attribute] = await db
      .delete(fieldAttributes)
      .where(
        and(
          eq(fieldAttributes.id, attributeId),
          eq(fieldAttributes.fieldId, fieldId),
        ),
      )
      .returning();

    return attribute ?? null;
  }

  /**
   * Delete all attributes belonging to a field.
   */
  async deleteAllByFieldId(fieldId: string) {
    return db
      .delete(fieldAttributes)
      .where(eq(fieldAttributes.fieldId, fieldId))
      .returning();
  }
}

export const fieldAttributeRepository = new FieldAttributeRepository();
