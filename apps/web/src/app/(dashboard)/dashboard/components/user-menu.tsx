"use client";

import { useState } from "react";
import { LogOut, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { authClient } from "@/lib/auth-client";

type UserMenuProps = {
  user: {
    name: string;
    email: string;
    image?: string | null;
  };
};

export function UserMenu({ user }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleSignOut() {
    setLoading(true);

    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh();
        },
      },
    });

    setLoading(false);
  }

  const initials = user.name
    .split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative">
      {/* Avatar button */}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex size-9 items-center justify-center overflow-hidden rounded-full border bg-muted text-sm font-medium"
        aria-label="Open account menu"
        aria-expanded={open}
      >
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name}
            className="size-full object-cover"
            width={36}
            height={36}
          />
        ) : (
          initials
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-11 z-50 w-72 rounded-lg border bg-background p-2 shadow-lg">
          {/* User info */}
          <div className="flex items-center gap-3 px-3 py-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium">
              {initials}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{user.name}</p>

              <p className="truncate text-xs text-muted-foreground">
                {user.email}
              </p>
            </div>
          </div>

          <div className="my-1 h-px bg-border" />

          {/* Account */}
          <button
            type="button"
            onClick={() => router.push("/dashboard/settings")}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-muted"
          >
            <User className="size-4" />
            Account
          </button>

          {/* Settings */}
          <button
            type="button"
            onClick={() => router.push("/dashboard/settings")}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-muted"
          >
            <Settings className="size-4" />
            Settings
          </button>

          <div className="my-1 h-px bg-border" />

          {/* Sign out */}
          <button
            type="button"
            disabled={loading}
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-destructive hover:bg-destructive/10 disabled:opacity-50"
          >
            <LogOut className="size-4" />

            {loading ? "Signing out..." : "Sign out"}
          </button>
        </div>
      )}
    </div>
  );
}
