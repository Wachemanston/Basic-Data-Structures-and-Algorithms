// Chapter 15
// Chapter 4

// DFS = V + E
// input: G, start point s
// output: discover time & predecessor for v in G
const DFS = (G, s) => {
  let counter = 1;
  const V = G.length;
  const d = new Array(V);
  const f = new Array(V);
  const predecessor = new Array(V);

  const recursiveDFS = (i) => {
    d[i] = counter++;
    for (let neighbor = 0;  neighbor < V; neighbor++) {
      if (G[i][neighbor] && d[neighbor] === undefined) {
        predecessor[neighbor] = i;
        recursiveDFS(neighbor);
      }
    }
    f[i] = counter++;
  };

  // resolve assigned start point
  recursiveDFS(s);

  // check other connected component
  for (let i = 0; i < V; i++) {
    if (d[i] === undefined) {
      recursiveDFS(i);
    }
  }

  return {d, f, predecessor};
};

let G = [
  [0, 0, 1, 1, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
];
let s = 0;
// Introduction to Algorithm [p. 611, 22.6], [p. 607, 22.5(c)]
console.log('DFS\nG =', G, 's =', s, '\nres = ', DFS(G, s));

G = [
  [0, 0, 0, 0, 1, 0, 0, 1],
  [0, 1, 1, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 0, 0, 0],
  [1, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 1, 0, 1, 0],
];
s = 0;
console.log('G =', G, 's =', s, '\nres = ', DFS(G, s));
