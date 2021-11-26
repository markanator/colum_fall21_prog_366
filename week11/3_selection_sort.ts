import * as fs from 'fs';

const file = fs.readFileSync('./scores.txt', { encoding: "utf-8" }).split('\r\n').map(e => +e);

function selectionSort<T>(array: T[]): T[] {
  const arr = [...array];

  // O(n-1) swaps
  for (let i = 0; i < arr.length - 1; i++) {
    // looks for smallest element, starting from i
    let smIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      // set smallest Index
      if (arr[j] < arr[smIndex]) {
        smIndex = j;
      }
    }
    // perform swap
    [arr[i], arr[smIndex]] = [arr[smIndex], arr[i]]
  }
  return arr;
}

console.log(selectionSort(file))
/**
 * Run time stats:
 * real    0m2.081s
 * user    0m0.030s
 * sys     0m0.122s
 */