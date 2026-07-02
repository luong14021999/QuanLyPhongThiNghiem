import { chemicalUsageLogStore } from "@/lib/data/chemical-usage-logs";
import { patchRoute, deleteRoute } from "@/lib/api/crud";

export const dynamic = "force-dynamic";

export const PATCH = patchRoute(chemicalUsageLogStore);
export const DELETE = deleteRoute(chemicalUsageLogStore);
