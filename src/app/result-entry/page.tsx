import {
  ClipboardEdit,
  Sigma,
  Scale,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ShieldCheck,
  FileSignature,
  Paperclip,
  Clock,
  Pencil,
  Send,
  RotateCcw,
  History,
  ArrowRight,
  CircleDot,
  Lock,
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
import {
  analysisResults,
  type AnalysisResult,
  type ResultStatus,
  type Conclusion,
} from "@/lib/mock-data";

const statusVariant: Record<
  ResultStatus,
  "secondary" | "default" | "warning" | "success" | "destructive"
> = {
  "Đang nhập": "secondary",
  "Chờ QA/QC": "warning",
  "Chờ Trưởng phòng": "default",
  "Đã duyệt": "success",
  "Trả lại sửa": "destructive",
};

const conclusionMeta: Record<
  Conclusion,
  {
    variant: "secondary" | "default" | "warning" | "success" | "destructive";
    icon: typeof CheckCircle2;
    color: string;
  }
> = {
  Đạt: {
    variant: "success",
    icon: CheckCircle2,
    color: "text-emerald-700 bg-emerald-50 border-emerald-200",
  },
  "Không đạt": {
    variant: "destructive",
    icon: XCircle,
    color: "text-rose-700 bg-rose-50 border-rose-200",
  },
  "Vô định": {
    variant: "warning",
    icon: AlertTriangle,
    color: "text-amber-700 bg-amber-50 border-amber-200",
  },
  "Báo cáo giá trị": {
    variant: "default",
    icon: Sigma,
    color: "text-blue-700 bg-blue-50 border-blue-200",
  },
};

const featured = analysisResults[0];

const counts = analysisResults.reduce<Record<ResultStatus, number>>(
  (acc, r) => {
    acc[r.status] = (acc[r.status] || 0) + 1;
    return acc;
  },
  {
    "Đang nhập": 0,
    "Chờ QA/QC": 0,
    "Chờ Trưởng phòng": 0,
    "Đã duyệt": 0,
    "Trả lại sửa": 0,
  },
);

const stats = [
  {
    label: "Đang nhập",
    value: counts["Đang nhập"],
    icon: Pencil,
    accent: "bg-emerald-50 text-emerald-700",
  },
  {
    label: "Chờ QA/QC",
    value: counts["Chờ QA/QC"],
    icon: ShieldCheck,
    accent: "bg-amber-50 text-amber-600",
  },
  {
    label: "Đã duyệt",
    value: counts["Đã duyệt"],
    icon: FileSignature,
    accent: "bg-blue-50 text-blue-600",
  },
  {
    label: "Trả lại sửa",
    value: counts["Trả lại sửa"],
    icon: RotateCcw,
    accent: "bg-rose-50 text-rose-600",
  },
];

function ApprovalSteps({ result }: { result: AnalysisResult }) {
  return (
    <ol className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {result.approvals.map((a, i) => {
        const done = a.decision === "Đạt";
        const rejected = a.decision === "Trả lại sửa";
        const waiting = a.decision === "Chờ";
        return (
          <li
            key={a.step}
            className={`relative p-3 rounded-md border ${
              done
                ? "border-emerald-200 bg-emerald-50/40"
                : rejected
                  ? "border-rose-200 bg-rose-50/40"
                  : waiting
                    ? "border-dashed bg-card"
                    : "bg-card"
            }`}
          >
            <div className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-md flex items-center justify-center font-semibold text-xs ${
                  done
                    ? "bg-emerald-500 text-white"
                    : rejected
                      ? "bg-rose-500 text-white"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {done ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : rejected ? (
                  <RotateCcw className="w-4 h-4" />
                ) : (
                  i + 1
                )}
              </div>
              <div className="text-sm font-medium">{a.step}</div>
            </div>
            <div className="mt-1.5 text-xs">
              {waiting ? (
                <span className="text-muted-foreground">Đang chờ</span>
              ) : (
                <>
                  <div className="font-medium">{a.actor}</div>
                  <div className="text-muted-foreground text-[11px]">
                    {a.role}
                  </div>
                  {a.signedAt && (
                    <div className="text-[11px] text-muted-foreground mt-0.5">
                      Ký lúc {a.signedAt}
                    </div>
                  )}
                </>
              )}
            </div>
            {a.comment && (
              <div className="mt-2 text-[11px] text-foreground/80 italic line-clamp-3">
                "{a.comment}"
              </div>
            )}
            {i < result.approvals.length - 1 && (
              <ArrowRight className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function DecisionZone({ result }: { result: AnalysisResult }) {
  if (result.decisionRuleType.startsWith("Simple")) {
    return (
      <div className="rounded-md border bg-blue-50/40 border-blue-200 p-3 text-sm">
        <div className="font-medium text-blue-700">Simple acceptance</div>
        <div className="text-xs text-blue-900/70 mt-1">
          Trả kết quả {result.mean} ± {result.uncertainty} {result.unit}. KH dùng
          tham chiếu khuyến cáo, không kết luận đạt/không đạt.
        </div>
      </div>
    );
  }
  const measured = result.mean;
  const u = result.uncertainty;
  const lo = result.acceptanceUpper;
  const hi = result.rejectionUpper;
  const lim = result.decisionLimit;
  const W = 600;
  const H = 90;
  const PAD = { left: 30, right: 30, top: 14, bottom: 30 };
  const PLOT_W = W - PAD.left - PAD.right;
  const PLOT_H = 26;
  const xMin = 0;
  const xMax = hi + (hi - lo) * 0.4;
  const xScale = (v: number) =>
    PAD.left + ((v - xMin) / (xMax - xMin)) * PLOT_W;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img">
      <rect
        x={PAD.left}
        y={PAD.top}
        width={xScale(lo) - PAD.left}
        height={PLOT_H}
        fill="#d1fae5"
      />
      <rect
        x={xScale(lo)}
        y={PAD.top}
        width={xScale(hi) - xScale(lo)}
        height={PLOT_H}
        fill="#fef3c7"
      />
      <rect
        x={xScale(hi)}
        y={PAD.top}
        width={PAD.left + PLOT_W - xScale(hi)}
        height={PLOT_H}
        fill="#fee2e2"
      />
      <line
        x1={xScale(lim)}
        x2={xScale(lim)}
        y1={PAD.top - 4}
        y2={PAD.top + PLOT_H + 4}
        stroke="#0f172a"
        strokeWidth="1.5"
      />
      <text
        x={xScale(lim)}
        y={PAD.top - 6}
        textAnchor="middle"
        fontSize="9"
        fontWeight="600"
        fill="#0f172a"
      >
        Giới hạn {lim} {result.unit}
      </text>
      <line
        x1={xScale(measured)}
        x2={xScale(measured)}
        y1={PAD.top + PLOT_H + 4}
        y2={PAD.top + PLOT_H + 16}
        stroke="#1d8048"
        strokeWidth="2"
      />
      <line
        x1={xScale(measured - u)}
        x2={xScale(measured + u)}
        y1={PAD.top + PLOT_H + 14}
        y2={PAD.top + PLOT_H + 14}
        stroke="#1d8048"
        strokeWidth="2"
      />
      <circle
        cx={xScale(measured)}
        cy={PAD.top + PLOT_H + 14}
        r="3.5"
        fill="#1d8048"
      />
      <text
        x={xScale(measured)}
        y={PAD.top + PLOT_H + 27}
        textAnchor="middle"
        fontSize="9"
        fontWeight="600"
        fill="#1d8048"
      >
        x̄ ± U = {measured} ± {u}
      </text>
      <text
        x={(PAD.left + xScale(lo)) / 2}
        y={PAD.top + PLOT_H / 2 + 3}
        textAnchor="middle"
        fontSize="9"
        fontWeight="600"
        fill="#047857"
      >
        ĐẠT
      </text>
      <text
        x={(xScale(lo) + xScale(hi)) / 2}
        y={PAD.top + PLOT_H / 2 + 3}
        textAnchor="middle"
        fontSize="9"
        fontWeight="600"
        fill="#b45309"
      >
        VÔ ĐỊNH
      </text>
      <text
        x={(xScale(hi) + PAD.left + PLOT_W) / 2}
        y={PAD.top + PLOT_H / 2 + 3}
        textAnchor="middle"
        fontSize="9"
        fontWeight="600"
        fill="#b91c1c"
      >
        KHÔNG ĐẠT
      </text>
    </svg>
  );
}

function ResultDetail({ result }: { result: AnalysisResult }) {
  const concl = conclusionMeta[result.conclusion];
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="lg:col-span-2 p-3 rounded-lg border bg-card">
          <div className="text-[11px] uppercase font-semibold text-muted-foreground mb-2">
            Thông tin chỉ tiêu × mẫu
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-3 gap-y-2 text-xs">
            <div>
              <div className="text-muted-foreground">Mã KQ</div>
              <div className="font-mono font-medium">{result.resultCode}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Mã mẫu</div>
              <div className="font-mono font-medium">{result.sampleCode}</div>
            </div>
            <div>
              <div className="text-muted-foreground">KH</div>
              <div className="font-medium truncate">{result.customerName}</div>
            </div>
            <div className="col-span-2">
              <div className="text-muted-foreground">Chỉ tiêu × Nền</div>
              <div className="font-medium">
                {result.criterion} – {result.matrix}
              </div>
            </div>
            <div>
              <div className="text-muted-foreground">KTV</div>
              <div className="font-medium">{result.technician}</div>
            </div>
            <div className="col-span-2">
              <div className="text-muted-foreground">Phương pháp</div>
              <div className="font-medium">{result.method}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Thiết bị</div>
              <div className="font-medium">{result.instrument.code}</div>
              <div className="text-[10px] text-muted-foreground">
                {result.instrument.name}
              </div>
            </div>
            <div className="col-span-2 sm:col-span-3">
              <div className="text-muted-foreground">Mẫu chuẩn QC</div>
              <div className="text-foreground/90">{result.referenceMaterial}</div>
            </div>
          </div>
        </div>
        <div
          className={`p-4 rounded-lg border space-y-2 ${concl.color}`}
        >
          <div className="flex items-center gap-2">
            <concl.icon className="w-5 h-5" />
            <span className="text-xs font-semibold uppercase tracking-wider">
              Kết luận
            </span>
          </div>
          <div className="text-2xl font-bold">{result.conclusion}</div>
          <div className="text-xs leading-relaxed">
            {result.conclusionExplanation}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="lg:col-span-2 p-3 rounded-lg border bg-card">
          <div className="flex items-center justify-between mb-2">
            <div className="text-[11px] uppercase font-semibold text-muted-foreground">
              Phép lặp & thống kê
            </div>
            <Badge variant="outline">
              n = {result.replicates.length}
            </Badge>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-3">
            {result.replicates.map((r) => (
              <div
                key={r.id}
                className="rounded-md border bg-muted/30 px-2 py-1.5 text-center"
              >
                <div className="text-[10px] text-muted-foreground">
                  Lần {r.id}
                </div>
                <div className="text-sm font-semibold tabular-nums">
                  {r.value}
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="rounded-md border bg-card p-2">
              <div className="text-muted-foreground">x̄</div>
              <div className="font-semibold text-sm">
                {result.mean} {result.unit}
              </div>
            </div>
            <div className="rounded-md border bg-card p-2">
              <div className="text-muted-foreground">SD</div>
              <div className="font-semibold text-sm">{result.sd}</div>
            </div>
            <div className="rounded-md border bg-card p-2">
              <div className="text-muted-foreground">RSD</div>
              <div className="font-semibold text-sm">{result.rsd}%</div>
            </div>
            <div className="rounded-md border bg-primary/5 border-primary/30 p-2">
              <div className="text-muted-foreground">U (k=2)</div>
              <div className="font-semibold text-sm text-primary">
                ±{result.uncertainty}
              </div>
            </div>
          </div>
        </div>
        <div className="p-3 rounded-lg border bg-card">
          <div className="text-[11px] uppercase font-semibold text-muted-foreground mb-2">
            Kiểm soát QA/QC
          </div>
          <ul className="space-y-2 text-xs">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">CRM recovery</span>
              <span
                className={`font-semibold ${
                  result.matrixSpikeRecovery >= 90 &&
                  result.matrixSpikeRecovery <= 110
                    ? "text-emerald-700"
                    : "text-rose-700"
                }`}
              >
                {result.matrixSpikeRecovery}%
              </span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Mẫu trắng</span>
              <span className="font-semibold">
                {result.blankBlankValue} {result.unit}
              </span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">RSD ≤ 5%</span>
              <Badge
                variant={result.rsd < 5 ? "success" : "destructive"}
                className="text-[10px]"
              >
                {result.rsd < 5 ? "Đạt" : "Vượt"}
              </Badge>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Levey-Jennings</span>
              <Badge variant="success" className="text-[10px]">
                Trong kiểm soát
              </Badge>
            </li>
          </ul>
        </div>
      </div>

      <div className="p-4 rounded-lg border bg-card space-y-2">
        <div className="flex items-center gap-2 text-[11px] uppercase font-semibold text-muted-foreground">
          <Scale className="w-3.5 h-3.5" />
          Áp dụng quy tắc quyết định
        </div>
        <div className="text-sm">
          <span className="font-medium">{result.decisionRuleType}</span>
          {result.decisionRuleId !== "—" && (
            <span className="text-muted-foreground ml-2 font-mono text-xs">
              (DR-{result.decisionRuleId})
            </span>
          )}
        </div>
        <DecisionZone result={result} />
      </div>
    </div>
  );
}

const queueResults = analysisResults.filter((r) => r.status !== "Đã duyệt");

export default function ResultEntryPage() {
  return (
    <>
      <Header
        title="Nhập kết quả & duyệt"
        description="Phiếu diễn biến phân tích · Workflow 3 cấp KTV → QA/QC → Trưởng phòng · §7.5 + §7.8.6"
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

        <Card>
          <CardHeader>
            <CardTitle>Hàng đợi cần xử lý</CardTitle>
            <CardDescription>
              Chỉ tiêu × mẫu đang chờ KTV, QA/QC hoặc Trưởng phòng thao tác
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">Tất cả</TabsTrigger>
                <TabsTrigger value="qa">Chờ QA/QC</TabsTrigger>
                <TabsTrigger value="manager">Chờ Trưởng phòng</TabsTrigger>
                <TabsTrigger value="rejected">Trả lại</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="mt-4 rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40">
                    <TableHead>Mã KQ</TableHead>
                    <TableHead>Mẫu</TableHead>
                    <TableHead>Chỉ tiêu</TableHead>
                    <TableHead>Kết quả</TableHead>
                    <TableHead>Kết luận</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Đang chờ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {analysisResults.map((r) => {
                    const concl = conclusionMeta[r.conclusion];
                    const waitingStep = r.approvals.find(
                      (a) => a.decision === "Chờ",
                    );
                    return (
                      <TableRow key={r.id}>
                        <TableCell className="font-mono text-xs">
                          {r.resultCode}
                        </TableCell>
                        <TableCell>
                          <div className="font-mono text-xs">
                            {r.sampleCode}
                          </div>
                          <div className="text-[10px] text-muted-foreground truncate max-w-[180px]">
                            {r.customerName}
                          </div>
                        </TableCell>
                        <TableCell className="text-xs">
                          <div className="font-medium">{r.criterion}</div>
                          <div className="text-muted-foreground">
                            {r.method}
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-xs">
                          {r.mean} ± {r.uncertainty} {r.unit}
                        </TableCell>
                        <TableCell>
                          <Badge variant={concl.variant}>
                            <concl.icon className="w-3 h-3" />
                            {r.conclusion}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={statusVariant[r.status]}>
                            {r.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {waitingStep ? waitingStep.step : "—"}
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
            <div className="flex items-start justify-between flex-wrap gap-2">
              <div>
                <CardTitle>Phiếu kết quả: {featured.resultCode}</CardTitle>
                <CardDescription>
                  {featured.sampleCode} · {featured.criterion} ·{" "}
                  {featured.customerName}
                </CardDescription>
              </div>
              <Badge variant={statusVariant[featured.status]}>
                <Lock className="w-3 h-3" />
                {featured.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="text-[11px] font-semibold uppercase text-muted-foreground mb-2 flex items-center gap-2">
                <ClipboardEdit className="w-3.5 h-3.5" />
                Trạng thái workflow 3 cấp
              </div>
              <ApprovalSteps result={featured} />
            </div>

            <ResultDetail result={featured} />

            <div>
              <div className="text-[11px] font-semibold uppercase text-muted-foreground mb-2 flex items-center gap-2">
                <Paperclip className="w-3.5 h-3.5" />
                Dữ liệu thô đính kèm (raw data)
              </div>
              <ul className="space-y-2">
                {featured.rawFiles.map((f) => (
                  <li
                    key={f.name}
                    className="flex items-center gap-3 p-3 rounded-md border bg-card"
                  >
                    <div className="w-9 h-9 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                      <Paperclip className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">
                        {f.name}
                      </div>
                      <div className="text-[11px] text-muted-foreground flex flex-wrap gap-x-3 gap-y-0.5 mt-0.5">
                        <span>{f.kind}</span>
                        <span>{f.size}</span>
                        <span>tải lên {f.uploadedAt}</span>
                        <span>{f.uploadedBy}</span>
                        <span className="font-mono">{f.hash}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-2 text-xs text-muted-foreground bg-muted/40 rounded-md p-2 flex items-start gap-2">
                <Lock className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                Mỗi file gắn checksum SHA-256 lưu vĩnh viễn – không cho phép sửa
                sau khi đóng phiếu (§7.5.2 – Hồ sơ kỹ thuật).
              </div>
            </div>

            <div>
              <div className="text-[11px] font-semibold uppercase text-muted-foreground mb-2 flex items-center gap-2">
                <History className="w-3.5 h-3.5" />
                Phiếu diễn biến phân tích (audit trail)
              </div>
              <ol className="relative border-l-2 border-muted ml-2 space-y-3">
                {featured.auditTrail.map((e, i) => (
                  <li key={i} className="ml-4 relative">
                    <span className="absolute -left-[1.4rem] top-1 w-3 h-3 rounded-full bg-primary border-2 border-card" />
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="text-xs text-muted-foreground font-mono">
                        {e.at}
                      </span>
                      <span className="text-xs font-medium">{e.actor}</span>
                      <span className="text-xs text-muted-foreground">
                        — {e.action}
                      </span>
                    </div>
                    {e.detail && (
                      <div className="text-xs text-foreground/80 mt-0.5">
                        {e.detail}
                      </div>
                    )}
                    {e.oldValue !== undefined && e.newValue !== undefined && (
                      <div className="text-[11px] mt-1 flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-rose-700 line-through">
                          {e.oldValue}
                        </span>
                        <ArrowRight className="w-3 h-3 text-muted-foreground" />
                        <span className="font-mono text-emerald-700">
                          {e.newValue}
                        </span>
                      </div>
                    )}
                  </li>
                ))}
              </ol>
              <div className="mt-2 text-xs text-muted-foreground bg-muted/40 rounded-md p-2 flex items-start gap-2">
                <Lock className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                Mọi thao tác đều ghi audit log – không xóa được. Đáp ứng yêu
                cầu §7.5 (Hồ sơ kỹ thuật) + §8.4 (Kiểm soát hồ sơ).
              </div>
            </div>
          </CardContent>
        </Card>

        {queueResults.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Demo thao tác nhập / duyệt</CardTitle>
              <CardDescription>
                Mockup UI từ góc nhìn từng vai trò trong workflow
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                <div className="p-4 rounded-lg border bg-card space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Pencil className="w-4 h-4 text-primary" />
                    Vai trò: KTV nhập kết quả
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Nhập số liệu phép lặp, đính kèm raw file, ghi ghi chú
                  </div>
                  <ul className="text-xs space-y-1.5">
                    <li className="flex items-center gap-2">
                      <CircleDot className="w-3 h-3 text-primary" />
                      Form numeric: ô input cho từng phép lặp
                    </li>
                    <li className="flex items-center gap-2">
                      <CircleDot className="w-3 h-3 text-primary" />
                      Auto tính x̄, SD, RSD, U khi nhập đủ
                    </li>
                    <li className="flex items-center gap-2">
                      <CircleDot className="w-3 h-3 text-primary" />
                      Upload CSV/PDF + hash SHA-256
                    </li>
                  </ul>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t">
                    <Button variant="outline" size="sm">
                      Lưu nháp
                    </Button>
                    <Button size="sm">
                      <Send />
                      Nộp QA/QC
                    </Button>
                  </div>
                </div>
                <div className="p-4 rounded-lg border bg-card space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    Vai trò: QA/QC kiểm tra
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Đối chiếu Westgard, recovery, mẫu trắng, ký xác nhận
                  </div>
                  <ul className="text-xs space-y-1.5">
                    <li className="flex items-center gap-2">
                      <CircleDot className="w-3 h-3 text-amber-600" />
                      Auto link Levey-Jennings + vi phạm Westgard
                    </li>
                    <li className="flex items-center gap-2">
                      <CircleDot className="w-3 h-3 text-amber-600" />
                      So sánh với CRM recovery 90–110%
                    </li>
                    <li className="flex items-center gap-2">
                      <CircleDot className="w-3 h-3 text-amber-600" />
                      Có thể trả lại sửa (rollback workflow)
                    </li>
                  </ul>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t">
                    <Button variant="outline" size="sm">
                      <RotateCcw />
                      Trả lại
                    </Button>
                    <Button size="sm">
                      <CheckCircle2 />
                      Duyệt
                    </Button>
                  </div>
                </div>
                <div className="p-4 rounded-lg border bg-card space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <FileSignature className="w-4 h-4 text-blue-600" />
                    Vai trò: Trưởng phòng duyệt
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Duyệt cuối + ký số phát hành phiếu KQ
                  </div>
                  <ul className="text-xs space-y-1.5">
                    <li className="flex items-center gap-2">
                      <CircleDot className="w-3 h-3 text-blue-600" />
                      Đọc tổng hợp + ghi chú QA/QC
                    </li>
                    <li className="flex items-center gap-2">
                      <CircleDot className="w-3 h-3 text-blue-600" />
                      Ký số USB token / HSM
                    </li>
                    <li className="flex items-center gap-2">
                      <CircleDot className="w-3 h-3 text-blue-600" />
                      Tự đẩy sang /reports phát hành KH
                    </li>
                  </ul>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t">
                    <Button variant="outline" size="sm">
                      <Clock />
                      Xem sau
                    </Button>
                    <Button size="sm">
                      <FileSignature />
                      Ký số & duyệt
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </>
  );
}
