// Chapter 15
// Chapter -

// Optimal Binary Search Tree = n^3
// input: items = {key, freq}
// output: minimum sum of frequency * node's height
const OptimalBST = (items) => {
  const m = [];
  const q = []; // for easier calculation. u can design another function without this

  // init
  for (let i = 0; i < items.length; i++) {
    let row = new Array(items.length);
    row[i] = items[i].freq;
    m.push(row);
    row = new Array(items.length);
    row[i] = items[i].freq;
    q.push(row);
  }

  // fill table m
  for (let l = 2; l <= items.length; l++) { // n
    for (let i = 0; i < items.length - l + 1; i++) { // n
      const j = i + l - 1;
      q[i][j] = q[i + 1][j] + q[i][j - 1];
      m[i][j] = Number.MAX_VALUE;
      if (l === 2) {
        m[i][j] = Math.min(m[i + 1][j], m[i][j - 1]);
      } else {
        for (let k = i; k < j; k++) { // n
          const c = m[i][k] + m[k + 1][j];
          if (m[i][j] > c) {
            m[i][j] = c;
          }
        }
      }
    }
  }

  // console.log(q, m);
  return m[0][items.length - 1] + q[0][items.length - 1];
};

const items = [{key: 10, freq: 34}, {key: 12, freq: 50}];
const items_2= [{key: 10, freq: 34}, {key: 12, freq: 8}, {key: 20, freq: 50}];
// https://www.geeksforgeeks.org/optimal-binary-search-tree-dp-24/
console.log('Optimal Binary Search Tree\nitems =', items, '\nres = ', OptimalBST(items));
console.log('items =', items, '\nres = ', OptimalBST(items_2));

// Optimal Binary Search Tree Type 2 = n^3
// input: p = inner-node prob, q = leaf node prob
// output: minimum sum of frequency * node's height
const OptimalBST_2 = (p, q) => {
  const w = [];
  const e = []; // for easier calculation. u can design another function without this

  // init (same as above)
  for (let i = 0; i < q.length; i++) {
    let row = new Array(q.length);
    row[i] = q[i];
    w.push(row);
    row = new Array(q.length);
    row[i] = q[i];
    e.push(row);
  }

  // fill table m
  for (let l = 2; l <= q.length; l++) { // n
    for (let i = 0; i < q.length - l + 1; i++) { // n
      const j = i + l - 1;
      w[i][j] = Math.round((w[i][j - 1] + q[j] + p[j - 1]) * 100) / 100;
      e[i][j] = Number.MAX_VALUE;
      for (let k = i; k < j; k++) { // n
        const c = Math.round((e[i][k] + e[k + 1][j] + w[i][j]) * 100) / 100;
        if (e[i][j] > c) {
          e[i][j] = c;
        }
      }
    }
  }

  // console.log(w, e);
  return e[0][q.length - 1];
};

const p = [0.15, 0.10, 0.05, 0.10, 0.20];
const q = [0.05, 0.10, 0.05, 0.05, 0.05, 0.10];
// Introduction to Algorithm [p. 398]
console.log('Optimal Binary Search Tree Type 2\nitems =', items, '\nres = ', OptimalBST_2(p, q));
