import {
  Wrench,
  CalendarClock,
  AlertTriangle,
  CheckCircle2,
  Plus,
  Filter,
  Search,
  ScrollText,
  Thermometer,
  Droplets,
  History,
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
import {
  equipments,
  maintenanceSchedule,
  equipmentUsageLogs,
  environmentReadings,
} from "@/lib/mock-data";

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
              <CardTitle>Lịch hiệu chuẩn / bảo trì</CardTitle>
              <CardDescription>
                Sắp xếp theo ngày kế tiếp – đồng bộ với nhà cung cấp
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {maintenanceSchedule.slice(0, 5).map((m) => {
                  const days = daysUntil(m.scheduledAt);
                  return (
                    <li
                      key={m.id}
                      className="flex items-center gap-3 p-3 rounded-md border bg-card"
                    >
                      <CalendarClock className="w-4 h-4 text-muted-foreground shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">
                          {m.equipmentName}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {m.equipmentCode} · {m.kind} · {m.vendor}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">
                          {m.scheduledAt}
                        </div>
                        <div
                          className={`text-xs font-medium ${
                            days < 0
                              ? "text-destructive"
                              : days <= 30
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
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Nhật ký sử dụng thiết bị</CardTitle>
              <CardDescription>
                Logbook ghi nhận người dùng, mẫu liên quan và thời lượng vận
                hành
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/40">
                      <TableHead>Thiết bị</TableHead>
                      <TableHead>KTV</TableHead>
                      <TableHead>Mẫu</TableHead>
                      <TableHead>Bắt đầu</TableHead>
                      <TableHead className="text-right">Thời lượng</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {equipmentUsageLogs.map((u) => (
                      <TableRow key={u.id}>
                        <TableCell>
                          <div className="font-medium text-sm">
                            {u.equipmentName}
                          </div>
                          <div className="text-xs text-muted-foreground font-mono">
                            {u.equipmentCode}
                          </div>
                        </TableCell>
                        <TableCell>{u.technician}</TableCell>
                        <TableCell className="font-mono text-xs">
                          {u.sampleCode}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-xs">
                          {u.startedAt}
                        </TableCell>
                        <TableCell className="text-right text-xs">
                          {u.durationMin} phút
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4 p-3 rounded-md bg-blue-50 text-blue-700 text-xs flex items-start gap-2">
                <ScrollText className="w-4 h-4 mt-0.5 shrink-0" />
                Logbook là dữ liệu bắt buộc trong đánh giá nội bộ ISO/IEC 17025
                – không cho phép sửa sau khi đóng phiên.
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Giám sát môi trường phòng phân tích</CardTitle>
              <CardDescription>
                Nhiệt độ, độ ẩm – đối chiếu giới hạn quy định
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2.5">
                {environmentReadings.map((r) => {
                  const Icon =
                    r.parameter === "Nhiệt độ" ? Thermometer : Droplets;
                  return (
                    <li
                      key={r.id}
                      className="flex items-center gap-3 p-3 rounded-md border bg-card"
                    >
                      <div
                        className={`w-9 h-9 rounded-md flex items-center justify-center shrink-0 ${
                          r.pass
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-rose-50 text-rose-600"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">
                          {r.room} · {r.parameter}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Giới hạn {r.limit} · {r.observer} · {r.recordedAt}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold">
                          {r.value}
                          <span className="text-xs text-muted-foreground ml-0.5">
                            {r.unit}
                          </span>
                        </div>
                        <Badge variant={r.pass ? "success" : "destructive"}>
                          {r.pass ? "Đạt" : "Không đạt"}
                        </Badge>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>
        </section>

        <Card>
          <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between space-y-0">
            <div>
              <CardTitle>Biên bản kiểm định sau hiệu chuẩn</CardTitle>
              <CardDescription>
                Hồ sơ đánh giá thiết bị sau mỗi đợt hiệu chuẩn – phục vụ truy
                xuất ISO/IEC 17025
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <History className="w-4 h-4" />
              Xem toàn bộ
            </Button>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40">
                    <TableHead>Mã thiết bị</TableHead>
                    <TableHead>Tên thiết bị</TableHead>
                    <TableHead>Ngày HC</TableHead>
                    <TableHead>Đơn vị thực hiện</TableHead>
                    <TableHead>Kết luận</TableHead>
                    <TableHead>Hồ sơ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      equipmentCode: "TB-pH-04",
                      equipmentName: "Máy đo pH/EC để bàn",
                      date: "2026-05-02",
                      vendor: "ĐLVN – Tổng cục ĐLCL",
                      verdict: "Đạt yêu cầu kỹ thuật đo lường",
                      file: "BB-HC-2026-014.pdf",
                    },
                    {
                      equipmentCode: "TB-AAS-01",
                      equipmentName: "AAS Agilent 240FS",
                      date: "2026-02-10",
                      vendor: "Agilent VN",
                      verdict: "Đạt – sai số ≤ ±2% chuẩn",
                      file: "BB-HC-2026-007.pdf",
                    },
                    {
                      equipmentCode: "TB-AUTO-01",
                      equipmentName: "Máy chuẩn độ Metrohm",
                      date: "2026-01-08",
                      vendor: "Metrohm KV2",
                      verdict: "Cần thay điện cực sau 6 tháng",
                      file: "BB-HC-2026-002.pdf",
                    },
                  ].map((b) => (
                    <TableRow key={b.equipmentCode + b.date}>
                      <TableCell className="font-mono">
                        {b.equipmentCode}
                      </TableCell>
                      <TableCell className="font-medium">
                        {b.equipmentName}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {b.date}
                      </TableCell>
                      <TableCell>{b.vendor}</TableCell>
                      <TableCell className="text-xs">{b.verdict}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="h-7">
                          <ScrollText className="w-3.5 h-3.5" />
                          {b.file}
                        </Button>
                      </TableCell>
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
