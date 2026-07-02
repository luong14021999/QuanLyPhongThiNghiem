"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { Pencil, X, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Equipment } from "@/lib/mock-data";

const STATUSES: Equipment["status"][] = [
  "Hoạt động",
  "Hiệu chuẩn",
  "Bảo trì",
  "Ngừng",
];

export function EditEquipmentDialog({ row }: { row: Equipment }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  async function onSubmit(formData: FormData) {
    setError(null);
    const payload = {
      code: String(formData.get("code") ?? "").trim(),
      name: String(formData.get("name") ?? "").trim(),
      model: String(formData.get("model") ?? "").trim(),
      location: String(formData.get("location") ?? "").trim(),
      lastCalibration: String(formData.get("lastCalibration") ?? ""),
      nextCalibration: String(formData.get("nextCalibration") ?? ""),
      status: String(formData.get("status") ?? row.status) as Equipment["status"],
      usageHours: Number(formData.get("usageHours") ?? 0),
    };
    const res = await fetch(`/api/equipment/${row.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      const message = body.error ?? `HTTP ${res.status}`;
      setError(message);
      toast.error("Cập nhật thất bại", message);
      return;
    }
    toast.success("Cập nhật thành công", `Đã lưu "${row.name}"`);
    startTransition(() => {
      router.refresh();
      setOpen(false);
    });
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1.5 text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          aria-label={`Sửa ${row.name}`}
        >
          <Pencil className="w-3.5 h-3.5" />
          Sửa
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-lg bg-card border rounded-xl shadow-xl p-5 max-h-[92vh] overflow-y-auto">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div>
              <Dialog.Title className="text-base font-semibold">
                Sửa thiết bị
              </Dialog.Title>
              <Dialog.Description className="text-xs text-muted-foreground">
                {row.code} · {row.name}
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button className="h-8 w-8 inline-flex items-center justify-center rounded-md text-muted-foreground hover:bg-accent">
                <X className="w-4 h-4" />
              </button>
            </Dialog.Close>
          </div>
          <form action={onSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="code">Mã *</Label>
                <Input
                  id="code"
                  name="code"
                  required
                  defaultValue={row.code}
                  className="font-mono text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="status">Trạng thái</Label>
                <select
                  id="status"
                  name="status"
                  defaultValue={row.status}
                  className="w-full h-9 rounded-md border border-input bg-background px-2 text-sm"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="name">Tên thiết bị *</Label>
              <Input
                id="name"
                name="name"
                required
                defaultValue={row.name}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="model">Model</Label>
                <Input id="model" name="model" defaultValue={row.model} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="location">Vị trí</Label>
                <Input
                  id="location"
                  name="location"
                  defaultValue={row.location}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="lastCalibration">Hiệu chuẩn gần nhất</Label>
                <Input
                  id="lastCalibration"
                  name="lastCalibration"
                  type="date"
                  defaultValue={row.lastCalibration}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="nextCalibration">Hiệu chuẩn kế tiếp</Label>
                <Input
                  id="nextCalibration"
                  name="nextCalibration"
                  type="date"
                  defaultValue={row.nextCalibration}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="usageHours">Giờ chạy</Label>
              <Input
                id="usageHours"
                name="usageHours"
                type="number"
                min={0}
                defaultValue={row.usageHours}
              />
            </div>
            {error && (
              <div className="text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded px-2.5 py-2">
                {error}
              </div>
            )}
            <div className="flex justify-end gap-2 pt-2 border-t">
              <Dialog.Close asChild>
                <Button variant="outline" type="button">
                  Hủy
                </Button>
              </Dialog.Close>
              <Button type="submit" disabled={pending}>
                {pending && <Loader2 className="w-4 h-4 animate-spin" />}
                Cập nhật
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
