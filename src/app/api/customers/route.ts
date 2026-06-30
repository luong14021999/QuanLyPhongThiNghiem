import { NextResponse } from "next/server";
import {
  getCustomers,
  createCustomer,
} from "@/lib/data/customers";
import type { Customer } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

export async function GET() {
  const items = await getCustomers();
  return NextResponse.json({ count: items.length, items });
}

export async function POST(req: Request) {
  const body = (await req.json()) as Partial<Customer>;
  if (!body.code || !body.name || !body.kind) {
    return NextResponse.json(
      { error: "Thiếu code / name / kind" },
      { status: 400 },
    );
  }
  const created = await createCustomer({
    id: "",
    code: body.code,
    name: body.name,
    kind: body.kind,
    contact: body.contact ?? "",
    phone: body.phone ?? "",
    address: body.address ?? "",
    samplesYTD: body.samplesYTD ?? 0,
    lastSampleAt: body.lastSampleAt ?? "",
  });
  return NextResponse.json({ ok: true, item: created }, { status: 201 });
}
