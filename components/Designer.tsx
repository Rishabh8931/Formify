"use client";

import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";
import { useState } from "react";
import DesignerSidebar from "./DesignerSidebar";
import { FormElementInstance } from "./FormElement";

export default function Designer() {


  const { isOver, setNodeRef } = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });

  return (
    <div className="flex h-full w-full min-h-0 overflow-hidden gap-4">
      {/* Main Designer Area */}
      <div className="flex min-w-0 flex-1">
        <div
          ref={setNodeRef}
          className={cn(
            "mx-auto flex h-full w-full max-w-[920px] flex-col items-center justify-start overflow-y-auto rounded-xl bg-background transition-all",
            isOver && "ring-2 ring-primary/20",
          )}
        >
          {!isOver && (
            <p className="mt-4 text-xl font-bold text-muted-foreground">
              Drop Here
            </p>
          )}

          {isOver && (
            <div className="w-full p-4">
              <div className="h-[120px] w-full rounded-md bg-primary/20" />
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="h-full w-[320px] shrink-0 overflow-y-auto border-l">
        <DesignerSidebar />
      </div>
    </div>
  );
}
