function euclidean_distance([ax, ay]: [ax: number, ay: number], [bx, by]: [bx: number, by: number]): number {
  const dx = ax - bx,
    dy = ay - by;

  return Math.sqrt(dx * dx + dy * dy);
}

function manhattan_distance([ax, ay]: [ax: number, ay: number], [bx, by]: [bx: number, by: number]): number {
  const dx = ax - bx,
    dy = ay - by;

  return Math.abs(dx) + Math.abs(dy);
}

function bounded_neighbor_no_diag_factory(x_bound: number, y_bound: number) {
  return function ([cx, cy]: [cx: number, cy: number]): [number, number][] {
    if (!Number.isInteger(cx) || !(cx >= 0)) {
      throw new RangeError("`cx` must be a non-negative integer");
    }
    if (!Number.isInteger(cy) || !(cy >= 0)) {
      throw new RangeError("`cy` must be a non-negative integer");
    }

    const out: [number, number][] = [];

    if (cx > 0) {
      out.push([cx - 1, cy]);
    }
    if (cy > 0) {
      out.push([cx, cy - 1]);
    }
    if (cx < x_bound - 1) {
      out.push([cx + 1, cy]);
    }
    if (cx < y_bound - 1) {
      out.push([cx, cy + 1]);
    }

    return out;
  };
}

function bounded_neighbor_with_diag_factory(x_bound: number, y_bound: number) {
  return function ([cx, cy]: [cx: number, cy: number]): [number, number][] {
    if (!Number.isInteger(cx) || !(cx >= 0)) {
      throw new RangeError("`cx` must be a non-negative integer");
    }
    if (!Number.isInteger(cy) || !(cy >= 0)) {
      throw new RangeError("`cy` must be a non-negative integer");
    }

    const out: [number, number][] = [];

    const sl = cx > 0,
      sr = cx < x_bound - 1,
      st = cy > 0,
      sb = cy < y_bound - 1;

    if (sl) {
      out.push([cx - 1, cy]);
    }
    if (st) {
      out.push([cx, cy - 1]);
    }
    if (sr) {
      out.push([cx + 1, cy]);
    }
    if (sb) {
      out.push([cx, cy + 1]);
    }

    if (sl && st) {
      out.push([cx - 1, cy - 1]);
    }
    if (sl && sb) {
      out.push([cx - 1, cy + 1]);
    }
    if (sr && st) {
      out.push([cx + 1, cy - 1]);
    }
    if (sr && sb) {
      out.push([cx + 1, cy + 1]);
    }

    return out;
  };
}

function infinite_neighbor_no_diag_factory() {
  return function ([cx, cy]: [cx: number, cy: number]): [number, number][] {
    if (!Number.isInteger(cx)) {
      throw new RangeError("`cx` must be an integer");
    }
    if (!Number.isInteger(cy)) {
      throw new RangeError("`cy` must be an integer");
    }

    const out: [number, number][] = [];

    out.push([cx - 1, cy]);
    out.push([cx, cy - 1]);
    out.push([cx + 1, cy]);
    out.push([cx, cy + 1]);

    return out;
  };
}

function infinite_neighbor_with_diag_factory() {
  return function ([cx, cy]: [cx: number, cy: number]): [number, number][] {
    if (!Number.isInteger(cx)) {
      throw new RangeError("`cx` must be an integer");
    }
    if (!Number.isInteger(cy)) {
      throw new RangeError("`cy` must be an integer");
    }

    const out: [number, number][] = [];

    out.push([cx - 1, cy]);
    out.push([cx, cy - 1]);
    out.push([cx + 1, cy]);
    out.push([cx, cy + 1]);

    out.push([cx - 1, cy - 1]);
    out.push([cx - 1, cy + 1]);
    out.push([cx + 1, cy - 1]);
    out.push([cx + 1, cy + 1]);

    return out;
  };
}

export {
  euclidean_distance,
  euclidean_distance as diagonal_distance,
  euclidean_distance as crow_distance,
  manhattan_distance,
  manhattan_distance as rectilinear_distance,
  manhattan_distance as grid_distance,
  bounded_neighbor_no_diag_factory,
  bounded_neighbor_with_diag_factory,
  infinite_neighbor_no_diag_factory,
  infinite_neighbor_with_diag_factory,
};
