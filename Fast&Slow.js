export class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

function hasCycle(head) {
  let slow = head;
  let fast = head;
  while (fast?.next?.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      return true;
    }
  }

  return false;
}

/**
 * 142. Linked List Cycle II (two pointer, set)
 * https://leetcode.com/problems/linked-list-cycle-ii/discuss/2482351/Easy-oror-0-ms-oror-100-oror-Fully-Explained-oror-Java-C%2B%2B-Python-JS-C-Python3-oror-2-Pointers-and-HashSet
 * https://leetcode.com/problems/linked-list-cycle-ii/discuss/2713350/javascript-simple-solution-with-explanation-and-O(n)-time-complexity
 */
var findCycleStart = function (head) {
  let slow = head;
  let fast = head;
  while (fast?.next) {
    fast = fast.next.next;
    slow = slow.next;
    if (fast === slow) break;
  }

  if (!fast?.next) return null;

  while (head !== slow) {
    head = head.next;
    slow = slow.next;
  }

  return head;
};

var findCycleStart = function (head) {
  let set = new Set();
  while (head) {
    if (set.has(head)) return head;
    set.add(head);
    head = head.next;
  }

  return head;
};

var findHappyNumber = function (num) {
  let slow = num;
  let fast = num;
  while (true) {
    slow = findSquare(slow);
    fast = findSquare(findSquare(fast));
    if (slow === fast) break;
  }

  return slow === 1;

  function findSquare(num) {
    /**
     * получить последнию цифру это отстаток от деления %
     * удалить последнию циру это поделить на 10
     */
    let sum = 0;
    while (num > 0) {
      let lastNum = num % 10;
      sum += lastNum * lastNum;
      num = (num / 10) | 0;
    }

    return sum;
  }
};

var findHappyNumber = function (num) {
  let s = new Set();
  let n = num;
  while (true) {
    if (s.has(n)) return false;
    if (n === 1) return true;
    s.add(n);
    n = findSquare(n);
  }

  function findSquare(num) {
    let sum = 0;
    while (num > 0) {
      let lastDigit = num % 10;
      sum += lastDigit * lastDigit;
      num = (num / 10) | 0;
    }
    return sum;
  }
};
// console.log(findHappyNumber(23));
// console.log(findHappyNumber(12));

var findMiddleOfLinkedList = function (head) {
  let slow = head;
  let fast = head;
  while (fast?.next) {
    fast = fast.next.next;
    slow = slow.next;
  }

  return slow;
};

let head = new Node(1);
head.next = new Node(2);
head.next.next = new Node(3);
head.next.next.next = new Node(4);
head.next.next.next.next = new Node(5);
head.next.next.next.next.next = new Node(6);
// console.log(hasCycle(head));
// console.log(findCycleStart(head)?.value);
head.next.next.next.next.next.next = head.next.next;
// console.log(hasCycle(head));
// console.log(findCycleStart(head)?.value);
head.next.next.next.next.next.next = head.next.next.next;
// console.log(hasCycle(head));
// console.log(findCycleStart(head)?.value);
head.next.next.next.next.next.next = head;
