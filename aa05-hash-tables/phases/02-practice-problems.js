function anagrams(str1, str2) {
  if (str1.length !== str2.length) {
    return false;
  }

  let charSet = new Set();

  for (let char of str1) {
    charSet.add(char);
  }

  for (let char of str2) {
    if (!charSet.has(char)) {
      return false;
    }
  }

  return true;
}


function commonElements(arr1, arr2) {
  let commonInt = new Set();

  for (let num of arr1) {
    commonInt.add(num);
  }

  let result = [];

  for (let num of arr2) {
    if (commonInt.has(num)) {
      result.push(num);
    }
  }

  return result;
}


function duplicate(arr) {
  let duplicates = {};

  for (let num of arr) {
    if (duplicates[num]) {
      return num;
    } else {
      duplicates[num] = 1;
    }
  }
}


function twoSum(nums, target) {
  let visited = {};

  for (let num of nums) {
    let compliment = target - num;

    if (visited[compliment]) {
      return true;
    }

    visited[num] = true;
  }

  return false;
}


function wordPattern(pattern, strings) {
  let patternString = {};

  let stringPattern = {};

  if (pattern.length !== strings.length) {
    return false;
  }

  for (let i = 0; i < pattern.length; i++) {

    let char = pattern[i];

    let word = strings[i];

    if (!patternString[char] && !stringPattern[word]) {

      patternString[char] = word;

      stringPattern[word] = char;
    } else {

      if (patternString[char] !== word || stringPattern[word] !== char) {
        return false;
      }
    }
  }

  return true;
}


module.exports = [anagrams, commonElements, duplicate, twoSum, wordPattern];
