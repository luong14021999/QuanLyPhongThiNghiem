import { equipmentUsageLogStore } from "@/lib/data/equipment-usage-logs";
import { patchRoute, deleteRoute } from "@/lib/api/crud";

export const dynamic = "force-dynamic";

export const PATCH = patchRoute(equipmentUsageLogStore);
export const DELETE = deleteRoute(equipmentUsageLogStore);
