// Chapter 23
// Chapter -

// Prim = VlgV + ElgV ~= ElgV
// input: G = G[i]: list of {e: edge destination, w: weight}
// output: MST & its cost
const Prim = (G) => {
  const V = G.length;

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
      while (parent > 0 && this.data[parent].w > this.data[ptr].w) {
        this.swap(parent, ptr);
        ptr = parent;
        parent = Math.floor(parent / 2);
      }
    }
  };

  // body
  const heap = new Object(Heap);
  heap.sortingFunc = (a, b) => a.w < b.w;
  const visited = new Set([0]);
  for (let i = 0; i < G[0].length; i++) {
    heap.insert({src: 0, ...G[0][i]});
  }
  const MST = [];
  let cost = 0;
  for (let i = 0; i < V-1; i++) { // <- V-1 iteration
    let e = 0;
    let min = null;

    // select the minimum expanding edge
    do {
      min = heap.deleteMin(); // VlgV
      if (min) e = min.e;
    } while(visited.has(e) && min);
    visited.add(e);
    cost += min.w;
    MST.push([min.src, e]);

    // insert the unvisited nodes into visited set
    for (let i = 0; i < G[e].length; i++) { // total amortized = E
      if (!visited.has(G[e][i].e)) {
        heap.insert({src: e, ...G[e][i]}); // lgV
      }
    }

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
// https://www.geeksforgeeks.org/prims-minimum-spanning-tree-mst-greedy-algo-5/
console.log('Prim\nG =', G, '\nres = ', Prim(G));
