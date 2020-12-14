// Chapter 15
// Chapter -

// BFS = V + E
// input: G, start point s
// output: discover time & predecessor for v in G
const BFS = (G, s) => {
  const V = G.length;
  const d = new Array(V);
  d[s] = 0;
  const predecessor = new Array(V);

  // use queue to implement BFS
  const queue = [[s, 0]];
  while (queue.length) {
    const [i, counter] = queue.shift();
    for (let neighbor = 0;  neighbor < V; neighbor++) {
      if (G[i][neighbor] && d[neighbor] === undefined) {
        d[neighbor] = counter + 1;
        predecessor[neighbor] = i;
        queue.push([neighbor, counter + 1]);
      }
    }
  }

  return {d, predecessor};
};

let G = [
  [0, 1, 0, 1, 0, 0],
  [0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 1, 1],
  [0, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 1],
];
let s = 2;
// Introduction to Algorithm [p. 590, 22.2(a)], [p. 596]
console.log('BFS\nG =', G, 's =', s, '\nres = ', BFS(G, s));

G = [
  [0, 1, 0, 0, 1, 0, 0, 0],
  [1, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 1, 0, 1, 1, 0],
  [0, 0, 1, 0, 0, 0, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 0, 0, 0, 1, 0],
  [0, 0, 1, 1, 0, 1, 0, 1],
  [0, 0, 0, 1, 0, 0, 1, 0],
];
s = 3;
console.log('G =', G, 's =', s, '\nres = ', BFS(G, s));
s = 1;
console.log('G =', G, 's =', s, '\nres = ', BFS(G, s));
