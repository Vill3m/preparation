function generate(n, prefix = '') {
  if (n === 0) {
    console.log(prefix);
  } else {
    generate(n - 1, prefix + '0');
    generate(n - 1, prefix + '1');
  }
}

// generate(3);

/**
 * последовательности длины n без 11 подряд
 */
function generate11(n, prefix = '') {
  if (n === 0) {
    console.log(prefix);
  } else {
    generate11(n - 1, prefix + '0');
    if (prefix.length === 0 || prefix.at(-1) === '0') {
      generate11(n - 1, prefix + '1');
    }
  }
}

// generate11(3);

/**
 * правильная скобочая последовательность
 */
function generatePsp(open, close, prefix = '') {
  if (open + close === 0) {
    console.log(prefix);
  } else {
    if (open > 0) {
      generatePsp(open - 1, close, prefix + '(');
    }
    if (open < close) {
      generatePsp(open, close - 1, prefix + ')');
    }
  }
}

// generatePsp(3, 3);
