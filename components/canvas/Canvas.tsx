import { useCallback, useEffect } from "react";
import ReactFlow, {
  Controls,
  Background,
  BackgroundVariant,
  ReactFlowProvider,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import { useQuery } from "@tanstack/react-query";
import {
  LoadingEdges,
  LoadinglNodes,
  ProcessedEdges,
  ProcessedNodes,
} from "./node";
import NodeCard from "./node/NodeCard";
import axios from "axios";
import { useTheme } from "next-themes";
import { useSearchParams } from "next/navigation";

const nodeTypes = {
  selectorNode: NodeCard,
};
function Flow() {
  const { theme } = useTheme();
  const [nodes, setNodes, onNodesChange] = useNodesState(LoadinglNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(LoadingEdges);
  const searchParams = useSearchParams();
  const { data, error, refetch } = useQuery({
    queryKey: ["graph"],
    queryFn: () =>
      axios
        .get(
          `/api/graph?endpoint=${decodeURIComponent(
            searchParams.get("endpoint") || ""
          )}`
        )
        .then((res) => res.data),
  });
  useEffect(() => {
    refetch();
  }, [searchParams, refetch]);

  useEffect(() => {
    if (data) {
      setNodes(ProcessedNodes(data));
      setEdges(ProcessedEdges(data));
    }
  }, [data, setEdges, setNodes]);

  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds) =>
        addEdge({ ...params, animated: true, style: { stroke: "#fff" } }, eds)
      ),
    []
  );
  return (
    <ReactFlowProvider>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        fitView={true}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        attributionPosition="bottom-left"
        defaultViewport={{ x: 0, y: 0, zoom: 1.5 }}
      >
        {theme === "light" ? (
          <Background
            id="light"
            gap={20}
            color="#f1f1f1"
            variant={BackgroundVariant.Lines}
          />
        ) : (
          <Background id="dark" gap={20} variant={BackgroundVariant.Dots} />
        )}
        <Controls />
        <MiniMap nodeBorderRadius={2} nodeStrokeWidth={3} />
      </ReactFlow>
    </ReactFlowProvider>
  );
}

export default Flow;
