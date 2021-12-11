"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const file = fs.readFileSync('./scores.txt', { encoding: "utf-8" }).split('\r\n').map((e) => +e);
// Node Setup
class TreeNode {
    constructor(value) {
        this.value = value;
        this.children = [];
    }
}
// Tree setup
class Tree {
    constructor() {
        this.root = null;
    }
}
const dfs = (start, target) => {
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
};
// SETUP FOR TESTS
const myTree = new Tree();
myTree.root = new TreeNode(file[0]);
myTree.root.children[0] = new TreeNode(file[1]);
let childInsertionIndex = 0;
file.slice(1).forEach((score, idx) => {
    if (idx % 5 === 0 && idx !== 0) {
        childInsertionIndex++;
        myTree.root.children[childInsertionIndex] = new TreeNode(score);
    }
    else {
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
