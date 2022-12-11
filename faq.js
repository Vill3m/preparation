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

// console.log(flattenR(tree));

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
// runPromiseInSequence(promiseArr, 10).then(console.log); // 1200

function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return curried.bind(this, ...args);
    }
  };
}

// function curry(fn) {
//   return function curried(...args) {
//     if (args.length >= fn.length) {
//       return fn.apply(this, args);
//     } else {
//       return function (...args2) {
//         return curried.apply(this, args.concat(args2));
//       };
//     }
//   };
// }

// function curry(fn) {
//   const length = fn.length;
//   return function currify() {
//     const context = this;
//     const args = Array.prototype.slice.call(arguments);
//     if (args.length >= length) {
//       return fn.call(context, ...args);
//     } else {
//       return currify.bind(context, ...args);
//     }
//   };
// }

function sum(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sum);

// console.log(curriedSum(1, 2, 3)); // 6, still callable normally
// console.log(curriedSum(1)(2, 3)); // 6, currying of 1st arg
// console.log(curriedSum(1)(2)(3)); // 6, full currying
var now1 = performance.now();
const start = function () {
  let now2 = performance.now();

  requestAnimationFrame((after) =>
    console.log({
      after,
      now1,
      now2,
      now3,
    })
  );
};
var now3 = performance.now();
// start();

function Archiver() {
  let temperature = null;
  const archive = [];

  Object.defineProperty(this, 'temperature', {
    get() {
      console.log('get');
      return temperature;
    },
    set(value) {
      temperature = value;
      archive.push({
        val: temperature,
      });
    },
  });

  this.getArchive = () => {
    console.log(archive);
    return archive;
  };
}

// const arc = new Archiver();
// arc.temperature; // 'get!'
// arc.temperature = 11;
// arc.temperature = 13;
// arc.getArchive(); // [{ val: 11 }, { val: 13 }]

/**
 * undeclared
 * Uncaught ReferenceError: x is not defined
 * Необъявленные переменные создаются, когда вы присваиваете значение идентификатору, который ранее не был создан с помощью var, let или const.
 * В строгом режиме при попытке присвоения необъявленной переменной будет выдана ошибка ReferenceError или 1 в примере ниже.
 */
// function foo() {
//   x = 1;
// }
// foo();
// console.log(x);

/**
 * Explain "hoisting".
 * Однако поднимается только декларация, значение (если оно есть) остается на месте.
 * console.log(foo); // undefined
 * var foo = 1;
 * console.log(foo); // 1
 */

/**
 * implement bind
 */
Function.prototype.bind = function (ctx) {
  const fn = this;
  return (...args) => fn.apply(ctx, args);
};
function test(b, c) {
  console.log({
    a: this.a,
    b,
    c,
  });
}

var fn = test.bind({ a: 'Hello ' });
// fn(1, 2);

/**
 * implement promisify
 * function(result) {}
 * const exampleFn = function(x,y, callback) {}
 * const promisified = promisify(exampleFn);
 * promisified.then().then()...
 */
function promisify(fn) {
  return (...args) => {
    return new Promise((resolve) => {
      function cb(result) {
        resolve(result);
      }
      fn.apply(this, args.concat(cb));
    });
  };
}

var exampleFn = function (a, b, cb) {
  cb(a, b);
};
var promisified = promisify(exampleFn);
// promisified(5, 15).then(console.log);

function Foo() {}
class Bar extends Array {}
console.log({
  Bar,
  Foo,
  prototype: Foo.prototype,
  proto: Foo.__proto__,
});

/**
 * Event Delegation
 */
document.getElementById('event-delegation').addEventListener('click', (e) => {
  if (e.target?.nodeName === 'LI') {
    console.log(e.target.id.replace('post-', ''));
    if (e.target.matches('#post-1')) {
      console.log('find one');
    }
  }
});

var duplicate = function (arr = []) {
  return [...arr, ...arr];
};

var fizzbuzz = function () {
  // for (let i = 1; i <= 100; i++) {
  //   let f = i % 3 == 0,
  //     b = i % 5 == 0;
  //   console.log(f ? (b ? 'FizzBuzz' : 'Fizz') : b ? 'Buzz' : i);
  // }

  for (let i = 0; i <= 100; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      console.log('fizzbuzz');
    } else if (i % 5 === 0) {
      console.log('buzz');
    } else if (i % 3 === 0) {
      console.log('fizz');
    } else {
      console.log(i);
    }
  }
};

fizzbuzz();
