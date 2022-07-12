// Node.js generator结合thunk化函数处理回调地狱

// Thunk 函数
// 将表达式放到一个临时函数中,再将这个临时函数传入函数体.这个临时函数就叫做Thunk函数

foo(2*2)
// thunk 化,传名调用
function f(){
    return 2*2
}
foo(f)

// f即可以理解为Thunk函数
// ** JavaScript 中的 Thunk
// 在 JavaScript 语言中 Thunk 函数替换的不是表达式，而是多参数函数。并将其替换成单参数版本，且只接受回调函数作为参数
function doubleMap(val,callback){
    val = val *2;
    callback(null,val);
}
doubleMap(2,(err,result)=>{
    console.log(result);
})
// 4
// 上面的callback 函数属于多参数函数,替换成Thunk
function toThunk(fn){
    return (...rest) =>{
        return (callback)=>{
            fn.apply(null,[...rest,callback])
        }
    }
}
const doubleMapThunk = toThunk(doubleMap)(2)
doubleMapThunk((err, result) => {
    console.log(result) // 4
})

var fs = require('fs');
// 1. 回调出现
fs.readFile('./reviews/pinganBank.md', function (err, data) {
  if (err) throw err;
  console.log(data);
  fs.readFile('./reviews/reviews2022.md', function (err, data) {
    if (err) throw err;
        console.log(data);
  });
});

// 2. 改写1
co(function* (){
    var data1 = yield readFile('./reviews/pinganBank.md');
    console.log(data1);
    var data2 = yield readFile('./reviews/reviews2022.md');
    console.log(data2);
})

// Thunk 化就是将多参数函数，将其替换成单参数只接受回调函数作为唯一参数的版本 
function readFile( path ){
    return function(callback){
        fs.readFile(path,callback);
    }
}

function co(fn){
    var gen = fn();
    function next(err,data){
        var result = gen.next(data);
        if(!result.done){
            console.log(result);
            result.value(next);
        }
    }
    next();
}

