import {
  TestTube,
  Filter,
  CalendarClock,
  AlertTriangle,
  CheckCircle2,
  PackagePlus,
  ClipboardCheck,
} from "lucide-react";
import { toolsStore } from "@/lib/data/tools";
import { AddToolDialog } from "@/components/tools/add-tool-dialog";
import { EditToolDialog } from "@/components/tools/edit-tool-dialog";
import { DeleteEntityButton } from "@/components/crud/delete-button";
import { EntitySearchInput } from "@/components/crud/search-input";

export const dynamic = "force-dynamic";
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
import { type Tool } from "@/lib/mock-data";

const statusVariant: Record<
  Tool["status"],
  "success" | "default" | "destructive" | "warning"
> = {
  "Sẵn sàng": "success",
  "Đang dùng": "default",
  Hỏng: "destructive",
  "Chờ kiểm định": "warning",
};

function daysUntil(dateStr: string) {
  const diff =
    (new Date(dateStr).getTime() - new Date("2026-06-21").getTime()) /
    (1000 * 60 * 60 * 24);
  return Math.round(diff);
}

export default async function ToolsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const all = await toolsStore.list();
  const query = q.trim().toLowerCase();
  const tools = query
    ? all.filter(
        (t) =>
          t.code.toLowerCase().includes(query) ||
          t.name.toLowerCase().includes(query) ||
          t.category.toLowerCase().includes(query) ||
          t.location.toLowerCase().includes(query) ||
          t.spec.toLowerCase().includes(query),
      )
    : all;

  const categories = Array.from(new Set(all.map((t) => t.category)));

  const stats = [
    {
      label: "Đầu mục dụng cụ",
      value: all.length,
      icon: TestTube,
      accent: "bg-emerald-50 text-emerald-700",
    },
    {
      label: "Cần kiểm định",
      value: all.filter((t) => t.calibrationRequired).length,
      icon: ClipboardCheck,
      accent: "bg-blue-50 text-blue-600",
    },
    {
      label: "Tồn dưới mức tối thiểu",
      value: all.filter((t) => t.qty < t.minQty).length,
      icon: AlertTriangle,
      accent: "bg-rose-50 text-rose-600",
    },
    {
      label: "Sẵn sàng sử dụng",
      value: all.filter((t) => t.status === "Sẵn sàng").length,
      icon: CheckCircle2,
      accent: "bg-violet-50 text-violet-600",
    },
  ];

  const calibrationDue = all
    .filter((t) => t.calibrationRequired && t.nextCalibration)
    .sort(
      (a, b) =>
        daysUntil(a.nextCalibration as string) -
        daysUntil(b.nextCalibration as string),
    );

  return (
    <>
      <Header
        title="Quản lý dụng cụ"
        description="Dụng cụ thể tích, thủy tinh, vật tư tiêu hao – kèm lịch kiểm định và tồn kho"
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
              <CardTitle>Danh mục dụng cụ</CardTitle>
              <CardDescription>
                Bao gồm dụng cụ thể tích (có kiểm định) và vật tư tiêu hao
              </CardDescription>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <EntitySearchInput
                basePath="/tools"
                placeholder="Tìm mã, tên dụng cụ..."
              />
              <Button variant="outline" size="sm">
                <Filter />
                Lọc
              </Button>
              <Button variant="outline" size="sm">
                <PackagePlus />
                Nhập kho
              </Button>
              <AddToolDialog />
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40">
                    <TableHead>Mã</TableHead>
                    <TableHead>Tên dụng cụ</TableHead>
                    <TableHead>Phân loại</TableHead>
                    <TableHead>Đặc tính</TableHead>
                    <TableHead>Tồn</TableHead>
                    <TableHead className="w-[160px]">Mức tồn</TableHead>
                    <TableHead>Vị trí</TableHead>
                    <TableHead>Kiểm định</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="w-[160px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tools.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={10}
                        className="text-center text-sm text-muted-foreground py-8"
                      >
                        {query
                          ? `Không có dụng cụ nào khớp "${query}"`
                          : "Chưa có dụng cụ nào"}
                      </TableCell>
                    </TableRow>
                  )}
                  {tools.map((t) => {
                    const lowStock = t.qty < t.minQty;
                    const stockPct = Math.min(
                      100,
                      Math.round((t.qty / Math.max(t.minQty * 2, 1)) * 100),
                    );
                    return (
                      <TableRow key={t.id}>
                        <TableCell className="font-mono">{t.code}</TableCell>
                        <TableCell className="font-medium max-w-[240px]">
                          {t.name}
                        </TableCell>
                        <TableCell className="text-xs">
                          <Badge variant="secondary">{t.category}</Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-xs max-w-[220px]">
                          {t.spec}
                        </TableCell>
                        <TableCell>
                          <span
                            className={
                              lowStock ? "text-destructive font-medium" : ""
                            }
                          >
                            {t.qty} {t.unit}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={stockPct} className="flex-1" />
                            <span className="text-xs text-muted-foreground w-12 text-right">
                              tối thiểu {t.minQty}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-xs">
                          {t.location}
                        </TableCell>
                        <TableCell className="text-xs">
                          {t.calibrationRequired ? (
                            <div className="space-y-0.5">
                              <div className="text-muted-foreground">
                                Gần nhất: {t.lastCalibration ?? "—"}
                              </div>
                              <div>Kế tiếp: {t.nextCalibration ?? "—"}</div>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">
                              Không yêu cầu
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant={statusVariant[t.status]}>
                            {t.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            <EditToolDialog row={t} />
                            <DeleteEntityButton
                              entity="tools"
                              id={t.id}
                              label={t.name}
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

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Lịch kiểm định dụng cụ thể tích</CardTitle>
              <CardDescription>
                Pipet, bình định mức, buret – kiểm định định kỳ theo TCVN
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {calibrationDue.slice(0, 6).map((t) => {
                  const days = daysUntil(t.nextCalibration as string);
                  return (
                    <li
                      key={t.id}
                      className="flex items-center gap-3 p-3 rounded-md border bg-card"
                    >
                      <CalendarClock className="w-4 h-4 text-muted-foreground shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">
                          {t.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {t.code} · {t.location}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">
                          {t.nextCalibration}
                        </div>
                        <div
                          className={`text-xs font-medium ${
                            days < 0
                              ? "text-destructive"
                              : days <= 60
                                ? "text-warning"
                                : "text-muted-foreground"
                          }`}
                        >
                          {days < 0
                            ? `Quá ${Math.abs(days)} ngày`
                            : `Còn ${days} ngày`}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Phân bổ theo nhóm</CardTitle>
              <CardDescription>
                Tỷ trọng dụng cụ theo phân loại
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {categories.map((c) => {
                const count = tools.filter((t) => t.category === c).length;
                const pct = Math.round((count / tools.length) * 100);
                return (
                  <div key={c}>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="truncate pr-2">{c}</span>
                      <span className="text-muted-foreground text-xs">
                        {count} · {pct}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  );
}
