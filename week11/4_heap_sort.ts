import * as fs from 'fs';

const file = fs.readFileSync('./scores.txt', { encoding: "utf-8" }).split('\r\n').map(e => +e);

// class to create heap dataStructure
class Heap {
  heap: any[];
  // initialize
  constructor() {
    this.heap = [];
  }

  // functions to help populate the heap
  parentIndex(index: number) {
    return Math.floor((index - 1) / 2);
  }

  leftChildIndex(index: number) {
    return (2 * index + 1);
  }

  rightChildIndex(index: number) {
    return (2 * index + 2);
  }

  // Insert methods
  swap(a: number, b: number) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  insert<T>(item: T) {
    this.heap.push(item);
    var index = this.heap.length - 1;
    var parent = this.parentIndex(index);
    // we have a parent && its value is less than the last item's value
    while (this.heap[parent] && this.heap[parent] < this.heap[index]) {
      this.swap(parent, index);
      index = this.parentIndex(index);
      parent = this.parentIndex(index);
    }
  }

  delete() {
    const item = this.heap.shift();
    this.heap.unshift(this.heap.pop());

    let index = 0;
    let leftChild = this.leftChildIndex(index);
    let rightChild = this.rightChildIndex(index);

    while (this.heap[leftChild] &&
      this.heap[leftChild] > this.heap[index] ||
      this.heap[rightChild] > this.heap[index]) {
      let max = leftChild;
      if (this.heap[rightChild]
        && this.heap[rightChild] > this.heap[max]) {
        max = rightChild
      }
      this.swap(max, index);
      index = max;
      leftChild = this.leftChildIndex(max);
      rightChild = this.rightChildIndex(max);
    }
    return item;
  }

}

function heapSort<T>(array: T[]) {
  const sorted = [];
  const heap = new Heap();

  // insert each one to heap to get sorted
  for (let i = 0; i < array.length; i++) {
    heap.insert(array[i]);
  }

  // insert popped sorted values to our array
  for (let i = 0; i < array.length; i++) {
    sorted.push(heap.delete());
  }
  return sorted;
}

console.log(heapSort(file))
/**
 * Run time stats:
 * real    0m2.064s
 * user    0m0.000s
 * sys     0m0.166s
 */


/**
 * Credits:
 * https://canvas.colum.edu/courses/23779/pages/11-dot-2-heapsort
 * https://en.wikipedia.org/wiki/Binary_tree#Types_of_binary_trees
 * https://en.wikipedia.org/wiki/Heapsort
 */