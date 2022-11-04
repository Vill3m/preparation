/**
 * if и while это оч плохо
 */

function prime(n) {
    let d = 2;
    while (n % d !== 0) {
        d++
    }

    return d === n
}

function isPrime2(n) {
    let d = 2
    while (d * d <= n && n % d !== 0) {
        d++
    }

    return d * d > n
}

// console.log(prime(11))
// console.log(isPrime2(12))

let start = new Date();
let count = []
for (let i = 2; i < 100001; i++) {
    if (isPrime2(i)) {
        // count.push(i)
    }
}
let diff = new Date() - start
// console.log(count, diff)