// 输入
// 3
// sam 99912222
// tom 11122222
// harry 12299933
// sam
// edward
// harry

// 输出
// sam=99912222
// Not found
// harry=12299933

function processData(input) {
    //Enter your code here
    const arr = input.split('\n');
    const n = parseInt(arr[0]);
    var myMap = new Map();
    const item = arr.slice(1,n+1);
    const check = arr.slice(n+1);
    for(let i = 0; i < n; i++) {
        let sp = item[i].split(' ');
        myMap.set(sp[0],sp[1])
    }
    check.forEach((res)=>{
        if(myMap.has(res)){
           console.log(`${res}=${myMap.get(res)}`); 
        }else {
            console.log('Not found')
        }
        
    })
    
    
} 

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});
