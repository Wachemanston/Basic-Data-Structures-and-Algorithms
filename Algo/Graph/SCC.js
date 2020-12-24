// Chapter 22
// Chapter -

// Strongly Connected Component =
// input: G
// output: the vertices of each tree
const SCC = (G) => {
  const forest = [];
  const transposeG = new Array(G.length);
  for (let i = 0; i < G.length; i++)
    transposeG[i] = [];

  // DFS
  const DFS = (G, order) => {
    let counter = 1;
    const V = G.length;
    const d = new Array(V);
    const f = new Array(V);

    const recursiveDFS = (i) => {
      d[i] = counter++;
      for (let j = 0;  j < G[i].length; j++) {
        const neighbor = G[i][j];
        if (d[neighbor] === undefined) {
          recursiveDFS(neighbor);
        }
      }
      f[i] = counter++;
    };

    for (let i = 0; i < V; i++) {
      const idx = order ? order[i] : i; // apply custom DFS order here
      if (d[idx] === undefined) {
        recursiveDFS(idx);
      }
    }
    return {f, d};
  };

  // create G^T -> V+E
  for (let i = 0;  i < G.length; i++) {
    let k = 0;
    for (let j = 0; j < G.length; j++) {
      if (G[i][k] === j) {
        transposeG[j].push(i);
        k++;
      }
    }
  }
  // console.log(G, transposeG);

  // step 1: get u.f in DFS in G -> V+E
  const { f } = DFS(G);

  // step 2: sort idx in decreasing u.f order -> TODO: handle this with custom DFS
  let tmp = f.map((v, idx) => [v, idx]);
  tmp.sort((a, b) => b[0] - a[0]);
  const customDFSOrder = tmp.map(item => item[1]);
  // console.log(customDFSOrder);

  // step 3: get u.f, u.g in DFS in G^T with order in step 2. -> V+E
  const { f: resF, d: resD } = DFS(transposeG, customDFSOrder);
  let res = resD.map((d, idx) => [idx, d, resF[idx]]);
  res.sort((a, b) => a[1] - b[1]);

  // step 4: output DFS component based on the result in step 3.
  let currentUF = res[0][2];
  let currentSet = [0];
  for (let i = 1; i < res.length; i++) {
    if (currentUF > res[i][2]) {
      currentSet.push(res[i][0]);
    } else {
      currentUF = res[i][2];
      forest.push(currentSet);
      currentSet = [res[i][0]];
    }
  }
  forest.push(currentSet);

  return forest;
};

let G = [
  [1],
  [2, 4, 5],
  [3, 6],
  [2, 7],
  [0, 5],
  [6],
  [5, 7],
  [7],
];
// Introduction to Algorithm [p. 616, 22.9]
console.log('Strongly Connected Component\nG =', G, '\nres = ', SCC(G));
