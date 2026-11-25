"use client";
import DesignerSidebar from "./DesignerSidebar";
import { useDroppable } from "@dnd-kit/core";

export default function Designer() {
  const { setNodeRef } = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });

  return (
    <div className="flex h-full w-full">
      <div className="p-4 w-full">
        <div
          ref={setNodeRef}
          className="bg-background m-auto h-full max-w-[920px] flex-1 grow
        flex flex-col items-center justify-start overflow-y-auto rounded-xl
        "
        >
          <p className="text-xl text-muted-foreground flex grow item-center font-bold">
            Drop Here
          </p>
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
}
