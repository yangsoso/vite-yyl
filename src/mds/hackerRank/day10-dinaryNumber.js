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



function main() {
    // 5 十进制数的 二进制为 101，输出 1
    // 13 十进制数的 二进制为 1101 ，输出 2
    // 二级制数的
    const n = parseInt(readLine().trim(), 10);
    let m = n.toString(2);
    let arr = m.split('0');
    let max = Math.max(...arr);
    console.log(`${max}`.length);
    
}
