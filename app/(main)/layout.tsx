"use client";
import Navbar from "@/components/Layouts/navbar/Navbar";
import Sidebar from "@/components/Layouts/sidebar/Sidebar";
import { SidebarProvider } from "@/contexts/SidebarContext";

import { useAuthContext } from "@/contexts/AuthContext";
import { redirect, useRouter } from "next/navigation";
import React from "react";
import Footer from "@/components/Layouts/footer/Footer";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useAuthContext();
  const router = useRouter();

  if (user == null) {
    router.push("/sign-in");
    return null;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex">
        <Sidebar />
        <div className="flex flex-col flex-1 ">
          <Navbar />
          <div className="p-2 w-full h-full lg:p-4">{children}</div>
          <Footer />  
        </div>
      </div>
    </SidebarProvider>
  );
}
