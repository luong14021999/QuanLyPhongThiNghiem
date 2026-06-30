import { createEntityStore, dateOrNull } from "./factory";
import { equipments, type Equipment } from "@/lib/mock-data";

const SELECT =
  "id, code, name, model, location, last_calibration, next_calibration, status, usage_hours";

export const equipmentStore = createEntityStore<Equipment>(
  "equipment",
  equipments,
  {
    table: "equipment",
    select: SELECT,
    toEntity: (row) => ({
      id: row.id as string,
      code: (row.code as string) ?? "",
      name: (row.name as string) ?? "",
      model: (row.model as string) ?? "",
      location: (row.location as string) ?? "",
      lastCalibration: (row.last_calibration as string) ?? "",
      nextCalibration: (row.next_calibration as string) ?? "",
      status: (row.status as Equipment["status"]) ?? "Hoạt động",
      usageHours: (row.usage_hours as number) ?? 0,
    }),
    toRow: (e) => {
      const r: Record<string, unknown> = {};
      if (e.code !== undefined) r.code = e.code;
      if (e.name !== undefined) r.name = e.name;
      if (e.model !== undefined) r.model = e.model;
      if (e.location !== undefined) r.location = e.location;
      if (e.lastCalibration !== undefined)
        r.last_calibration = dateOrNull(e.lastCalibration);
      if (e.nextCalibration !== undefined)
        r.next_calibration = dateOrNull(e.nextCalibration);
      if (e.status !== undefined) r.status = e.status;
      if (e.usageHours !== undefined) r.usage_hours = e.usageHours;
      return r;
    },
  },
);
