//* 2.9: Assignment I: Code Examples and Portfolio Start

//Constant O(1)
function returnArrayIndexValue(array, key) {
  // we know where in the array we want the element
  return array[key];
}

// Linear O(n)
function greetWorld(timesToGreet) {
  // timesToGreet can be any positive number, under 9,007,199,254,740,991
  if (timesToGreet < 0 || timesToGreet > Number.MAX_SAFE_INTEGER) return;
  // so we must loop until we reach meet the condition in the loop
  for (let i = 0; i < timesToGreet; i++) {
    console.log("Hello, world!");
  }
}

// Quadratic O(n2)
function nestedLoop(mdArray) {
  // mdArray is an Array of arrays
  mdArray.forEach((el) => {
    // each el is an Array and we want to loop and print that element
    el.forEach((item) => {
      console.log(item);
    });
  });
}

console.log(returnArrayIndexValue([1, 2, 3, 4, 5], 3)); // returns 4

greetWorld(5); // prints "Hello, world!" to console.

const myArray = [
  [1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 0],
];

nestedLoop(myArray); // prints 1-0 sequentially in the console
