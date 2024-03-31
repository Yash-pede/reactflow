import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import { Braces, LucideBoomBox } from "lucide-react";

export const CreatedConfigs = () => {
  const { data: configs, isLoading } = useQuery<ConfigurationType[]>({
    queryKey: ["configs"],
    queryFn: () => axios.get("/api/configuration").then((res) => res.data),
  });
  if (isLoading) {
    return Array.from({ length: 3 }).map((_, i) => (
      <Card key={i}>
        <CardContent>
          <Skeleton className="w-full h-[300px] my-2" />
        </CardContent>
      </Card>
    ));
  }
  return (
    <div className="space-y-5 w-full h-[calc(100vh-150px)] grid place-items-center">
      {configs && configs?.length > 0 ? (
        configs?.map((config) => (
          <Card key={config.flow}>
            <CardHeader>
              <CardTitle>{config.flow}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">User name</Label>
                <Input id="email" defaultValue={config.username} readOnly />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  defaultValue={config.password}
                  readOnly
                />
              </div>
              <div className={`grid gap-2 ${!config.dependency && "hidden"}`}>
                <Label htmlFor="dependency">Dependency</Label>
                <Input
                  id="dependency"
                  defaultValue={config.dependency}
                  readOnly
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox defaultChecked={config.mock}>
                  Mocked Database
                </Checkbox>
                <Label>Mocked Database</Label>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <Card className="w-full h-[calc(100vh-150px)]">
          <CardContent className="grid gap-4 place-items-center h-full w-full">
            <div className="flex gap-3 hover:scale-150 transition-all duration-500 flex-col justify-center items-center">
            <Braces className="w-7 h-7"/>
            <p className="text-lg text-muted-foreground font-semibold text-center">No configurations created</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
