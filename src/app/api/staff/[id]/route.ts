import { staffStore } from "@/lib/data/staff";
import { patchRoute, deleteRoute } from "@/lib/api/crud";

export const dynamic = "force-dynamic";

export const PATCH = patchRoute(staffStore);
export const DELETE = deleteRoute(staffStore);
