import React from "react";
import {
  Bomb,
  CloudDownload,
  FileCode,
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
    name: "blast radius",
    icon: <Bomb />,
    link: "/blast-radius",
  },
  {
    name: "Diff Viewer",
    icon: <FileCode />,
    link: "/diff-viewer",
  },
  {
    name: "Orders",
    icon: <ShoppingCart />,
    badgeNo: 6,
    link: "/orders",
  },
];

export const diffFile2 = `from app.model import Transaction, PaymentStatus


def compute_loyalty_points(transaction: Transaction, payment_status: PaymentStatus) -> float:
    extra_points = 0

    if payment_status.status == "success" and payment_status.payment_method in ["method1", "method2","eligible_method"]:  # example payment methods
        extra_points = transaction.loyalty_points_earned * 0.20
   


    # Assuming a limit of 100 points as extra for a transaction
    extra_points = min(100, extra_points)
    return min(transaction.loyalty_points_earned,100) + extra_points`;

export const diffFile1 = `from app.model import Transaction, PaymentStatus


def compute_loyalty_points(transaction: Transaction, payment_status: PaymentStatus) -> float:
    extra_points = 0

    if payment_status.status == "success" and payment_status.payment_method in ["method1", "method2","eligible_method"]:  # example payment methods
        extra_points = transaction.loyalty_points_earned * 0.20
    elif payment_status.status != "success":
        return 0

    # Assuming a limit of 100 points as extra for a transaction
    extra_points = min(100, extra_points)
    return min(transaction.loyalty_points_earned,100) + extra_points`;
