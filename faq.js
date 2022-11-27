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
