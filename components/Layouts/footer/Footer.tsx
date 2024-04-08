import React from "react";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname, useRouter } from "next/navigation";

const Footer = () => {
  const path = usePathname().split("/");
  const router = useRouter();
  return (
    <div className="w-full h-auto max-h-12 bg-muted px-7 py-2.5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">/</BreadcrumbLink>
          </BreadcrumbItem>
          {path.map((item, index) => (
            <>
              <BreadcrumbItem key={index}>
                <BreadcrumbLink href={`/${item}`}>
                  {decodeURIComponent(item)}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default Footer;
