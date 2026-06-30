import { testRequestsStore } from "@/lib/data/test-requests";
import { patchRoute, deleteRoute } from "@/lib/api/crud";

export const dynamic = "force-dynamic";

export const PATCH = patchRoute(testRequestsStore);
export const DELETE = deleteRoute(testRequestsStore);
