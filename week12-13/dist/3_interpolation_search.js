"use strict";
exports.__esModule = true;
var fs = require("fs");
var file = fs.readFileSync('./scores.txt', { encoding: "utf-8" }).split('\r\n').map(function (e) { return +e; });
// probably loosing time here to sort
file.sort(function (a, b) { return a > b ? 1 : b > a ? -1 : 0; });
/**
 * Interpolation search is an improvement over Binary Search where the input array is sorted.
 */
function interpolationSearch(array, key) {
    // 1. calculate upper and lower bounds
    var high = array.length - 1;
    var low = 0;
    // within searchable area
    while (key >= array[low] && key <= array[high] && low <= high) {
        // guess where the key might be using: probe position formula
        var probe = Math.floor(low + (high - low) * (key - array[low]) / (array[high] - array[low]));
        console.log('probe: ' + probe);
        // did we get our key?
        if (array[probe] === key) {
            return probe;
        }
        else if (array[probe] < key) {
            // move lowerbounds higher
            low = probe + 1;
        }
        else {
            // move higherbounds lower
            high = probe - 1;
        }
    }
    // not found
    return -1;
}
// self invoking main function
(function () {
    var index = interpolationSearch(file, 89);
    if (index !== -1) {
        console.log("Key found at index: " + index);
    }
    else {
        console.log("Key was not found");
    }
})();

