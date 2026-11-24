"use client";

import { Form } from "@/app/generated/prisma/browser";
import React from "react";

export default function FormBuilder({ form }: { form: Form }) {
  return <div>FormBuilder: {form.name}</div>;
}
