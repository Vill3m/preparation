/**
 * Значения null и undefined не имеют объектов-обёрток
 * Значение __proto__ может быть объектом или null. Другие типы игнорируются.
 * Свойство __proto__ — исторически обусловленный геттер/сеттер для [[Prototype]]
 */
var animal = {
  eats: true,
  walk() {
    console.log('animal walk');
  },
};

var rabbit = {
  jups: true,
  __proto__: animal,
};
// Теперь вызов rabbit.walk() находит метод непосредственно в объекте и выполняет его, не используя прототип:
rabbit.walk = function () {
  console.log('Rabbit! Bounce-bounce!');
};
// rabbit.walk();

let longEar = {
  earLength: 10,
  __proto__: animal,
};
console.log(Object.keys(longEar));
console.log(Object.getOwnPropertyDescriptors(longEar));
console.log(Object.keys(Object.getPrototypeOf(longEar)));
// longEar.walk();

/**
 * В результате методы являются общими, а состояние объекта — нет.
 * Неважно, где находится метод: в объекте или его прототипе. При вызове метода this — всегда объект перед точкой.
 */
let user = {
  name: 'John',
  surname: 'Smith',
  set fullName(value) {
    [this.name, this.surname] = value.split(' ');
  },
  get fullName() {
    return `${this.name} ${this.surname}`;
  },
};

let admin = {
  __proto__: user,
  isAdmin: true,
};

// console.log({
//   admin,
//   user,
// });
admin.fullName = 'Alice Cooper';

// console.log({
//   admin,
//   user,
// });

/**
 * Установка Rabbit.prototype = animal буквально говорит интерпретатору следующее:
 * "При создании объекта через new Rabbit() запиши ему animal в [[Prototype]]".
 * F.prototype используется только в момент вызова new F()
 * По умолчанию "prototype" – объект с единственным свойством constructor, которое ссылается на функцию-конструктор.
 * По умолчанию все функции имеют F.prototype = { constructor: F }
 * Как было сказано в начале этой секции учебника,
 * __proto__ – это способ доступа к свойству [[Prototype]], это не само свойство [[Prototype]].
 */
var animal = {
  eats: true,
};

function Rabbit(name) {
  this.name = name;
}

Rabbit.prototype = animal;

var rabbit = new Rabbit('White Rabbit'); //  rabbit.__proto__ == animal

// console.log(rabbit.eats); // true
/**
 * Когда мы создаём свойство с помощью дескриптора, все флаги по умолчанию имеют значение false.
 * Таким образом, в коде выше dictionary.toString – неперечисляемое свойство.
 */
let dictionary = Object.create(null, {
  toString: {
    value() {
      return Object.keys(this).join();
    },
  },
});
let clone = Object.create(
  Object.getPrototypeOf(rabbit),
  Object.getOwnPropertyDescriptors(rabbit)
);
