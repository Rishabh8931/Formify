"use client";

import { Bell, CircleHelp, Search } from "lucide-react";

import { UserMenu } from "./user-menu";

type DashboardNavbarProps = {
  user: {
    name: string;
    email: string;
    image?: string | null;
  };
};

export function DashboardNavbar({ user }: DashboardNavbarProps) {
  return (
    <header className="sticky top-0 z-40 h-16 border-b bg-background/95 backdrop-blur">
      <div className="flex h-full items-center justify-between px-6">
        {/* Search */}
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <input
            type="search"
            placeholder="Search forms..."
            className="h-9 w-full rounded-md border bg-background pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Right side */}
        <div className="ml-6 flex items-center gap-2">
          <button className="flex size-9 items-center justify-center rounded-md hover:bg-muted">
            <CircleHelp className="size-4" />
          </button>

          <button className="flex size-9 items-center justify-center rounded-md hover:bg-muted">
            <Bell className="size-4" />
          </button>

          <UserMenu user={user} />
        </div>
      </div>
    </header>
  );
}
