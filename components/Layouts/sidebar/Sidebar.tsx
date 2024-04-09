"use client";
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  CircleUser,
  Package2,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { MenuItems } from "@/lib/Constants";
import { useSidebarContext } from "@/contexts/SidebarContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "../../ui/input";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/configs/Firebase-config";

const Sidebar = () => {
  const { closeSidebar, isSidebarOpen, showSidebar } = useSidebarContext();
  const router = useRouter();

  return (
    <div
      className={`hidden border-r bg-muted/40 md:block ${
        isSidebarOpen ? "w-[280px]" : ""
      }`}
    >
      <div className="flex h-screen max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className={isSidebarOpen ? "" : "hidden"}>Momentum</span>
          </Link>
          {isSidebarOpen && (
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          )}
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {MenuItems.map(({ name, icon, badgeNo, link }) => (
              <div key={name}>
                <Link
                  href={link}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary dark:hover:text-secondary dark:hover:bg-accent-foreground"
                >
                  {icon}
                  {isSidebarOpen && name}
                  {badgeNo && isSidebarOpen ? (
                    <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                      6
                    </Badge>
                  ) : null}
                </Link>
              </div>
            ))}
          </nav>
        </div>
        <div className="mx-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/account")}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  signOut(auth);
                  router.push("/sign-in");
                }}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button
          className="flex items-center gap-3 rounded-sm px-3 py-2 text-muted-foreground bg-muted hover:bg-muted/80 transition-all hover:text-primary"
          onClick={isSidebarOpen ? closeSidebar : showSidebar}
        >
          {isSidebarOpen ? (
            <ArrowLeft className="h-5 w-5" />
          ) : (
            <ArrowRight className="h-5 w-5" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
