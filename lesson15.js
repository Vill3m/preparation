/**
 * selection sort (метод выбора)
 */

function selectionSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let idx = i
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[i]) {
                idx = j
            }
        }
        [arr[i], arr[idx]] = [arr[idx], arr[i]]
    }

    return arr
}

console.log(selectionSort([5, 1, 2, 3, 1, 7, 1]))

/**
 * insertinSort
 */


/**
 * если < - находим первый мин
 * если <= - находим последний мин
 */
function getMin(arr) {
    let [min] = arr
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] <= min) {
            min = arr[i]
        }
    }

    return min
}

// console.log(getMin([5, 1, 2, 3, 1, 7, 1]))