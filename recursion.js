var factorial = function (n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
};

var factorial = function (n, total = 1) {
  if (n <= 1) return total;
  return factorial(n - 1, n * total);
};

console.log(factorial(5));

const createCounter = (tag) => (count) => ({
  inc() {
    ++count;
  },
  dec() {
    --count;
  },
  val() {
    console.log(`${tag}: ${count}`);
  },
});

const promoCounter = createCounter('promo');
const work = promoCounter(0);
work.inc();
work.inc();
work.inc();
work.val();

const memo =
  (fn, cache = new Map()) =>
  (param) => {
    if (!cache.has(param)) {
      cache.set(param, fn(param));
    }
    return cache.get(param);
  };
const f = memo((x) => x * Math.sin(1 / x));
f(0.314);
f(0.314);

const words = (str) => str.toLowerCase().match(/[а-яё]+/g);

function pipe(...fns) {
  return (x) => fns.reduce((value, fn) => fn(value), x);
}

function compose(...fns) {
  return (x) => fns.reduceRight((value, fn) => fn(value), x);
}

function partial(fn, ...apply) {
  return (...args) => fn(...apply, args);
}

function curry(fn) {
  return (...args) =>
    args.length >= fn.length ? fn(...args) : curry(fn.bind(null, args));
}

function impure(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
