import { randomBytes } from "node:crypto";

import { db } from "@formify/db";

import { formRepository } from "../repositories/forms.repostory.js";
import { fieldRepository } from "../repositories/field.repository.js";
import { fieldAttributeRepository } from "../repositories/field-attribute.repository.js";
import { NotFoundError } from "../errors/index.js";

export class FormService {
  private generateSlugSuffix(length = 6) {
    return randomBytes(4).toString("hex").substring(0, length);
  }

  async createForm(
    userId: string,
    data: {
      name: string;
      slug: string;
      description?: string;
      status?: "draft" | "published" | "archived";
      settings?: Record<string, unknown>;
    },
  ) {
    let slug = data.slug;

    while (await formRepository.existsBySlug(userId, slug)) {
      slug = `${data.slug}-${this.generateSlugSuffix()}`;
    }

    return formRepository.create({
      userId,
      name: data.name,
      slug,
      description: data.description,
      status: data.status ?? "draft",
      settings: data.settings ?? {},
    });
  }

  async getForm(userId: string, formId: string) {
    const form = await formRepository.findByIdAndUserIdWithRelations(
      formId,
      userId,
    );

    if (!form) {
      throw new NotFoundError("Form not found");
    }

    return form;
  }

  async getForms(userId: string) {
    return formRepository.findAllByUserIdWithRelations(userId);
  }

  async updateForm(
    userId: string,
    formId: string,
    data: {
      name?: string;
      slug?: string;
      description?: string | null;
      status?: "draft" | "published" | "archived";
      settings?: Record<string, unknown>;
    },
  ) {
    const existingForm = await formRepository.findByIdAndUserId(formId, userId);

    if (!existingForm) {
      throw new NotFoundError("Form not found");
    }

    let slug = data.slug;

    if (slug && slug !== existingForm.slug) {
      while (await formRepository.existsBySlug(userId, slug)) {
        slug = `${data.slug}-${this.generateSlugSuffix()}`;
      }
    }

    return formRepository.updateByIdAndUserId(formId, userId, {
      ...data,
      ...(slug ? { slug } : {}),
    });
  }

  async deleteForm(userId: string, formId: string) {
    const deletedForm = await formRepository.deleteByIdAndUserId(
      formId,
      userId,
    );

    if (!deletedForm) {
      throw new NotFoundError("Form not found");
    }

    return deletedForm;
  }

  // duplicateForm duplicates a form along with its fields and attributes. It generates a unique slug for the new form to avoid conflicts.

  async duplicateForm(userId: string, formId: string) {
    const sourceForm = await formRepository.findByIdAndUserIdWithRelations(
      formId,
      userId,
    );

    if (!sourceForm) {
      throw new NotFoundError("Form not found");
    }

    let slug = `${sourceForm.slug}-copy`;

    while (await formRepository.existsBySlug(userId, slug)) {
      slug = `${sourceForm.slug}-copy-${this.generateSlugSuffix()}`;
    }

    return db.transaction(async (tx) => {
      const newForm = await formRepository.create(
        {
          userId,
          name: `${sourceForm.name} Copy`,
          slug,
          description: sourceForm.description,
          status: "draft",
          settings: sourceForm.settings,
        },
        tx,
      );

      const sourceFields = await fieldRepository.findAllByFormId(
        sourceForm.id,
        tx,
      );

      for (const sourceField of sourceFields) {
        const newField = await fieldRepository.create(
          {
            formId: newForm!.id,
            type: sourceField.type,
            label: sourceField.label,
            description: sourceField.description,
            required: sourceField.required,
            position: sourceField.position,
          },
          tx,
        );

        const attributes = await fieldAttributeRepository.findAllByFieldId(
          sourceField.id,
          tx,
        );

        for (const attribute of attributes) {
          await fieldAttributeRepository.create(
            {
              fieldId: newField!.id,
              key: attribute.key,
              value: attribute.value,
            },
            tx,
          );
        }
      }

      return newForm;
    });
  }
}

export const formService = new FormService();
