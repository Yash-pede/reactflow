import React from "react";
import {
  CloudDownload,
  Home,
  LineChart,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";

export const MenuItems: {
  name: string;
  icon: React.JSX.Element;
  badgeNo?: number;
  link: string;
}[] = [
  {
    name: "Dashboard",
    icon: <Home />,
    link: "/",
  },
  {
    name: "Behaviour",
    icon: <CloudDownload />,
    badgeNo: 2,
    link: "/behaviour",
  },
  {
    name: "flows",
    icon: <LineChart />,
    link: "/flows",
  },
  {
    name: "Orders",
    icon: <ShoppingCart />,
    badgeNo: 6,
    link: "/orders",
  },
];
