import {
  Beaker,
  AlertTriangle,
  PackagePlus,
  PackageMinus,
  CalendarOff,
  Filter,
  Search,
  ShieldAlert,
  FileText,
  FlaskRound,
  Factory,
  Snowflake,
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
import { chemicals, chemicalUsageLogs } from "@/lib/mock-data";

const hazardVariant = {
  Thường: "secondary",
  "Độc hại": "destructive",
  "Dễ cháy": "warning",
  "Ăn mòn": "warning",
} as const;

function daysUntil(dateStr: string) {
  const diff =
    (new Date(dateStr).getTime() - new Date("2026-05-20").getTime()) /
    (1000 * 60 * 60 * 24);
  return Math.round(diff);
}

const stats = [
  {
    label: "Mặt hàng đang quản lý",
    value: chemicals.length,
    icon: Beaker,
    accent: "bg-blue-50 text-blue-600",
  },
  {
    label: "Sắp hết hạn (≤ 120 ngày)",
    value: chemicals.filter((c) => daysUntil(c.expiry) <= 120).length,
    icon: CalendarOff,
    accent: "bg-amber-50 text-amber-600",
  },
  {
    label: "Tồn dưới mức tối thiểu",
    value: chemicals.filter((c) => c.stock < c.minStock).length,
    icon: AlertTriangle,
    accent: "bg-rose-50 text-rose-600",
  },
  {
    label: "Hóa chất nguy hiểm",
    value: chemicals.filter((c) =>
      ["Độc hại", "Dễ cháy", "Ăn mòn"].includes(c.hazard),
    ).length,
    icon: ShieldAlert,
    accent: "bg-violet-50 text-violet-600",
  },
];

export default function ChemicalsPage() {
  return (
    <>
      <Header
        title="Quản lý hóa chất – vật tư"
        description="Theo dõi nhập – xuất kho, hạn sử dụng, tồn kho và cảnh báo an toàn"
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
              <CardTitle>Danh mục hóa chất – vật tư</CardTitle>
              <CardDescription>
                Tồn kho hiện tại, mức tối thiểu, hạn sử dụng và mức cảnh báo
              </CardDescription>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 rounded-md border border-input bg-background px-2.5 h-9 text-sm w-full sm:w-56">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  className="bg-transparent outline-none flex-1"
                  placeholder="Tìm theo tên, CAS..."
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter />
                Lọc
              </Button>
              <Button variant="outline" size="sm">
                <PackageMinus />
                Xuất kho
              </Button>
              <Button size="sm">
                <PackagePlus />
                Nhập kho
              </Button>
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
                  </TableRow>
                </TableHeader>
                <TableBody>
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

        <Card>
          <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between space-y-0">
            <div>
              <CardTitle>Hồ sơ hóa chất – chất chuẩn</CardTitle>
              <CardDescription>
                Đặc tính kỹ thuật, NSX, điều kiện bảo quản, phép thử sử dụng –
                phục vụ truy xuất ISO/IEC 17025
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <FileText />
              Xuất hồ sơ PDF
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {chemicals.slice(0, 4).map((c) => (
                <div
                  key={c.id}
                  className="p-4 rounded-lg border bg-card space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <FlaskRound className="w-4 h-4 text-primary shrink-0" />
                        <span className="font-medium text-sm">{c.name}</span>
                        {c.isReference && (
                          <Badge variant="default">Chất chuẩn</Badge>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground font-mono mt-0.5">
                        {c.code} · CAS {c.cas}
                      </div>
                    </div>
                    <Badge variant={hazardVariant[c.hazard]}>{c.hazard}</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
                    <div>
                      <div className="text-muted-foreground">Đặc tính KT</div>
                      <div className="font-medium">{c.technicalSpec}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground flex items-center gap-1">
                        <Factory className="w-3 h-3" />
                        Nhà sản xuất
                      </div>
                      <div className="font-medium">{c.manufacturer}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Ngày sản xuất</div>
                      <div className="font-medium">{c.manufactureDate}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Ngày nhận</div>
                      <div className="font-medium">{c.receivedAt}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-muted-foreground flex items-center gap-1">
                        <Snowflake className="w-3 h-3" />
                        Điều kiện bảo quản
                      </div>
                      <div className="font-medium">{c.storageCondition}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-muted-foreground">
                        Dùng cho phép thử
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {c.usedFor.map((u) => (
                          <Badge
                            key={u}
                            variant="secondary"
                            className="text-[11px]"
                          >
                            {u}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Nhật ký sử dụng hóa chất – chất chuẩn</CardTitle>
            <CardDescription>
              Ghi nhận lượng dùng theo từng mẫu / phép thử – đối chiếu kho và
              QA/QC
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40">
                    <TableHead>Thời điểm</TableHead>
                    <TableHead>Hóa chất / chất chuẩn</TableHead>
                    <TableHead>Lượng dùng</TableHead>
                    <TableHead>Mẫu</TableHead>
                    <TableHead>Phép thử</TableHead>
                    <TableHead>KTV</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {chemicalUsageLogs.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell className="text-muted-foreground text-xs">
                        {u.usedAt}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-sm">
                          {u.chemicalName}
                        </div>
                        <div className="text-xs text-muted-foreground font-mono">
                          {u.chemicalCode}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {u.qty} {u.unit}
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {u.sampleCode}
                      </TableCell>
                      <TableCell className="text-xs">{u.method}</TableCell>
                      <TableCell>{u.technician}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
