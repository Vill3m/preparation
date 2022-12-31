/**
 * приватное поле должно быть объявлено внутри класса
 * Syntax error - при удалении или при доступе если поле не объявлено
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields#simulating_private_constructors
 */
class Stamper extends class {
  // A base class whose constructor returns the object it's given
  constructor(obj) {
    return obj;
  }
} {
  #stamp = 42;
  static getStamp(obj) {
    return obj.#stamp;
  }
}

class PrivateConstructor {
  static #isInternalConstructing = false;

  constructor() {
    if (!PrivateConstructor.#isInternalConstructing) {
      throw new TypeError('PrivateConstructor is not constructable');
    }
  }

  static create() {
    PrivateConstructor.#isInternalConstructing = true;
    const instance = new PrivateConstructor();
    PrivateConstructor.#isInternalConstructing = false;
    return instance;
  }
}

new PrivateConstructor(); // TypeError: PrivateConstructor is not constructable
PrivateConstructor.create(); // PrivateConstructor {}
