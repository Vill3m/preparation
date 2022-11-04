function sequence(thunks) {
  return function (handler) {
    const composed = thunks.reduce((prev, next) => {
      return (cb) => {
        prev((err, data) => next(cb, data));
      };
    });
    composed(handler);
  };
}

function parallel(thunks) {
  const result = [];
  return function (handler) {
    const onResolve = (err, data) => {
      result.push(data);
      if (result.length === thunks.length) {
        handler(null, result);
      }
    };
    for (const thunk of thunks) {
      thunk(onResolve);
    }
  };
}

function race(thunks) {
  let result;
  return function (handler) {
    const onResolve = (err, data) => {
      if (!result) {
        result = data;
        handler(null, result);
      }
    };
    for (const thunk of thunks) {
      thunk(onResolve);
    }
  };
}

var getUser = function (userId) {
  return function (cb) {
    setTimeout(function () {
      cb(null, { userId: userId, name: 'Joe' });
    }, Math.random() * 100);
  };
};

var upperCaseName = function (cb, user) {
  cb(null, user.name.toUpperCase());
};
var lowerCaseName = function (cb, user) {
  cb(null, user.toLowerCase());
};
var userThunk = getUser(22);

sequence([userThunk, upperCaseName, lowerCaseName])(function (err, data) {
  console.log(data); // joe
});

var userThunk1 = getUser(1);
var userThunk2 = getUser(2);

parallel([userThunk1, userThunk2])(function (err, users) {
  console.log(users); // [ { userId: 1, name: 'Joe' }, { userId: 2, name: 'Joe' } ]
});

var faster = function (cb) {
  setTimeout(cb.bind(null, null, "I'm faster"), 10);
};
race([userThunk1, faster])(function (err, winner) {
  console.log(winner); // I'm faster
});
