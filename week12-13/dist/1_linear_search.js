"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var fs = require("fs");
var file = fs.readFileSync('./scores.txt', { encoding: "utf-8" }).split('\r\n').map(function (e) { return +e; });
/**
 * Linear search, iterate through the array until we find what we want
 * @param array
 * @returns {Number} row line of given key in within the file.
 */
function linearSearch(array, key) {
    // shallow copy
    var arr = __spreadArray([], array, true);
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === key) {
            // swap
            return i + 1;
        }
    }
    return -1;
}
// will return the line the number is on
console.log(linearSearch(file, 89));
