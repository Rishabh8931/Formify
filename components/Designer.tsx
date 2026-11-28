"use client";

import { cn } from "@/lib/utils";
import { useDroppable, useDndMonitor, type DragEndEvent } from "@dnd-kit/core";
import { useEffect } from "react";
import DesignerSidebar from "./DesignerSidebar";
import { FormElementInstance, FormElements } from "./FormElement";
import useDesigner from "./hooks/useDesigner";
import { idGenerator } from "@/lib/idGenerator";

export default function Designer() {
  const { elements, addElement } = useDesigner();

  useEffect(() => {
    console.log("Designer elements updated:", elements);
  }, [elements]);

  const { isOver, setNodeRef } = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;
      const isDesignerBtnElement = active.data.current?.isDesignerBtnElement;
      const isDesignerDropArea = over.data.current?.isDesignerDropArea;

      if (!isDesignerBtnElement || !isDesignerDropArea) return;

      const type = active.data.current?.type;
      const formElement = Object.values(FormElements).find(
        (element) => element.type === type,
      );

      if (!formElement) {
        console.error("Unsupported designer element type:", type);
        return;
      }

      const newElement = formElement.construct(idGenerator());
      console.log("New element:", newElement);
      addElement(0, newElement);
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
          {!isOver && elements.length === 0 && (
            <p className="mt-4 text-xl font-bold text-muted-foreground">
              Drop Here
            </p>
          )}

          {isOver && (
            <div className="w-full p-4">
              <div className="h-[120px] w-full rounded-md bg-primary/20" />
            </div>
          )}

          {elements.length > 0 && (
            <div className="flex flex-col  w-full gap-2 p-4">
              {elements.map((element) => (
                <DesignerElementWrapper key={element.id} element={element} />
              ))}{" "}
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

function DesignerElementWrapper({ element }: { element: FormElementInstance }) {
  const DesignerElement = FormElements[element.type].designerComponent;

  return <DesignerElement elementInstance={element} />;
}
