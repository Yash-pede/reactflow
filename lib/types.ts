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
  
  type Dependency = {
    name: string;
    version: string;
    description: string;
};
type FlowWithDependencies = {
  name: string;
  dependencies: Dependency[];
};

type ConfigurationType = {
  flow: string;
  mock: boolean;
  username: string;
  password: string;
  dependency: string;
}