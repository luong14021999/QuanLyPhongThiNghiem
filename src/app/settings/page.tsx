import { Header } from "@/components/layout/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  return (
    <>
      <Header
        title="Cấu hình hệ thống"
        description="Tham số phòng thí nghiệm, người dùng, phân quyền và tích hợp"
      />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scrollbar-thin">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin phòng thí nghiệm</CardTitle>
              <CardDescription>
                Hiển thị trên phiếu nhận mẫu và phiếu kết quả
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="org">Cơ quan chủ quản</Label>
                <Input id="org" defaultValue="Viện Nông Nghiệp Thanh Hóa" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="lab">Tên phòng thí nghiệm</Label>
                <Input
                  id="lab"
                  defaultValue="PTN Phân tích Môi trường – Nông nghiệp – ATTP"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="iso">Số chứng nhận ISO/IEC 17025</Label>
                <Input id="iso" defaultValue="VILAS 1234" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="addr">Địa chỉ</Label>
                <Input
                  id="addr"
                  defaultValue="Viện Nông Nghiệp Thanh Hóa, TP Thanh Hóa"
                />
              </div>
              <div className="flex justify-end">
                <Button>Lưu thay đổi</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Định dạng mã mẫu</CardTitle>
              <CardDescription>
                Tự động sinh mã khi tạo phiếu tiếp nhận
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="prefix">Tiền tố</Label>
                <Input id="prefix" defaultValue="M" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="pattern">Mẫu mã</Label>
                <Input
                  id="pattern"
                  defaultValue="{prefix}-VNNTH-{YYYY}-{seq:5}"
                  className="font-mono"
                />
                <p className="text-xs text-muted-foreground">
                  Ví dụ: M-VNNTH-2026-00322
                </p>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="next">Số tiếp theo</Label>
                <Input id="next" type="number" defaultValue={322} />
              </div>
              <div className="flex justify-end">
                <Button>Lưu</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
