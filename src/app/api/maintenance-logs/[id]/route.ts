import { maintenanceLogStore } from "@/lib/data/maintenance-logs";
import { patchRoute, deleteRoute } from "@/lib/api/crud";

export const dynamic = "force-dynamic";

export const PATCH = patchRoute(maintenanceLogStore);
export const DELETE = deleteRoute(maintenanceLogStore);
