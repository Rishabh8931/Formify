import type { Request, Response, NextFunction } from "express";

import {
  createFormSchema,
  updateFormSchema,
  formIdParamsSchema,
  type CreateFormInput,
  type UpdateFormInput,
  type FormIdParams,
} from "@formify/utils";

import { formService } from "../services/form.service.js";

export class FormController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;

      const data = req.body as CreateFormInput;

      const form = await formService.createForm(userId, data);

      return res.status(201).json({
        success: true,
        data: form,
        requestId: req.requestId,
      });
    } catch (error) {
      next(error);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;

      const { formId } = req.params as FormIdParams;

      const form = await formService.getForm(userId, formId);

      return res.status(200).json({
        success: true,
        data: form,
        requestId: req.requestId,
      });
    } catch (error) {
      next(error);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;

      const forms = await formService.getForms(userId);

      return res.status(200).json({
        success: true,
        data: forms,
        requestId: req.requestId,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;

      const { formId } = req.params as FormIdParams;

      const data = req.body as UpdateFormInput;

      const form = await formService.updateForm(userId, formId, data);

      return res.status(200).json({
        success: true,
        data: form,
        requestId: req.requestId,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;

      const { formId } = req.params as FormIdParams;

      const form = await formService.deleteForm(userId, formId);

      return res.status(200).json({
        success: true,
        data: form,
        requestId: req.requestId,
      });
    } catch (error) {
      next(error);
    }
  }

  async duplicate(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;

      const { formId } = req.params as FormIdParams;

      const form = await formService.duplicateForm(userId, formId);

      return res.status(201).json({
        success: true,
        data: form,
        requestId: req.requestId,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const formController = new FormController();
