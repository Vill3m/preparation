/**
 * isPrime = [True] * (n + 1)
 * почему +1? тк нужно чтобы мы могли дать ответ для последнего элементака
 * тк условие i < n, либо можно без +1 то i <= n
 */

const isPrime = new Array(97 + 1).fill(true)
const primes = []
for (let i = 2; i < isPrime.length; i++) {
    if (isPrime[i]) {
        primes.push(i)
        for (let j = i ** 2; j < isPrime.length; j += i) {
            isPrime[j] = false
        }
    }
}

console.log(primes)