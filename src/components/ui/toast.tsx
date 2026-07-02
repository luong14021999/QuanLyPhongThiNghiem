"use client";

import { useEffect, useState } from "react";
import * as Toast from "@radix-ui/react-toast";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

type Variant = "success" | "error";
type ToastItem = {
  id: number;
  title: string;
  description?: string;
  variant: Variant;
};

let counter = 0;
let listeners: Array<(t: ToastItem) => void> = [];

function push(variant: Variant, title: string, description?: string) {
  counter += 1;
  const item: ToastItem = { id: counter, title, description, variant };
  listeners.forEach((l) => l(item));
}

export const toast = {
  success: (title: string, description?: string) =>
    push("success", title, description),
  error: (title: string, description?: string) =>
    push("error", title, description),
};

export function Toaster() {
  const [items, setItems] = useState<ToastItem[]>([]);

  useEffect(() => {
    const listener = (t: ToastItem) => setItems((prev) => [...prev, t]);
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }, []);

  function remove(id: number) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  return (
    <Toast.Provider swipeDirection="right" duration={3500}>
      {items.map((item) => {
        const success = item.variant === "success";
        const Icon = success ? CheckCircle2 : AlertCircle;
        return (
          <Toast.Root
            key={item.id}
            onOpenChange={(open) => {
              if (!open) remove(item.id);
            }}
            className="group relative flex items-start gap-3 rounded-xl border bg-card p-4 pr-9 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:slide-in-from-right-full data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none"
          >
            <Icon
              className={`w-5 h-5 mt-0.5 shrink-0 ${
                success ? "text-emerald-600" : "text-rose-600"
              }`}
            />
            <div className="min-w-0 flex-1">
              <Toast.Title className="text-sm font-semibold text-foreground">
                {item.title}
              </Toast.Title>
              {item.description && (
                <Toast.Description className="mt-0.5 text-xs text-muted-foreground">
                  {item.description}
                </Toast.Description>
              )}
            </div>
            <Toast.Close
              aria-label="Đóng"
              className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </Toast.Close>
          </Toast.Root>
        );
      })}
      <Toast.Viewport className="fixed top-0 right-0 z-[100] flex w-96 max-w-[calc(100vw-2rem)] flex-col gap-2 p-4 outline-none" />
    </Toast.Provider>
  );
}
