/**
 * задача банкомат B=[50, 100, 500, 1000, 5000] S=18750
 * похоже на задачу про кузнечиков B - длина прыжка, S = сумма
 * F[i] = min(F[i - B[j]])
 * F[0] = 0 те  для суммы 0 нужно выдать 0 банкнот
 */
function ATM(B, S) {
  const F = new Array(S + 1).fill(Infinity);
  F[0] = 0;
  for (let i = 1; i < S + 1; i++) {
    for (let j = 0; j < B.length; j++) {
      /**
       * перебираем номиналы и проверяем можно ли выдать текущию сумму в i
       */
      if (i - B[j] >= 0 && F[i - B[j]] < F[i]) {
        F[i] = F[i - B[j]];
      }
    }
    // учитываем ту банкноту
    F[i] += 1;
  }
  function getAns() {
    const prev = new Array(S + 1).fill(-1);
    const ans = [];
    while (S > 0) {
      ans.push(prev[S]);
      S -= prev[S];
    }

    return ans;
  }

  // console.log(getAns());

  return F[S];
}

// console.log(ATM([50, 100, 500, 1000, 5000], 18750));
// console.log(ATM([1, 50, 90], 100));

/**
 * золотые слитки
 * A=[] - масса слитков
 * S - рюкзак
 */
// подход с копированием массива
function goldBars(A, S) {
  let F = [1, ...new Array(S).fill(0)];
  let F_new = [...F];

  for (let j = 0; j < A.length; j++) {
    for (let i = A[j]; i < S + 1; i++) {
      if (F[i - A[j]] === 1) {
        F_new[i] = 1;
      }
    }
    F = [...F_new];
  }

  function getAns() {
    let i = S;
    while (F[i] === 0) {
      i -= 1;
    }

    return i;
  }

  console.log(getAns());
}
// goldBars([3, 5, 7, 10], 14);

/**
 * подход справа на лево
 */
function goldBars2(A, S) {
  let F = [1, ...new Array(S).fill(0)];
  for (let j = 0; j < A.length; j++) {
    for (let i = S; i > A[j] - 1; i--) {
      if (F[i - A[j]] === 1) {
        F[i] = 1;
      }
    }
  }

  return F;
}
// console.log(goldBars2([3, 5, 7, 10], 14));

/**
 * укладка рюкзака
 */
