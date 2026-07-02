import {
  Beaker,
  AlertTriangle,
  PackagePlus,
  PackageMinus,
  CalendarOff,
  Filter,
  ShieldAlert,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type Chemical } from "@/lib/mock-data";
import { chemicalsStore } from "@/lib/data/chemicals";
import { chemicalProfileStore } from "@/lib/data/chemical-profiles";
import { chemicalUsageLogStore } from "@/lib/data/chemical-usage-logs";
import { AddChemicalDialog } from "@/components/chemicals/add-chemical-dialog";
import { EditChemicalDialog } from "@/components/chemicals/edit-chemical-dialog";
import { DeleteEntityButton } from "@/components/crud/delete-button";
import { EntitySearchInput } from "@/components/crud/search-input";
import {
  EntityFormDialog,
  type CrudField,
} from "@/components/crud/entity-form-dialog";
import { CrudTableCard } from "@/components/crud/crud-table-card";

export const dynamic = "force-dynamic";

const hazardVariant: Record<
  Chemical["hazard"],
  "secondary" | "destructive" | "warning"
> = {
  Thường: "secondary",
  "Độc hại": "destructive",
  "Dễ cháy": "warning",
  "Ăn mòn": "warning",
};

function daysUntil(dateStr: string) {
  const diff =
    (new Date(dateStr).getTime() - new Date("2026-05-20").getTime()) /
    (1000 * 60 * 60 * 24);
  return Math.round(diff);
}

const PROFILE_FIELDS: CrudField[] = [
  { name: "chemicalCode", label: "Mã hóa chất", required: true, mono: true },
  { name: "chemicalName", label: "Tên hóa chất / chất chuẩn" },
  {
    name: "docType",
    label: "Loại hồ sơ",
    type: "select",
    options: ["CoA", "MSDS", "Chứng nhận", "Khác"],
  },
  { name: "docCode", label: "Mã hồ sơ", mono: true },
  { name: "issuedBy", label: "Đơn vị cấp" },
  { name: "issueDate", label: "Ngày cấp", type: "date" },
  { name: "fileUrl", label: "Link tài liệu", full: true },
  { name: "note", label: "Ghi chú", full: true },
];

const CHEM_USAGE_FIELDS: CrudField[] = [
  { name: "chemicalCode", label: "Mã hóa chất", required: true, mono: true },
  { name: "chemicalName", label: "Tên hóa chất / chất chuẩn" },
  { name: "category", label: "Chủng loại" },
  { name: "unit", label: "Đơn vị tính" },
  { name: "qty", label: "Số lượng", type: "number" },
  { name: "usedAt", label: "Ngày xuất", type: "date" },
  { name: "remaining", label: "Khối lượng dư", type: "number" },
  { name: "purpose", label: "Mục đích sử dụng", full: true },
  { name: "technician", label: "Người sử dụng" },
  { name: "sampleCode", label: "Mẫu", mono: true },
  { name: "method", label: "Phép thử" },
];

export default async function ChemicalsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const all = await chemicalsStore.list();
  const query = q.trim().toLowerCase();
  const chemicals = query
    ? all.filter(
        (c) =>
          c.code.toLowerCase().includes(query) ||
          c.name.toLowerCase().includes(query) ||
          c.cas.toLowerCase().includes(query) ||
          c.location.toLowerCase().includes(query),
      )
    : all;

  const [chemicalProfiles, chemicalUsageLogs] = await Promise.all([
    chemicalProfileStore.list(),
    chemicalUsageLogStore.list(),
  ]);

  const stats = [
    {
      label: "Mặt hàng đang quản lý",
      value: all.length,
      icon: Beaker,
      accent: "bg-blue-50 text-blue-600",
    },
    {
      label: "Sắp hết hạn (≤ 120 ngày)",
      value: all.filter((c) => daysUntil(c.expiry) <= 120).length,
      icon: CalendarOff,
      accent: "bg-amber-50 text-amber-600",
    },
    {
      label: "Tồn dưới mức tối thiểu",
      value: all.filter((c) => c.stock < c.minStock).length,
      icon: AlertTriangle,
      accent: "bg-rose-50 text-rose-600",
    },
    {
      label: "Hóa chất nguy hiểm",
      value: all.filter((c) =>
        ["Độc hại", "Dễ cháy", "Ăn mòn"].includes(c.hazard),
      ).length,
      icon: ShieldAlert,
      accent: "bg-violet-50 text-violet-600",
    },
  ];

  return (
    <>
      <Header
        title="Quản lý hóa chất, chất chuẩn"
        description="Danh mục, hồ sơ (CoA/MSDS), nhật ký sử dụng, hạn dùng và cảnh báo an toàn"
      />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scrollbar-thin">
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <Card key={s.label}>
              <CardContent className="p-5 flex items-start justify-between">
                <div>
                  <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    {s.label}
                  </div>
                  <div className="text-3xl font-semibold mt-1.5">{s.value}</div>
                </div>
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.accent}`}
                >
                  <s.icon className="w-5 h-5" />
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <Card>
          <CardHeader className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between space-y-0">
            <div>
              <CardTitle>Danh mục hóa chất, chất chuẩn</CardTitle>
              <CardDescription>
                Tồn kho hiện tại, mức tối thiểu, hạn sử dụng và mức cảnh báo
              </CardDescription>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <EntitySearchInput
                basePath="/chemicals"
                placeholder="Tìm theo tên, CAS..."
              />
              <Button variant="outline" size="sm">
                <Filter />
                Lọc
              </Button>
              <Button variant="outline" size="sm">
                <PackageMinus />
                Xuất kho
              </Button>
              <Button variant="outline" size="sm">
                <PackagePlus />
                Nhập kho
              </Button>
              <AddChemicalDialog />
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40">
                    <TableHead>Mã</TableHead>
                    <TableHead>Tên hóa chất</TableHead>
                    <TableHead>CAS</TableHead>
                    <TableHead>Tồn kho</TableHead>
                    <TableHead className="w-[180px]">Mức tồn</TableHead>
                    <TableHead>Hạn dùng</TableHead>
                    <TableHead>Vị trí</TableHead>
                    <TableHead>Phân loại</TableHead>
                    <TableHead className="w-[160px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {chemicals.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={9}
                        className="text-center text-sm text-muted-foreground py-8"
                      >
                        {query
                          ? `Không có hóa chất nào khớp "${query}"`
                          : "Chưa có hóa chất nào"}
                      </TableCell>
                    </TableRow>
                  )}
                  {chemicals.map((c) => {
                    const lowStock = c.stock < c.minStock;
                    const expDays = daysUntil(c.expiry);
                    const expiringSoon = expDays <= 120;
                    const stockPct = Math.min(
                      100,
                      Math.round((c.stock / Math.max(c.minStock * 2, 1)) * 100),
                    );
                    return (
                      <TableRow key={c.id}>
                        <TableCell className="font-mono">{c.code}</TableCell>
                        <TableCell className="font-medium max-w-[260px]">
                          {c.name}
                        </TableCell>
                        <TableCell className="text-muted-foreground font-mono text-xs">
                          {c.cas}
                        </TableCell>
                        <TableCell>
                          <span
                            className={
                              lowStock ? "text-destructive font-medium" : ""
                            }
                          >
                            {c.stock} {c.unit}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={stockPct} className="flex-1" />
                            <span className="text-xs text-muted-foreground w-14 text-right">
                              tối thiểu {c.minStock}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span
                              className={
                                expiringSoon
                                  ? "text-warning font-medium"
                                  : "text-muted-foreground"
                              }
                            >
                              {c.expiry}
                            </span>
                            {expiringSoon && (
                              <AlertTriangle className="w-3.5 h-3.5 text-warning" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-xs">
                          {c.location}
                        </TableCell>
                        <TableCell>
                          <Badge variant={hazardVariant[c.hazard]}>
                            {c.hazard}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            <EditChemicalDialog row={c} />
                            <DeleteEntityButton
                              entity="chemicals"
                              id={c.id}
                              label={c.name}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Nhật ký nhập – xuất gần đây</CardTitle>
              <CardDescription>
                7 ngày qua · ghi nhận theo mã mẫu phân tích
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  {
                    type: "Nhập",
                    name: "Methanol HPLC",
                    qty: "+ 10 lít",
                    note: "PO-2026-0182 · NCC ChemAsia",
                    date: "2026-05-19",
                  },
                  {
                    type: "Xuất",
                    name: "Acid nitric HNO3 65%",
                    qty: "- 0.5 lít",
                    note: "Mẫu M-2026-00318 · As/Pb",
                    date: "2026-05-19",
                  },
                  {
                    type: "Xuất",
                    name: "Dung dịch chuẩn As 1000 ppm",
                    qty: "- 25 ml",
                    note: "Mẫu M-2026-00321",
                    date: "2026-05-18",
                  },
                  {
                    type: "Nhập",
                    name: "Đệm pH 4.01",
                    qty: "+ 2 lít",
                    note: "PO-2026-0181",
                    date: "2026-05-17",
                  },
                ].map((row, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-md border bg-card"
                  >
                    <Badge
                      variant={row.type === "Nhập" ? "success" : "secondary"}
                    >
                      {row.type}
                    </Badge>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">
                        {row.name}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {row.note}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{row.qty}</div>
                      <div className="text-xs text-muted-foreground">
                        {row.date}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>An toàn & MSDS</CardTitle>
              <CardDescription>
                Liên kết MSDS, EPI và cảnh báo phân loại GHS cho từng hóa chất
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {chemicals
                  .filter((c) =>
                    ["Độc hại", "Dễ cháy", "Ăn mòn"].includes(c.hazard),
                  )
                  .slice(0, 5)
                  .map((c) => (
                    <li
                      key={c.id}
                      className="flex items-center gap-3 p-3 rounded-md border bg-card"
                    >
                      <ShieldAlert className="w-4 h-4 text-warning shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">
                          {c.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          CAS {c.cas} · {c.location}
                        </div>
                      </div>
                      <Badge variant={hazardVariant[c.hazard]}>
                        {c.hazard}
                      </Badge>
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Hồ sơ hóa chất, chất chuẩn */}
        <CrudTableCard
          title="Hồ sơ hóa chất, chất chuẩn"
          description="CoA / MSDS / chứng nhận – phục vụ truy xuất ISO/IEC 17025"
          endpoint="/api/chemical-profiles"
          entity="chemical-profiles"
          editFields={PROFILE_FIELDS}
          addNode={
            <EntityFormDialog
              mode="add"
              endpoint="/api/chemical-profiles"
              title="Thêm hồ sơ hóa chất"
              addLabel="Thêm hồ sơ"
              fields={PROFILE_FIELDS}
              submitLabel="Lưu"
            />
          }
          headers={["Hóa chất", "Loại", "Mã hồ sơ", "Đơn vị cấp", "Ngày cấp", "Liên kết"]}
          rows={chemicalProfiles.map((p) => ({
            id: p.id,
            label: p.chemicalName || p.chemicalCode,
            initial: p,
            cells: [
              <div key="hc">
                <div className="font-medium text-sm">{p.chemicalName}</div>
                <div className="text-xs text-muted-foreground font-mono">
                  {p.chemicalCode}
                </div>
              </div>,
              <Badge key="loai" variant="outline">
                {p.docType}
              </Badge>,
              <span key="ma" className="font-mono text-xs">
                {p.docCode}
              </span>,
              p.issuedBy,
              <span key="ngay" className="text-muted-foreground text-sm">
                {p.issueDate}
              </span>,
              p.fileUrl ? (
                <a
                  key="lk"
                  href={p.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm"
                >
                  Mở
                </a>
              ) : (
                <span key="lk" className="text-muted-foreground text-xs">
                  —
                </span>
              ),
            ],
          }))}
        />

        {/* Nhật ký sử dụng hóa chất, chất chuẩn */}
        <CrudTableCard
          title="Nhật ký sử dụng hóa chất, chất chuẩn"
          description="Chủng loại, số lượng xuất, khối lượng dư, mục đích và người sử dụng"
          endpoint="/api/chemical-usage-logs"
          entity="chemical-usage-logs"
          editFields={CHEM_USAGE_FIELDS}
          addNode={
            <EntityFormDialog
              mode="add"
              endpoint="/api/chemical-usage-logs"
              title="Thêm nhật ký sử dụng"
              addLabel="Thêm nhật ký"
              fields={CHEM_USAGE_FIELDS}
              submitLabel="Lưu"
            />
          }
          headers={["Hóa chất", "Chủng loại", "Số lượng", "Ngày xuất", "Dư", "Mục đích", "Người dùng"]}
          rows={chemicalUsageLogs.map((u) => ({
            id: u.id,
            label: u.chemicalName || u.chemicalCode,
            initial: u,
            cells: [
              <div key="hc">
                <div className="font-medium text-sm">{u.chemicalName}</div>
                <div className="text-xs text-muted-foreground font-mono">
                  {u.chemicalCode}
                </div>
              </div>,
              <span key="cl" className="text-sm">
                {u.category || "—"}
              </span>,
              <span key="sl" className="text-sm">
                {u.qty} {u.unit}
              </span>,
              <span key="nx" className="text-muted-foreground text-xs">
                {u.usedAt}
              </span>,
              <span key="du" className="text-sm">
                {u.remaining ? `${u.remaining} ${u.unit}` : "—"}
              </span>,
              <span key="md" className="text-sm">
                {u.purpose || u.method || "—"}
              </span>,
              u.technician,
            ],
          }))}
        />
      </main>
    </>
  );
}
