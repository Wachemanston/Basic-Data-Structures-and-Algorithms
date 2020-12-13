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
