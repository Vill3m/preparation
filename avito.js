// Написать, что выводиться в консоль
let x = { a: 1, b: 2 };

function fn1(x) {
  x.a = 5;
}

function fn2() {
  x.a = 5;
}

function fn3(x) {
  x = 5;
}

function fn4() {
  x = 5;
}

fn1(x);
console.log(x); // {a: 5, b: 2}

fn2(x);
console.log(x); // {a: 5, b: 2}

fn3(x);
console.log(x); // {a: 5, b: 2}

fn4(x);
console.log(x); // 5

// Написать, что выводится в консоль
// ---------------------------

function fn() {
  console.log('hello'); // 1

  setTimeout(function () {
    console.log('setTimeout1'); // 6
  }, 0);

  new Promise(function (resolve) {
    console.log('111'); // 2
    resolve();
  })
    .then(function () {
      console.log('then1'); // 4
    })
    .then(function () {
      console.log('then2'); // 5
    });

  console.log('bye'); // 3
}

fn();

// Написать свой небольшой жкверь, который будет на вход принимать селектор и производить некие мунипуляции со списком нод, которые можно соединять цепочкой
// ------------------------------

// Задание
const $node = $('.js-node');

$node
  .addClass('node')
  .toggleClass('item')
  .removeClass('node')
  .css({
    color: 'red',
    paddingTop: '10px',
  })
  .html('<li>hello</li>');

// Решение
class Node {
  constructor(classSelector) {
    this.nodeList = document.querySelectorAll(classSelector);
  }

  addClass(className) {
    this.nodeList.forEach((node) => {
      node.classList.add(node);
    });

    return this;
  }

  toggleClass(className) {
    this.nodeList.forEach((node) => {
      node.classList.toggle(className);
    });

    return this;
  }

  removeClass(className) {
    this.nodeList.forEach((node) => {
      node.classList.remove(className);
    });

    return this;
  }

  css(styles) {
    Object.keys(styles).map((key) => {
      this.nodeList.forEach((node) => {
        node.style[key] = styles[key];
      });
    });

    return this;
  }

  html(inputHtml) {
    this.nodeList.forEach((node) => {
      node.innerHtml = inputHtml;
    });

    return this;
  }
}

function $(selector) {
  return new Node(selector);
}

// 1 ЗАДАЧА
/*
На сайте есть рубрикатор:
Вещи
    Одежда
        Мужская
        Женская
Хобби
    Велосипеды
        Горные
    Мангалы
Транспорт

Надо распечатать конечные узлы рубрикатора (у которых нет детей) с полным путем Ожидаемый вывод:
Вещи => Одежда => Мужская
Вещи => Одежда => Женская
Хобби => Велосипеды => Горные
Хобби => Мангалы
Транспорт
*/

const tree = [
  {
    title: 'Вещи',
    children: [
      {
        title: 'Одежда',
        children: [
          { title: 'Мужская', children: [] },
          { title: 'Женская', children: [] },
        ],
      },
    ],
  },
  {
    title: 'Хобби',
    children: [
      { title: 'Велосипеды', children: [{ title: 'Горные', children: [] }] },
      { title: 'Мангалы', children: [] },
    ],
  },
  { title: 'Транспорт', children: [] },
];

const process = (node, acc = '') => {
  if (!node.children && acc !== '') {
    return console.log(node.title);
  }

  const newaAcc = `${acc} => ${node.title}`;

  if (!node.children) {
    return console.log(newaAcc);
  }

  node.children.map((childNode) => process(childNode, newaAcc));
};

const result = tree.map((childNode) => process(childNode));

// 2 ЗАДАЧА

/*
Условие задачи
Есть мапа библиотек и их зависимостей. Надо распечатать библиотеки в порядке правильного импорта. 
Неправильный порядок - если печатаешь библиотеку, а ее зависимость еще не напечатана. 
Все остальные порядки правильные
NB: Циклических зависимостей во входных данных нет

Входные параметры
Словарик: ключ - библиотека, значение - массив библиотек-зависимостей

Вывод
Зависимости в любом правильном порядке

Примеры

Ввод
deps = {
    ‘tensorflow’: ['nvcc', 'gpu', 'linux'],
    'nvcc': ['linux'],
    'linux': ['core'],
    'mylib': ['tensorflow'],
    'mylib2': ['requests']
}

Вывод
core linux nvcc gpu tensorflow mylib requests mylib2
*/
// Сначала попробовал без рекурсии — херовая идея
// const processMap = (inputMap) => {
//     const output = [];
//     const libNames = Object.keys(inputMap);

//     libNames.forEach((libName) => {
//         inputMap[libname].map((depName) => {
//             if (output.includes(depName)) {
//                 return;
//             }

//             output.push(depName);
//         });

//         if (output.includes(libName)) {
//             return;
//         }

//         output.push(libName);
//     });

//     return output;
// };

// deps = {
//     ‘tensorflow’: ['nvcc', 'gpu', 'linux'],
//     'nvcc': ['linux'],
//     'linux': ['core'],
//     'mylib': ['tensorflow'],
//     'mylib2': ['requests']
// }

// С рекурсией норм
const processMap = (inputMap) => {
  const libNames = Object.keys(inputMap);
  const output = [];

  const iterator = (dependencies) => {
    dependencies.map((depName) => {
      if (output.includes(depName)) {
        return;
      }

      if (libNames.includes(depName)) {
        iterator(inputMap[depName]);
      }

      output.push(depName);
    });
  };

  libNames.forEach((libName) => {
    iterator(inputMap[libName]);
  });

  return output;
};

// Можно еще так решить

const processMap2 = (inputMap) => {
  const keys = Object.keys(inputMap);
  const stack = [];
  const colors = {};
  const output = [];

  const dfs = (startingVertex) => {
    stack.push(startingVertex);

    while (stack.length) {
      const v = stack.pop();
      if (!colors[v]) {
        colors[v] = 'gray';
        stack.push(v);
        const deppense = inputMap[v];
        if (deppense) {
          for (let i = 0; i < deppense.length; i++) {
            if (!colors[deppense[i]]) {
              stack.push(deppense[i]);
            }
          }
        }
      } else if (colors[v] === 'gray') {
        colors[v] = 'black';
        output.push(v);
      }
    }

    return output;
  };

  for (let i = 0; i < Object.keys(inputMap).length; i++) {
    dfs(keys[i]);
  }
  return output;
};

const deps = {
  tensorflow: ['nvcc', 'gpu', 'linux'],
  nvcc: ['linux'],
  linux: ['core'],
  mylib: ['tensorflow'],
  mylib2: ['requests'],
};
console.log(processMap2(deps));
