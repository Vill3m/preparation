import { TreeNode } from './bfs.js';

var root = new TreeNode(12);
root.left = new TreeNode(7);
root.right = new TreeNode(1);
root.left.left = new TreeNode(4);
root.right.left = new TreeNode(10);
root.right.right = new TreeNode(5);

const hasPath = function (root, sum) {
  if (!root) return false;
  // если текущий узел является листом и его значение равно сумме, то мы нашли путь
  if (root.value === sum && !root.left && !root.right) return true;

  return (
    hasPath(root.left, sum - root.value) ||
    hasPath(root.right, sum - root.value)
  );
};
// console.log(hasPath(root, 23));
// console.log(hasPath(root, 16));

const findPath = function (root, sum) {
  const allPath = [];

  function process(node, sum, localRes, path) {
    if (!node) return;
    localRes.push(node.value);
    if (node.value === sum && !node.left && !node.right) {
      path.push([...localRes]);
    } else {
      process(node.left, sum - node.value, localRes, path);
      process(node.right, sum - node.value, localRes, path);
    }
    localRes.pop();
  }

  process(root, sum, [], allPath);
  return allPath;
};
// console.log(findPath(root, 23));

/**
 * https://leetcode.com/problems/binary-tree-paths/
 * 257. Binary Tree Paths
 */
var root2 = new TreeNode(1);
root2.left = new TreeNode(0);
root2.right = new TreeNode(1);
root2.left.left = new TreeNode(1);
root2.right.left = new TreeNode(6);
root2.right.right = new TreeNode(5);

var binaryTreePaths = function (root) {
  const path = [];

  function process(node, localRes, path) {
    if (!node) return;
    localRes.push(node.value);
    if (!node.right && !node.left) {
      path.push([...localRes]);
    } else {
      process(node.left, localRes, path);
      process(node.right, localRes, path);
    }
    localRes.pop();
  }
  process(root, [], path);
  return path;
};

var findSumOfPathNumbers = function (root) {
  let result = binaryTreePaths(root);

  return result.reduce((acc, prev) => {
    let nums = Number(prev.join(''));
    acc += nums;
    return acc;
  }, 0);
};

// console.log(findSumOfPathNumbers(root2));

/**
 * 129. Sum Root to Leaf Numbers
 * https://leetcode.com/problems/sum-root-to-leaf-numbers/
 */
var sumNumbers = function (root) {
  const path = [];

  function process(node, localRes, path) {
    if (!node) return;
    localRes.push(node.val);
    if (!node.left && !node.right) {
      path.push([...localRes]);
    } else {
      process(node.left, localRes, path);
      process(node.right, localRes, path);
    }
    localRes.pop();
  }

  process(root, [], path);

  return path.reduce((acc, prev) => {
    let nums = Number(prev.join(''));
    acc += nums;
    return acc;
  }, 0);
};

var sumNumbers = function (root, pathSum = 0) {
  if (!root) return 0;
  pathSum = 10 * pathSum + root.value;
  if (!root.left && !root.right) return pathSum;
  // обход левого и правого поддерева
  return sumNumbers(root.left, pathSum) + sumNumbers(root.right, pathSum);
};

/**
 * TODO
 * 988. Smallest String Starting From Leaf
 * https://leetcode.com/problems/smallest-string-starting-from-leaf/
 */
var smallestFromLeaf = function (root) {
  const path = [];

  function process(node, localRes, path) {
    if (!node) return;
    localRes.push(node.val);
    if (!node.left && !node.right) {
      path.push([...localRes]);
    } else {
      process(node.left, localRes, path);
      process(node.right, localRes, path);
    }
    localRes.pop();
  }

  process(root, [], path);

  path.reverse();

  let temp = path.flatMap((a) =>
    a.map((s) => String.fromCharCode(97 + s)).join('')
  );

  temp.sort((a, b) => a - b);

  return temp.at(0);
};

/**
 * 1430. Check If a String Is a Valid Sequence from Root to Leaves Path in a Binary Tree
 * https://leetcode.ca/all/1430.html
 */
var root2 = new TreeNode(0);
root2.right = new TreeNode(0);
root2.right.right = new TreeNode(0);

root2.left = new TreeNode(1);
root2.left.left = new TreeNode(0);
root2.left.left.left = new TreeNode(1);

root2.left.right = new TreeNode(1);
root2.left.right.right = new TreeNode(0);
root2.left.right.left = new TreeNode(0);

var findPath2 = function (root, sequence) {
  const path = binaryTreePaths(root);
  for (let p of path) {
    let result = p.every((val, idx) => {
      return val === sequence[idx];
    });

    if (result) return result;
  }
  return false;
};
// не работает!!!
var findPath3 = function (root, sequence, idx = 0) {
  if (!root) return false;
  if (idx >= sequence.length || root.value !== sequence[idx]) return false;
  if (!root.left && !root.right && idx === sequence.length - 1) return true;
  return (
    findPath3(root.left, sequence, idx + 1) ||
    findPath3(root.right, sequence, idx + 1)
  );
};

// console.log(findPath3(root2, [0, 1, 0, 1]));
// console.log(findPath2(root2, [1, 1, 6]));

var pathSum = function (root, targetSum) {
  const path = binaryTreePaths(root);
};
