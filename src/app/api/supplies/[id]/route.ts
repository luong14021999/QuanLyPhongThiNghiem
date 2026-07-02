import { supplyStore } from "@/lib/data/supplies";
import { patchRoute, deleteRoute } from "@/lib/api/crud";

export const dynamic = "force-dynamic";

export const PATCH = patchRoute(supplyStore);
export const DELETE = deleteRoute(supplyStore);
