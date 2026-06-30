import { equipmentStore } from "@/lib/data/equipment";
import { listRoute, createRoute } from "@/lib/api/crud";
import type { Equipment } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

export const GET = listRoute(equipmentStore);

export const POST = createRoute<Equipment>(
  equipmentStore,
  (body) => ({
    id: "",
    code: body.code ?? "",
    name: body.name ?? "",
    model: body.model ?? "",
    location: body.location ?? "",
    lastCalibration: body.lastCalibration ?? "",
    nextCalibration: body.nextCalibration ?? "",
    status: body.status ?? "Hoạt động",
    usageHours: body.usageHours ?? 0,
  }),
  (body) => {
    if (!body.code) return "Thiếu mã thiết bị";
    if (!body.name) return "Thiếu tên thiết bị";
    return null;
  },
);
