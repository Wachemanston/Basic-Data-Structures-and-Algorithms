// Chapter -
// Chapter 3

// 0/1 KP = nW
// input: items = {value, weight}, W = max weight of package
// output: maximum profit
const zeroAllKP = (items, W) => {
  const c = []; // c[i, k] 為考慮 item 1~i，且負重 k 下的最大 profit
  const numberOfItems = items.length + 1;

  // init c
  for (let i = 0; i < numberOfItems; i++) { // n
    const row = new Array(W+1);
    if (i === 0) {
      row.fill(0);
    }
    c.push(row);
  }

  // fill table c
  for (let i = 1; i < numberOfItems; i++) { // nW
    c[i][0] = 0;
    for (let k = 0; k < W+1; k++) {
      const { value, weight } = items[i-1];
      if (k < weight) {
        c[i][k] = c[i-1][k]; // 包包裝不下此 item
      } else {
        c[i][k] = Math.max(c[i-1][k], value + c[i-1][k - weight]); // 包包裝的下；比較裝與不裝
      }
    }
  }
  // return max profit
  // console.log(c);
  return c[numberOfItems-1][W];
};

let items = [{weight: 4, value: 45}, {weight: 5, value: 57}, {weight: 2, value: 22.5}, {weight: 1, value: 11}, {weight: 6, value: 67}];
let W = 8;
// http://www2.lssh.tp.edu.tw/~hlf/class-1/lang-c/kp.htm
console.log('0/1 KP problem\nitems =', items, ', W =', W, '\nres = ', zeroAllKP(items, W));

items = [{weight: 10, value: 60}, {weight: 20, value: 100}, {weight: 30, value: 120}];
W = 50;
// https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/?ref=lbp
console.log('items =', items, ', W =', W, '\nres = ', zeroAllKP(items, W));
