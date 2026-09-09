import { Router } from "express";

import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";

import { formController } from "../../controllers/form.controller.js";

import {
  createFormSchema,
  updateFormSchema,
  formIdParamsSchema,
} from "@formify/utils";

export const formsRoutes: Router = Router();

/**
 * All form endpoints require authentication.
 */
formsRoutes.use(authMiddleware);

/**
 * POST /api/v1/forms
 * Create a new form
 */
formsRoutes.post(
  "/",
  validate({
    body: createFormSchema,
  }),
  formController.create.bind(formController),
);

/**
 * GET /api/v1/forms
 * Get all forms belonging to the authenticated user
 */
formsRoutes.get("/", formController.list.bind(formController));

/**
 * GET /api/v1/forms/:formId
 * Get a single form
 */
formsRoutes.get(
  "/:formId",
  validate({
    params: formIdParamsSchema,
  }),
  formController.get.bind(formController),
);

/**
 * PATCH /api/v1/forms/:formId
 * Update a form
 */
formsRoutes.patch(
  "/:formId",
  validate({
    params: formIdParamsSchema,
    body: updateFormSchema,
  }),
  formController.update.bind(formController),
);

/**
 * DELETE /api/v1/forms/:formId
 * Delete a form
 */
formsRoutes.delete(
  "/:formId",
  validate({
    params: formIdParamsSchema,
  }),
  formController.delete.bind(formController),
);

/**
 * POST /api/v1/forms/:formId/duplicate
 * Duplicate an existing form
 */
formsRoutes.post(
  "/:formId/duplicate",
  validate({
    params: formIdParamsSchema,
  }),
  formController.duplicate.bind(formController),
);
