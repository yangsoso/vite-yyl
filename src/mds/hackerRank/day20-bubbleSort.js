'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

function swap(i, j) {
    
}

function main() {
    const n = parseInt(readLine().trim(), 10);

    const a = readLine().replace(/\s+$/g, '').split(' ').map(aTemp => parseInt(aTemp, 10));
    let warps = 0;
    // Write your code here
    for (let i = 0; i < n; i++) {
        let numberOfSwaps = 0;
        for (let j = 0; j < n - 1; j++) {
            if (a[j] > a[j + 1]) {
                // swap(   [j], a[j + 1]);
                [ a[j], a[j+1] ] = [ a[j+1], a[j] ]
                numberOfSwaps++;
                warps++
            }
        }
        
        if (numberOfSwaps == 0) {
            break;
        }
    }
    console.log(`Array is sorted in ${warps} swaps.`);
    console.log(`First Element: ${a[0]}`);
    console.log(`Last Element: ${a[n-1]}`);
}
