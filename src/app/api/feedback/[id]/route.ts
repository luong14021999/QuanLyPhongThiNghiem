import { feedbackStore } from "@/lib/data/feedback";
import { patchRoute, deleteRoute } from "@/lib/api/crud";

export const dynamic = "force-dynamic";

export const PATCH = patchRoute(feedbackStore);
export const DELETE = deleteRoute(feedbackStore);
