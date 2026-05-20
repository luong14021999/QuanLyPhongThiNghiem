import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";

const inter = Inter({ subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
  title: "Viện Nông Nghiệp Thanh Hóa – Quản lý PTN",
  description:
    "Hệ thống quản lý phòng thí nghiệm phân tích Đất – Nước – Nông sản, theo ISO/IEC 17025",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="h-full">
      <body className={`${inter.className} h-full antialiased`}>
        <div className="flex h-screen w-screen overflow-hidden bg-muted/30">
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0">{children}</div>
        </div>
      </body>
    </html>
  );
}
