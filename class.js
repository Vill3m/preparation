/**
 * Создаёт функцию с именем User, которая становится результатом объявления класса.
 * Код функции берётся из метода constructor (она будет пустой, если такого метода нет).
 * Сохраняет все методы, такие как sayHi, в User.prototype.
 * Методы класса являются неперечислимыми. enumerable в false для всех методов в "prototype".
 * Классы всегда используют use strict.
 */
class User {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    alert(this.name);
  }
}

alert(typeof User); // function
