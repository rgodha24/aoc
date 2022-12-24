import { StrIrregularList } from "./types";

function edge_name(l: string, r: string): string {
  const [lo, hi] = l < r ? [l, r] : [r, l];

  return `${lo}___${hi}`;
}

function from_edges(edgelist: StrIrregularList) {
  const mesh: Map<string, number> = new Map(),
    neighbor_lists: Map<string, Set<string>> = new Map();

  edgelist.forEach((edge) => {
    const key = edge_name(edge[0], edge[1]);

    if (mesh.has(key)) {
      throw new Error(`Duplicate: ${key}`);
    } else {
      mesh.set(key, edge[2]);
    }

    if (!neighbor_lists.has(edge[0])) {
      neighbor_lists.set(edge[0], new Set());
    }

    if (!neighbor_lists.has(edge[1])) {
      neighbor_lists.set(edge[1], new Set());
    }

    const s0 = neighbor_lists.get(edge[0]);
    if (s0 === undefined) {
      throw new Error("Impossible, just set s0 edge0");
    } else {
      if (!s0.has(edge[1])) {
        s0.add(edge[1]);
      }
    }

    const s1 = neighbor_lists.get(edge[1]);
    if (s1 === undefined) {
      throw new Error("Impossible, just set s1 edge1");
    } else {
      if (!s1.has(edge[0])) {
        s1.add(edge[0]);
      }
    }
  });

  const neighbor = (n: string) => {
    const l = neighbor_lists.get(n);
    if (l === undefined) {
      return [];
    } else {
      return [...l.values()];
    }
  };

  return {
    mesh,
    neighbor_lists,
    neighbor,
    distance: (l: string, r: string): number => {
      const name: string = edge_name(l, r),
        distance: number | undefined = mesh.get(name);

      if (distance === undefined) {
        throw `No such edge ${l} : ${r}`;
      } else {
        return distance;
      }
    },
  };
}

export { from_edges, edge_name };
