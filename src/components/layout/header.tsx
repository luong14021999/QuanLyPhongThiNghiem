import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

type HeaderProps = {
  title: string;
  description?: string;
};

export function Header({ title, description }: HeaderProps) {
  return (
    <header className="h-16 shrink-0 border-b border-border bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/60 px-4 sm:px-6 flex items-center justify-between gap-4">
      <div className="min-w-0">
        <h1 className="text-base sm:text-lg font-semibold truncate">{title}</h1>
        {description && (
          <p className="text-xs text-muted-foreground truncate">
            {description}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center gap-2 rounded-md border border-input bg-background px-2.5 h-9 w-72 text-sm text-muted-foreground">
          <Search className="w-4 h-4" />
          <input
            className="bg-transparent outline-none flex-1 placeholder:text-muted-foreground"
            placeholder="Tìm mẫu, khách hàng, mã chỉ tiêu..."
          />
          <kbd className="text-[10px] border rounded px-1 py-0.5 text-muted-foreground/70">
            Ctrl K
          </kbd>
        </div>
        <Button variant="ghost" size="icon" aria-label="Thông báo">
          <Bell />
        </Button>
      </div>
    </header>
  );
}
