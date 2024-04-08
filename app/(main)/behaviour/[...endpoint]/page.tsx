"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MessageCircleWarning } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface TestPlanItem {
  description: string;
  input: string;
}

interface TestPlan {
  happy_path: TestPlanItem[];
  edge_case: TestPlanItem[];
}

const TestBehaviour: React.FC<{ params: { endpoint: string } }> = ({
  params: { endpoint },
}) => {
  const router = useRouter();

  // Fetch data using useQuery
  const { data: TestPlan } = useQuery<TestPlan>({
    queryKey: ["testPlan"],
    queryFn: () =>
      axios.get<TestPlan>("/api/test/plan").then((res) => res.data),
  });

  // Function to render the table
  const renderTable = () => {
    if (!TestPlan) return null;

    const mergedArray: TestPlanItem[] = [
      ...TestPlan.happy_path.map((item) => ({ ...item, type: "Happy Path" })),
      ...TestPlan.edge_case.map((item) => ({ ...item, type: "Edge Case" })),
    ];

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Test Behaviour</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Integration Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mergedArray.map((item: any, index) => (
            <TableRow key={index}>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>{Math.random() < 0.5 ? 'True' : 'False'}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  className="border-orange-400 text-orange-400"
                >
                  Configure{" "}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  // Render the component
  return (
    <div className="flex flex-col text-start h-full w-full">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-start">Test Plan</h2>
        <p>{decodeURIComponent(endpoint).replace(/,/g, "/")}</p>
        <div className="flex flex-col gap-4 w-full ">
          <p className="flex items-center justify-start gap-6">
            <MessageCircleWarning className="bg-orange-500 h-4 w-4 rounded-full p-[0.5px] text-white" />
            12 test points generated
          </p>
        </div>
      </div>
      <div className="mt-20">{renderTable()}</div>
    </div>
  );
};

export default TestBehaviour;