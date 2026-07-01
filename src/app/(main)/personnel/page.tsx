import {
  Users,
  UserPlus,
  Filter,
  GraduationCap,
  Mail,
  Phone,
  Building2,
} from "lucide-react";
import { staffStore } from "@/lib/data/staff";
import { AddStaffDialog } from "@/components/staff/add-staff-dialog";
import { EditStaffDialog } from "@/components/staff/edit-staff-dialog";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { staff } from "@/lib/mock-data";

const statusVariant = {
  "Đang làm việc": "success",
  "Nghỉ phép": "warning",
  "Thử việc": "secondary",
} as const;

export default async function PersonnelPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const all = await staffStore.list();
  const query = q.trim().toLowerCase();
  const staff = query
    ? all.filter(
        (s) =>
          s.fullName.toLowerCase().includes(query) ||
          s.code.toLowerCase().includes(query) ||
          s.department.toLowerCase().includes(query) ||
          s.position.toLowerCase().includes(query),
      )
    : all;

  const departments = Array.from(new Set(all.map((s) => s.department)));

  const stats = [
    {
      label: "Tổng nhân sự PTN",
      value: all.length,
      icon: Users,
      accent: "bg-emerald-50 text-emerald-700",
    },
    {
      label: "Đang làm việc",
      value: all.filter((s) => s.status === "Đang làm việc").length,
      icon: Building2,
      accent: "bg-blue-50 text-blue-600",
    },
    {
      label: "Nhóm chuyên môn",
      value: departments.length,
      icon: GraduationCap,
      accent: "bg-violet-50 text-violet-600",
    },
    {
      label: "Thử việc",
      value: all.filter((s) => s.status === "Thử việc").length,
      icon: UserPlus,
      accent: "bg-amber-50 text-amber-600",
    },
  ];

  const trainingFeed = all
    .flatMap((s) =>
      s.trainings.map((t) => ({
        name: s.fullName,
        course: t.name,
        year: t.year,
      })),
    )
    .sort((a, b) => b.year - a.year)
    .slice(0, 6);

  return (
    <>
      <Header
        title="Quản lý nhân sự PTN"
        description="Danh sách nhân sự, sơ đồ tổ chức, phiếu theo dõi nhân sự và năng lực chuyên môn"
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
                <CardTitle>Danh sách nhân sự</CardTitle>
                <CardDescription>
                  Tổng {staff.length} nhân sự thuộc {departments.length} nhóm
                  chuyên môn
                </CardDescription>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <EntitySearchInput
                  basePath="/personnel"
                  placeholder="Tìm tên, mã, nhóm..."
                />
                <Button variant="outline" size="sm">
                  <Filter />
                  Lọc
                </Button>
                <AddStaffDialog />
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/40">
                      <TableHead>Mã</TableHead>
                      <TableHead>Họ tên</TableHead>
                      <TableHead>Chức danh</TableHead>
                      <TableHead>Nhóm chuyên môn</TableHead>
                      <TableHead>Liên hệ</TableHead>
                      <TableHead>Vào làm</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead className="w-[60px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {staff.length === 0 && (
                      <TableRow>
                        <TableCell
                          colSpan={8}
                          className="text-center text-sm text-muted-foreground py-8"
                        >
                          {query
                            ? `Không có nhân sự nào khớp "${query}"`
                            : "Chưa có nhân sự nào"}
                        </TableCell>
                      </TableRow>
                    )}
                    {staff.map((s) => (
                      <TableRow key={s.id}>
                        <TableCell className="font-mono">{s.code}</TableCell>
                        <TableCell className="font-medium">
                          {s.fullName}
                        </TableCell>
                        <TableCell>{s.position}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {s.department}
                        </TableCell>
                        <TableCell>
                          <div className="text-xs space-y-0.5">
                            <div className="flex items-center gap-1.5 text-muted-foreground">
                              <Mail className="w-3 h-3" />
                              {s.email}
                            </div>
                            <div className="flex items-center gap-1.5 text-muted-foreground">
                              <Phone className="w-3 h-3" />
                              {s.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {s.joinedAt}
                        </TableCell>
                        <TableCell>
                          <Badge variant={statusVariant[s.status]}>
                            {s.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-0.5">
                            <EditStaffDialog row={s} />
                            <DeleteEntityButton
                              entity="staff"
                              id={s.id}
                              label={s.fullName}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sơ đồ tổ chức PTN</CardTitle>
              <CardDescription>
                Tỷ trọng nhân sự theo nhóm chuyên môn
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {departments.map((d) => {
                const count = staff.filter((s) => s.department === d).length;
                const pct = Math.round((count / staff.length) * 100);
                return (
                  <div key={d}>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="truncate pr-2">{d}</span>
                      <span className="text-muted-foreground text-xs">
                        {count} người · {pct}%
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

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Phiếu theo dõi năng lực</CardTitle>
              <CardDescription>
                Năng lực chuyên môn và ủy quyền phương pháp phân tích
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {staff.slice(0, 5).map((s) => (
                  <li
                    key={s.id}
                    className="p-3 rounded-md border bg-card space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">{s.fullName}</div>
                      <span className="text-xs text-muted-foreground">
                        {s.position}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {s.competencies.map((c) => (
                        <Badge key={c} variant="secondary" className="text-xs">
                          {c}
                        </Badge>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Đào tạo & duy trì năng lực</CardTitle>
              <CardDescription>
                Khoá đào tạo gần nhất – phục vụ hồ sơ ISO/IEC 17025
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {trainingFeed.map((t, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-md border bg-card"
                  >
                    <div className="w-9 h-9 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">
                        {t.course}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {t.name}
                      </div>
                    </div>
                    <Badge variant="outline">{t.year}</Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  );
}
