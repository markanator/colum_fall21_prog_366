import * as fs from 'fs';

const file = fs.readFileSync('./scores.txt', { encoding: "utf-8" }).split('\r\n').map(e => +e);

/**
 * Binary Search Tree sorts by size where left is smaller than the parent node, and right is greater than the parent node.
 */

class Node {
  data: number;
  left: Node | null;
  right: Node| null;
  constructor(data: number, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class BST {
  root: Node | null;
  constructor() {
    this.root = null;
  }
  add(data: number) {
    const node = this.root;
    // first element to be added
    if (node === null) {
      this.root = new Node(data);
      return;
    } else {
      // fn() that will add for us
      const searchTree = (node: Node): void | null => {
        if (data < node.data) {
          // insert to left child
          if (node.left === null) {
            node.left = new Node(data);
            return;
          } else if (node.left !== null) {
            // recursively insert to left child for populated children
            return searchTree(node.left);
          }
        } else if (data > node.data) {
          // insert to right child
          if (node.right === null) {
            node.right = new Node(data);
            return;
          } else if (node.right !== null) {
            // recursively insert to right child for populated children
            return searchTree(node.right);
          }
        } else {
          return null;
        }
      };
      // initial invoke of searchTree fn
      return searchTree(node);
    }
  }

  find(data: number) {
    let current = this.root!;
    while(current.data! !== data) {
      if (data < current.data) {
        current = current.left!;
      } else {
        current = current.right!;
      }
      if (current === null) {
        return null;
      }
    }
    // return found item
    return current;
  }
}

// create new tree
const tree = new BST();
// add dynamic elements to tree: x475
file.forEach((n)=> tree.add(n));
// will return the node with the desired search result
console.log(tree.find(89))

/**
 * compiled Node runtime stats:
 * real    0m0.180s
 * user    0m0.031s
 * sys     0m0.031s
 */