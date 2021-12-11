import * as fs from 'fs';

const file = fs.readFileSync('./scores.txt', { encoding: "utf-8" }).split('\r\n').map(e => +e);

/**
 * Linear search, iterate through the array until we find what we want
 * @param array
 * @returns {Number} row line of given key in within the file.
 */

function linearSearch<T>(array: T[], key: T): number {
  // shallow copy
  const arr = [...array];

  for (let i = 0; i < arr.length; i++) {
      if (arr[i] ===   key) {
        // swap
        return i+1;
    }
  }
  return -1;
}
// will return the line the number is on
console.log(linearSearch(file, 89))

/**
 * compiled Node runtime stats:
 * real    0m0.173s
 * user    0m0.000s
 * sys     0m0.015s
 */