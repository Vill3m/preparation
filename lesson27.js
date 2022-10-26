/**
 * рекурсивный перебор backtracking
 * сложность 2**n
 */
function generateN(n) {
  let result = [];
  for (let i = 0; i < 2 ** n; i++) {
    let r = i.toString(2).padStart(n, 0);
    result.push(r);
  }

  return result;
}

// console.log(generateN(3));

function generate(n, prefix) {
  if (n === 0) {
    console.log(prefix);
  } else {
    generate(n - 1, prefix + '0');
    /**
     * убираем 11
     */
    // if (prefix.length === 0 || prefix.at(-1) === '0') {
    //   generate(n - 1, prefix + '1');
    // }

    generate(n - 1, prefix + '1');
  }
}
// console.log(generate(3, ''));

function generateGoldBars(M, K) {
  let best = 0;

  function process(prefix) {
    let mass = 0;
    for (let i = 0; i < prefix.length; i++) {
      if (prefix[i] === 1) {
        mass += M[i];
      }
    }
    if (mass > best && mass <= K) {
      best = Math.max(best, mass);
    }
  }

  function generate(n, prefix = []) {
    if (n === 0) {
      process(prefix);
    } else {
      generate(n - 1, [...prefix, 1]);
      generate(n - 1, [...prefix, 0]);
    }
  }

  generate(M.length);

  return best;
}
// console.log(generateGoldBars([49, 90, 96, 34, 12, 65], 61));

function generateOnce(n, k, prefix = '') {
  if (n === 0) {
    if (k === 0) {
      console.log(prefix);
    }
  } else {
    if (n > k) {
      generateOnce(n - 1, k, prefix + '0');
    }
    if (k > 0) {
      generateOnce(n - 1, k - 1, prefix + '1');
    }
  }
}

// generateOnce(5, 3);

function generateNums(n, prefix = []) {
  if (prefix.length === n) {
    console.log(prefix);
  } else {
    for (let i = 1; i < n + 1; i++) {
      if (!prefix.includes(i)) {
        generateNums(n, [...prefix, i]);
      }
    }
  }
}
// console.log(generateNums(4));
