import { chemicalProfileStore } from "@/lib/data/chemical-profiles";
import { listRoute, createRoute } from "@/lib/api/crud";
import type { ChemicalProfile } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

export const GET = listRoute(chemicalProfileStore);

export const POST = createRoute<ChemicalProfile>(
  chemicalProfileStore,
  (b) => ({
    id: "",
    chemicalCode: b.chemicalCode ?? "",
    chemicalName: b.chemicalName ?? "",
    docType: b.docType ?? "CoA",
    docCode: b.docCode ?? "",
    issuedBy: b.issuedBy ?? "",
    issueDate: b.issueDate ?? "",
    fileUrl: b.fileUrl ?? "",
    note: b.note ?? "",
  }),
  (b) => (!b.chemicalCode ? "Thiếu mã hóa chất" : null),
);
