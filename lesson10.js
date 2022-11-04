function factorial(n) {
    let result = 1;
    for (let i = 2; i < n + 1; i++) {
        result *= i;
    }

    return result;
}

function factorialR(n) {
    if (n === 0) return 1
    return n * factorial(n - 1)
}

// console.log(factorial(5))
// console.log(factorialR(5))

function sumR(a, b) {
    if (a === 0) return b
    return sumR(a - 1, b + 1);
}
console.log(sumR(10, 11));

function sumN(n) {
    if (n < 10) return n
    return n % 10 + sumN((n / 10) | 0)
}

// console.log(sumN(123))

/**
 * true/false является точной степенью двойки
 */
function check(n) {
    if (n === 1) return true
    if (n % 2 === 1) return false
    return check((n / 2) | 0)
}
// console.log(check(14))
// console.log(check(16))

/**
 * true/false является строка палиндромом
 */
function isPal(s) {
    if (s.length <= 1) return true
    return s.at(0) === s.at(-1) && isPal(s.slice(1, -1))
}
// console.log(isPal('abbba'))
// console.log(isPal('abc'))

/**
 * a*a*a*... a^n
 * если a = 0 то вернем 1
 */
function powSlow(a, n) {
    if (n === 0) return 1
    return a * pow(a, n - 1)
}

function powFast(a, n) {
    if (n === 0) return 1
    if (n % 2 === 0) return a ** powFast(a, n / 2)
    return powFast(a, n - 1) * a
}

/**
 * n - номер кольца
 * start - откуда колушка
 * finish - куда колушка
 */
function move(n, start, finish) {
    if (n === 1) {
        console.log(n, start, finish)
    } else {
        tmp = 6 - start - finish;
        move(n - 1, start, tmp)
        console.log(n, start, finish)
        move(n - 1, tmp, finish)
    }
}