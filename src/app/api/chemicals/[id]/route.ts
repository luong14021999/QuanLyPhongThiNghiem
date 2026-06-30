import { chemicalsStore } from "@/lib/data/chemicals";
import { patchRoute, deleteRoute } from "@/lib/api/crud";

export const dynamic = "force-dynamic";

export const PATCH = patchRoute(chemicalsStore);
export const DELETE = deleteRoute(chemicalsStore);
