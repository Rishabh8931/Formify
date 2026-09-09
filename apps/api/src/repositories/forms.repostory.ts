import { and, desc, eq } from "drizzle-orm";

import { db } from "@formify/db";
import { forms } from "@formify/db";
import type { DatabaseExecutor } from "@formify/db";

export class FormRepository {
  async create(
    data: typeof forms.$inferInsert,
    database: DatabaseExecutor = db,
  ) {
    const [form] = await database.insert(forms).values(data).returning();

    return form;
  }

  async findByIdAndUserId(formId: string, userId: string, database = db) {
    const [form] = await database
      .select()
      .from(forms)
      .where(and(eq(forms.id, formId), eq(forms.userId, userId)))
      .limit(1);

    return form ?? null;
  }

  async findAllByUserId(userId: string, database = db) {
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
    database = db,
  ) {
    const [form] = await database
      .update(forms)
      .set(data)
      .where(and(eq(forms.id, formId), eq(forms.userId, userId)))
      .returning();

    return form ?? null;
  }

  async deleteByIdAndUserId(formId: string, userId: string, database = db) {
    const [form] = await database
      .delete(forms)
      .where(and(eq(forms.id, formId), eq(forms.userId, userId)))
      .returning();

    return form ?? null;
  }

  async existsBySlug(userId: string, slug: string, database = db) {
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
