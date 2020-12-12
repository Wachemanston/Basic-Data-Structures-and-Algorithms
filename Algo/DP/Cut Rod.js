// Chapter 15
// Chapter -

// Cut Rod = n^2
// input: prices list(index means length)
// output: maximum profit
const CutRod = (prices) => {
  const l = new Array(prices.length + 1); // l[i] 代表在長度 = i 時的最大 profit
  l.fill(0);

  // fill table l
  for (let i = 1; i <= prices.length; i++) { // n^2
    for (let j = 0; j < i; j++) {
      l[i] = Math.max(l[i], prices[j] + l[i-j-1]);
    }
  }
  console.log(l);
  return l[prices.length];
};

const prices = [1, 5, 8, 9, 10, 17, 17, 20];
const prices_2 = [3, 5, 8, 9, 10, 17, 17, 20];
// https://www.geeksforgeeks.org/cutting-a-rod-dp-13/
console.log('Cut Rod problem\nprices = ', prices, '\nres = ', CutRod(prices));
console.log('prices = ', prices_2, '\nres = ', CutRod(prices_2));
