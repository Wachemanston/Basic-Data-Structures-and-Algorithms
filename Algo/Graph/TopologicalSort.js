// Chapter 15
// Chapter 4

// Topological Sort = V + E
// input: G
// output: a sequence size |V| with topological ordering
const TopologicalSort = (G) => {
  const V = G.length;
  const { f, d, res } = DFS(G); // V + E

  let sortedByDecreasingF = new Array(V);
  for (let i = 0; i < V; i++) {
    sortedByDecreasingF[i] = [String.fromCharCode(109 + i), f[i], d[i]];
  }

  // in increasing order of d -> they all got the same order
  const sortedByIncreasingD = sortedByDecreasingF.copyWithin(0, 0);
  sortedByIncreasingD.sort((a, b) => a[2] - b[2]);
  console.log('increasing order of d:', sortedByIncreasingD); // doesn't know why can't i '.map(item => item[0])'...

  // in decreasing order of f
  sortedByDecreasingF.sort((a, b) => b[1] - a[1]);
  console.log('decreasing order of f:', sortedByDecreasingF.map(item => item[0]));

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
    for (let j = 0;  j < G[i].length; j++) {
      const neighbor = G[i][j];
      if (d[neighbor] === undefined) {
        recursiveDFS(neighbor);
      }
    }
    f[i] = counter++;
    res.unshift(String.fromCharCode(109 + i));
  };

  // check other connected component
  for (let i = 0; i < V; i++) {
    if (d[i] === undefined) {
      recursiveDFS(i);
    }
  }

  return {d, f, res};
};

/* let G = [     //4             //9
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 1, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
];*/
let G = [
  [4, 5, 11],
  [2, 4, 8],
  [5, 6, 9],
  [2, 6, 13],
  [7],
  [8, 12],
  [5],
  [],
  [7],
  [10, 11],
  [13],
  [],
  [9],
  [],
];
let s = 0;
// Introduction to Algorithm [p. 615, 22.8]
console.log('Topological Sort\nG =', G, '\nres = ', TopologicalSort(G));
