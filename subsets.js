function findSubset(nums) {
  const subsets = [];
  // начните с добавления пустого подмножества
  subsets.push([]);

  for (let i = 0; i < nums.length; i++) {
    let curr = nums[i];
    // мы возьмем все существующие подмножества и вставим в них текущий номер, чтобы создать новые подмножества
    const { length } = subsets;
    for (let j = 0; j < length; j++) {
      // создать новое подмножество из существующего подмножества и вставить в него текущий элемент
      subsets.push([...subsets[j], curr]);
    }
  }

  return subsets;
}
// console.log(findSubset([1, 5, 3]));

function findLetterCaseStringPermutations(str) {
  const permutations = [];
  permutations.push(str);

  for (let i = 0; i < str.length; i++) {
    if (isNaN(parseInt(str[i], 10))) {
      const { length } = permutations;
      for (let j = 0; j < length; j++) {
        const chs = permutations[j].split('');
        if (chs[i] === chs[i].toLowerCase()) {
          chs[i] = chs[i].toUpperCase();
        } else {
          chs[i] = chs[i].toLowerCase();
        }

        permutations.push(chs.join(''));
      }
    }
  }

  return permutations;
}

console.log(findLetterCaseStringPermutations('ad52'));
console.log(findLetterCaseStringPermutations('ab7c'));
