import { toolUsageLogStore } from "@/lib/data/tool-usage-logs";
import { patchRoute, deleteRoute } from "@/lib/api/crud";

export const dynamic = "force-dynamic";

export const PATCH = patchRoute(toolUsageLogStore);
export const DELETE = deleteRoute(toolUsageLogStore);
