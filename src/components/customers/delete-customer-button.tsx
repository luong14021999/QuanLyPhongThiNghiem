"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DeleteCustomerButton({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  async function onDelete() {
    if (!window.confirm(`Xóa khách hàng "${name}"?`)) return;
    const res = await fetch(`/api/customers/${id}`, { method: "DELETE" });
    if (!res.ok) {
      window.alert("Xóa thất bại");
      return;
    }
    startTransition(() => router.refresh());
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onDelete}
      disabled={pending}
      aria-label={`Xóa ${name}`}
      className="h-7 px-2 text-rose-600 hover:bg-rose-50 hover:text-rose-700"
    >
      {pending ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : (
        <Trash2 className="w-3.5 h-3.5" />
      )}
    </Button>
  );
}
