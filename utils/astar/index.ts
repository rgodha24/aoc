// stolen from StoneCypher/astar-ts
import { AStarParamType, AStarResultType, AStarResultStatus, InternalNode } from "./types";

import Heap from "heap";
import dict from "dict";

import * as cartesian_2d from "./cartesian_2d";
import * as str_irregular from "./str_irregular";

function enforce_config<NodeType>(params: AStarParamType<NodeType>) {
  const items = {
    start: "starting point for the search as `config.start`",
    isEnd: "function evaluating whether a cell is an end point to boolean as `config.isEnd`",
    neighbor: "function returning the neighbors of a cell to node array as `config.neighbor`",
    distance: "function returning the distance between two cells to number as `config.distance`",
    heuristic: "best-guess no-overestimate distance-to-end to number as `config.heuristic`",
  };

  Object.keys(items).forEach((key) => {
    if ((params as any)[key] === undefined) {
      throw new Error(`Must provide a ${(items as any)[key]}`);
    }
  });

  const timeout: number =
    params.timeout === undefined
      ? 5000 // if it's running for 5 seconds and you didn't explicitly okay that, something is wrong
      : params.timeout;

  if (!Number.isInteger(timeout) || !(timeout > 0)) {
    throw new Error("Must provide a positive integer or undefined of milliseconds for `config.timeout`");
  }

  const hash = params.hash || defaultHash;

  return {
    timeout,
    hash,
  };
}

function success_result<NodeType>(pathEndpoint: InternalNode<NodeType>) {
  return {
    cost: pathEndpoint.g,
    status: "success" as AStarResultStatus,
    path: reconstructPath(pathEndpoint),
  };
}

function timeout_result<NodeType>(pathEndpoint: InternalNode<NodeType>) {
  return {
    cost: pathEndpoint.g,
    status: "timeout" as AStarResultStatus,
    path: reconstructPath(pathEndpoint),
  };
}

function no_path_result<NodeType>(pathEndpoint: InternalNode<NodeType>) {
  return {
    cost: pathEndpoint.g,
    status: "no path" as AStarResultStatus,
    path: reconstructPath(pathEndpoint),
  };
}

function a_star<NodeType = unknown>(params: AStarParamType<NodeType>): AStarResultType<NodeType> {
  const { timeout, hash } = enforce_config(params);

  const firstHeuristic = params.heuristic(params.start);

  let startNode: InternalNode<NodeType> = {
    data: params.start,
    f: firstHeuristic,
    g: 0,
    h: firstHeuristic,
    // leave .parent undefined
  };

  let bestNode = startNode;

  const closedDataSet = new Set<String>(),
    openHeap = new Heap<InternalNode<NodeType>>(heapComparator),
    openDataMap = dict<InternalNode<NodeType>>();

  const visited: NodeType[] = [];

  openHeap.push(startNode);
  openDataMap.set(hash(startNode.data), startNode);

  const startTime = new Date().getTime();

  while (openHeap.size()) {
    if (new Date().getTime() - startTime > timeout) {
      return timeout_result(bestNode);
    }



    var node = openHeap.pop()!;
    visited.push(node.data);
    openDataMap.delete(hash(node.data));

    // if this, finished
    if (params.isEnd(node.data)) {
      return {...success_result(node), visited};
    }

    // otherwise, not finished
    closedDataSet.add(hash(node.data));
    var neighbors = params.neighbor(node.data);
    neighbors.forEach((neighborData, ) => {
      if (closedDataSet.has(hash(neighborData))) {
        return;
      }

      const gFromThisNode = node.g + params.distance(node.data, neighborData);

      let neighborNode = openDataMap.get(hash(neighborData))!,
        update = false;

      if (neighborNode === undefined) {
        // @ts-expect-error idk how to fix this lmaoo
        neighborNode = { data: neighborData }; // add neighbor to the open set
        openDataMap.set(hash(neighborData), neighborNode); // other properties will be set later
      } else {
        if (neighborNode.g < gFromThisNode) {
          return;
        } // skip this one because another route is faster
        else {
          update = true;
        }
      }

      // found a new or better route.
      // update this neighbor with this node as its new parent
      neighborNode.parent = node;
      neighborNode.g = gFromThisNode;
      neighborNode.h = params.heuristic(neighborData);
      neighborNode.f = gFromThisNode + neighborNode.h;

      if (neighborNode.h < bestNode.h) bestNode = neighborNode;

      if (update) {
        openHeap.heapify();
      } else {
        openHeap.push(neighborNode);
      }
    });
  }

  // all the neighbors of every accessible node have been exhausted
  return { ...no_path_result(bestNode), visited };
}

function reconstructPath<NodeType = unknown>(node: InternalNode<NodeType>): NodeType[] {
  if (node.parent !== undefined) {
    const pathSoFar = reconstructPath(node.parent);
    pathSoFar.push(node.data);
    return pathSoFar;
  } else {
    return [node.data]; // this is the starting node
  }
}

function defaultHash<NodeType = unknown>(node: NodeType) {
  return JSON.stringify(node);
}

function heapComparator<NodeType>(a: InternalNode<NodeType>, b: InternalNode<NodeType>) {
  return a.f - b.f;
}

export { a_star, cartesian_2d, str_irregular };
