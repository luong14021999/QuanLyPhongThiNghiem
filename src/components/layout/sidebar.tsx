"use client";

import { usePathname } from "next/navigation";
import {
  SidebarBrand,
  SidebarNav,
} from "@/components/layout/nav-config";
import { SidebarUser } from "@/components/layout/sidebar-user";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:flex-col w-64 shrink-0 bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <SidebarBrand />
      <SidebarNav pathname={pathname} />
      <SidebarUser />
    </aside>
  );
}
