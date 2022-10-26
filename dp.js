/**
 * Рекуррентная формула
 * https://ru.wikipedia.org/wiki/%D0%A0%D0%B5%D0%BA%D1%83%D1%80%D1%80%D0%B5%D0%BD%D1%82%D0%BD%D0%B0%D1%8F_%D1%84%D0%BE%D1%80%D0%BC%D1%83%D0%BB%D0%B0
 */
function f(n) {
  /**
   * Array(n + 1) потому что нужно вывести F[n]
   * Array(n)[n] = undefined
   * Array(n + 1)[n] = последний элемент
   */
  let F = Array(n + 1).fill(0);
  F[1] = 1;
  for (let i = 2; i < F.length; i++) {
    F[i] = F[i - 1] + F[i - 2];
  }

  return F[n];
}

// console.log(f(7));

/**
 * сколько сущ последовательность длины n без повторяющихся 11
 * n = 3
 * 001
 * 101
 * 000
 * 010
 * 100
 */

/**
 * задача про царя или муровья
 * начинаем перебор начиная с первой строки и с певого стобца
 * доп. задача некоторые клетки запрещенные
 */
function taskDP(n, m) {
  let F = [];
  for (let i = 0; i < n; i++) {
    F[i] = Array(m).fill(1);
  }

  for (let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++) {
      F[i][j] = F[i - 1][j] + F[i][j - 1];
    }
  }

  console.table(F);

  return F[n - 1][m - 1];
}

function taskDP2(n, m) {
  /**
   * занятие 23. 1:08:53
   */

  let F = [];
  for (let i = 0; i < n + 1; i++) {
    F[i] = Array(m + 1).fill(0);
  }

  F[0][1] = 1;

  for (let i = 1; i < n + 1; i++) {
    for (let j = 1; j < m + 1; j++) {
      F[i][j] = F[i - 1][j] + F[i][j - 1];
    }
  }

  // console.table(F);

  return F[n][m];
}

// console.log(taskDP2(4, 5));

function findZero(arr) {
  let count = 0;
  let result = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > 0) {
      count++;
      result = Math.max(result, count);
    } else {
      count = 0;
    }
  }

  return result;
}

// console.log(findZero([1, 1, 0, 1, 1, 0]));
// console.log(findZero([1, 1, 0, 1, 1, 1]));
// console.log(findZero([1, 1, 1, 1, 1]));
// console.log(findZero([0, 0, 0]));
