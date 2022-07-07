// 原型和原型链的继承
/**
 * 原型的demo
 * {
    a: 1
    __proto__:
    constructor: ƒ Object()
    hasOwnProperty: ƒ hasOwnProperty()
    isPrototypeOf: ƒ isPrototypeOf()
    propertyIsEnumerable: ƒ propertyIsEnumerable()
    toLocaleString: ƒ toLocaleString()
    toString: ƒ toString()
    valueOf: ƒ valueOf()
    __defineGetter__: ƒ __defineGetter__()
    __defineSetter__: ƒ __defineSetter__()
    __lookupGetter__: ƒ __lookupGetter__()
    __lookupSetter__: ƒ __lookupSetter__()
    get __proto__: ƒ __proto__()
    set __proto__: ƒ __proto__()
  }
 * 
 * 
 */
// 当继承的函数被调用时，this 指向的是当前继承的对象，而不是继承的函数所在的原型对象
var o = {
    a: 2,
    m: function(){
      return this.a + 1;
    }
  };
  
  console.log(o.m()); // 3
  // 当调用 o.m 时，'this' 指向了 o.
  
  var p = Object.create(o);
  // p 是一个继承自 o 的对象
  
  p.a = 4; // 创建 p 的自身属性 'a'
  console.log(p.m()); // 5
  // 调用 p.m 时，'this' 指向了 p
  // 又因为 p 继承了 o 的 m 函数
  // 所以，此时的 'this.a' 即 p.a，就是 p 的自身属性 'a' 

// 1. 使用语法结构创建对象
var o = {a:1}
// 原型链： o => Object.prototype => null
var a = ['yo','xx']
// 原型链： a => Array.prototype => Object.prototype => null
function f(){
    return 2;
}
// 原型链： f => Function.prototype => Object.prototype => null

// 2.使用构造器创建的对象  
// 使用 new 来作用这个函数时，它可以被称为构造函数

function Graph(){
    this.a = [],
    this.b = [];
}

Graph.prototype = {
    addA:function(v){
        return this.a.push(v);
    }
}

var g = new Graph

// 3. 使用 Object.create 创建的对象
// ES5 引入的新方法 Object.create(),可以调用这个方法来创建一个新的对象，新对象的原型就是调用create() 时传入的第一个参数
var a = {a:1}
// 原型链： a => Object.prototype => null

var b = Object.create(a)
// 原型链： b => a => Object.prototype => null
console.log(b.a); 
// 1 继承a的属性来的

var c = Object.create(b);
// 原型链： c => b => a => Object.prototype => null

var d = Object.create(null)
// 原型链： d => null
console.log(d.hasOwnProperty);
// undefined 因为d 没有继承 Object.prototype

// 4. 使用 class 关键字创建的对象
// ES6 引入的新的关键字 class. JavaScript 仍然是基于原型。新的关键字包括 class constructor static extends super
class A {
    constructor(height,width){
        this.height =height;
        this.width = width;
    }
}

class B extends A {
    constructor(sideLength) {
        super(sideLength,sideLength);
    }
    get area(){
        return this.height *this.width;
    }
    set sideLength(newLength) {
        this.height = newLength;
        this.width = newLength;
    }
}

var square = new B(4)
// square
// {
//     height: 4
//     width: 4
//     area: 16
//     __proto__: A
//     area: 16
//     constructor: class B
//     get area: ƒ area()
//     set sideLength: ƒ sideLength(newLength)
//     __proto__: Object
// }


// ## 检查某个属性是否是该对象自定义的属性 b.hasOwnProperty('a') 不会遍历原型链的方法
// Object.keys() 和 for..in 的返回并不总能保持先来后到的顺序
// simple array
var arr = ['a', 'b', 'c'];
console.log(Object.keys(arr)); // console: ['0', '1', '2']

// array like object
var obj = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.keys(obj)); // console: ['0', '1', '2']

// array like object with random key ordering
var anObj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.keys(anObj)); // console: ['2', '7', '100']

// getFoo is a property which isn't enumerable
var myObj = Object.create({}, {
  getFoo: {
    value: function () { return this.foo; }
  }
});
myObj.foo = 1;
console.log(Object.keys(myObj)); // console: ['foo']

// prototype 和 Object.getPrototypeOf 
// 原型链中，函数和对象的关系就是new 一个函数发生的过程
// 1. new 一个函数的过程发生了什么

// 当你执行：
var o = new Foo();
// JavaScript 实际上执行的是
var obj = new Object();
obj.__proto__ = Foo.prototype;
Foo.call(obj)
/**
 * 过程：
 * new 一个 Object,将该 Object 的隐式原型 等于 函数的原型
 * 函数改变他的指向，指向该对象 Foo.call(obj)
 * */ 