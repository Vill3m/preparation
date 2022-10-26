/**
 * https://devtools.tech/questions/s/how-to-implement-custom-map-function-with-limit-on-number-of-operations-or-javascript-interview-questions-or-frontend-problem-solving---qid---ZVNw2lUMguEZIsnvzjC1
 */

function getUserById(id, callback) {
  const randomRequestTime = Math.floor(Math.random() * 100) + 200;

  setTimeout(() => {
    callback('User' + id);
  }, randomRequestTime);
}

const fetch = (url) =>
  new Promise((resolve, reject) => {
    setTimeout(
      Math.random() > 0.2 ? resolve : reject,
      100 + Math.floor(Math.random() * 1000),
      url
    );
  });

function mapLimit(inputs, limit, iterateeFn, callback) {
  let index = 0;
  const outputs = [];

  function postCompletionCallback(output) {
    outputs.push(output);

    if (outputs.length === inputs.length) {
      callback(outputs);
    }

    if (index >= inputs.length) {
      return;
    }

    iterateeFn(inputs[index], postCompletionCallback);
    index += 1;
  }

  while (index < limit) {
    iterateeFn(inputs[index], postCompletionCallback);
    index += 1;
  }
}

// mapLimit([1, 2, 3, 4, 5], 4, getUserById, (allResults) => {
//   console.log('111-output:', allResults); // ["User1", "User2", "User3", "User4", "User5"]
// });

// mapLimit3([1, 2, 3, 4, 5], 4, getUserById, (allResults) => {
//   console.log('333-output:', allResults); // ["User1", "User2", "User3", "User4", "User5"]
// });

function mapLimit3(arr, limit, iterator, cb) {
  let count = limit;
  let result = [];
  const next = (id) => {
    if (!id) return;
    result.push(id);
    if (result.length === arr.length) cb(result);
    if (count > arr.length) {
      return;
    }
    iterator(arr[count], next);
    count++;
  };
  for (let i = 0; i < limit; i++) {
    iterator(arr[i], next);
  }
}
