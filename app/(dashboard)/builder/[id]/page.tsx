import { GetFormById } from "@/actions/form";
import FormBuilder from "@/components/FormBuilder";
import { notFound } from "next/navigation";

export default async function BuilderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const formId = Number(id);

  if (!Number.isInteger(formId) || formId <= 0) {
    notFound();
  }

  const form = await GetFormById(formId);

  return <FormBuilder form={form} />;
}
