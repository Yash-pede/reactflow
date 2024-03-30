import { Edge, Node } from "reactflow";
import NodeCard from "./node/NodeCard";
import CardSkeliton from "./node/CardSkeliton";

export const LoadinglNodes: Node[] = [
  {
    id: "1",
    type: "input",
    data: { label: <CardSkeliton className="h-32" /> },
    position: { x: 250, y: -50 },
    style: {
      width: "auto",
      height: "auto",
      padding: 0,
      backgroundColor: "white",
      border: "none",
    },
  },
  {
    id: "2",
    data: { label: <CardSkeliton /> },
    position: { x: 0, y: 125 },
    style: {
      width: "auto",
      height: "auto",
      padding: 0,
      backgroundColor: "white",
      border: "none",
    },
  },
  {
    id: "3",
    type: "output",
    data: { label: <CardSkeliton className="h-32" /> },
    position: { x: 250, y: 400 },
    style: {
      width: "auto",
      height: "auto",
      padding: 0,
      backgroundColor: "white",
      border: "none",
    },
  },
];
export const LoadingEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3", animated: true },
];

export const ProcessedNodes = (nodes: MockGraphData): Node[] => {
  const SelectedNodes: Node[] = [];
  const rootX = 200;
  const rootY = 300;

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const offsetX = 500;
  const offsetY = 0;

  const setNode = (node: any, nodeType: string = "default", x = 0, y = 0) => {
    SelectedNodes.push({
      id: node.function,
      data: {
        label: (
          <NodeCard
            function_details={node.function}
            params={node.params}
            response_object={node.response_object}
            dependent_libs={node.dependent_libs}
          />
        ),
      },
      type: nodeType || "default",

      style: {
        width: "auto",
        height: "auto",
        padding: 0,
        backgroundColor: "white",
        border: "none",
      },
      position: { x, y },
    });
  };

  const traverseNodes = (parentNode: any, parentX = 0, parentY = 0) => {
    const x = parentX === 0 ? rootX : parentX + offsetX;
    const y = parentY === 0 ? rootY : parentY;
    setNode(parentNode, "input", x, y);

    if (parentNode.children && parentNode.children.length > 0) {
      const numChildren = parentNode.children.length;
      const childOffsetY = viewportWidth / 3;
      const childOffsetX = 500;
      let childY = y - ((viewportWidth / 3) * (numChildren - 1)) / 2;
      let childX = x;

      parentNode.children.forEach((childNode: any) => {
        traverseNodes(childNode, childX, childY);
        childY += childOffsetY;
      });
    }
  };

  // Start traversing from the root node
  traverseNodes(nodes.nodes[0]);

  return SelectedNodes;
};

export const ProcessedEdges = (nodes: MockGraphData): Edge[] => {
  const edges: Edge[] = [];

  const traverseNodes = (parentNode: any) => {
    if (parentNode.children && parentNode.children.length > 0) {
      parentNode.children.forEach((childNode: any) => {
        edges.push({
          id: `${parentNode.function}-${childNode.function}`,
          source: parentNode.function,
          target: childNode.function,
          type: "step",
          animated: true,
        });
        traverseNodes(childNode);
      });
    }
  };

  if (nodes.nodes && nodes.nodes.length > 0) {
    traverseNodes(nodes.nodes[0]);
  }

  return edges;
};
