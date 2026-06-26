import {
  AlertOctagon,
  ShieldCheck,
  TrendingUp,
  ListChecks,
  Filter,
  Search,
  Plus,
  Sparkles,
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { risks, opportunities, type Risk } from "@/lib/mock-data";

function levelOf(score: number) {
  if (score >= 16) return { label: "Rất cao", color: "bg-rose-100 text-rose-700 border-rose-300", swatch: "bg-rose-500", variant: "destructive" as const };
  if (score >= 10) return { label: "Cao", color: "bg-orange-100 text-orange-700 border-orange-300", swatch: "bg-orange-500", variant: "warning" as const };
  if (score >= 5) return { label: "Trung bình", color: "bg-amber-100 text-amber-700 border-amber-300", swatch: "bg-amber-400", variant: "secondary" as const };
  return { label: "Thấp", color: "bg-emerald-100 text-emerald-700 border-emerald-300", swatch: "bg-emerald-500", variant: "success" as const };
}

const statusVariant = {
  Mở: "destructive",
  "Đang xử lý": "warning",
  "Đã giảm thiểu": "secondary",
  "Đã đóng": "success",
} as const;

const opStatusVariant = {
  "Đề xuất": "secondary",
  "Đang triển khai": "warning",
  "Đã đạt": "success",
} as const;

function scoreOf(r: Risk) {
  return r.likelihood * r.impact;
}

function residualOf(r: Risk) {
  return r.residualLikelihood * r.residualImpact;
}

const totalScores = risks.map(scoreOf);
const highRiskCount = totalScores.filter((s) => s >= 10).length;
const openCount = risks.filter(
  (r) => r.status === "Mở" || r.status === "Đang xử lý",
).length;
const mitigatedCount = risks.filter(
  (r) => r.status === "Đã giảm thiểu" || r.status === "Đã đóng",
).length;

const stats = [
  {
    label: "Tổng rủi ro đã đăng ký",
    value: risks.length,
    icon: ListChecks,
    accent: "bg-emerald-50 text-emerald-700",
  },
  {
    label: "Mức Cao / Rất cao",
    value: highRiskCount,
    icon: AlertOctagon,
    accent: "bg-rose-50 text-rose-600",
  },
  {
    label: "Đang xử lý / Mở",
    value: openCount,
    icon: TrendingUp,
    accent: "bg-amber-50 text-amber-600",
  },
  {
    label: "Đã giảm thiểu / đóng",
    value: mitigatedCount,
    icon: ShieldCheck,
    accent: "bg-blue-50 text-blue-600",
  },
];

function RiskMatrix() {
  const grid = Array.from({ length: 5 }, (_, i) =>
    Array.from({ length: 5 }, (_, j) => {
      const likelihood = j + 1;
      const impact = 5 - i;
      const score = likelihood * impact;
      const list = risks.filter(
        (r) => r.likelihood === likelihood && r.impact === impact,
      );
      return { likelihood, impact, score, list };
    }),
  );
  return (
    <div className="overflow-x-auto">
      <div className="inline-grid grid-cols-[auto_repeat(5,minmax(64px,1fr))] gap-1.5 text-xs">
        <div />
        {[1, 2, 3, 4, 5].map((l) => (
          <div
            key={`l-${l}`}
            className="text-center text-[11px] text-muted-foreground font-medium"
          >
            L{l}
          </div>
        ))}
        {grid.map((row, i) => (
          <Row key={i} row={row} impact={5 - i} />
        ))}
        <div className="col-span-6 mt-2 flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
          <span>Trục dọc: Mức nghiêm trọng (I) · Trục ngang: Khả năng xảy ra (L)</span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-500" /> Thấp 1–4
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-amber-400" /> TB 5–9
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-orange-500" /> Cao 10–15
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-rose-500" /> Rất cao 16–25
          </span>
        </div>
      </div>
    </div>
  );
}

function Row({
  row,
  impact,
}: {
  row: ReturnType<typeof riskMatrixCell>[];
  impact: number;
}) {
  return (
    <>
      <div className="text-[11px] text-muted-foreground font-medium flex items-center justify-end pr-2">
        I{impact}
      </div>
      {row.map((cell) => {
        const lv = levelOf(cell.score);
        return (
          <div
            key={`${cell.likelihood}-${cell.impact}`}
            className={`relative rounded-md border ${lv.color} min-h-[56px] p-1.5 flex flex-col items-center justify-center text-center`}
            title={`L${cell.likelihood} × I${cell.impact} = ${cell.score} (${lv.label})`}
          >
            <div className="text-[10px] opacity-70">{cell.score}</div>
            <div className="text-base font-semibold leading-none mt-0.5">
              {cell.list.length || ""}
            </div>
          </div>
        );
      })}
    </>
  );
}

function riskMatrixCell() {
  return {
    likelihood: 0,
    impact: 0,
    score: 0,
    list: [] as Risk[],
  };
}

const reviewSoon = [...risks]
  .filter((r) => r.status !== "Đã đóng")
  .sort((a, b) => (a.reviewAt < b.reviewAt ? -1 : 1))
  .slice(0, 5);

export default function RisksPage() {
  return (
    <>
      <Header
        title="Đăng ký rủi ro & cơ hội"
        description="ISO/IEC 17025:2017 §8.5 – nhận diện, đánh giá và xử lý rủi ro cho hoạt động PTN"
      />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scrollbar-thin">
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
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
            <CardHeader>
              <CardTitle>Ma trận rủi ro 5×5</CardTitle>
              <CardDescription>
                Phân bố rủi ro theo Khả năng × Mức nghiêm trọng – số trong ô là
                số lượng rủi ro hiện có
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RiskMatrix />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cần xem xét trong 30 ngày</CardTitle>
              <CardDescription>
                Sắp đến hạn rà soát biện pháp kiểm soát
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {reviewSoon.map((r) => {
                  const lv = levelOf(scoreOf(r));
                  return (
                    <li
                      key={r.id}
                      className="flex items-start gap-3 p-3 rounded-md border bg-card"
                    >
                      <span
                        className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${lv.swatch}`}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium line-clamp-2">
                          {r.title}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {r.code} · {r.owner}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground text-right shrink-0">
                        {r.reviewAt}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>
        </section>

        <Card>
          <CardHeader className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between space-y-0">
            <div>
              <CardTitle>Danh mục rủi ro</CardTitle>
              <CardDescription>
                Mỗi rủi ro gắn điều khoản ISO/IEC 17025:2017 và biện pháp xử lý
              </CardDescription>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 rounded-md border border-input bg-background px-2.5 h-9 text-sm w-full sm:w-56">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  className="bg-transparent outline-none flex-1"
                  placeholder="Tìm mã, tiêu đề..."
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter />
                Lọc
              </Button>
              <Button size="sm">
                <Plus />
                Thêm rủi ro
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">Tất cả</TabsTrigger>
                <TabsTrigger value="high">Cao / Rất cao</TabsTrigger>
                <TabsTrigger value="open">Mở / Đang xử lý</TabsTrigger>
                <TabsTrigger value="closed">Đã giảm thiểu / đóng</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="mt-4 rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40">
                    <TableHead>Mã</TableHead>
                    <TableHead>Rủi ro</TableHead>
                    <TableHead>Phân loại</TableHead>
                    <TableHead>L × I = Điểm</TableHead>
                    <TableHead>Mức</TableHead>
                    <TableHead>Xử lý</TableHead>
                    <TableHead>Phụ trách</TableHead>
                    <TableHead>Tồn dư</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>§ISO</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {risks.map((r) => {
                    const score = scoreOf(r);
                    const residual = residualOf(r);
                    const lv = levelOf(score);
                    const residualLv = levelOf(residual);
                    return (
                      <TableRow key={r.id}>
                        <TableCell className="font-mono text-xs">
                          {r.code}
                        </TableCell>
                        <TableCell className="max-w-[280px]">
                          <div className="font-medium text-sm line-clamp-2">
                            {r.title}
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                            {r.action}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="text-xs">
                            {r.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono text-xs">
                          {r.likelihood} × {r.impact} ={" "}
                          <span className="font-semibold">{score}</span>
                        </TableCell>
                        <TableCell>
                          <Badge variant={lv.variant}>{lv.label}</Badge>
                        </TableCell>
                        <TableCell className="text-xs">
                          {r.treatment}
                        </TableCell>
                        <TableCell className="text-xs">{r.owner}</TableCell>
                        <TableCell className="font-mono text-xs">
                          {r.residualLikelihood} × {r.residualImpact} ={" "}
                          <span className="font-semibold">{residual}</span>
                          <div className="mt-0.5">
                            <Badge variant={residualLv.variant}>
                              {residualLv.label}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={statusVariant[r.status]}>
                            {r.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {r.isoClause}
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
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <CardTitle>Cơ hội cải tiến</CardTitle>
            </div>
            <CardDescription>
              ISO 17025:2017 §8.5 yêu cầu xác định cả cơ hội bên cạnh rủi ro
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {opportunities.map((o) => (
                <li
                  key={o.id}
                  className="p-3 rounded-md border bg-card space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-sm font-medium">{o.title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {o.description}
                      </div>
                    </div>
                    <Badge variant={opStatusVariant[o.status]}>
                      {o.status}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                    <span className="text-muted-foreground">
                      Lợi ích kỳ vọng:
                    </span>
                    <span className="text-foreground">{o.expectedBenefit}</span>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-muted-foreground">Phụ trách:</span>
                    <span>{o.owner}</span>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
