import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
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
          {path.map((item, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink href={`/${item}`}>
                  {decodeURIComponent(item)}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index < path.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default Footer;
