// https://code.tutsplus.com/tutorials/how-to-implement-the-singleton-pattern-in-javascript-es6--cms-39927
class DBConnection {
  #instance;
  constructor(url) {
    this.url = url;
  }

  get instance() {
    return this.#instance;
  }

  set instance(ctr) {
    this.#instance = ctr;
  }

  static getInstance(url) {
    if (!this.instance) {
      this.instance = new DBConnection(url);
    }

    return this.instance;
  }
}

class DBConnection2 {
  constructor(conString) {
    this.conString = conString;
  }

  static getInstance(conString) {
    if (!this.instance) {
      this.instance = new DBConnection2(conString);
    }

    return this.instance;
  }
}

let connection1 = DBConnection2.getInstance('mysql1');
let connection2 = DBConnection2.getInstance('mysql2');

console.log(connection1 === connection2);
