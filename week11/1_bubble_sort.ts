import * as fs from 'fs';

const file = fs.readFileSync('./scores.txt', { encoding: "utf-8" }).split('\r\n').map(e => +e);

function bubbleSort<T>(array: T[]): T[] {
  // shallow copy
  const arr = [...array];

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        // swap
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

console.log(bubbleSort(file))

/**
 * Run time stats:
 * real    0m2.071s
 * user    0m0.000s
 * sys     0m0.106s
 */