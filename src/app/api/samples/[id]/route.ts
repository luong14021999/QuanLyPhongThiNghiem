import { samplesStore } from "@/lib/data/samples";
import { patchRoute, deleteRoute } from "@/lib/api/crud";

export const dynamic = "force-dynamic";

export const PATCH = patchRoute(samplesStore);
export const DELETE = deleteRoute(samplesStore);
