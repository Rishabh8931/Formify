"use client";

import { useState } from "react";
import { DragOverlay, useDndMonitor, type Active } from "@dnd-kit/core";

import { SidebarBtnElementDragOverlay } from "./SidebarBtnElement";
import { ElementType, FormElements } from "./FormElement";

function DragOverlayWrapper() {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);
  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },

    onDragCancel: () => {
      setDraggedItem(null);
    },

    onDragEnd: () => {
      setDraggedItem(null);
    },
  });

  if (!draggedItem) {
    return null;
  }
  let node = <div> not drag overlay</div>;
  const isSidebarBtnElement = draggedItem.data.current?.isDesignerBtnElement;

  if (isSidebarBtnElement) {
    const type = draggedItem.data.current?.type as ElementType;
    node = <SidebarBtnElementDragOverlay formElement={FormElements[type]} />;
  }

  return <DragOverlay> {node} </DragOverlay>;
}

export default DragOverlayWrapper;
