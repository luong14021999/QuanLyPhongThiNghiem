"use client";

import Link from "next/link";
import Image from "next/image";
import { HeaderUser } from "@/components/layout/header-user";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";

export function TopBar() {
  return (
    <header
      className="relative h-20 shrink-0 text-white pl-3 pr-3 sm:pr-5 lg:pl-5 lg:pr-7 flex items-center gap-3 lg:gap-4 shadow-md"
      style={{
        background:
          "linear-gradient(120deg, hsl(145 62% 30%) 0%, hsl(150 55% 23%) 55%, hsl(155 60% 16%) 100%)",
      }}
    >
      {/* subtle decorative overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 85% -20%, white 0%, transparent 40%)",
        }}
      />

      {/* Mobile nav trigger */}
      <div className="relative z-10 md:hidden">
        <MobileSidebar />
      </div>

      {/* Brand */}
      <Link
        href="/"
        className="relative z-10 flex items-center gap-3.5 shrink-0 group"
      >
        <div className="w-16 h-16 rounded-full bg-white ring-2 ring-white/50 shadow-lg flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
          <Image
            src="/logo-vnnth.png"
            alt="Viện Nông Nghiệp Thanh Hóa"
            width={64}
            height={64}
            className="w-16 h-16 object-contain"
            priority
          />
        </div>
        <div className="leading-tight">
          <div className="text-lg sm:text-xl font-bold tracking-tight text-white drop-shadow-sm">
            Viện Nông Nghiệp Thanh Hóa
          </div>
          <div className="hidden sm:block text-xs lg:text-[13px] text-white/70 font-medium mt-0.5">
            Hệ thống quản lý phòng thí nghiệm · ISO/IEC 17025:2017
          </div>
        </div>
      </Link>

      {/* Logout */}
      <div className="relative z-10 ml-auto shrink-0">
        <HeaderUser />
      </div>
    </header>
  );
}
