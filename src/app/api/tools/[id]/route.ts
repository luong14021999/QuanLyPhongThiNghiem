import { toolsStore } from "@/lib/data/tools";
import { patchRoute, deleteRoute } from "@/lib/api/crud";

export const dynamic = "force-dynamic";

export const PATCH = patchRoute(toolsStore);
export const DELETE = deleteRoute(toolsStore);
