import * as fs from 'fs';

const file = fs.readFileSync('./scores.txt', { encoding: "utf-8" }).split('\r\n').map(e => +e);

// helper function
const merge = <T>(leftArr: T[], rightArr: T[]): T[] => {
  const output: T[] = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < leftArr.length && rightIndex < rightArr.length) {
    const leftEl = leftArr[leftIndex];
    const rightEl = rightArr[rightIndex];

    if (leftEl < rightEl) {
      output.push(leftEl);
      leftIndex++;
    } else {
      output.push(rightEl);
      rightIndex++;
    }
  }
  // output is sorted, either L || R only have one item
  return [...output, ...leftArr.slice(leftIndex), ...rightArr.slice(rightIndex)];
}

function mergeSort<T>(array: T[]): T[] {
  const arr = [...array];
  // 1. base case
  if (arr.length <= 1) {
    return arr;
  }
  // 2. recursivley split, until arrs has 1 el...
  const middleIndex = Math.floor(arr.length / 2);
  const leftArr = arr.slice(0, middleIndex);
  const rightArr = arr.slice(middleIndex);
  // 3. merge each sub-arr that are already sorted
  return merge(
    mergeSort(leftArr),
    mergeSort(rightArr)
  );
}

console.log(mergeSort(file))
/**
 * Run time stats:
 * real    0m1.889s
 * user    0m0.030s
 * sys     0m0.120s
 */
