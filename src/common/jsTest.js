// 求输出结果顺序
async function async1() {
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}

async function async2() {
    console.log('async2')
}

console.log('script start') 

setTimeout(function(){
    console.log('setTimeout')
},0) 
    
async1()

new Promise(function(resolve) {
    console.log('promise1')
    resolve()
}).then(function(){
    console.log('promise2')
})

console.log('script end')

// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// setTimeout

// 第二题
setTimeout(()=>{
    console.log('A');
},0);
var obj= {
    func:function () {
        setTimeout(function () {
            console.log('B')
        },0);
        return new Promise(function (resolve) {
            console.log('C');
            resolve();
        })
    }
};
obj.func().then(function () {
    console.log('D')
});
console.log('E');

// C
// E
// D
// A
// B

// 面试题
console.log('start');
setTimeout(()=>{
    console.log('A');
},1000);
console.log('end');
//start
// end
// A

// 面试题
/**
 * Promise 新建后立即执行，所以首先输出的是Promise。
 * then方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，所以resolved最后输出
*/
let promise = new Promise(function(resolve, reject) {
    console.log('Promise');
    resolve();
  });
  
  promise.then(function() {
    console.log('resolved.');
  });
  
  console.log('Hi!');
  // Promise
  // Hi!
  // resolved

/** 宏任务和微任务
 *  macrotasks宏任务: setTimeout, setInterval, setImmediate, I/O, UI rendering
    microtasks微任务: process.nextTick, Promise, MutationObserver
 * */  
console.log(1);
setTimeout(function(){
    console.log(2);
}, 0);

Promise.resolve().then(function(){
    console.log(3);
}).then(function(){
    console.log(4);
});

//1
//3
//4
//2

// 面试题
setTimeout(()=>{
    console.log('A');
},0);

var obj={
    func:function () {
        setTimeout(function () {
            console.log('B')
        },0);
        return new Promise(function (resolve) {
            console.log('C');
            resolve();
        })
    }
};
obj.func().then(function () {
    console.log('D')
});
console.log('E');
// C
// E
// D
// A
// B


