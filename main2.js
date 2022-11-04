
class ListNode {
    constructor(value) {
        this.val = value;
        this.next = null;
    }
}

let insertAtHead = function (head, data) {
    let newNode = new ListNode(data);
    newNode.next = head;
    return newNode;
};

let createLinkedList = function (lst) {
    let listHead = null;
    lst.reverse();
    for (let x = 0; x < lst.length; x++) {
        listHead = insertAtHead(listHead, lst[x]);
    }
    return listHead;
};
class Interval {
    constructor(start, end) { this.start = start; this.end = end; }
    get_interval() { return "[" + this.start + ", " + this.end + "]"; }
}
class Node {
    constructor(value, next = null) {
        this.value = value
        this.next = next
    }
}
const merge = function (intervals) {
    if (intervals.length < 2) {
        return intervals
    }
    intervals.sort((a, b) => a.start - b.start);
    merged = []
    let [{ start, end }] = intervals;
    for (let i = 1; i < intervals.length; i++) {
        const interval = intervals[i];
        if (interval.start <= end) {
            end = Math.max(end, interval.end);
        } else {
            merged.push([new Interval(start, end)])
            start = interval.start
            end = interval.end
        }
    }
    merged.push([new Interval(start, end)])
    return merged;
};

// merged_intervals = merge([new Interval(1, 4), new Interval(2, 5), new Interval(7, 9)]);
// console.log(merged_intervals)


let head = new Node(1)
head.next = new Node(2)
head.next.next = new Node(3)
head.next.next.next = new Node(4)
head.next.next.next.next = new Node(5)
head.next.next.next.next.next = new Node(6)

function moveZeroesRight(arr) {
    for (let nonZero = 0, i = 0; i < arr.length; i++) {
        if (arr[i] !== 0) {
            [arr[i], arr[nonZero]] = [arr[nonZero], arr[i]]
            nonZero++
        }
    }

    return arr;
}
function moveZeroesLeft(arr) {
    let writeIndex = arr.length - 1;
    let readIndex = arr.length - 1;

    while (readIndex >= 0) {
        if (arr[readIndex] !== 0) {
            [arr[writeIndex], arr[readIndex]] = [arr[readIndex], arr[writeIndex]]
            writeIndex--
        }
        readIndex--
    }

    while (writeIndex >= 0) {
        arr[writeIndex] = 0
        writeIndex--
    }

    return arr
}

function remove_duplicates(arr) {
    let count = 0
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] === arr[i + 1]) {
            count++
        }
    }

    return (arr.length - count)
}

function make_squares(arr) {
    let res = Array(arr.length).fill(0);
    let l = 0
    let r = arr.length - 1;
    let idx = arr.length - 1
    while (l <= r) {
        let sum1 = arr[l] * arr[l]
        let sum2 = arr[r] * arr[r]
        if (sum1 > sum2) {
            res[idx] = sum1
            l++
        } else {
            res[idx] = sum2
            r--
        }
        idx--
    }

    return res
}

function has_cycle(head) {
    let slow = head
    let fast = head

    while (fast?.next !== null) {
        slow = slow.next
        fast = fast.next.next
        if (slow === fast) return true
        // if (slow === fast) return calculate_cycle_length(slow)
    }

    return false
}

function calculate_cycle_length(head) {
    let current = head
    let count = 0
    while (true) {
        current = current.next
        count++
        if (current === head) break
    }

    return count
}

function cyclic_sort(nums) {
    let i = 0
    while (i <= nums.length) {
        const j = nums[i] - 1;
        if (nums[i] !== nums[j]) {
            [nums[i], nums[j]] = [nums[j], nums[i]]
        } else {
            i++
        }
    }

    return nums
}

function palidrome3(str) {
    let len = (str.length / 2) | 0

    for (let i = 0; i < len; i++) {
        if (str[i] !== str.at(-1 - i)) return false;
        return true
    }
}

console.log(palidrome3('racecar'));

function promiseGet(url) {
    return new Promise((resolve, reject) => {
        http.get(url, function (err, respone) {
            if (err) reject(err);
            resolve(respone)
        })
    })
}

function intersection(arr1, arr2) {
    let s = new Set(arr1);

    for (let i of s) {
        if (!arr2.includes(i)) {
            s.delete(i);
        }
    }

    return [...s]
}

function isPalindrome(str) {
    let s = str.replace(/[^a-z0-9]/gi, '').toLowerCase();
    let l = 0;
    let r = s.length - 1;

    while (l < r) {
        if (s[l] !== s[r]) return false
        l++
        r--
    }

    return true
}

function mergeTwoLists(l1, l2) {
    if (!l1 || !l2) return l1 || l2

    // если л1 меньше l2
    if (l1.val < l2.val) {
        l1.next = mergeTwoLists(l1.next, l2);
        return l1
    } else {
        l2.next = mergeTwoLists(l1, l2.next)
        return l2
    }
}
// console.log(mergeTwoLists(createLinkedList([1, 2, 4]), createLinkedList([1, 3, 4])));

// [1,2,3,4,5]
// [5,4,3,2,1]
function reverseList(head) {
    let prev = null
    let curr = head
    let next = null

    /**
     * 1 curr нужно двигать чтобы не был бесконечный цикл те next = curr.next и curr = next
     * 
    */
    while (curr) {
        next = curr.next
        curr.next = prev
        prev = curr
        curr = next
    }

    return prev
}

// const reverseList = function (head) {
//     return revList(null, head);
// };

// function revList(prev, current) {
//     let head = current
//     if (current.next !== null) {
//         head = revList(current, current.next)
//     }
//     current.next = prev
//     return head
// }

const numJewelsInStones = function (jewels, stones) {
    const m = new Map();
    let count = 0;

    for (let i = 0; i < jewels.length; i++) {
        m.set(jewels[i], i);
    }

    for (let i = 0; i < stones.length; i++) {
        if (m.has(stones[i])) {
            count++
        }
    }

    return count
};

// console.log(numJewelsInStones('aA', 'aAAbbbb'))

function isSubsequence(s, t) {
    let len = 0
    for (let i = 0; i < t.length; i++) {
        if (t[i] === s[len]) len++
    }

    return len === s.length
}
// console.log(isSubsequence('axc', 'ahbgdc'))
// console.log(isSubsequence('abc', 'ahbgdc'))
// console.log(isSubsequence('ace', 'abcde'))
// console.log(isSubsequence('aec', 'abcde'))
// console.log(isPalindrome('A man, a plan, a canal: Panama'))

function firstUniqChar(s) {
    for (let i = 0; i < s.length; i++) {
        let v = s[i];
        if (s.indexOf(v) === s.lastIndexOf(v)) return i
    }

    return -1;
}

// console.log(firstUniqChar('loveleetcode'))

function isSymmetric(root) {
    return isMirror(root, root);

    function isMirror(n1, n2) {
        if (!n1 && !n2) return true
        if (!n1 || !n2) return false

        return (
            n1.val === n2.val && isMirror(n1.right, n2.right) && isMirror(n1.left, n2.right)
        )
    }
}

        // console.log(intersection([4, 9, 5], [9, 4, 9, 8, 4]));
        // console.log(intersection([1,2,2,1], [2,2]));

        // console.log(cyclic_sort([3, 1, 5, 4, 2]));
        // console.log(cyclic_sort([2, 6, 4, 3, 1, 5]));
        // console.log(cyclic_sort([1, 5, 6, 4, 3, 2]));

        // console.log(moveZeroesRight([0, 1, 0, 3, 12, 0]));
        // console.log(moveZeroesLeft([1, 10, 20, 0, 59, 63, 0, 88, 0]));

        // console.log(remove_duplicates([2, 3, 3, 3, 6, 9, 9]));
        // console.log(remove_duplicates([2, 2, 2, 11]));

        // console.log(`Squares: ${make_squares([-2, -1, 0, 2, 3])}`);
        // console.log(`Squares: ${make_squares([-3, -1, 0, 1, 2])}`);
        // head.next.next.next.next.next.next = head.next.next;
        // console.log(has_cycle(head));
