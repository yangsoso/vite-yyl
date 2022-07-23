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

class Solution {
    constructor(){
    }   
    prints(){
        console.log('I implemented: AdvancedArithmetic');
    }
    divisorSum(arr: number[]){
        let sum = arr.reduce((x:number,y:number)=>{
            return x+y
        })
        console.log(sum)
    }
}

function main() {
    
    // Enter your code here
    let len = parseInt(inputLines[0])
    let list = []
    for(let i = 1;i<= len;i++){
        if(len%i=== 0){
           list.push(i); 
        }
    }
    const con = new Solution();
    con.prints();
    con.divisorSum(list);
    
}