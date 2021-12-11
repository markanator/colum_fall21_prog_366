import * as fs from 'fs';

const file: number[] = fs.readFileSync('./scores.txt', { encoding: "utf-8" }).split('\r\n').map((e: string) => +e);

// Node Setup
class TreeNode {
  value: number;
  children?: TreeNode[];
  constructor(value: number) {
    this.value = value;
    this.children = [];
  }
}

// Tree setup
class Tree {
  root?: TreeNode;
  constructor() {
    this.root = null;
  }
}


const dfs = (start: TreeNode, target: number): TreeNode => {
  console.log("Visiting Node " + start.value);
  if (start.value === target) {
    // base case
    return start;
  }

  // Recurse with all children
  for (let i = 0; i < start.children.length; i++) {
      const result = dfs(start.children[i], target);
      console.log("Visiting Child Node " + start.children[i].value);
      if (result != null) {
          // found the target, now return
          return result;
      }
  }

  // visited all children and goal was not found
  return null;
}

// SETUP FOR TESTS
const myTree = new Tree();
myTree.root = new TreeNode(file[0]);
myTree.root.children[0] = new TreeNode(file[1]);

let childInsertionIndex = 0;
file.slice(1).forEach((score, idx)=> {
  if (idx % 5 === 0 && idx !== 0) {
    childInsertionIndex++;
    myTree.root.children[childInsertionIndex] = new TreeNode(score);
  } else {
    myTree.root.children[childInsertionIndex].children.push(new TreeNode(score));
  }
});

const res = dfs(myTree.root, 89);

console.log(res);

/**
 * compiled Node runtime stats:
 * real    0m0.194s
 * user    0m0.000s
 * sys     0m0.015s
 */