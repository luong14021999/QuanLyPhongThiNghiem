"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { Plus, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const HAZARDS = ["Thường", "Độc hại", "Dễ cháy", "Ăn mòn"];

export function AddChemicalDialog() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  async function onSubmit(formData: FormData) {
    setError(null);
    const usedForRaw = String(formData.get("usedFor") ?? "");
    const payload = {
      code: String(formData.get("code") ?? "").trim(),
      name: String(formData.get("name") ?? "").trim(),
      cas: String(formData.get("cas") ?? "—").trim(),
      unit: String(formData.get("unit") ?? "lít").trim(),
      stock: Number(formData.get("stock") ?? 0),
      minStock: Number(formData.get("minStock") ?? 0),
      expiry: String(formData.get("expiry") ?? ""),
      hazard: String(formData.get("hazard") ?? "Thường"),
      location: String(formData.get("location") ?? "").trim(),
      technicalSpec: String(formData.get("technicalSpec") ?? "").trim(),
      manufacturer: String(formData.get("manufacturer") ?? "").trim(),
      manufactureDate: String(formData.get("manufactureDate") ?? ""),
      receivedAt: String(formData.get("receivedAt") ?? ""),
      storageCondition: String(formData.get("storageCondition") ?? "").trim(),
      usedFor: usedForRaw.split(",").map((s) => s.trim()).filter(Boolean),
      isReference: formData.get("isReference") === "on",
    };
    const res = await fetch("/api/chemicals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? `HTTP ${res.status}`);
      return;
    }
    startTransition(() => {
      router.refresh();
      setOpen(false);
    });
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button size="sm">
          <Plus />
          Thêm hóa chất
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-xl bg-card border rounded-xl shadow-xl p-5 max-h-[92vh] overflow-y-auto">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div>
              <Dialog.Title className="text-base font-semibold">
                Thêm hóa chất / chất chuẩn
              </Dialog.Title>
              <Dialog.Description className="text-xs text-muted-foreground">
                Ghi vào <code className="font-mono">data/chemicals.json</code>
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
                <Input id="code" name="code" required placeholder="HC-1234" className="font-mono text-sm" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cas">CAS</Label>
                <Input id="cas" name="cas" defaultValue="—" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="name">Tên hóa chất *</Label>
              <Input id="name" name="name" required />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="stock">Tồn kho</Label>
                <Input id="stock" name="stock" type="number" step="0.01" defaultValue={0} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="minStock">Tối thiểu</Label>
                <Input id="minStock" name="minStock" type="number" step="0.01" defaultValue={0} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="unit">Đơn vị</Label>
                <Input id="unit" name="unit" defaultValue="lít" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="hazard">Phân loại</Label>
                <select id="hazard" name="hazard" defaultValue="Thường" className="w-full h-9 rounded-md border border-input bg-background px-2 text-sm">
                  {HAZARDS.map((h) => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="expiry">Hạn sử dụng</Label>
                <Input id="expiry" name="expiry" type="date" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="manufacturer">Nhà sản xuất</Label>
                <Input id="manufacturer" name="manufacturer" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="manufactureDate">Ngày sản xuất</Label>
                <Input id="manufactureDate" name="manufactureDate" type="date" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="receivedAt">Ngày nhận</Label>
                <Input
                  id="receivedAt"
                  name="receivedAt"
                  type="date"
                  defaultValue={new Date().toISOString().slice(0, 10)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="location">Vị trí</Label>
                <Input id="location" name="location" placeholder="Kho HC – Tủ A1" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="storageCondition">Điều kiện bảo quản</Label>
              <Input id="storageCondition" name="storageCondition" placeholder="2-8°C, tránh ánh sáng..." />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="usedFor">Dùng cho phép thử (cách bằng dấu phẩy)</Label>
              <Input id="usedFor" name="usedFor" placeholder="ICP-MS, AAS..." />
            </div>
            <label className="flex items-center gap-2 text-xs">
              <input type="checkbox" id="isReference" name="isReference" />
              Đây là chất chuẩn (reference material)
            </label>
            {error && <div className="text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded px-2.5 py-2">{error}</div>}
            <div className="flex justify-end gap-2 pt-2 border-t">
              <Dialog.Close asChild><Button variant="outline" type="button">Hủy</Button></Dialog.Close>
              <Button type="submit" disabled={pending}>
                {pending && <Loader2 className="w-4 h-4 animate-spin" />}
                Lưu hóa chất
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
