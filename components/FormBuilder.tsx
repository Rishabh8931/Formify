"use client";

import { Form } from "@/app/generated/prisma/browser";
import Designer from "./Designer";
import PreviewDialogBtn from "./PreviewDialogBtn";
import PublishFormBtn from "./PublishFormBtn";
import SaveFormBtn from "./SaveFormBtn";

export default function FormBuilder({ form }: { form: Form }) {
  return (
    <main className="flex flex-col w-full">
      <nav className="flex justify-between border-b-2 p-4 gap-3">
        <h2 className="truncate font-medium">
          <span className="text-muted-foreground mr-2">Form:</span>
          {form.name}
        </h2>

        <div className="flex items-center gap-2">
          <PreviewDialogBtn />
          {!form.published && (
            <>
              <SaveFormBtn />
              <PublishFormBtn />
            </>
          )}
        </div>
      </nav>
      <div className="form-builder-grid relative flex h-[200px] flex-grow items-center justify-center overflow-y-auto">
        <Designer />
      </div>
    </main>
  );
}
