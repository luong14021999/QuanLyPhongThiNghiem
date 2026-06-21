import Link from "next/link";
import {
  LayoutDashboard,
  ClipboardList,
  FlaskConical,
  Wrench,
  Beaker,
  FileText,
  Settings,
  Sprout,
  Users,
  TestTube,
  Users2,
  Archive,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type NavItem = { href: string; label: string; icon: LucideIcon };
export type NavGroup = { label: string; items: NavItem[] };

export const navGroups: NavGroup[] = [
  {
    label: "Tổng quan",
    items: [{ href: "/", label: "Bảng điều khiển", icon: LayoutDashboard }],
  },
  {
    label: "Nghiệp vụ",
    items: [
      { href: "/samples", label: "Tiếp nhận mẫu", icon: ClipboardList },
      { href: "/analysis", label: "Quy trình phân tích", icon: FlaskConical },
      { href: "/archive", label: "Kho mẫu lưu", icon: Archive },
    ],
  },
  {
    label: "Đảm bảo chất lượng",
    items: [{ href: "/qc", label: "QC Levey-Jennings", icon: ShieldCheck }],
  },
  {
    label: "Nguồn lực",
    items: [
      { href: "/personnel", label: "Nhân sự PTN", icon: Users },
      { href: "/equipment", label: "Thiết bị PTN", icon: Wrench },
      { href: "/tools", label: "Dụng cụ", icon: TestTube },
      { href: "/chemicals", label: "Hóa chất – Vật tư", icon: Beaker },
    ],
  },
  {
    label: "Khách hàng",
    items: [{ href: "/customers", label: "Khách hàng", icon: Users2 }],
  },
  {
    label: "Khác",
    items: [
      { href: "/reports", label: "Báo cáo & Phiếu KQ", icon: FileText },
      { href: "/settings", label: "Cấu hình", icon: Settings },
    ],
  },
];

export function SidebarBrand() {
  return (
    <div className="h-16 flex items-center gap-3 px-5 border-b border-sidebar-border">
      <div className="w-9 h-9 rounded-lg bg-primary/20 ring-1 ring-primary/40 flex items-center justify-center">
        <Sprout className="w-5 h-5 text-primary" />
      </div>
      <div className="leading-tight min-w-0">
        <div className="text-sm font-semibold text-white truncate">
          Viện Nông Nghiệp Thanh Hóa
        </div>
        <div className="text-[11px] text-sidebar-foreground/60 truncate">
          PTN Môi trường · Đất · Nước · Phân bón · ATTP
        </div>
      </div>
    </div>
  );
}

export function SidebarFooter() {
  return (
    <div className="p-3 border-t border-sidebar-border">
      <div className="flex items-center gap-3 px-2 py-2 rounded-md bg-sidebar-accent/40">
        <div className="w-8 h-8 rounded-full bg-primary/30 flex items-center justify-center text-white text-xs font-semibold">
          NL
        </div>
        <div className="leading-tight text-xs min-w-0">
          <div className="text-white font-medium truncate">
            Nguyễn Đình Lương
          </div>
          <div className="text-sidebar-foreground/60 truncate">
            Trưởng phòng PTN
          </div>
        </div>
      </div>
    </div>
  );
}

export function SidebarNav({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex-1 overflow-y-auto px-3 py-4 scrollbar-thin">
      {navGroups.map((group) => (
        <div key={group.label} className="mb-5">
          <div className="px-2 mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-sidebar-foreground/50">
            {group.label}
          </div>
          <ul className="space-y-0.5">
            {group.items.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    className={cn(
                      "flex items-center gap-3 px-2.5 py-2 rounded-md text-sm transition-colors",
                      active
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                    )}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
