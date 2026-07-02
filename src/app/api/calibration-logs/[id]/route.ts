import { calibrationLogStore } from "@/lib/data/calibration-logs";
import { patchRoute, deleteRoute } from "@/lib/api/crud";

export const dynamic = "force-dynamic";

export const PATCH = patchRoute(calibrationLogStore);
export const DELETE = deleteRoute(calibrationLogStore);
