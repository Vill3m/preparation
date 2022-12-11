/**
 * Значения null и undefined не имеют объектов-обёрток
 * Значение __proto__ может быть объектом или null. Другие типы игнорируются.
 * Свойство __proto__ — исторически обусловленный геттер/сеттер для [[Prototype]]
 */
var animal = {
  eats: true,
  walk() {
    console.log("animal walk");
  },
};

let rabbit = {
  jups: true,
  __proto__: animal,
};
// Теперь вызов rabbit.walk() находит метод непосредственно в объекте и выполняет его, не используя прототип:
rabbit.walk = function () {
  console.log("Rabbit! Bounce-bounce!");
};
rabbit.walk();

let longEar = {
  earLength: 10,
  __proto__: animal,
};

longEar.walk();

/**
 * В результате методы являются общими, а состояние объекта — нет.
 * Неважно, где находится метод: в объекте или его прототипе. При вызове метода this — всегда объект перед точкой.
 */
let user = {
  name: "John",
  surname: "Smith",
  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
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
admin.fullName = "Alice Cooper";

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
 */
var animal = {
  eats: true,
};

function Rabbit(name) {
  this.name = name;
}

Rabbit.prototype = animal;

let rabbit = new Rabbit("White Rabbit"); //  rabbit.__proto__ == animal

console.log(rabbit.eats); // true
