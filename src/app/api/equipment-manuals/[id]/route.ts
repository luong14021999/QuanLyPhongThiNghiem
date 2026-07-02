import { equipmentManualStore } from "@/lib/data/equipment-manuals";
import { patchRoute, deleteRoute } from "@/lib/api/crud";

export const dynamic = "force-dynamic";

export const PATCH = patchRoute(equipmentManualStore);
export const DELETE = deleteRoute(equipmentManualStore);
