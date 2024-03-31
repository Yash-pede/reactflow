import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export const CreatedConfigs = () => {
  const { data: configs, isLoading } = useQuery<ConfigurationType[]>({
    queryKey: ["configs"],
    queryFn: () => axios.get("/api/configuration").then((res) => res.data),
  });
  return (
    <div className="space-y-5">
      {configs?.map((config) => (
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
              <Checkbox defaultChecked={config.mock}>Mocked Database</Checkbox>
              <Label>Mocked Database</Label>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
