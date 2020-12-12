// Chapter -
// Chapter 3

// Fractional KP = nlgn
// input: items = {value, weight}, W = max weight of package
// output: maximum profit
const FractionalKP = (items, W) => {
  const worths = new Array(items.length);
  items.forEach((item, i) => { // n
    const { value, weight } = item;
    worths[i] = [i, value / weight, value, weight];
  });
  worths.sort((a, b) => b[1] - a[1]); // nlgn
  let profit = 0;
  for (let i = 0; i < worths.length; i++) { // n
    const [idx, worth, value, weight] = worths[i];
    if (weight <= W) {
      profit += value;
      W -= weight;
    } else {
      profit += W * worth;
      break;
    }
    // console.log('(remain W, current profit) = ', W, profit);
  }
  return profit;
};

const items = [{weight: 2, value: 10}, {weight: 1, value: 6}, {weight: 3, value: 12}];
const W = 5;
// https://wangwilly.github.io/willywangkaa/2018/09/23/Algorithm-Dynamic-programming/
console.log('Fractional KP problem\nitems =', items, ', W =', W, '\nres = ', FractionalKP(items, W));
