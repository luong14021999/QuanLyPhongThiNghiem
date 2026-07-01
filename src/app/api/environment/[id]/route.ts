import { environmentStore } from "@/lib/data/environment";
import { patchRoute, deleteRoute } from "@/lib/api/crud";

export const dynamic = "force-dynamic";

export const PATCH = patchRoute(environmentStore);
export const DELETE = deleteRoute(environmentStore);
