/**
 * stack
 *
 * скалярные - это символ и число
 * векторные - это последовательность строка или массив
 * структура данный - абстракция, надстройка (стек, дек, очередь)
 * 1 взять
 * 2 положить
 * 3 проверить не пусто
 * 4 посмотреть
 * 5 выкинуть стопку
 */

function evalRPN(arr) {
  const op = {
    '+': (a, b) => a + b,
    '-': (a, b) => b - a,
    '*': (a, b) => a * b,
    '/': (a, b) => (b / a) | 0,
  };
  const stack = [];
  for (let el of arr) {
    if ('+-*/'.includes(el)) {
      const one = stack.pop();
      const two = stack.pop();
      const result = op[el](+one, +two);
      stack.push(result);
      console.log(result);
    } else {
      stack.push(el);
    }
  }
}

// console.log(evalRPN(['2', '1', '+', '3', '*']));
// console.log(evalRPN(['4', '13', '5', '/', '+']));

function isValid(str) {
  const stack = [];
  for (let el of str) {
    if ('({['.includes(el)) {
      stack.push(el);
    } else {
      if (stack.length === 0 || !'{}()[]'.includes(`${stack.pop()}${el}`))
        return false;
    }
  }

  return stack.length === 0;
}

// console.log(isValid('()'));
// console.log(isValid('()[]{}'));
// console.log(isValid('(]'));
/**
 * lesson18
 */
function remove3Num(str) {
  const stack = [];
  let i = 0;
  while (i < str.length) {
    stack.push(str[i]);

    if (
      stack.length >= 3 &&
      `${stack.at(-1)}${stack.at(-2)}${stack.at(-3)}` ===
        `${stack.at(-1)}`.repeat(3)
    ) {
      const color = stack.at(-1);
      stack.pop();
      stack.pop();
      stack.pop();
      /**
       * а теперь нам нужно не рассматривать те элементы которые равны color
       * тут мы короче скипаем итерацию длс 59 строки те если будет 1111 - 3удалили и 1 скипнули i++
       */
      while (i < str.length && str[i] === color) {
        i += 1;
      }
    } else {
      i += 1;
    }
  }

  return str.length - stack.length;
}

// console.log(remove3Num('322111233'));
// console.log(remove3Num('3221111233'));
// console.log(remove3Num('332221'));

/**
 * push O(1)
 * из очереди очень дорого удалять O(n)
 * есть ленивое удаление, создаем индекс head, а данные сами остаются
 */

/**
 * deque
 * push_front(1)
 * push_back(1)
 * pop_front(1)
 * pop_back(1)
 */

/**
 * 1 сек
 * 1000 = 10**3 это сортировки N**2
 * а быстрые это 10**5 или 10**6
 * идея разделяй и властвуй сложность n * log (n)
 * устойчивая сортировка не меняет порядок
 */

function merge(a, b) {
  let i = 0;
  let j = 0;
  let result = [];
  while (i < a.length && j < b.length) {
    if (a[i] < b[j]) {
      result.push(a[i]);
      i++;
    } else {
      result.push(b[j]);
      j++;
    }
  }

  result.push(...a.slice(i), ...b.slice(j));
  return result;
}

function merge_sort(a) {
  if (a.length > 1) {
    return merge(
      merge_sort(a.slice((a.length / 2) | 0)),
      merge_sort(a.slice(0, (a.length / 2) | 0))
    );
  } else {
    return a;
  }
}

// console.log(merge([1, 2, 7, 10], [3, 6, 8, 9, 45, 90]));
// console.log(merge_sort([8, 9, 0, 1, 2, 6, 3]));

function quick_sort(a) {
  if (a.length > 1) {
    let p = a[0]; // лучше рандомный элемент
    let left = a.filter((i) => i < p);
    let mid = a.filter((i) => i === p);
    let right = a.filter((i) => i > p);
    return [...quick_sort(left), ...mid, ...quick_sort(right)];
  } else {
    return a;
  }
}

/**
 * sumNum(21) = 2 + 1 = 3
 */
function sumNum(x) {
  return ((x % 10) + x / 10) | 0;
}

// console.log(quick_sort([8, 9, 0, 1, 2, 6, 3]));

/**
 * задача про учеников и родителей n ученики k родители
 * занятие 20 37минута
 *
 */
function nk(n, k) {
  let ans = 0;
  while (n + ans > 3 * (k + ans)) {
    ans += 1;
  }

  return ans;
}

// console.log(nk(15, 2));

/**
 * чтобы поделить попалам
 * right + left / 2
 * проверяем до той поры пока они не будут стоять рядом
 * left = 4  right = 5 те right > left + 1
 * те left + 1 === right
 */

/**
 * lowerBound(A, key)
 * < key | >= key
 * arr[m] < key
 *
 * upperBound(A, key)
 * <= key | > key
 */
function lowerBound(arr, key) {
  let left = -1;
  let right = arr.length;
  while (right > left + 1) {
    let m = ((left + right) / 2) | 0;
    if (arr[m] < key) {
      left = m;
    } else {
      right = m;
    }
  }
  console.log({ left, right });
  return right < arr.length && arr[right] === key ? right : -1;
}
function upperBound(arr, key) {
  let left = -1;
  let right = arr.length;
  while (right > left + 1) {
    let m = ((left + right) / 2) | 0;
    if (arr[m] <= key) {
      left = m;
    } else {
      right = m;
    }
  }

  return right;
}
//          0  1  2  3  4  5  6  7  8  9   10
let arr = [-1, 2, 2, 3, 3, 3, 5, 8, 8, 10, 13];
// console.log(lowerBound(arr, 4));

function findOccur(A, B) {
  let i = 0;
  let j = 0;
  while (i < A.length && j < B.length) {
    if (A[i] > B[j]) {
      j++;
    } else if (A[i] < B[j]) {
      i++;
    } else if (A[i] === B[j]) {
      return [i, j];
    }
  }
}

// console.log(findOccur([-1, 2, 2, 5, 7, 8, 21], [-7, 0, 1, 4, 6, 8, 150]));

/**
 *  *-*-*-*
 *  x     y
 * y-x+1 с + это количество точек, а без это кол-во черточек
 * 5* и 4-
 * ans = n-1 - j+1 тоже самое что и n -j
 */

function findWithDiff(A, n, r) {
  let i = 0;
  let j = 0;
  let ans = 0;
  while (i < A.length && j < A.length) {
    if (A[j] - A[i] <= r) {
      j++;
    } else {
      ans += n - j;
      i++;
    }
  }

  return ans;
}

function findWithDiffB(A, n, r) {
  let ans = 0;
  for (let i = 0; i < A.length; i++) {
    let j = upperBound(A, A[i] + r);
    if (j < n) {
      ans += n - j;
    }
  }

  return ans;
}

// console.log(findWithDiffB([1, 3, 5, 8, 9, 10], 6, 4));

function f(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  return f(n - 1) + f(n - 2);
}

// console.log(f(7));
