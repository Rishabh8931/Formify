"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  FileText,
  FolderKanban,
  HelpCircle,
  LayoutTemplate,
  Plus,
  Settings,
  SlidersHorizontal,
  Sparkles,
  Workflow,
} from "lucide-react";

const navigation = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: BarChart3,
  },
  {
    label: "My Forms",
    href: "/forms",
    icon: FileText,
  },
  {
    label: "Responses",
    href: "/responses",
    icon: FolderKanban,
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
];

const secondaryNavigation = [
  {
    label: "Templates",
    href: "/templates",
    icon: LayoutTemplate,
  },
  {
    label: "Integrations",
    href: "/integrations",
    icon: Workflow,
  },
];

const bottomNavigation = [
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    label: "Help",
    href: "/help",
    icon: HelpCircle,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-border bg-background md:flex md:flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center px-6">
        <Link
          href="/dashboard"
          className="text-xl font-semibold tracking-tight"
        >
          formify
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex flex-1 flex-col px-3">
        <Link
          href="/dashboard/forms/new"
          className="mb-6 flex h-10 items-center justify-center gap-2 rounded-lg bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          <Plus className="size-4" />
          Create form
        </Link>

        <nav className="space-y-1">
          {navigation.map((item) => (
            <SidebarItem
              key={item.href}
              {...item}
              active={isActive(pathname, item.href)}
            />
          ))}
        </nav>

        <div className="my-5 border-t border-border" />

        <nav className="space-y-1">
          {secondaryNavigation.map((item) => (
            <SidebarItem
              key={item.href}
              {...item}
              active={isActive(pathname, item.href)}
            />
          ))}
        </nav>

        <div className="mt-auto">
          <div className="my-5 border-t border-border" />

          <nav className="space-y-1">
            {bottomNavigation.map((item) => (
              <SidebarItem
                key={item.href}
                {...item}
                active={isActive(pathname, item.href)}
              />
            ))}
          </nav>

          <PlanCard />
        </div>
      </div>
    </aside>
  );
}

function SidebarItem({
  label,
  href,
  icon: Icon,
  active,
}: {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={[
        "flex h-10 items-center gap-3 rounded-lg px-3 text-sm transition-colors",
        active
          ? "bg-foreground/[0.06] font-medium text-foreground"
          : "text-muted-foreground hover:bg-foreground/[0.04] hover:text-foreground",
      ].join(" ")}
    >
      <Icon className="size-4 shrink-0" />
      <span>{label}</span>
    </Link>
  );
}

function PlanCard() {
  return (
    <div className="mb-4 mt-4 rounded-xl border border-border bg-white p-4">
      <div className="mb-3 flex items-center gap-2">
        <Sparkles className="size-4 text-accent" />

        <span className="text-sm font-medium">Free plan</span>
      </div>

      <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-muted">
        <div className="h-full w-[35%] rounded-full bg-accent" />
      </div>

      <p className="text-xs text-muted-foreground">
        35% of your monthly response limit used
      </p>
    </div>
  );
}

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") {
    return pathname === href;
  }

  return pathname.startsWith(href);
}
