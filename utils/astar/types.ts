type AStarParamType<NodeType> = {
  start: NodeType;
  isEnd: (node: NodeType) => boolean;
  neighbor: (node: NodeType) => NodeType[];
  distance: (left: NodeType, right: NodeType) => number;
  heuristic: (node: NodeType) => number;
  hash?: (node: NodeType) => string;
  timeout?: number;
};

type AStarResultStatus = "success" | "no path" | "timeout";

type AStarResultType<NodeType> = {
  status: AStarResultStatus;
  path: NodeType[];
  cost: number;
  visited?: NodeType[];
};

type InternalNode<NodeType> = {
  data: NodeType;
  f: number;
  g: number;
  h: number;
  parent?: InternalNode<NodeType>;
};

type Maze = {
  name: string;
  solve4: number | null;
  solve8: number | null;
  closest4?: number;
  closest8?: number;
  map: string[];
  start: [number, number];
  end: [number, number];
};

type StrIrregularTriplet = [string, string, number];

type StrIrregularList = StrIrregularTriplet[];

export {
  AStarParamType,
  AStarResultType,
  AStarResultStatus,
  InternalNode,
  Maze,
  StrIrregularList,
  StrIrregularTriplet,
};
