import { archivedSamplesStore } from "@/lib/data/archived-samples";
import { patchRoute, deleteRoute } from "@/lib/api/crud";

export const dynamic = "force-dynamic";

export const PATCH = patchRoute(archivedSamplesStore);
export const DELETE = deleteRoute(archivedSamplesStore);
