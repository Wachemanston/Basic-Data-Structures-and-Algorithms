// Chapter 15
// Chapter 3

// Longest Common Sequence = mn
// input: 2 strings
// output: length of LCS
const LCS = (str1, str2) => {
  const m = [];

  // init
  m.push(new Array(str2.length + 1).fill(0));
  for (let i = 1; i <= str1.length; i++) {
    m.push(new Array(str2.length + 1));
  }

  // fill table m
  for (let i = 1; i <= str1.length; i++) {
    m[i][0] = 0;
    for (let j = 1; j <= str2.length; j++) {
      if (str1[i-1] === str2[j-1]) {
        m[i][j] = m[i-1][j-1] + 1;
      } else {
        m[i][j] = Math.max(m[i-1][j], m[i][j-1]);
      }
    }
  }

  // let lcs = '', x = str1.length, y = str2.length;
  // while (y > 0 && x > 0) {
  //   if (m[x][y] === m[x-1][y-1] + 1 && m[x][y] > m[x][y-1] && m[x][y] > m[x-1][y]) {
  //     lcs = str2[y-1] + lcs;
  //     x--;
  //     y--;
  //   } else if (m[x][y] === m[x][y-1]) {
  //     y--;
  //   } else if (m[x][y] === m[x-1][y]) {
  //     x--;
  //   } else {
  //     break;
  //   }
  // }
  // console.log(m, lcs);

  return m[str1.length][str2.length];
};

const string = ['ABCDGH', 'AEDFHR'];
const string_2 = ['AGGTAB', 'GXTXAYB'];
// https://www.geeksforgeeks.org/longest-common-subsequence-dp-4/
console.log('Longest Common Sequence\nstring = ', string, '\nres = ', LCS(string[0], string[1]));
console.log('string = ', string_2, '\nres = ', LCS(string_2[0], string_2[1]));
