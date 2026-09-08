import { and, desc, eq } from "drizzle-orm";

import { db, forms } from "@formify/db";

export class FormRepository {
  /**
   * Create a new form.
   */
  async create(data: typeof forms.$inferInsert) {
    const [form] = await db.insert(forms).values(data).returning();

    return form;
  }

  /**
   * Find a form owned by a specific user.
   *
   * Ownership is included directly in the query.
   */
  async findByIdAndUserId(formId: string, userId: string) {
    const [form] = await db
      .select()
      .from(forms)
      .where(and(eq(forms.id, formId), eq(forms.userId, userId)))
      .limit(1);

    return form ?? null;
  }

  /**
   * Get all forms belonging to a user.
   */
  async findAllByUserId(userId: string) {
    return db
      .select()
      .from(forms)
      .where(eq(forms.userId, userId))
      .orderBy(desc(forms.updatedAt));
  }

  /**
   * Update a form owned by a specific user.
   */
  async updateByIdAndUserId(
    formId: string,
    userId: string,
    data: Partial<typeof forms.$inferInsert>,
  ) {
    const [form] = await db
      .update(forms)
      .set(data)
      .where(and(eq(forms.id, formId), eq(forms.userId, userId)))
      .returning();

    return form ?? null;
  }

  /**
   * Delete a form owned by a specific user.
   */
  async deleteByIdAndUserId(formId: string, userId: string) {
    const [form] = await db
      .delete(forms)
      .where(and(eq(forms.id, formId), eq(forms.userId, userId)))
      .returning();

    return form ?? null;
  }

  /**
   * Check whether a slug already exists for a user.
   */
  async existsBySlug(userId: string, slug: string) {
    const [form] = await db
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
