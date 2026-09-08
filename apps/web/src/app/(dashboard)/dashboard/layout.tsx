import type { ReactNode } from "react";

import { getSession } from "@/lib/auth";
import { DashboardNavbar } from "./components/dashboard-navbar";
import { DashboardSidebar } from "./components/dashboard-sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getSession();

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />

      <div className="md:pl-64">
        <DashboardNavbar user={session!.user} />

        <main className="min-h-[calc(100vh-4rem)]">{children}</main>
      </div>
    </div>
  );
}
