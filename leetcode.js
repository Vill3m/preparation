/**
 * https://leetcode.com/problems/subarray-sum-equals-k/
 */
var subarraySum = function (nums, k) {
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    let sum = 0;
    for (let j = i; j < nums.length; j++) {
      sum += nums[j];
      if (sum === k) count++;
    }
  }
  return count;
};

// console.log(subarraySum([4, 2, 1, 3, 1, 2], 3));

/**
 * https://leetcode.com/problems/climbing-stairs/
 */
var climbStairs = function (n) {
  if (n < 0) return 0;
  if (n === 0) return 1;
  return climbStairs(n - 1) + climbStairs(n - 2);
};
var climbStairsDP = function (n) {
  let F = Array(n + 2).fill(0);
  F[0] = 0;
  F[1] = 1;
  for (let i = 2; i < F.length; i++) {
    F[i] = F[i - 1] + F[i - 2];
  }

  return F[n + 1];
};

// console.log(climbStairsDP(5));
// console.log(climbStairs(5));

/**
 * 332. Reconstruct Itinerary
 * https://leetcode.com/problems/reconstruct-itinerary/
 */
function getRoute(tickets = []) {
  const result = [];
  const to = tickets.map(({ to }) => to);
  const from = tickets.map(({ from }) => from);
  const toSet = new Set(to);

  let fromUnic = from.find((f) => !toSet.has(f));

  const t = tickets.reduce((acc, i) => {
    acc[i.from] = i.to;
    return acc;
  }, {});

  for (let i = 0; i < tickets.length; i++) {
    const toCity = t[fromUnic];
    if (toCity) {
      result.push({ from: fromUnic, to: toCity });
      fromUnic = toCity;
    }
  }

  return result;
}

// console.log(
//   getRoute([
//     { from: 'London', to: 'Moscow' },
//     { from: 'NY', to: 'London' },
//     { from: 'Moscow', to: 'SPb' },
//   ])
// );

/**
 * 228. Summary Ranges (Смержить диапазон)
 * https://leetcode.com/problems/summary-ranges/
 */

/**
 * 28. Find the Index of the First Occurrence in a String
 * https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/description/
 * https://www.youtube.com/watch?v=Cbt67mfrF6o
 */

var strStr = function (haystack, needle) {
  // https://stackoverflow.com/questions/59290728/javascript-slice-without-using-built-in-method
  function slice(str, begin = 0, end = str.length) {
    let result = '';
    for (let i = begin; i < end; i++) {
      result += str[i];
    }

    return result;
  }

  for (let i = 0; i < haystack.length - needle.length + 1; i++) {
    // if (slice(haystack, i, i + needle.length) === needle) return i;
    if (haystack.slice(i, i + needle.length) === needle) return i;
  }

  return -1;
};

// console.log(strStr('sadbutsad', 'sad'));
// console.log(strStr('leetcode', 'leeto'));

/**
 * Задача 2
https://leetcode.com/discuss/interview-question/125312/tag/16/apple/
Есть объект, типа "зависимости":


const deps = { 
    "tensorflow": ["nvcc", "gpu", "linux"], 
    "nvcc": ["linux"], 
    "linux": ["core"], 
    "mylib": ["tensorflow"], 
    "mylib2": ["requests"] 
}


Нужно для каждой рутовой зависимости распечатать порядок подгрузки других зависимостей 
То есть, если мы выбираем "tensorflow" — у нее первая зависимость "nvcc"
У "nvcc" — "linux"
У "linux" — "core"
У "core" нет дочерних, значит она и будет первой, а за ней "linux", "nvcc" и тд
Дальше идет "gpu", у которой тоже нет дочерних, значит она будет следующей 

Причем, надо, чтобы зависимости не повторялись 
Если при "nvcc" у тебя уже распечатался "linux", значит, в дальнейшем, второй раз его печатать не нужно
Результат должен быть такой:

// core linux nvcc gpu tensorflow mylib requests mylib2
 */

function flatten(obj) {
  let stack = [];
  let visited = {};

  function defOrder(key) {
    visited[key] = true;
    if (key in obj) {
      for (let item of obj[key]) {
        if (!(item in visited)) {
          defOrder(item);
        }
      }
      stack.push(key);
    } else {
      stack.push(key);
    }
  }

  for (let key of Object.keys(obj)) {
    if (!(key in visited)) {
      defOrder(key);
    }
  }

  return stack;
}

const graph = {
  tensorflow: ['nvcc', 'gpu', 'linux'],
  nvcc: ['linux'],
  linux: ['core'],
  mylib: ['tensorflow'],
  mylib2: ['requests'],
};

// console.log(flatten(graph));

const rubricatorNodes = [
  {
    title: 'Вещи',
    children: [
      {
        title: 'Одежда',
        children: [
          {
            title: 'Мужская',
            children: [
              {
                title: 'худи',
                children: [],
              },
            ],
          },
          {
            title: 'Женская',
            children: [],
          },
        ],
      },
    ],
  },
  {
    title: 'Хобби',
    children: [
      {
        title: 'Велосипеды',
        children: [
          {
            title: 'Горные',
            children: [],
          },
        ],
      },
      {
        title: 'Мангалы',
        children: [],
      },
    ],
  },
  {
    title: 'Транспорт',
    children: [],
  },
];
function getBreadCtumps(data) {
  const store = [];

  const addSegmant = (obj, res) => {
    !!res.length ? (res += ` => ${obj.title}`) : (res += obj.title);
    if (obj.children.length) {
      obj.children.forEach((deepObj) => addSegmant(deepObj, res));
    } else {
      store.push(res);
    }
  };

  data.forEach((deepObj) => addSegmant(deepObj, ''));

  return store.join('\n');
}

// console.log(getBreadCtumps(rubricatorNodes));
// console.log(prettyPrint2(rubricatorNodes));

function prettyPrint(data) {
  let res = [];

  for (let i = 0; i < data.length; i++) {
    let { title, children } = data[i];
    if (!children.length) res.push(title);

    while (children.length) {
      let head = children.shift();
      if (head.children.length) {
        children.push(
          ...head.children.map((i) => ({
            ...i,
            title: `${head.title}->${i.title}`,
          }))
        );
      } else {
        res.push(`${title}->${head.title}`);
      }
    }
  }

  return res;
}

function prettyPrint2(data) {
  let result = [];
  function dfs(node, title) {
    if (node.children.length) {
      for (let c of node.children) {
        dfs(c, `${title}->${c.title}`);
      }
    } else {
      result.push(title);
    }
  }

  for (let i = 0; i < data.length; i++) {
    dfs(data[i], data[i].title);
  }

  return result;
}

/**
 * https://leetcode.com/discuss/interview-question/1031933/amazon-onsite-sde2-package-dependencies
 * https://leetcode.com/discuss/interview-question/339289/uber-phone-screen-block-dependencies
 * https://leetcode.com/problems/course-schedule-ii/
 */
const packDep = {
  A: ['B', 'C'],
  B: ['E'],
  C: ['D', 'E', 'F'],
  D: [],
  F: [],
  G: ['C'],
  E: [],
};

function flattenPackDep(obj) {
  const visited = {};
  const result = [];

  function dfs(key) {
    visited[key] = true;
    if (key in obj) {
      for (let k of obj[key]) {
        if (!(k in visited)) {
          dfs(k);
        }
      }
      result.push(key);
    } else {
      result.push(key);
    }
  }

  for (const pack of Object.keys(obj)) {
    if (!(pack in visited)) {
      dfs(pack);
    }
  }

  return result;
}

// console.log(flattenPackDep(packDep));

/**
 * LeetCode 1910. Remove All Occurrences of a Substring
 * https://leetcode.com/problems/remove-all-occurrences-of-a-substring/
 * https://www.youtube.com/watch?v=d74CJIqw268
 */
var removeOccurrences = function (s, part) {
  let result = '';

  for (let i = 0; i < s.length; i++) {
    result += s[i];
    if (result.slice(result.length - part.length) === part) {
      result = result.slice(0, result.length - part.length);
    }
  }
  return result;
};

// console.log(removeOccurrences('daabcbaabcbc', 'abc'));

/**
 * http://blog.algoprog.ru/inner-loops/
 */
function removeSpace2(str) {
  let res = '';
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== ' ') {
      res += str[i];
    } else {
      if (i === 0 || str[i - 1] !== ' ') {
        res += str[i];
      }
    }
  }

  return res;
}
var removeSpace = (function (str) {
  let res = '';
  let i = 0;
  while (i < str.length) {
    if (str[i] !== ' ') {
      res += str[i];
      i++;
    } else {
      res += ' ';
      while (str[i] === ' ') {
        i++;
      }
    }
  }

  // console.log(removeSpace2(str));
  return res;
})('   ab    cd  e');

var check = function (s) {
  let i = 0;
  let j = s.length - 1;
  while (i < j) {
    if (s[i] === ' ') {
      i++;
      continue;
    }
    if (s[j] === ' ') {
      j--;
      continue;
    }
    if (s[i] !== s[j]) return false;
    i++;
    j--;
  }

  return true;
};
// console.log(check('а роза упала на лапу азора'));

/**
 * 14. Longest Common Prefix
 * https://leetcode.com/problems/longest-common-prefix/
 */
var longestCommonPrefix = function (items) {
  items.sort((a, b) => a.length - b.length);
  let [word] = items;

  while (word.length && !items.every((i) => i.slice(0, word.length) === word)) {
    word = word.slice(0, -1);
  }

  return word.length === 0 ? '' : word;
};

// console.log(longestCommonPrefix(["баба", "бабочка", "бабушка"]));
// console.log(longestCommonPrefix(["flower", "flow", "flight"]));
// console.log(longestCommonPrefix(["dog", "racecar", "car"]));
// console.log(longestCommonPrefix(["reflower", "flow", "flight"]));

/**
 * 1047. Remove All Adjacent Duplicates In String
 * https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/
 */
var removeDuplicates = function (s) {
  let stack = [];
  for (let i of s) {
    if (stack.length && stack.at(-1) === i) {
      stack.pop();
    } else {
      stack.push(i);
    }
  }

  return stack.join('');
};

// console.log(removeDuplicates("abbaca"));
// console.log(removeDuplicates("azxxzy"));

/**
 * 1209. Remove All Adjacent Duplicates in String II
 * https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string-ii/
 * https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string-ii/discuss/510092/JavaScript-stack
 */
var removeDuplicates = function (s, k) {
  function checkIsEqual(k) {
    let count = 0;
    let str = '';
    for (let i = stack.length - 1; i >= 0; i--) {
      if (k === count) break;
      str += stack[i];
      count++;
    }

    return str === stack.at(-1).repeat(k);
  }

  let stack = [];
  let i = 0;

  while (i < s.length) {
    stack.push(s[i]);

    if (stack.length >= k && checkIsEqual(k)) {
      const item = stack.at(-1);
      for (let i = 0; i < k; i++) {
        stack.pop();
      }
      // count - пропускаем кол-во элемнтов равное K
      let count = k;
      while (i < s.length && s[i] === item && count !== 0) {
        count--;
        i += 1;
      }
    } else {
      i += 1;
    }
  }

  return stack.join('');
};
var removeDuplicates = function (s, k) {
  let result = '';
  const stack = [];

  for (let char of s) {
    if (stack.length && stack.at(-1)[0] === char) {
      stack.at(-1)[1] += 1;
      if (stack.at(-1)[1] === k) {
        stack.pop();
      }
    } else {
      stack.push([char, 1]);
    }
  }

  for (let [char, count] of stack) {
    result += char.repeat(count);
  }

  return result;
};
// var removeDuplicates = function (s, k) {};
// console.log(removeDuplicates("abcd", 2));
// console.log(removeDuplicates("deeedbbcccbdaa", 3));
// console.log(removeDuplicates('pbbcggttciiippooaais', 2));
// console.log(
//   removeDuplicates('iiiixxxxxiiccccczzffffflllllllllfffffllyyyyyuuuuuz', 5)
// );
/**
 * zzlllz - no
 * izzlz - yes
 * izzlz
 */

/**
 *
 * https://leetcode.com/problems/remove-all-occurrences-of-a-substring/
 */
var removeOccurrences = function (s, part) {
  function trim(idx) {
    return str.slice(0, idx) + str.slice(idx + part.length);
  }

  let str = s;
  let idx = str.indexOf(part);
  while (idx !== -1) {
    str = trim(idx);
    idx = str.indexOf(part);
  }

  return str;
};

var removeOccurrences2 = function (s, part) {
  let str = s;
  while (str.includes(part)) {
    str = str.replace(part, '');
  }
  return str;
};
// console.log(removeOccurrences('daabcbaabcbc', 'abc'));
// console.log(removeOccurrences('axxxxyyyyb', 'xy'));
// console.log(removeOccurrences('daabcbaabcbc', 'abc'));
// console.log(removeOccurrences('axxxxyyyyb', 'xy'));

/**
 * 283. Move Zeroes
 * https://leetcode.com/problems/move-zeroes/
 * [0,1,0,3,12]
 * [1,0,0,3,12] i = 1, nonzero = 1
 * [1,3,0,0,12] i = 3, nonzero = 2
 * [1,3,0,0,12] i = 4, nonzero = 3
 */
var moveZeroes = function (nums) {
  for (let i = 0, nonZero = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      [nums[i], nums[nonZero]] = [nums[nonZero], nums[i]];
      nonZero++;
    }
  }

  return nums;
};

// console.log(moveZeroes([0, 1, 0, 3, 12]));

/**
 * 1047. Remove All Adjacent Duplicates In String
 * https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/
 */
var removeDuplicates = function (s) {
  let stack = [];

  for (let c of s) {
    if (stack.length && stack.at(-1) === c) {
      stack.pop();
    } else {
      stack.push(c);
    }
  }

  return stack.join('');
};
// console.log(removeDuplicates('abbaca'));

/**
 * 53. Maximum Subarray
 * https://leetcode.com/problems/maximum-subarray/
 * https://www.youtube.com/watch?v=XGMzPg4FCT4
 */
var maxSubArray = function (nums) {
  let max = nums[0];
  let curr = 0;
  for (let n of nums) {
    curr = Math.max(curr + n, n);
    max = Math.max(max, curr);
  }

  return max;
};
// console.log(maxSubArray([5, 4, -1, 7, 8]));

/**
 * 200. Number of Islands
 * https://www.youtube.com/watch?v=cbR3HeEpBrU
 */
var numIslands = function (grid) {
  if (!grid?.length) return;
  let islands = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === '1') {
        islands++;
        dfs(grid, i, j);
      }
    }
  }

  function dfs(grid, i, j) {
    if (
      i < 0 ||
      j < 0 ||
      i >= grid.length ||
      j >= grid[i].length ||
      grid[i][j] === '0'
    ) {
      return;
    }

    grid[i][j] = '0';

    dfs(grid, i - 1, j);
    dfs(grid, i, j - 1);
    dfs(grid, i + 1, j);
    dfs(grid, i, j + 1);
  }

  return islands;
};
// console.log(
//   numIslands([
//     ['1', '1', '1', '1', '0'],
//     ['1', '1', '0', '1', '0'],
//     ['1', '1', '0', '0', '0'],
//     ['0', '0', '0', '0', '0'],
//   ])
// );

/**
 * 252. Meeting Rooms
 * https://leetcode.com/problems/meeting-rooms/
 * https://www.youtube.com/watch?v=XI9L0HDl-No
 */
var canAttendMeetings = function (intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  let [[start, end]] = intervals;

  for (let i = 1; i < intervals.length; i++) {
    let [localStart, localEnd] = intervals[i];

    if (localStart <= end) {
      return false;
    } else {
      end = localEnd;
    }
  }

  return true;
};
// console.log(
//   minMeetingRooms([
//     [0, 30],
//     [5, 10],
//     [15, 20],
//   ])
// );
// console.log(
//   minMeetingRooms([
//     [7, 10],
//     [2, 4],
//   ])
// );

/**
 * 253. Meeting Rooms 2
 * Meeting Rooms II
 * https://osgoodgunawan.medium.com/meeting-room-ii-in-javascript-d478690dd432
 * https://github.com/anatoliy8493/leetcode/blob/main/meeting-rooms-ii/meeting-rooms-ii.js
 */
function minMeetingRooms(intervals) {
  let start = intervals.sort((a, b) => a[0] - b[0]);
  let end = [...intervals].sort((a, b) => a[1] - b[1]);
  let meetingRooms = 0;
  let j = 0;

  for (let i = 0; i < intervals.length; i++) {
    if (start[i][0] < end[j][1]) {
      meetingRooms++;
    } else {
      j++;
    }
  }

  return meetingRooms;
}

/**
 * 435. Non-overlapping Intervals
 * https://leetcode.com/problems/non-overlapping-intervals/
 */
var eraseOverlapIntervals = function (intervals) {
  let result = [...intervals];
  let desc = [...intervals].sort((a, b) => a[0] - b[0]);
  let [[start, end]] = desc;

  for (let i = 1; i < intervals.length; i++) {
    let [localStart, localEnd] = desc[i];
    if (localStart <= end) {
      end = localEnd;
      result = result.filter(([a, b]) => a === start && b === end);
    } else {
      start = localStart;
      end = localEnd;
    }
  }

  return intervals.length - result.length + 1;
};
// console.log(
//   eraseOverlapIntervals([
//     [1, 2],
//     [2, 3],
//     [3, 4],
//     [1, 3],
//   ])
// );
// console.log(
//   eraseOverlapIntervals([
//     [1, 2],
//     [1, 2],
//     [1, 2],
//   ])
// );
// console.log(
//   eraseOverlapIntervals([
//     [1, 2],
//     [2, 3],
//   ])
// );
