export class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

let head = new Node(1);
head.next = new Node(2);
head.next.next = new Node(3);
head.next.next.next = new Node(4);
head.next.next.next.next = new Node(5);
head.next.next.next.next.next = new Node(6);
// console.log(hasCycle(head));
head.next.next.next.next.next.next = head.next.next;
// console.log(hasCycle(head));
head.next.next.next.next.next.next = head.next.next.next;
// console.log(hasCycle(head));

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
