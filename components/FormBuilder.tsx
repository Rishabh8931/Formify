"use client";

import { Form } from "@/app/generated/prisma/browser";
import { DndContext } from "@dnd-kit/core";
import Designer from "./Designer";
import DragOverlayWrapper from "./DragOverlayWrapper";
import PreviewDialogBtn from "./PreviewDialogBtn";
import PublishFormBtn from "./PublishFormBtn";
import SaveFormBtn from "./SaveFormBtn";

export default function FormBuilder({ form }: { form: Form }) {
  return (
    <DndContext>
      <main className="flex h-full min-h-0 w-full flex-col overflow-hidden">
        <nav className="flex shrink-0 justify-between gap-3 border-b-2 p-4">
          <h2 className="truncate font-medium">
            <span className="mr-2 text-muted-foreground">Form:</span>
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

        <div className="form-builder-grid relative flex min-h-0 flex-1 overflow-hidden">
          <Designer />
        </div>
      </main>

      <DragOverlayWrapper />
    </DndContext>
  );
}
