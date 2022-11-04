/*
Дан массив ссылок: ['url1', 'url2', ...] и лимит одновременных запросов (limit)
Необходимо реализовать функцию, которая опросит урлы и вызовет callback c массивом ответов
['url1_answer', 'url2_answer', ...] так, чтобы в любой момент времени выполнялось не более limit
запросов (как только любой из них завершился, сразу же отправляется следующий)
Т.е. нужно реализовать шину с шириной равной limit.

Требования:
- Порядок в массиве ответов должен совпадать с порядком в массиве ссылок
Дополнительно:
- Функция должна обладать мемоизацией (один и тот же урл не опрашивать дважды)

Для опроса можно использовать fetch или $.get
Ошибки обрабатывать не нужно

https://interview.yandex-team.ru/room/LMcYe0z8zD

*/
// declare function fetch(url: string): Promise<string>;
// declare function $.get(url: string, callback: (res: string) => void): void;

const parallelLimit = (urls, limit, callback) => {    // code here
    let l = urls.length - 1;
    let i = 0;
    let current = 0;
    let r = [];
    let cache = {};
    const req = () => {
        const j = i++;
        if (!cache[urls[j]]) {
            current++;
            cache[urls[j]] = fetch(urls[j])
                .then((data) => {
                    current--;
                    return data;
                })
                .catch(() => null);
        }
        cache[urls[j]].then((data) => {
            r[j] = data;
            if (l--) {
                req();
            } else {
                callback(r);
            }
        });
    }
    while (current < limit && current < l) {
        req();
    }
}

// ['a', 'a', 'b', 'c', 'd'] 2


const fetch = (url) => new Promise((resolve, reject) => {
    setTimeout(Math.random() > .2 ? resolve : reject, 100 + Math.floor(Math.random() * 1000), url);
});
const parallelLimit2 = (urls, limit, callback) => {
    let l = urls.length;
    let i = l;
    let count = 0;
    let r = [];
    const cache = {};
    const req = () => {
        const j = --i;
        console.log('req', j);
        if (!cache[urls[j]]) {
            count++;
            cache[urls[j]] = fetch(urls[j])
                .catch(() => null)
                .finally(() => count--);
        }
        cache[urls[j]].then((data) => {
            r[j] = data;
            console.log(data, l, j);
            l--;
            if (i) {
                req();
            } else if (!l) {
                callback(r);
            }
        });
    }
    while (count < limit && count < l) {
        req();
    }
}

parallelLimit2(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'], 3, console.log)