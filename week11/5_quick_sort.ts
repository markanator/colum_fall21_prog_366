import * as fs from 'fs';

const file = fs.readFileSync('./scores.txt', { encoding: "utf-8" }).split('\r\n').map(e => +e);

function quickSort<T>(array: T[]): T[] {
  const arr = [...array];
  // base case
  if (arr.length === 1) {
    return arr;
  }
  // last el of arr
  const pivot = arr[arr.length - 1];
  const leftArr = [];
  const rightArr = [];

  for (let i = 0; i < arr.length - 1; i++) {
    // split and push based on pivot value
    arr[i] < pivot ? leftArr.push(arr[i]) : rightArr.push(arr[i])
  }

  // recursive sorting and then return sorted array
  if (leftArr.length > 0 && rightArr.length > 0) {
    return [...quickSort(leftArr), pivot, ...quickSort(rightArr)];
  } else if (leftArr.length > 0) {
    return [...quickSort(leftArr), pivot];
  } else {
    return [pivot, ...quickSort(rightArr)];
  }
}

console.log(quickSort(file))
/**
 * Run time stats:
 * real    0m1.789s
 * user    0m0.046s
 * sys     0m0.076s
 */
