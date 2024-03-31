import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ArrowUpRightFromSquare, Square, Table2 } from "lucide-react";
import React from "react";
import { Handle, Position } from "reactflow";

type NodeCardProps = {
  function_details?: string;
  params?: string[];
  response_object?: string;
  dependent_libs?: string[];
  isConnectable?: boolean;
  data?: any;
};

const NodeCard = ({
  data,
  isConnectable,
  function_details,
  params,
  response_object,
  dependent_libs,
}: NodeCardProps) => {
  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <Card className="w-full text-start p-0 ">
        <CardHeader className="border-b border-muted-foreground p-1">
          <CardTitle className="flex w-full justify-between text-sm bg-accent text-start px-4 rounded-lg">
            <div className="flex items-center gap-2">
              <Table2 className="h-4 w-4" />
              <span>{function_details?.split(".")[0]}.py</span>
            </div>
            <ArrowUpRightFromSquare className="p-1" />
          </CardTitle>
        </CardHeader>
        <CardContent className="mt-2 text-xs px-4 my-3">
          <h3 className="text-accent-foreground font-bold">
            {function_details?.split(".")[1]}
          </h3>
          <Table className="mt-2">
            <TableBody className="text-xs gap-0">
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Square className="h-3 w-3" />
                    <span>Params</span>
                  </div>
                </TableCell>
                <TableCell className="text-secondary-foreground text-end">
                  {/* {JSON.stringify(["user_id", "item_id", "db"], null, 2)} */}
                  {JSON.stringify(params, null, 2)}
                </TableCell>
              </TableRow>
              {dependent_libs && (
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Square className="h-3 w-3" />
                      <span>dependent_libs</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-secondary-foreground text-end">
                    {/* {JSON.stringify(["sqlalchemy"], null, 2)} */}
                    {JSON.stringify(dependent_libs, null, 2)}
                  </TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Square className="h-3 w-3" />
                    <span>response_object</span>
                  </div>
                </TableCell>
                <TableCell className="text-secondary-foreground text-end">
                  {/* {JSON.stringify("JSONResponse", null, 2)} */}
                  {JSON.stringify(response_object, null, 2)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        isConnectable={isConnectable}
      />
    </>
  );
};

export default NodeCard;
