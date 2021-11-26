import * as fs from 'fs';

const file = fs.readFileSync('./scores.txt', { encoding: "utf-8" }).split('\r\n').map(e => +e);

function insertionSort<T>(array: T[]): T[] {
  // so we don't mutate the original arg
  const arr = [...array];
  for (let i = 1; i < arr.length; i++) {
    // compare latest with last sorted in array up until 1st el
    for (let j = i; j > 0; j--) {
      if (arr[j] < arr[j - 1]) {
        // swap
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      } else {
        // lock in values
        break;
      }
    }
  }
  return arr;
}

console.log(insertionSort(file))
/**
 * Run time stats:
 * real    0m1.984s
 * user    0m0.030s
 * sys     0m0.167s
 */