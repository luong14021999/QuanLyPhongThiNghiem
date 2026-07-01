import { FileText, Download, FileSignature } from "lucide-react";
import { Header } from "@/components/layout/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const reports = [
  {
    code: "PKQ-VNNTH-2026-00210",
    sample: "M-VNNTH-2026-00310",
    customer: "HTX Cam Vân Du",
    issuedAt: "2026-05-18",
    status: "Đã trả",
  },
  {
    code: "PKQ-VNNTH-2026-00211",
    sample: "M-VNNTH-2026-00315",
    customer: "CP Phân bón Tiến Nông",
    issuedAt: "2026-05-19",
    status: "Đã ký số",
  },
  {
    code: "PKQ-VNNTH-2026-00212",
    sample: "M-VNNTH-2026-00319",
    customer: "HTX Nông nghiệp Sông Mã",
    issuedAt: "—",
    status: "Chờ duyệt",
  },
];

export default function ReportsPage() {
  return (
    <>
      <Header
        title="Báo cáo & Phiếu kết quả"
        description="Trả kết quả điện tử có ký số, lưu trữ phục vụ truy xuất ISO/IEC 17025"
      />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scrollbar-thin">
        <Card>
          <CardHeader>
            <CardTitle>Phiếu kết quả gần đây</CardTitle>
            <CardDescription>
              Hỗ trợ trả KQ qua email, cổng tra cứu khách hàng hoặc in trực
              tiếp
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {reports.map((r) => (
                <li
                  key={r.code}
                  className="flex items-center gap-4 p-3 rounded-md border bg-card"
                >
                  <div className="w-10 h-10 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-sm font-medium">
                        {r.code}
                      </span>
                      <Badge
                        variant={
                          r.status === "Chờ duyệt" ? "warning" : "success"
                        }
                      >
                        {r.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      Mẫu {r.sample} · {r.customer} · Phát hành {r.issuedAt}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <FileSignature />
                    Ký số
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download />
                    Tải PDF
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
