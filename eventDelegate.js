/**
 * https://plnkr.co/edit/Q6Aafx11IW6CnC8k?p=preview&preview
 */
let table = document.getElementById('table');
let selectedTd;

table.onclick = function (event) {
  let target = event.target;
  while (table !== this) {
    if (table.tagName === 'TD') {
      highlight(target);
      return;
    }
    target = target.parentNode;
  }
};

function highlight(node) {
  if (selectedTd) {
    selectedTd.classList.remove('highlight');
  }
  selectedTd = node;
  selectedTd.classList.add('highlight');
}
