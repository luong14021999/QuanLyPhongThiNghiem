"use client";

import { usePathname } from "next/navigation";
import { SidebarNav } from "@/components/layout/nav-config";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:flex-col w-64 shrink-0 bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <SidebarNav pathname={pathname} />
    </aside>
  );
}
