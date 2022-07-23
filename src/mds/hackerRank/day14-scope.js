'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');
let inputString: string = '';
let inputLines: string[] = [];
let currentLine: number = 0;
process.stdin.on('data', function(inputStdin: string): void {
    inputString += inputStdin;
});

process.stdin.on('end', function(): void {
    inputLines = inputString.split('\n');
    inputString = '';
    main();
});

function readLine(): string {
    return inputLines[currentLine++];
}
 
//  O(N^2)
// function main() {
//     // Enter your code here
//     let ele:any = inputLines[1].split(' ');
//     let num = 0
//     for(let i = 0; i< ele.length; i++){
//      for(let y = i+1; y< ele.length; y++){
//          let s = Math.abs(ele[i] - ele[y])
//          if(s>num){
//              num = s
//          }
//      }   
//     }
//     console.log(num)
// }

//  O(N)
function main() {
    // Enter your code here
    let arr:any = inputLines[1].split(' ')
    let max = Math.max(...arr);
    let min = Math.min(...arr);
    console.log(Math.abs(max-min));
}
