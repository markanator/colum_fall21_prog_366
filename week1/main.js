//* Assignment 1
//Constant O(1)
function returnArrayIndexValue(array, key) {
  return array[key];
}
// Linear O(n)
function greetWorld(timesToGreet) {
  for (let i = 0; i < timesToGreet; i++) {
    console.log("Hello, world!");
  }
}
// Quadratic O(n2)
function nestedLoop(mdArray) {
  mdArray.forEach((el) => {
    el.forEach((item) => {
      console.log(item);
    });
  });
}

console.log(returnArrayIndexValue([1, 2, 3, 4, 5], 3)); // returns 4

greetWorld(5);

const myArray = [
  [1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 0],
];

nestedLoop(myArray);
