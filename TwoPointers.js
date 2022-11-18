/**
 * time O(n)
 * space O(1)
 */
var pairWithTargetsum = function (arr = [], target_sum) {
  let start = 0;
  let end = arr.length - 1;

  // while (start < end) {
  while (end - start > 0) {
    if (target_sum === arr[start] + arr[end]) {
      return [start, end];
    } else if (target_sum > arr[start] + arr[end]) {
      start++;
    } else {
      end--;
    }
  }

  return [-1, -1];
};
/**
 * time O(n)
 * space O(n)
 */
var pairWithTargetsum = function (arr = [], target_sum) {
  let h = {};
  for (let i = 0; i < arr.length; i++) {
    let num = arr[i];
    if (target_sum - num in h) {
      return [h[target_sum - num], i];
    }
    h[num] = i;
  }

  return [-1, -1];
};
// console.log(pairWithTargetsum([1, 2, 3, 4, 6], 6));
// console.log(pairWithTargetsum([2, 5, 9, 11], 11));

var removeDuplicates = function (arr = []) {
  let len = 0;
  for (let i = 0, nonDupl = 1; i < arr.length; i++) {
    // Мы переходим к следующему индексу, если видим дублирующийся элемент
    if (arr[nonDupl - 1] !== arr[i]) {
      // Хранение уникального элемента по индексу insertIndex и инкрементирование insertIndex на 1
      arr[nonDupl] = arr[i];
      nonDupl++;
    }

    len = nonDupl;
  }
  console.log(arr);
  return len;
};
var removeDuplicates = function (arr = []) {
  for (let i = 0; i < arr.length - 1; i++) {
    /**
     * пока есть дубль сокрощаем массив
     * arr.splice(i, 1)
     */
    while (arr[i] === arr[i + 1]) {
      arr.splice(i, 1);
    }
  }
  console.log(arr);
  return arr.length;
};
var removeDuplicates = function (arr = []) {
  let s = new Set(arr);
  /**
   * Поскольку в Set нет ключей, значение передается для обоих аргументов.
   * у set.foreach - нет идекса только key/value где key === value тк
   * */
  let idx = 0;
  s.forEach((i) => {
    arr[idx] = i;
    idx++;
  });

  arr.splice(s.size, arr.length);
  return s.size;
};
// console.log(removeDuplicates([2, 3, 3, 3, 6, 9, 9]));
// console.log(removeDuplicates([1, 1, 2]));
// console.log(removeDuplicates([2, 2, 2, 11]));
// console.log(removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]));

const makeSquares = function (arr) {
  const squares = [];
  let idx = arr.length - 1;
  let start = 0;
  let end = arr.length - 1;
  while (start <= end) {
    let num1 = arr[start] * arr[start];
    let num2 = arr[end] * arr[end];

    if (num1 > num2) {
      squares[idx] = num1;
      start++;
    } else {
      squares[idx] = num2;
      end--;
    }
    idx--;
  }
  return squares;
};

// console.log(makeSquares([-2, -1, 0, 2, 3]));
// console.log(makeSquares([-3, -1, 0, 1, 2]));
