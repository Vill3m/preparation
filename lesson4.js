/**
 * для того чтобы было легко подсчитать кол-во итераций цикла n - раз итераций
 * от 0 до n-1 раз
 * (b - a) // abs(b - a) = 1, если а < b иначе -1
 * 
 * как получить n девяток? 10 ** n - 1
 * 
 * 1 секунда это примерно 1млн оперций те 10 ** 5
 */

function printN(n) {
    for (let i = 1; i <= n; i++) {
        console.log(i)
    }
}

// printN(10);


/**
 * 1 цифра - n / 100
 * 2 цифра - n / 10 % 10
 * 3 цифра - n % 10
 * 
 * n % 10 - узнать последнию цифру
 * n / 10 - отрезать последнию цифру
 * 
 * 
 * 1+2+3...n = n (n + 1) / 2
 */
function printN2(n) {
    for (let i = 100; i < 1000; i++) {
        if ((i / 100 | 0) + (i / 10 % 10 | 0) + (i % 10 | 0) === n) {
            console.log(i)
        }
    }
}

// printN2(2)


function sumN(n) {
    let result = 0
    while (n !== 0) {
        // get last num
        result += n % 10
        // slice last num
        n = (n / 10) | 0
    }

    return result
}
console.log(sumN(12345))