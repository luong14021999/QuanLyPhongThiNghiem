import {
  Wrench,
  CalendarClock,
  AlertTriangle,
  CheckCircle2,
  Plus,
  Filter,
  Search,
  ScrollText,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { equipments } from "@/lib/mock-data";

const statusVariant = {
  "Hoạt động": "success",
  "Hiệu chuẩn": "warning",
  "Bảo trì": "secondary",
  Ngừng: "destructive",
} as const;

function daysUntil(dateStr: string) {
  const diff =
    (new Date(dateStr).getTime() - new Date("2026-05-20").getTime()) /
    (1000 * 60 * 60 * 24);
  return Math.round(diff);
}

const stats = [
  {
    label: "Thiết bị đang hoạt động",
    value: equipments.filter((e) => e.status === "Hoạt động").length,
    icon: CheckCircle2,
    accent: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "Đang hiệu chuẩn / bảo trì",
    value: equipments.filter((e) =>
      ["Hiệu chuẩn", "Bảo trì"].includes(e.status),
    ).length,
    icon: Wrench,
    accent: "bg-amber-50 text-amber-600",
  },
  {
    label: "Sắp đến hạn hiệu chuẩn",
    value: equipments.filter((e) => daysUntil(e.nextCalibration) <= 60).length,
    icon: CalendarClock,
    accent: "bg-blue-50 text-blue-600",
  },
  {
    label: "Cảnh báo quá hạn",
    value: equipments.filter((e) => daysUntil(e.nextCalibration) < 0).length,
    icon: AlertTriangle,
    accent: "bg-rose-50 text-rose-600",
  },
];

export default function EquipmentPage() {
  const sortedByCalibration = [...equipments].sort(
    (a, b) => daysUntil(a.nextCalibration) - daysUntil(b.nextCalibration),
  );

  return (
    <>
      <Header
        title="Quản lý thiết bị phòng thí nghiệm"
        description="Danh mục thiết bị, lịch hiệu chuẩn – bảo trì, nhật ký sử dụng và cảnh báo kiểm định"
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

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between space-y-0">
              <div>
                <CardTitle>Danh mục thiết bị</CardTitle>
                <CardDescription>
                  Mã thiết bị, vị trí đặt, lịch hiệu chuẩn và giờ sử dụng
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 rounded-md border border-input bg-background px-2.5 h-9 text-sm w-56">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <input
                    className="bg-transparent outline-none flex-1"
                    placeholder="Tìm theo mã, tên..."
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter />
                  Lọc
                </Button>
                <Button size="sm">
                  <Plus />
                  Thêm thiết bị
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/40">
                      <TableHead>Mã</TableHead>
                      <TableHead>Tên thiết bị</TableHead>
                      <TableHead>Model</TableHead>
                      <TableHead>Vị trí</TableHead>
                      <TableHead>HC gần nhất</TableHead>
                      <TableHead>HC kế tiếp</TableHead>
                      <TableHead>Giờ chạy</TableHead>
                      <TableHead>Trạng thái</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {equipments.map((e) => {
                      const days = daysUntil(e.nextCalibration);
                      const dueSoon = days <= 30 && days >= 0;
                      const overdue = days < 0;
                      return (
                        <TableRow key={e.id}>
                          <TableCell className="font-mono">{e.code}</TableCell>
                          <TableCell className="font-medium">
                            {e.name}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {e.model}
                          </TableCell>
                          <TableCell>{e.location}</TableCell>
                          <TableCell className="text-muted-foreground">
                            {e.lastCalibration}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span
                                className={
                                  overdue
                                    ? "text-destructive font-medium"
                                    : dueSoon
                                      ? "text-warning font-medium"
                                      : ""
                                }
                              >
                                {e.nextCalibration}
                              </span>
                              {(dueSoon || overdue) && (
                                <AlertTriangle
                                  className={`w-3.5 h-3.5 ${overdue ? "text-destructive" : "text-warning"}`}
                                />
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {e.usageHours.toLocaleString("vi-VN")} h
                          </TableCell>
                          <TableCell>
                            <Badge variant={statusVariant[e.status]}>
                              {e.status}
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

          <Card>
            <CardHeader>
              <CardTitle>Lịch hiệu chuẩn sắp tới</CardTitle>
              <CardDescription>
                Sắp xếp theo ngày hiệu chuẩn kế tiếp
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {sortedByCalibration.slice(0, 5).map((e) => {
                  const days = daysUntil(e.nextCalibration);
                  return (
                    <li
                      key={e.id}
                      className="flex items-center gap-3 p-3 rounded-md border bg-card"
                    >
                      <CalendarClock className="w-4 h-4 text-muted-foreground shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">
                          {e.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {e.code} · {e.nextCalibration}
                        </div>
                      </div>
                      <span
                        className={`text-xs font-medium ${
                          days < 0
                            ? "text-destructive"
                            : days <= 30
                              ? "text-warning"
                              : "text-muted-foreground"
                        }`}
                      >
                        {days < 0 ? `Quá ${Math.abs(days)} ngày` : `${days} ngày`}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-4 p-3 rounded-md bg-blue-50 text-blue-700 text-xs flex items-start gap-2">
                <ScrollText className="w-4 h-4 mt-0.5 shrink-0" />
                Mỗi thiết bị có nhật ký sử dụng (logbook) ghi nhận thời điểm,
                người dùng và mã mẫu liên quan.
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  );
}
