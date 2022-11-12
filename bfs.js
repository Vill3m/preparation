export class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const traverse = function (root) {
  const result = [];
  const queue = [root];
  while (queue.length) {
    const { length } = queue;

    const localRes = [];
    for (let i = 0; i < length; i++) {
      const currentNode = queue.shift();
      localRes.push(currentNode.value);

      if (currentNode.left) {
        queue.push(currentNode.left);
      }
      if (currentNode.right) {
        queue.push(currentNode.right);
      }
    }

    result.push(localRes);
  }
  return result;
};

const zigzag = function (root) {
  const result = [];
  const queue = [root];
  let direction = false;

  while (queue.length) {
    const { length } = queue;
    const localRes = [];

    for (let i = 0; i < length; i++) {
      const currentNode = queue.shift();

      if (direction) {
        localRes.push(currentNode.value);
      } else {
        localRes.unshift(currentNode.value);
      }

      if (currentNode.left) {
        queue.push(currentNode.left);
      }
      if (currentNode.right) {
        queue.push(currentNode.right);
      }
    }

    result.push(localRes);
    direction = !direction;
  }
  return result;
};

const findLvlAvg = function (root) {
  const result = [];
  const queue = [root];

  while (queue.length) {
    const { length } = queue;
    let sum = 0;

    for (let i = 0; i < length; i++) {
      const node = queue.shift();
      sum += node.value;
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }

    result.push(sum / length);
  }

  return result;
};

const findMinDepth = function (root) {
  const queue = [root];
  let depth = 0;

  while (queue.length) {
    depth++;

    const { length } = queue;
    for (let i = 0; i < length; i++) {
      const node = queue.shift();
      if (!node.left && !node.right) {
        return depth;
      }
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
  }
};

function findSuccessor(root, key) {
  const queue = [root];

  while (queue.length) {
    const node = queue.shift();
    if (node.left) {
      queue.push(node.left);
    }
    if (node.right) {
      queue.push(node.right);
    }

    if (node.value === key) break;
  }

  return queue.at(-1);
}

export var root = new TreeNode(12);
root.left = new TreeNode(7);
root.right = new TreeNode(1);
root.left.left = new TreeNode(9);
root.right.left = new TreeNode(10);
root.right.right = new TreeNode(5);
// console.log(traverse(root));
// console.log(zigzag(root));
// console.log(findLvlAvg(root));
// console.log(findMinDepth(root));
