const fetch = (url) =>
  new Promise((resolve, reject) => {
    console.log(url);
    setTimeout(
      Math.random() > 0.2 ? resolve : reject,
      100 + Math.floor(Math.random() * 1000),
      url
    );
  });
const parallelLimit = (urls, limit, callback) => {
  let l = urls.length;
  let i = l;
  let count = 0;
  let r = [];
  const cache = {};
  const req = () => {
    const j = --i;
    // console.log('req', j);
    if (!cache[urls[j]]) {
      count++;
      cache[urls[j]] = fetch(urls[j])
        .catch(() => null)
        .finally(() => count--);
    }
    cache[urls[j]].then((data) => {
      r[j] = data;
      // console.log(data, l, j);
      l--;
      if (i) {
        req();
      } else if (!l) {
        callback(r);
      }
    });
  };
  while (count < limit && count < l) {
    req();
  }
};

// parallelLimit(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'], 2, console.log);
