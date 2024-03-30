type ChildrenNode = {
    function: string;
    params: string[];
    response_object: string;
    dependent_libs: string[];
    children?: ChildrenNode[];
  };
  
  type GraphNode = {
    function: string;
    params: string[];
    response_object: string;
    dependent_libs: string[];
    children?: ChildrenNode[];
  };
  
  type MockGraphData = {
    nodes: GraphNode[];
  };
  