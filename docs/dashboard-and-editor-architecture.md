# Formify — Dashboard & Editor Architecture

> **Status:** Working specification  
> **Purpose:** Define the dashboard shell and form-builder/editor architecture before implementation begins.

---

## 1. Scope

This document defines the application architecture for two related but distinct UI experiences:

1. **Dashboard Shell** — the authenticated workspace used to manage forms, responses, analytics, templates, integrations, and settings.
2. **Builder Shell** — the dedicated form-editing experience used to create and configure forms.

The builder is intentionally separated from the dashboard so that form editing can remain focused and optimized for visual interaction.

---

# 2. High-Level Application Architecture

```text
Formify
│
├── Dashboard Shell
│   ├── Dashboard Navbar
│   ├── Dashboard Sidebar
│   └── Page Content
│
└── Builder Shell
    ├── Builder Header
    ├── Field Palette
    ├── Form Canvas
    └── Properties Panel
```

The dashboard and builder are different application shells.

### Dashboard Shell

Used for navigation and management.

```text
Dashboard Shell
├── Navbar
├── Sidebar
└── Main Content
```

### Builder Shell

Used for visual form construction.

```text
Builder Shell
├── Builder Header
├── Field Palette
├── Form Canvas
└── Properties Panel
```

The builder should not simply inherit the dashboard's complete visual layout. Entering the editor should feel like entering a dedicated workspace.

---

# 3. Dashboard Shell

## 3.1 Dashboard Layout

The dashboard uses a persistent layout:

```text
┌──────────────────────────────────────────────────────────────┐
│                        Navbar                                │
├──────────────────┬───────────────────────────────────────────┤
│                  │                                           │
│     Sidebar      │              Main Content                 │
│                  │                                           │
│                  │                                           │
│                  │                                           │
└──────────────────┴───────────────────────────────────────────┘
```

The Navbar and Sidebar belong to the dashboard layout rather than individual pages.

This allows routes such as `/dashboard/forms` and `/dashboard/settings` to share the same application shell.

---

# 4. Dashboard Navbar

## 4.1 Responsibilities

The Navbar is responsible for global dashboard-level controls:

- Formify logo
- Global form search
- Help/documentation access
- Notifications
- User profile menu
- Workspace/team selector if workspaces are introduced

The Navbar should remain fixed while dashboard content scrolls.

## 4.2 Conceptual Layout

```text
┌──────────────────────────────────────────────────────────────┐
│ formify │ Search forms...              ?   🔔   Avatar ▾    │
└──────────────────────────────────────────────────────────────┘
```

The exact visual dimensions and responsive implementation are to be finalized during UI implementation.

---

# 5. Dashboard Sidebar

## 5.1 Responsibilities

The Sidebar provides primary navigation through the authenticated product.

Conceptual structure:

```text
┌──────────────────┐
│ + Create form    │
│                  │
│ Overview         │
│ My Forms         │
│ Responses        │
│ Analytics        │
│                  │
│ ──────────────   │
│                  │
│ Templates        │
│ Integrations     │
│                  │
│ ──────────────   │
│                  │
│ Settings         │
│ Help             │
│                  │
│ ┌──────────────┐ │
│ │ Workspace    │ │
│ │ Free         │ │
│ └──────────────┘ │
└──────────────────┘
```

The sidebar should remain focused and should not become an overloaded administration menu.

## 5.2 Initial Navigation

The initial dashboard navigation is:

- Overview
- My Forms
- Responses
- Analytics
- Templates
- Integrations
- Settings
- Help

A prominent **Create Form** action should be available from the sidebar.

## 5.3 Desktop Width

The initial design target is approximately **240–260px**.

This is a design target, not a hard implementation constraint.

---

# 6. Dashboard Routes

The initial route structure is:

```text
/dashboard
/dashboard/forms
/dashboard/forms/new
/dashboard/forms/[formId]
/dashboard/forms/[formId]/responses
/dashboard/forms/[formId]/settings

/dashboard/templates
/dashboard/integrations

/dashboard/settings
```

The exact routing implementation may evolve as the application grows, but these routes establish the initial product structure.

---

# 7. Dashboard Overview

The default `/dashboard` page is an Overview rather than simply the forms list.

The overview should communicate the current state of the user's forms at a glance.

## 7.1 Main Sections

```text
Dashboard Overview
├── Dashboard Header
├── Statistics
├── Recent Forms
└── Response Activity
```

## 7.2 Dashboard Header

Conceptually:

```text
Good morning

Here's what's happening with your forms.
```

## 7.3 Statistics

Initial conceptual metrics:

```text
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ Forms       │ │ Responses   │ │ Completion  │
│ 12          │ │ 2,481       │ │ 78.4%       │
└─────────────┘ └─────────────┘ └─────────────┘
```

The exact metrics are subject to the available backend data.

## 7.4 Recent Forms

The dashboard should provide a quick view of recently used forms, including information such as:

- Form name
- Response count
- Status
- Link to the form

Example:

```text
Recent forms                                  View all →

Customer Feedback       284 responses       Live
Job Application         102 responses       Live
Event Registration       87 responses       Draft
```

## 7.5 Response Activity

The Overview should include a response-activity visualization.

The exact chart implementation is intentionally not fixed yet.

---

# 8. Dashboard Component Architecture

Recommended initial structure:

```text
app/
└── dashboard/
    ├── layout.tsx
    ├── page.tsx
    └── components/
        ├── dashboard-navbar.tsx
        ├── dashboard-sidebar.tsx
        ├── workspace-switcher.tsx
        ├── dashboard-header.tsx
        ├── stats-grid.tsx
        ├── stat-card.tsx
        ├── recent-forms.tsx
        ├── form-row.tsx
        └── response-activity.tsx
```

This is an initial component boundary, not a requirement that every component must remain in this exact location.

---

# 9. Builder Shell

## 9.1 Separation From Dashboard

The form editor should **not feel like a normal dashboard page**.

When the user enters the form builder, the application switches to a dedicated builder shell.

Conceptually:

```text
Dashboard Shell
├── Navbar
├── Sidebar
└── Page Content
```

versus:

```text
Builder Shell
├── Builder Header
├── Field Palette
├── Form Canvas
└── Properties Panel
```

This separation keeps the editor focused on form construction.

---

# 10. Builder Layout

The initial editor is a three-panel workspace:

```text
┌───────────────────────────────────────────────────────────────────────┐
│ ← Forms   Customer Feedback              Saved ✓   Preview   Publish │
├────────────────┬───────────────────────────────────────┬──────────────┤
│                │                                       │              │
│  FIELD PALETTE │             FORM CANVAS               │ PROPERTIES   │
│                │                                       │              │
│  + Text        │        Customer Feedback              │ Email        │
│  + Email       │                                       │              │
│  + Number      │        ⋮⋮ Name                       │ Label        │
│  + Select      │        ┌─────────────────────────┐    │ [________]   │
│  + Checkbox    │        │                         │    │              │
│  + Radio       │        └─────────────────────────┘    │ Required  ●  │
│  + Date        │                                       │              │
│  ...           │        ⋮⋮ Email                      │ Validation   │
│                │        ┌─────────────────────────┐    │              │
│                │        │                         │    │ Email        │
│                │        └─────────────────────────┘    │              │
│                │                                       │              │
│                │        ───── Drop field here ─────    │              │
└────────────────┴───────────────────────────────────────┴──────────────┘
```

---

# 11. Builder Header

The Builder Header should provide:

- Back to Forms
- Current form name
- Save status
- Preview
- Publish

Conceptually:

```text
← Forms   Customer Feedback       Saved ✓    Preview    Publish
```

The exact controls and interaction states are subject to further UI design.

---

# 12. Field Palette

The Field Palette contains the field types available to the user.

Initial conceptual fields include:

- Text
- Email
- Number
- Select
- Checkbox
- Radio
- Date
- Other field types as the product specification expands

The palette is the source for creating new fields.

---

# 13. Form Canvas

The Form Canvas is the central editing area.

Responsibilities:

- Display the current form
- Allow fields to be selected
- Allow fields to be reordered
- Accept new fields from the Field Palette
- Display drop indicators
- Provide a clear editing state
- Support the form's visual hierarchy

The initial layout is **single-column**.

Multi-column layouts are not part of the initial requirement and should be treated as a future consideration.

---

# 14. Properties Panel

The Properties Panel configures the currently selected field.

Initial conceptual groups:

```text
Properties
├── General
├── Validation
├── Appearance
└── Advanced
```

Possible field configuration includes:

- Label
- Description
- Required state
- Validation rules
- Field-specific attributes
- Appearance-related options
- Advanced/custom attributes

The exact property set depends on the field type.

---

# 15. Drag-and-Drop Architecture

Drag-and-drop is a core editor capability.

It is not an optional enhancement to be added after the initial editor.

There are two distinct drag-and-drop operations.

## 15.1 Palette → Canvas

Dragging a field type from the Field Palette into the Form Canvas creates a new field.

```text
Field Palette                    Form Canvas

Text ─────────────────────────→  Drop location
                                  ↓
                               New field
```

Example:

```text
Email
   ↓ drag
Drop location
   ↓
Email address field created
```

## 15.2 Canvas → Canvas

Dragging an existing field within the Form Canvas changes its order.

Example:

```text
Before:

Name
Email
Message

Drag Email above Name

After:

Email
Name
Message
```

Both operations must be considered part of the initial editor architecture.

---

# 16. Drag Handle

The entire field should not necessarily behave as a drag target for every interaction.

A dedicated drag handle is preferred for existing fields.

Conceptually:

```text
┌─────────────────────────────────────┐
│ ⋮⋮   Email                          │
│      ┌───────────────────────────┐  │
│      │ email@example.com         │  │
│      └───────────────────────────┘  │
└─────────────────────────────────────┘
```

The drag handle can appear on hover/selection.

The purpose is to prevent normal interactions such as typing into or selecting a field from unintentionally starting a drag operation.

---

# 17. Drag-and-Drop Implementation Direction

A dedicated React drag-and-drop library such as **dnd-kit** is the preferred implementation direction.

The conceptual component structure is:

```text
DndContext
│
├── FieldPalette
│   └── DraggableFieldType
│
└── FormCanvas
    └── SortableContext
        ├── SortableField
        ├── SortableField
        └── SortableField
```

The drag-and-drop implementation should provide:

- Pointer interaction
- Sortable fields
- Collision detection
- Drag overlays
- Drop animations
- Keyboard accessibility
- Touch support where appropriate

The drag-and-drop library must remain an implementation detail of the editor.

The form/domain state must not depend directly on the library's internal state.

---

# 18. Editor Domain Model

A form field requires a stable identifier and configuration.

Initial conceptual model:

```ts
type FormField = {
  id: string;
  type: FieldType;
  position: number;

  label: string;
  description?: string;

  required: boolean;

  validation?: FieldValidation;

  attributes: Record<string, unknown>;
};
```

This is a conceptual model for the editor architecture. The final database schema and TypeScript types must be aligned with the broader Formify data model before implementation.

---

# 19. Field Ordering

Fields need a stable ordering mechanism.

The initial conceptual model contains:

```ts
position: number;
```

However, the implementation should avoid creating unnecessary database churn during frequent reordering.

The final ordering strategy should therefore be chosen with consideration for:

- Frequent drag operations
- Database update cost
- Concurrent editing
- Multi-tab synchronization
- Stable ordering
- Reordering large forms

The exact persistence strategy remains an implementation decision.

---

# 20. Editor State Architecture

Drag-and-drop should be treated as a normal editor mutation.

The editor flow should be:

```text
User drags field
      ↓
onDragEnd
      ↓
Calculate new order
      ↓
Update local editor state
      ↓
Persist mutation
      ↓
Broadcast change
      ↓
Other tab receives update
```

The drag-and-drop library must **not** directly manipulate the database.

The architecture is:

```text
UI interaction
      ↓
Domain/editor state
      ↓
Persistence
      ↓
Synchronization
```

This separation is important for maintainability and future collaboration features.

---

# 21. Autosave

Form editing should support the previously established persistence approach.

Different mutations can have different persistence behavior.

### Structural mutations

Examples:

- Add field
- Delete field
- Reorder field
- Add/delete an attribute

These should trigger the appropriate persistence flow immediately or according to the finalized mutation strategy.

### Text/configuration changes

Examples:

- Field label
- Description
- Attribute name
- Other editable text

These can use idle/debounced persistence to avoid excessive database writes.

The exact debounce duration is not fixed in this document.

---

# 22. Multi-Tab Synchronization

The editor architecture must remain compatible with multi-tab synchronization.

Conceptually:

```text
Tab A
  ↓
Editor mutation
  ↓
Persist
  ↓
Broadcast
  ↓
Tab B
  ↓
Apply synchronized state
```

Drag-and-drop reorder operations are therefore part of the same synchronization system as other editor mutations.

The editor should not create a separate synchronization mechanism specifically for drag-and-drop.

---

# 23. Component Architecture for the Builder

Recommended initial structure:

```text
builder/
├── components/
│   ├── editor-header.tsx
│   ├── field-palette.tsx
│   ├── field-palette-item.tsx
│   ├── form-canvas.tsx
│   ├── drop-zone.tsx
│   ├── sortable-field.tsx
│   ├── field-drag-handle.tsx
│   ├── properties-panel.tsx
│   └── ...
│
├── state/
│   ├── editor-state.ts
│   └── ...
│
└── ...
```

This structure is intentionally separated into:

- Presentation components
- Drag-and-drop components
- Editor state
- Persistence/synchronization logic

---

# 24. Initial UX Rules

The following rules should guide the editor:

### Rule 1 — Dragging must be obvious

Users should understand what can be dragged and where it can be dropped.

### Rule 2 — Selection and dragging are different interactions

Clicking a field selects it.

Dragging the drag handle reorders it.

### Rule 3 — Dropping must provide feedback

The canvas should clearly indicate the insertion location.

### Rule 4 — Editing must remain uninterrupted

Typing, selecting text, toggling settings, and interacting with field controls should not unexpectedly initiate dragging.

### Rule 5 — State must remain independent of DnD

Drag-and-drop is an interaction mechanism, not the source of truth for form data.

---

# 25. Responsive Behavior

Responsive behavior is part of the architecture but exact breakpoints are not yet locked.

The desktop editor is the primary target:

```text
Field Palette | Form Canvas | Properties
```

On smaller screens, these panels should not simply be compressed into unusable widths.

A responsive strategy may involve:

```text
Mobile
├── Builder Header
├── Form Canvas
├── Field Palette → drawer/sheet
└── Properties → drawer/sheet
```

The exact mobile interaction model should be designed before implementation of the responsive builder.

The dashboard similarly requires a mobile navigation strategy, but exact behavior remains to be finalized.

---

# 26. Initial Product Boundaries

## Included in the initial architecture

- Dashboard shell
- Navbar
- Sidebar
- Dashboard overview
- Forms navigation
- Dedicated builder shell
- Field palette
- Form canvas
- Properties panel
- Drag palette → canvas
- Drag canvas → canvas
- Field selection
- Field configuration
- Autosave architecture
- Multi-tab synchronization compatibility

## Not yet committed

- Multi-column form layouts
- Advanced collaborative editing
- Real-time multi-user cursors
- Exact field catalog
- Final database ordering strategy
- Exact responsive breakpoints
- Exact animation specifications

These can be added later without changing the fundamental shell architecture.

---

# 27. Final Component Tree

The working application structure is:

```text
Formify
│
├── Dashboard
│   │
│   ├── DashboardLayout
│   │   ├── DashboardNavbar
│   │   │   ├── Logo
│   │   │   ├── GlobalSearch
│   │   │   ├── Help
│   │   │   ├── Notifications
│   │   │   ├── WorkspaceSwitcher
│   │   │   └── UserMenu
│   │   │
│   │   ├── DashboardSidebar
│   │   │   ├── CreateForm
│   │   │   ├── PrimaryNavigation
│   │   │   ├── SecondaryNavigation
│   │   │   └── WorkspaceInfo
│   │   │
│   │   └── DashboardContent
│   │
│   ├── Overview
│   │   ├── DashboardHeader
│   │   ├── StatsGrid
│   │   ├── RecentForms
│   │   └── ResponseActivity
│   │
│   └── Forms
│       ├── FormsList
│       ├── FormRow/Card
│       └── CreateForm
│
└── Builder
    │
    ├── BuilderShell
    │   ├── EditorHeader
    │   └── EditorWorkspace
    │
    ├── FieldPalette
    │   └── DraggableFieldType
    │
    ├── FormCanvas
    │   ├── DropZone
    │   └── SortableField
    │       └── DragHandle
    │
    └── PropertiesPanel
        ├── General
        ├── Validation
        ├── Appearance
        └── Advanced
```

---

# 28. Implementation Principles

Before coding, the following principles are considered architectural constraints:

1. **Dashboard and Builder are separate shells.**
2. **The builder is a visual editor, not a conventional dashboard page.**
3. **Drag-and-drop is a first-class editor feature.**
4. **Palette → Canvas creates fields.**
5. **Canvas → Canvas reorders fields.**
6. **A dedicated drag handle should be used for existing fields.**
7. **The drag-and-drop library does not own domain state.**
8. **Editor state is separate from persistence.**
9. **Persistence is separate from synchronization.**
10. **Autosave and multi-tab synchronization must work with drag-and-drop mutations.**
11. **The initial canvas layout is single-column.**
12. **Multi-column layouts remain a future consideration.**
13. **The dashboard should remain focused rather than becoming an overloaded admin panel.**
14. **Responsive behavior must preserve usability rather than merely shrinking desktop layouts.**

---

# 29. Pre-Implementation Checklist

Before implementation begins, finalize:

- [ ] Exact dashboard Navbar dimensions
- [ ] Exact Sidebar dimensions
- [ ] Desktop/mobile navigation behavior
- [ ] Dashboard spacing and typography
- [ ] Forms-list visual design
- [ ] Builder panel widths
- [ ] Builder responsive behavior
- [ ] Complete initial field catalog
- [ ] Field-specific property schemas
- [ ] Drag-and-drop collision/drop strategy
- [ ] Field ordering persistence strategy
- [ ] Editor state management approach
- [ ] Autosave mutation strategy
- [ ] Multi-tab synchronization protocol
- [ ] Undo/redo requirements
- [ ] Keyboard accessibility behavior

---

## 30. Working Specification Status

This document is the **working architectural specification** for the Formify Dashboard and Form Builder.

It intentionally separates:

- **Decisions already made**
- **Implementation direction**
- **Features not yet committed**

New requirements should be evaluated against this document before implementation so that the dashboard, editor, persistence layer, and synchronization system remain consistent.
