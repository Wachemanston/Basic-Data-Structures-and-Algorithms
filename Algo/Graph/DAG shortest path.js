// Chapter 24
// Chapter -

// Directed Acyclic Graph Shortest Path = V + E
// input: G = G[i]: list of {e: edge destination, w: weight}, s: start vertex
// output: minimum cost to each vertex
const INF = Infinity;

const DAGShortestPath = (G, s) => {
  const V = G.length;
  const E = [];
  const dist = new Array(V);
  dist.fill(INF);
  dist[s] = 0;

  for (let i = 0; i < V-1; i++)
    for (let j = 0; j < V; j++)
      if (G[i][j] !== INF)
        E.push([i, j]);

  const relax = ([u, v]) => {
    dist[v] = Math.min(dist[v], dist[u] + G[u][v]);
  };

  const topologicalOrder = TopologicalSort(G); // V + E
  // console.log(topologicalOrder);

  for (let i = 0; i < V; i++) { // amortized: E
    const u = topologicalOrder[i];
    for (let v = 0; v < V; v++) {
      if (G[u][v] !== INF) {
        relax([u, v]);
      }
    }
    // console.log(dist.map(v => v === INF ? 'INF' : v));
  }

  return dist.map(v => v === INF ? 'INF' : v);
};

const TopologicalSort = (G) => {
  const { res } = DFS(G); // V + E
  return res;
};

const DFS = (G) => {
  let counter = 1;
  const V = G.length;
  const d = new Array(V);
  const f = new Array(V);
  const res = [];

  const recursiveDFS = (i) => {
    d[i] = counter++;
    for (let j = 0;  j < V; j++) {
      if (d[j] === undefined && G[i][j] !== INF) {
        recursiveDFS(j);
      }
    }
    f[i] = counter++;
    res.unshift(i);
  };

  // check other connected component
  for (let i = 0; i < V; i++) {
    if (d[i] === undefined) {
      recursiveDFS(i);
    }
  }

  return {d, f, res};
};

let G = [
  [INF, 5, 3, INF, INF, INF],
  [INF, INF, 2, 6, INF, INF],
  [INF, INF, INF, 7, 4, 2],
  [INF, INF, INF, INF, -1, 1],
  [INF, INF, INF, INF, INF, -2],
  [INF, INF, INF, INF, INF, INF],
];
let s = 1;
// Introduction to Algorithm [p. 656, 24.5]
console.log('DAG Shortest Path\nG =', G, 's = ', s, '\nres = ', DAGShortestPath(G, s));
