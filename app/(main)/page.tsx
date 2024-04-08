"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Key, MessageCircleWarning, Router } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Tests = () => {
  const router = useRouter();
  const { data, error } = useQuery({
    queryKey: ["parse"],
    queryFn: () => axios.get("/api/parse").then((res) => res.data),
  });
  const { data: EndpointsIndex, error: EndpointsIndexError } = useQuery({
    queryKey: ["endpoints-index"],
    queryFn: () => axios.get("/api/endpoints/index").then((res) => res.data),
  });
  const { data: EndpointsList, error: EndpointsListError } = useQuery<any>({
    queryKey: ["endpoints-list"],
    queryFn: () => axios.get("/api/endpoints/list").then((res) => res.data),
  });
  const GoToBehaviour = (endpointIdentifier: any) => {
    router.push(`/behaviour/${endpointIdentifier}`);
  };
  const TestPlanApin = () => {
    axios.get("/api/test/plan");
  };
  return (
    <div className="flex flex-col text-start h-full w-full">
      <div className="">
        <h2 className="text-2xl font-semibold mb-4 text-start ">
          asset_router.py
        </h2>
        <div className="flex flex-col gap-4 w-full ">
          <p className="flex items-center justify-start gap-6">
            <MessageCircleWarning className="bg-orange-500 h-4 w-4 rounded-full p-[0.5px] text-white" />
            Last 2 commits scanned
          </p>
          <p className="flex items-center justify-start gap-6">
            <MessageCircleWarning className="bg-orange-500 h-4 w-4 rounded-full p-[0.5px] text-white" />
            5 entry points identifide
          </p>
        </div>
      </div>
      <div className="mt-20">
        {EndpointsList && (
          <Table>
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Entry point</TableHead>
                <TableHead className="text-right">Test Plan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {EndpointsList.map((endpoint: any) => (
                <TableRow key={endpoint.identifier}>
                  <TableCell>{endpoint.entryPoint}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-5">
                      <Button
                        className="bg-orange-400 text-white hover:bg-orange-500"
                        onClick={TestPlanApin}
                      >
                        Generate Test
                      </Button>
                      <Button
                        variant="outline"
                        className="border-orange-400 text-orange-400"
                        onClick={() => GoToBehaviour(endpoint.entryPoint)}
                      >
                        Configure{" "}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default Tests;
