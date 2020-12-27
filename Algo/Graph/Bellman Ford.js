// Chapter 24
// Chapter -

// Bellman Ford =
// input: G = G[i]: list of {e: edge destination, w: weight}, s: start vertex
// output: minimum cost to each vertex
const INF = Infinity // Number.MAX_VALUE;

const BellmanFord = (G, s) => {
  const V = G.length;
  const dist = new Array(V);
  dist.fill(Number.MAX_VALUE);
  dist[s] = 0;

  const relax = (p) => {
    for (let k = 0; k < V; k++)
      dist[p] = Math.min(dist[p], dist[k] + G[k][p]);
  };

  for (let i = 0; i < V-1; i++) {
    for (let j = 0; j < V; j++) {
      relax(j);
    }
    // console.log(dist.map(v => v === INF ? 'INF' : v));
  }

  return dist.map(v => v === INF ? 'INF' : v);
};

let G = [
  [INF, 6, INF, 7, INF],
  [INF, INF, 5, 8, -4],
  [INF, -2, INF, INF, INF],
  [INF, INF, -3, INF, 9],
  [2, INF, 7, INF, INF],
];
let s = 0;
// Introduction to Algorithm [p. 652, 24.4]
console.log('Bellman Ford\nG =', G, 's = ', s, '\nres = ', BellmanFord(G, s));
