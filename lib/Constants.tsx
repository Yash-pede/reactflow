import React from "react";
import { Home, LineChart, Settings, ShoppingCart, Users } from "lucide-react";

export const MenuItems: {
  name: string;
  icon: React.JSX.Element;
  badgeNo?: number;
}[] = [
  {
    name: "Dashboard",
    icon: <Home />,
  },
  {
    name: "Orders",
    icon: <ShoppingCart />,
    badgeNo: 6,
  },
  {
    name: "Customers",
    icon: <Users />,
  },
  {
    name: "Analytics",
    icon: <LineChart />,
  },
  {
    name: "Settings",
    icon: <Settings />,
  },
];
