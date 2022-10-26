/**
 * наибольшая возрастающая последовательность
 * [2, 7, 1, 4, 3, 5, 4, 6, 2, 5, 8, 3] это 2,4,5,6,8 или 1,4,5,6,8 или 1,3,5,6,8
 */
function gis(A) {
  const { length } = A;
  const F = new Array(length).fill(0);
  const Prev = new Array(length).fill(-1);

  for (let i = 0; i < length; i++) {
    let m = 0;
    for (let j = 0; j < i; j++) {
      if (A[j] < A[i] && F[j] > m) {
        // F[j] > m or F[j] >= m - даста разные ответы
        m = F[j];
        Prev[i] = j;
      }
    }
    F[i] = m + 1;
  }

  function getAns() {
    let ans = [];
    let idx = F.findIndex((i) => i === Math.max(...F));
    ans.push(A[idx]);
    while (Prev[idx] !== -1) {
      idx = Prev[idx];
      ans.push(A[idx]);
    }

    ans.reverse();
    return ans;
  }

  console.log(getAns());

  return Math.max(...F);
}

// console.log(gis([2, 7, 1, 4, 3, 5, 4, 6, 2, 5, 8, 3]));
