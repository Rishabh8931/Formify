"use client";

import { MdTextFields } from "react-icons/md";
import { ElementType, FormElement } from "../FormElement";

const type: ElementType = "TextField";

export const TextFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      placeholder: "Enter text",
      label: "Text Field",
      required: false,
      helperText: "helper text",
    },
  }),

  designerBtnElement: {
    icon: MdTextFields,
    label: "Text Field",
  },
  designerComponent: () => <div>TextField Designer Component</div>,
  formComponent: () => <div>Form component</div>,
  propertiesComponent: () => <div>TextField Properties Component</div>,
};
