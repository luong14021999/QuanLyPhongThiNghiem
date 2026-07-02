import { chemicalProfileStore } from "@/lib/data/chemical-profiles";
import { patchRoute, deleteRoute } from "@/lib/api/crud";

export const dynamic = "force-dynamic";

export const PATCH = patchRoute(chemicalProfileStore);
export const DELETE = deleteRoute(chemicalProfileStore);
