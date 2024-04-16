import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useFilePath } from "@/contexts/FilePathContext";

const Footer = () => {
  const { filePath } = useFilePath();
  if (filePath.length === 0) {
    return null;
  }
  return (
    <div className="w-full h-auto max-h-12 bg-muted px-7 py-2.5">
      <Breadcrumb>
        <BreadcrumbList>
          {filePath.map((item, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink href={`/${item}`}>
                  {decodeURIComponent(item)}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index !== filePath.length - 1 && (
                <BreadcrumbSeparator></BreadcrumbSeparator>
              )}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default Footer;
