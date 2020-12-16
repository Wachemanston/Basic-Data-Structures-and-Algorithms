// Chapter 15
// Chapter -

// BFS = V + E
// input: G, start point s
// output: discover time & predecessor for v in G
const DFS = (G, s) => {
  let counter = 1;
  const V = G.length;
  const d = new Array(V);
  const f = new Array(V);
  d[s] = counter;
  const predecessor = new Array(V);

  // use queue to implement DFS
  let stack = [s];
  while (stack.length) {
    const i = stack.pop();
    const arr = [];
    for (let neighbor = 0;  neighbor < V; neighbor++) {
      if (G[i][neighbor] && d[neighbor] === undefined) {
        d[neighbor] = ++counter;
        predecessor[neighbor] = i;
        arr.push(neighbor);
      }
    }
    arr.reverse();
    stack = stack.concat(arr);
    f[i] = ++counter;
    // console.log(stack, arr)
    // if (stack.length === 0) {
    //   for (let j = 0; j < V; j++) {
    //     if (d[j] === undefined) {
    //       stack.push(j);
    //       break;
    //     }
    //   }
    // }
  }

  return {d, f, predecessor};
};

let G = [
  [0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
];
let s = 0;
// Introduction to Algorithm [p. 607, 22.5(c)], [p. 611, 22.6]
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
