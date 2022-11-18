/**
 * чтобы узнать разницу между 2 элеменатми в массивае
 * [0, 1, 2, 3, 4, 5, 6, 7]
 * end = 1
 * start = 5
 * diff = 5 - 1 + 1 = 5
 * end - start + 1
 */

var findAveragesOfSubarrays = function (arr = [], k) {
  const result = [];
  for (let i = 0; i < arr.length - k + 1; i++) {
    let sum = 0;
    for (let j = i; j < i + k; j++) {
      sum += arr[j];
    }
    result.push(sum / k);
  }
  return result;
};

var findAveragesOfSubarrays = function (arr = [], k) {
  let result = [];
  let sum = 0;
  let start = 0;
  for (let end = 0; end < arr.length; end++) {
    sum += arr[end];
    if (end >= k - 1) {
      result.push(sum / k);
      sum -= arr[start];
      start++;
    }
  }
  return result;
};

// console.log(findAveragesOfSubarrays([1, 3, 2, 6, -1, 4, 1, 8, 2], 5));

const maxSubArrayOfSizeK = function (arr, k) {
  let max = 0;
  let start = 0;
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
    if (i >= k - 1) {
      max = Math.max(sum, max);
      sum -= arr[start];
      start++;
    }
  }

  return max;
};

// console.log(maxSubArrayOfSizeK([2, 1, 5, 1, 3, 2], 3));
// console.log(maxSubArrayOfSizeK([2, 3, 4, 1, 5], 2));

var smallestSubarrayWithGivenSum = function (s, arr = []) {
  let min = Infinity;
  let start = 0;
  let sum = 0;
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
    count++;
    while (sum >= s) {
      min = Math.min(min, count);
      sum -= arr[start];
      start++;
      count--;
    }
  }

  return min;
};

var smallestSubarrayWithGivenSum = function (s, arr = []) {
  let min = Infinity;
  let start = 0;
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
    while (sum >= s) {
      min = Math.min(min, i - start + 1);
      sum -= arr[start];
      start++;
    }
  }

  return min;
};

// console.log(smallestSubarrayWithGivenSum(7, [2, 1, 5, 2, 3, 2]));
// console.log(smallestSubarrayWithGivenSum(7, [2, 1, 5, 2, 8]));
// console.log(smallestSubarrayWithGivenSum(8, [3, 4, 1, 1, 6]));

var longestSubstringWithKDistinct = function (str, k) {
  let start = 0;
  let maxLen = 0;
  let h = {};

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char in h) {
      h[char]++;
    } else {
      h[char] = 1;
    }

    while (Object.keys(h).length > k) {
      const char = str[start];
      h[char]--;
      if (h[char] === 0) delete h[char];
      start++;
    }

    maxLen = Math.max(maxLen, i - start + 1);
  }

  return maxLen;
};
var longestSubstringWithKDistinct = function (s, k) {
  let start = 0;
  let end = 0;
  let maxLen = 0;
  let d = {};

  while (end < s.length) {
    d[s[end]] = end;
    if (Object.keys(d).length > k) {
      let min = Math.min(...Object.values(d));
      start = min + 1;
      delete d[s[min]];
    }
    maxLen = Math.max(maxLen, end - start + 1);
    end++;
  }

  return maxLen;
};
// console.log(`${longestSubstringWithKDistinct('araaci', 2)}`);
// console.log(`${longestSubstringWithKDistinct('araaci', 1)}`);
// console.log(`${longestSubstringWithKDistinct('cbbebi', 3)}`);

/**
 * https://leetcode.com/problems/fruit-into-baskets/solution/
 */
var fruitsIntoBaskets = function (fruits) {
  let windowStart = 0,
    maxLength = 0,
    h = {};
  for (let i = 0; i < fruits.length; i++) {
    const fruit = fruits[i];
    if (fruit in h) {
      h[fruit] += 1;
    } else {
      h[fruit] = 1;
    }
    while (Object.keys(h).length > 2) {
      const fruit = fruits[windowStart];
      h[fruit] -= 1;
      if (h[fruit] === 0) {
        delete h[fruit];
      }
      windowStart += 1;
    }
    maxLength = Math.max(maxLength, i - windowStart + 1);
  }
  return maxLength;
};
var fruitsIntoBaskets = function (fruits) {
  let start = 0;
  let end = 0;
  let maxLen = 0;
  let d = {};

  while (end < fruits.length) {
    d[fruits[end]] = end;
    if (Object.keys(d).length > 2) {
      let min = Math.min(...Object.values(d));
      start = min + 1;
      delete d[fruits[min]];
    }
    maxLen = Math.max(maxLen, end - start + 1);
    end++;
  }

  return maxLen;
};

// console.log(`${fruitsIntoBaskets(['A', 'B', 'C', 'A', 'C'])}`);
// console.log(`${fruitsIntoBaskets(['A', 'B', 'C', 'B', 'B', 'C'])}`);

/**
 * Longest Substring with At Most Two Distinct Characters - LeetCode 159
 * https://www.youtube.com/watch?v=odSP7QrlJys
 */

var lengthOfLongestSubstringTwoDistinct = function (s) {
  let start = 0;
  let end = 0;
  let maxLen = 0;
  let d = {};

  while (end < s.length) {
    d[s[end]] = end;
    if (Object.keys(d).length > 2) {
      let min = Math.min(...Object.values(d));
      start = min + 1;
      delete d[s[min]];
    }
    maxLen = Math.max(maxLen, end - start + 1);
    end++;
  }

  return maxLen;
};
// console.log(lengthOfLongestSubstringTwoDistinct('eceba'));
// console.log(lengthOfLongestSubstringTwoDistinct('ccaabbb'));
