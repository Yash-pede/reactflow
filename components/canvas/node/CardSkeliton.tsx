import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import React from "react";

const CardSkeliton = ({ className }: { className?: string }) => {
  return (
    <Card className={cn("w-48 h-44 p-2", className)}>
      <Skeleton className="w-full h-4 my-2 " />
      <hr />
      <Skeleton className="w-full h-[calc(100%-2.5rem)] my-2"/>
    </Card>
  );
};

export default CardSkeliton;
