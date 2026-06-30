import { NextResponse } from "next/server";
import { patchCustomer, removeCustomer } from "@/lib/data/customers";
import type { Customer } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const patch = (await req.json()) as Partial<Customer>;
  const updated = await patchCustomer(id, patch);
  if (!updated)
    return NextResponse.json({ error: "Không tìm thấy" }, { status: 404 });
  return NextResponse.json({ ok: true, item: updated });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const ok = await removeCustomer(id);
  if (!ok) return NextResponse.json({ error: "Không tìm thấy" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
