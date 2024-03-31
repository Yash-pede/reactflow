import Navbar from "@/components/Layouts/navbar/Navbar";
import Sidebar from "@/components/Layouts/sidebar/Sidebar";
import { SidebarProvider } from "@/contexts/SidebarContext";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex">
        <Sidebar />
        <div className="flex flex-col flex-1 ">
          <Navbar />
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}
