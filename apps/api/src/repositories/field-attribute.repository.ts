import { and, eq } from "drizzle-orm";

import { db, fieldAttributes, type DatabaseExecutor } from "@formify/db";

export class FieldAttributeRepository {
  async create(
    data: typeof fieldAttributes.$inferInsert,
    database: DatabaseExecutor = db,
  ) {
    const [attribute] = await database
      .insert(fieldAttributes)
      .values(data)
      .returning();

    return attribute;
  }

  async findAllByFieldId(fieldId: string, database: DatabaseExecutor = db) {
    return database
      .select()
      .from(fieldAttributes)
      .where(eq(fieldAttributes.fieldId, fieldId));
  }

  async findByIdAndFieldId(
    attributeId: string,
    fieldId: string,
    database = db,
  ) {
    const [attribute] = await database
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

  async updateByIdAndFieldId(
    attributeId: string,
    fieldId: string,
    data: Partial<typeof fieldAttributes.$inferInsert>,
    database = db,
  ) {
    const [attribute] = await database
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

  async deleteByIdAndFieldId(
    attributeId: string,
    fieldId: string,
    database = db,
  ) {
    const [attribute] = await database
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
}

export const fieldAttributeRepository = new FieldAttributeRepository();
