"use client";

import { MdTextFields } from "react-icons/md";
import { ElementType, FormElement, FormElementInstance } from "../FormElement";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const type: ElementType = "TextField";

const extraAttributes = {
  placeholder: "Enter text",
  label: "Text Field",
  required: false,
  helperText: "helper text",
};

export const TextFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),

  designerBtnElement: {
    icon: MdTextFields,
    label: "Text Field",
  },
  designerComponent: DesingerComponent,
  formComponent: () => <div>Form component</div>,
  propertiesComponent: () => <div>TextField Properties Component</div>,
};
type CustomInstace = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function DesingerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstace;
  const { required, label, placeholder, helperText } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full ">
      <Label>
        {label}
        {required && <span className="text-red-500">*</span>}{" "}
      </Label>
      <Input readOnly disabled placeholder={placeholder} />
      {helperText && (
        <p className="text-[0.8rem] text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
}
