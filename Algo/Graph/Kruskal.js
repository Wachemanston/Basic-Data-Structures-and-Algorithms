// Chapter 22
// Chapter 4

// Kruskal = ElgE + ElgV ~= ElgE
// input: G = G[i]: list of {e: edge destination, w: weight}
// output: MST & its cost
const Kruskal = (G) => {
  const V = G.length;
  const E = [];

  for (let i = 0; i < V; i++) { // E
    for (let j = 0; j < G[i].length; j++) {
      const neighbor = G[i][j];
      if (neighbor.e >= i) {
        E.push([i, neighbor.e, neighbor.w])
      }
    }
  }
  // console.log(E);

  E.sort((a, b) => a[2] - b[2]); // ElgE

  const treeGroup = new Array(V);
  const MST = [];
  let cost = 0;
  for (let i = 0; i < E.length; i++){ // E * union = ElgV <- if E ~= V^2, lgE = lgV
    const [src, dist, w] = E[i];
    if (treeGroup[src] === treeGroup[dist] && treeGroup[src] >= 0)
      continue;

    if (treeGroup[src] === undefined && treeGroup[dist] === undefined) {
      treeGroup[src] = src;
      treeGroup[dist] = src;
    } else if (treeGroup[src] >= 0) {
      if (treeGroup[dist] >= 0) {
        for (let j = 0; j < V; j++) {
          if (treeGroup[j] === treeGroup[dist] && j !== dist) {
            treeGroup[j] = treeGroup[src];
          }
        }
      }
      treeGroup[dist] = treeGroup[src];
    } else if (treeGroup[dist] >= 0) {
      if (treeGroup[src] >= 0) {
        for (let j = 0; j < V; j++) {
          if (treeGroup[j] === treeGroup[src] && j !== src) {
            treeGroup[j] = treeGroup[dist];
          }
        }
      }
      treeGroup[src] = treeGroup[dist];
    }
    MST.push([src, dist]);
    cost += w;
    // console.log(treeGroup);
  }

  return {MST, cost};
};

let G = [
  [{e: 1, w: 4}, {e: 7, w: 8}],
  [{e: 0, w: 4}, {e: 7, w: 11}, {e: 2, w: 8}],
  [{e: 1, w: 8}, {e: 3, w: 7}, {e: 5, w: 4}, {e: 8, w: 2}],
  [{e: 2, w: 7}, {e: 4, w: 9}, {e: 5, w: 14}],
  [{e: 3, w: 9}, {e: 5, w: 10}],
  [{e: 2, w: 4}, {e: 3, w: 14}, {e: 4, w: 10}, {e: 6, w: 2}],
  [{e: 5, w: 2}, {e: 7, w: 1}, {e: 8, w: 6}],
  [{e: 0, w: 8}, {e: 1, w: 11}, {e: 6, w: 1}, {e: 8, w: 7}],
  [{e: 2, w: 2}, {e: 6, w: 6}, {e: 7, w: 7}],
];
// https://www.geeksforgeeks.org/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/?ref=lbp
console.log('Kruskal\nG =', G, '\nres = ', Kruskal(G));
