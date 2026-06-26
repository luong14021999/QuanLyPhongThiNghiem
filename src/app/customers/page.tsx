import {
  Users2,
  UserPlus,
  Filter,
  Search,
  Building2,
  Sprout,
  Landmark,
  GraduationCap,
  Phone,
  MapPin,
  Download,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { customers, type CustomerKind } from "@/lib/mock-data";

const kindIcon: Record<CustomerKind, LucideIcon> = {
  "Doanh nghiệp": Building2,
  "HTX / Trang trại": Sprout,
  "Nông hộ": Sprout,
  "Cơ quan nhà nước": Landmark,
  "Viện / Trường": GraduationCap,
};

const kindVariant: Record<
  CustomerKind,
  "secondary" | "default" | "warning" | "success" | "outline"
> = {
  "Doanh nghiệp": "default",
  "HTX / Trang trại": "success",
  "Nông hộ": "secondary",
  "Cơ quan nhà nước": "warning",
  "Viện / Trường": "outline",
};

const totalSamples = customers.reduce((sum, c) => sum + c.samplesYTD, 0);
const kindCounts = customers.reduce<Record<CustomerKind, number>>(
  (acc, c) => {
    acc[c.kind] = (acc[c.kind] || 0) + 1;
    return acc;
  },
  {} as Record<CustomerKind, number>,
);
const topCustomers = [...customers]
  .sort((a, b) => b.samplesYTD - a.samplesYTD)
  .slice(0, 5);

const stats = [
  {
    label: "Tổng khách hàng",
    value: customers.length,
    icon: Users2,
    accent: "bg-emerald-50 text-emerald-700",
  },
  {
    label: "Mẫu YTD đã tiếp nhận",
    value: totalSamples,
    icon: Sprout,
    accent: "bg-blue-50 text-blue-600",
  },
  {
    label: "HTX / Trang trại",
    value: customers.filter((c) => c.kind === "HTX / Trang trại").length,
    icon: Building2,
    accent: "bg-violet-50 text-violet-600",
  },
  {
    label: "Cơ quan nhà nước",
    value: customers.filter((c) => c.kind === "Cơ quan nhà nước").length,
    icon: Landmark,
    accent: "bg-amber-50 text-amber-600",
  },
];

export default function CustomersPage() {
  return (
    <>
      <Header
        title="Quản lý khách hàng"
        description="Tổ chức, hợp tác xã, nông hộ và cơ quan gửi mẫu phân tích về Viện"
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
              <CardTitle>Danh sách khách hàng</CardTitle>
              <CardDescription>
                Quản lý thông tin liên hệ, địa chỉ và lịch sử gửi mẫu
              </CardDescription>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 rounded-md border border-input bg-background px-2.5 h-9 text-sm w-full sm:w-56">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  className="bg-transparent outline-none flex-1"
                  placeholder="Tìm tên, mã, địa chỉ..."
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter />
                Lọc
              </Button>
              <Button variant="outline" size="sm">
                <Download />
                Xuất Excel
              </Button>
              <Button size="sm">
                <UserPlus />
                Thêm khách hàng
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">Tất cả</TabsTrigger>
                <TabsTrigger value="htx">HTX / Trang trại</TabsTrigger>
                <TabsTrigger value="dn">Doanh nghiệp</TabsTrigger>
                <TabsTrigger value="cq">Cơ quan nhà nước</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="mt-4 rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40">
                    <TableHead>Mã</TableHead>
                    <TableHead>Tên khách hàng</TableHead>
                    <TableHead>Phân loại</TableHead>
                    <TableHead>Đầu mối liên hệ</TableHead>
                    <TableHead>Địa chỉ</TableHead>
                    <TableHead className="text-right">Mẫu YTD</TableHead>
                    <TableHead>Mẫu gần nhất</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((c) => {
                    const Icon = kindIcon[c.kind];
                    return (
                      <TableRow key={c.id}>
                        <TableCell className="font-mono text-xs">
                          {c.code}
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-sm">{c.name}</div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                            <Phone className="w-3 h-3" />
                            {c.phone}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={kindVariant[c.kind]}>
                            <Icon className="w-3 h-3" />
                            {c.kind}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{c.contact}</TableCell>
                        <TableCell className="text-xs text-muted-foreground max-w-[260px]">
                          <div className="flex items-start gap-1">
                            <MapPin className="w-3 h-3 mt-0.5 shrink-0" />
                            <span className="truncate">{c.address}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          {c.samplesYTD}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {c.lastSampleAt}
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
              <CardTitle>Khách hàng gửi mẫu nhiều nhất</CardTitle>
              <CardDescription>
                Theo số mẫu năm nay – hỗ trợ chính sách CSKH & tự chủ tài chính
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {topCustomers.map((c, idx) => {
                  const pct = Math.round((c.samplesYTD / totalSamples) * 100);
                  return (
                    <li
                      key={c.id}
                      className="flex items-center gap-3 p-3 rounded-md border bg-card"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">
                        {idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">
                          {c.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {c.kind}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold">
                          {c.samplesYTD} mẫu
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {pct}% tổng
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
              <CardTitle>Cơ cấu khách hàng</CardTitle>
              <CardDescription>Tỷ trọng theo nhóm đối tượng</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {(Object.keys(kindCounts) as CustomerKind[]).map((k) => {
                const count = kindCounts[k];
                const pct = Math.round((count / customers.length) * 100);
                const Icon = kindIcon[k];
                return (
                  <div key={k}>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="flex items-center gap-2 truncate pr-2">
                        <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                        {k}
                      </span>
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
