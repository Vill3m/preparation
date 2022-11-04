/**
 * чтобы хранить строку нужно ее присвоить к цислу (шрифты это другое) кодировать
 * кодирование это символы или + - ; табуляция - выделять 1байт = 8битов 
 * всего 256 те 2 ** 8 266 символов, от 0 ... 255
 * первая часть от 0 ... 127 - ascii
 * ABC = первая 65 поизция + 32 = 97 те abc
 * сравнивать можно так в любом ЯП '0' <= '3' && '3' <= '8' и также с буквами A-Z
 * на кодирования символа выделяется 1 байт
 * 'hello'.slice(1, 4) - те 4-1=3 получается 3 символа ell
 * делить с скруглением вверх, те (str.length + 1) / 2
 */

function replaceStr(str) {
    let m = ((str.length + 1) / 2) | 0
    const result = str.slice(m) + str.slice(0, m);
    return result
}

// console.log(replaceStr('abcdef') === 'defabc')
// console.log(replaceStr('abcde'))

function countOccurr(str, t) {
    let count = 0
    let position = str.indexOf(t);

    while (position !== -1) {
        count++
        position = str.indexOf(t, position + 1);
    }

    return count
}

function findSubst(s, t) {
    let result = [];
    for (let i = 0; i < s.length - t.length + 1; i++) {
        if (s.slice(i, i + t.length) === t) {
            result.push(i);
            // break;
            // continue
        }
    }

    return result
}

// console.log(findSubst('abracadabra', 'br'))
console.log(countOccurr('abracadabra', 'br'))
// console.log(findSubst('abracadabra', 'cada'))
console.log(countOccurr('abracadabra', 'cada'))
// console.log(findSubst('aaaa', 'aa'))
console.log(countOccurr('aaaa', 'aa'))

/**
 * почему нужно умножать строку?
 * чтобы скольцевать abcd + abcd = abcdabcd и теперь можем найти dad
 */
function findSubstr2(s, t) {
    let str = s.repeat(100);
    let reverseStr = ''
    for (let i = str.length - 1; i >= 0; i--) {
        reverseStr += str[i];
    }

    if (str.indexOf(t) !== -1 || reverseStr.indexOf(t) !== -1) {
        return 'yes'
    }

    return 'no'
}

// console.log(findSubstr2('abcd', 'dab')); //dcba
// console.log(findSubstr2('aaaa', 'aa'));
// console.log(findSubstr2('abcdabcdabcd', 'bcd'));