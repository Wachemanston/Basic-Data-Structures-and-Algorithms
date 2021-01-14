// Chapter 15
// Chapter 3

// Minimum Matrix-chain Multiplication = n^3
// input: a list of dimension of a matrix(ex: [2, 3, 4] -> 2*3 matrix, 3*4 matrix)
// output: minimum multiplication & how to split it
const MatrixChain = (dimensions) => {
  const dimensionsLength = dimensions.length - 1;
  let m = [];

  // init table with diagonal 0
  for (let i = 0; i < dimensionsLength; i++) {
    const row = new Array(dimensionsLength);
    row.fill(Number.MAX_VALUE);
    row[i] = 0;
    m.push(row);
  }

  // fill the table m
  for (let l = 1; l <= dimensionsLength; l++) { // n
    for (let i = 0; i < dimensionsLength - l; i++) { // n
      const j = i+l;
      for (let k = i+1; k < j+1; k++) { // n
        m[i][j] = Math.min(m[i][j], m[i][k-1] + m[k][j] + dimensions[i] * dimensions[k] * dimensions[j+1])
      }
    }
  }

  // console.log(m);
  return m[0][dimensionsLength-1];
};


const dimension = [40, 20, 30, 10, 30];
const dimension_2 = [10, 20, 30, 40, 30];
const dimension_3 = [10, 20, 30];
// https://www.geeksforgeeks.org/matrix-chain-multiplication-dp-8/
console.log('Minimum Matrix-chain Multiplication\ndimension = ', dimension, '\nres = ', MatrixChain(dimension));
console.log('dimension = ', dimension_2, '\nres = ', MatrixChain(dimension_2));
console.log('dimension = ', dimension_3, '\nres = ', MatrixChain(dimension_3));
