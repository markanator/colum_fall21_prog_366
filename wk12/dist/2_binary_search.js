"use strict";
exports.__esModule = true;
var fs = require("fs");
var file = fs.readFileSync('./scores.txt', { encoding: "utf-8" }).split('\r\n').map(function (e) { return +e; });
/**
 * Binary Search Tree sorts by size where left is smaller than the parent node, and right is greater than the parent node.
 */
var Node = /** @class */ (function () {
    function Node(data, left, right) {
        if (left === void 0) { left = null; }
        if (right === void 0) { right = null; }
        this.data = data;
        this.left = left;
        this.right = right;
    }
    return Node;
}());
var BST = /** @class */ (function () {
    function BST() {
        this.root = null;
    }
    BST.prototype.add = function (data) {
        var node = this.root;
        // first element to be added
        if (node === null) {
            this.root = new Node(data);
            return;
        }
        else {
            // fn() that will add for us
            var searchTree_1 = function (node) {
                if (data < node.data) {
                    // insert to left child
                    if (node.left === null) {
                        node.left = new Node(data);
                        return;
                    }
                    else if (node.left !== null) {
                        // recursively insert to left child for populated children
                        return searchTree_1(node.left);
                    }
                }
                else if (data > node.data) {
                    // insert to right child
                    if (node.right === null) {
                        node.right = new Node(data);
                        return;
                    }
                    else if (node.right !== null) {
                        // recursively insert to right child for populated children
                        return searchTree_1(node.right);
                    }
                }
                else {
                    return null;
                }
            };
            // initial invoke of searchTree fn
            return searchTree_1(node);
        }
    };
    BST.prototype.find = function (data) {
        var current = this.root;
        while (current.data !== data) {
            if (data < current.data) {
                current = current.left;
            }
            else {
                current = current.right;
            }
            if (current === null) {
                return null;
            }
        }
        // return found item
        return current;
    };
    return BST;
}());
// create new tree
var tree = new BST();
// add dynamic elements to tree: x475
file.forEach(function (n) { return tree.add(n); });
// will return the node with the desired search result
console.log(tree.find(89));
