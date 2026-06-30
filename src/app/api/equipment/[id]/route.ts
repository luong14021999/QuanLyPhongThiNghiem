import { equipmentStore } from "@/lib/data/equipment";
import { patchRoute, deleteRoute } from "@/lib/api/crud";

export const dynamic = "force-dynamic";

export const PATCH = patchRoute(equipmentStore);
export const DELETE = deleteRoute(equipmentStore);
