import { inspectionRecordStore } from "@/lib/data/inspection-records";
import { patchRoute, deleteRoute } from "@/lib/api/crud";

export const dynamic = "force-dynamic";

export const PATCH = patchRoute(inspectionRecordStore);
export const DELETE = deleteRoute(inspectionRecordStore);
