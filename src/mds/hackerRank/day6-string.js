// 字符串复习
function processData(input) {
    //Enter your code here
    var input_array = input.split("\n").slice(1);
    input_array.forEach((item)=>{
        let even = '';
        let odd = '';
        const length = item.length
        for(let j = 0; j<length;j++){
            if(j%2 === 0){
                even = `${even}${item[j]}`
            }else {
                odd = `${odd}${item[j]}`
            } 
        }
        console.log(even + ' ' + odd);
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
