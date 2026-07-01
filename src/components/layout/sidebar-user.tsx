"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Loader2, User as UserIcon } from "lucide-react";
import { createSupabaseBrowser } from "@/lib/supabase/browser";

export function SidebarUser() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    const supabase = createSupabaseBrowser();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      setEmail(user.email ?? null);
      const meta = user.user_metadata as
        | { full_name?: string; name?: string }
        | undefined;
      setName(meta?.full_name ?? meta?.name ?? null);
    });
  }, []);

  async function onLogout() {
    setSigningOut(true);
    const supabase = createSupabaseBrowser();
    await supabase.auth.signOut();
    setSigningOut(false);
    startTransition(() => {
      router.replace("/login");
      router.refresh();
    });
  }

  const initial = (name ?? email ?? "?").charAt(0).toUpperCase();
  const loading = signingOut || pending;

  return (
    <div className="p-3 border-t border-sidebar-border space-y-2">
      <div className="flex items-center gap-3 px-2 py-2 rounded-md bg-sidebar-accent/40">
        <div className="w-8 h-8 rounded-full bg-primary/30 flex items-center justify-center text-white text-xs font-semibold shrink-0">
          {email ? initial : <UserIcon className="w-4 h-4" />}
        </div>
        <div className="leading-tight text-xs min-w-0 flex-1">
          <div className="text-white font-medium truncate">
            {name ?? email ?? "Đang tải..."}
          </div>
          <div className="text-sidebar-foreground/60 truncate">
            {name && email ? email : "PTN VNNTH"}
          </div>
        </div>
      </div>
      <button
        onClick={onLogout}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 h-9 rounded-md text-xs font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-white transition-colors disabled:opacity-60"
      >
        {loading ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : (
          <LogOut className="w-3.5 h-3.5" />
        )}
        Đăng xuất
      </button>
    </div>
  );
}
