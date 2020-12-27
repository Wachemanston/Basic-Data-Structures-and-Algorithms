// Chapter 24
// Chapter -

// Dijkstra = VlgV + Elgv ~= ElgV
// // input: G = G[i]: list of {e: edge destination, w: weight}, s: start vertex
// // output: minimum cost to each vertex
const INF = Infinity;

const Dijkstra = (G, s) => {
  const V = G.length;
  const dist = new Array(V);

  // Heap DS
  const Heap = {
    data: [null],
    size: 0,
    sortingFunc: null,
    sort: function(a, b) {
      return this.sortingFunc ? this.sortingFunc(a, b) : (a < b);
    },
    swap: function(a, b) {
        const tmp = this.data[a];
        this.data[a] = this.data[b];
        this.data[b] = tmp;
    },
    heapify:function (node) {
      if (this.size < node) return;
      let min = node;
      const L = node * 2;
      const R = node * 2 + 1;
      if (L <= this.size && this.sort(this.data[L],  this.data[min])) {
        min = L;
        if (R <= this.size && this.sort(this.data[R], this.data[min])) {
          min = R;
        }
        this.swap(min, node);
        this.heapify(min);
      }
    },
    deleteMin: function() {
      if (this.size === 0) return null;
      const min = this.data[1];
      this.data[1]= Object.assign(this.data[this.size]);
      this.data.pop();
      this.size--;
      this.heapify(1);
      return min;
    },
    insert: function(x) {
      this.data.push(x);
      this.size++;
      let ptr = this.size;
      let parent = Math.floor(ptr / 2);
      while (parent > 0 && this.sort(ptr, parent)) {
        this.swap(parent, ptr);
        ptr = parent;
        parent = Math.floor(parent / 2);
      }
    },
    isEmpty: function() { return this.size === 0; }
  };


  const relax = (u, v, Q) => {
    if (dist[v] > dist[u] + G[u][v]) {
      dist[v] = dist[u] + G[u][v];
    }
  };

  // init
  const Q = new Object(Heap);
  const visited = new Set([0]);
  Q.sortingFunc = (a, b) => dist[Q.data[a]] < dist[Q.data[b]];
  Q.insert(s);
  dist.fill(INF); // V
  dist[s] = 0;

  while (!Q.isEmpty()) { // V
    const u = Q.deleteMin(); // 每次找最小 distance 的 vertex 出來 relax -> lgV
    for (let v = 0; v < G[u].length; v++) { // amortized: E
      if (G[u][v] !== INF) {
        relax(u, v, Q);
        Q.heapify(v); // lgV

        // expand known vertex
        if (!visited.has(v)) {
          visited.add(v);
          Q.insert(v);
        }
      }
    }
    // console.log(u, dist);
  }

  return dist.map(v => v === INF ? 'INF' : v);
};

let G = [
  [INF, 4, INF, INF, INF, INF, INF, 8, INF],
  [4, INF, 8, INF, INF, INF, INF, 11, INF],
  [INF, 8, INF, 7, INF, 4, INF, INF, 2],
  [INF, INF, 7, INF, 9, 14, INF, INF, INF],
  [INF, INF, INF, 9, INF, 10, INF, INF, INF],
  [INF, INF, 4, 14, 10, INF, 2, INF, INF],
  [INF, INF, INF, INF, INF, 2, INF, 1, 6],
  [8, 11, INF, INF, INF, INF, 1, INF, 7],
  [INF, INF, 2, INF, INF, INF, 6, 7, INF],
];
let s = 0;
// https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/
console.log('Dijkstra\nG =', G, '\nres = ', Dijkstra(G, s));
G = [
  [INF, 10, INF, 5, INF],
  [INF, INF, 1, 2, INF],
  [INF, INF, INF, INF, 4],
  [INF, 3, 9, INF, 2],
  [6, INF, 6, INF, INF],
];
s = 0;
// Introduction to Algorithm [p. 659, 24.6]
console.log('G =', G, '\nres = ', Dijkstra(G, s));
