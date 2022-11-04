/**
 * generage hex color
 * from https://thisthat.dev/
 */

const color = `${Math.random().toString(16).slice(2, 8).padEnd(6, '0')}`;

const xhr = new XMLHttpRequest();
xhr.open('GET', '/bar/foo.txt', true);
xhr.onload = function (e) {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            console.log(xhr.responseText);
        } else {
            console.error(xhr.statusText);
        }
    }
}

xhr.onerror = function (e) {
    console.error(xhr.statusText)
}

xhr.send(null)