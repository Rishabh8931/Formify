import { FormElements } from "./FormElement";
import SidebarBtnElement from "./SidebarBtnElement";

export default function DesignerSidebar() {
  return (
    <aside className="flex h-full w-full flex-col gap-2 overflow-y-auto bg-background">
      Elements
      <SidebarBtnElement formElement={FormElements.TextField} />
    </aside>
  );
}
