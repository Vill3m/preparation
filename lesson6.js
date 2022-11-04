
function getNumbers(str) {
    let result = [];
    for (let i of str) {
        if ('0' <= i && i <= '9') {
            result.push(i)
        }
    }
    return result
}

// console.log(getNumbers('1234abc7*&*)789jkh'))


/**
 * во множестве set нет порядка хранения элементов
 * сделано чтобы быстро проверть
 * 
 */

let s = new Set();
for (let i = 0; i < 10; i++) {
    s.add(i)
}
console.log(s)