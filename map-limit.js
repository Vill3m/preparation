/**
 * https://codesandbox.io/s/maplimit-6rmopi?file=/src/index.js
 * https://codesandbox.io/s/limit-requests-urnng0?file=/src/index.js
 */
const fetch = (url) =>
  new Promise((resolve, reject) => {
    console.log(url);
    setTimeout(
      Math.random() > 0.2 ? resolve : reject,
      100 + Math.floor(Math.random() * 1000),
      url
    );
  });

function mapLimit(arr, limit, fn, cb) {
  let running = limit;
  let result = [];
  function doWork(id) {
    if (!id) return;
    result.push(id);
    if (result.length === arr.length) cb(result);
    if (running > arr.length) return;
    fn(arr[running], doWork);
    running++;
  }

  for (let i = 0; i < limit; i++) {
    fn(arr[i], doWork);
  }
}

function mapLimitPromise(arr, limit, fn, cb) {
  let running = limit;
  let result = [];
  function doWork(id) {
    if (!id) return;
    result.push(id);
    if (result.length === arr.length) cb(result);
    if (running > arr.length) return;
    fn(arr[running]).then(doWork).catch(console.error);
    running++;
  }

  for (let i = 0; i < limit; i++) {
    fn(arr[i]).then(doWork).catch(console.error);
  }
}

// mapLimitPromise(
//   ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'],
//   5,
//   fetch,
//   console.log
// );
