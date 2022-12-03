/**
 * generage hex color
 * from https://thisthat.dev/
 */

const color = `${Math.random().toString(16).slice(2, 8).padEnd(6, '0')}`;

const xhr = new XMLHttpRequest();
xhr.open('GET', '/bar/foo.txt', true);
xhr.onload = function (e) {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      console.log(xhr.responseText);
    } else {
      console.error(xhr.statusText);
    }
  }
};

xhr.onerror = function (e) {
  console.error(xhr.statusText);
};

// xhr.send(null)

const obj = {};
Object.defineProperty(obj, 'method', {
  value: function () {},
  writable: true,
  enumerable: true,
  configurable: true,
});
Object.defineProperty(obj, 'prop', {
  get() {
    return this.data;
  },
  set(val) {
    this.data = val;
  },
  enumerable: true,
  configurable: true,
});

// console.log(obj);

function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// console.log(randomRange(5, 15));

const debounce = (fn, ms) => {
  let timeoutId = null;
  return (...args) => {
    // if (timeoutId) return;

    const process = () => {
      fn.apply(this, args);
      clearTimeout(timeoutId);
      timeoutId = null;
    };
    clearTimeout(timeoutId);
    timeoutId = setTimeout(process, ms);
  };
};

// function debounce(f, ms) {
//   let isCooldown = false;

//   return function () {
//     if (isCooldown) return;

//     f.apply(this, arguments);

//     isCooldown = true;

//     setTimeout(() => (isCooldown = false), ms);
//   };
// }

const user = {
  firstName: 'bob',
};
function fetch(url) {
  console.log(`fetching ${url}...`, this.firstName);
}

// const f = debounce(fetch.bind(user), 300);
// f(1);
// f(2);
// f(3);
// f(4);
// f(5);

const tree = {
  value: 1,
  children: [
    {
      value: 2,
      children: [{ value: 3 }],
    },
    {
      value: 4,
      children: [{ value: 5 }, { value: 6 }],
    },
  ],
};

function flatten(root) {
  let queue = [root];
  let result = [];

  while (queue.length) {
    let node = queue.shift();
    result.push(node.value);
    if (node.children) {
      queue.push(...node.children);
    }
  }

  return result;
}

function flattenR(root) {
  let result = [];

  function process(node) {
    result.push(node.value);
    if (Array.isArray(node.children)) {
      for (let c of node.children) {
        process(c, result);
      }
    }
  }

  process(root);
  return result;
}

console.log(flattenR(tree));

function p1(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 5);
  });
}

// promise function 2
function p2(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 2);
  });
}

// function 3 - will be wrapped in a resolved promise by .then()
function f3(a) {
  return a * 3;
}

// promise function 4
function p4(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 4);
  });
}

function runPromiseInSequence(arr = [], input) {
  return arr.reduce((promise, fn) => {
    return promise.then(fn);
  }, Promise.resolve(input));
}

const promiseArr = [p1, p2, f3, p4];
runPromiseInSequence(promiseArr, 10).then(console.log); // 1200
