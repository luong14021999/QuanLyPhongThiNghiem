import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
  title: "Viện Nông Nghiệp Thanh Hóa – Quản lý PTN",
  description:
    "Hệ thống quản lý phòng thí nghiệm phân tích môi trường – đất – nước – phân bón – an toàn thực phẩm, vận hành theo ISO/IEC 17025",
  manifest: "/manifest.json",
  themeColor: "#1d8048",
  icons: {
    icon: "/logo-vnnth.png",
    apple: "/logo-vnnth.png",
    shortcut: "/logo-vnnth.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "LIMS VNNTH",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="h-full">
      <body className={`${inter.className} h-full antialiased`}>
        {children}
      </body>
    </html>
  );
}
