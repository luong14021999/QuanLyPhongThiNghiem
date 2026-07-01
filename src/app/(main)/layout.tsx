import { Sidebar } from "@/components/layout/sidebar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-muted/30">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">{children}</div>
    </div>
  );
}
