// 一、数据类型
// 基本类型： Boolean string number null undefined Bigint Symbol 
// 1. BigInt：一种数字类型的数据，可以表示任意精度格式的整数。
//    可以安全地存储和操作大整数，甚至可以超过数字类型的安全整数限制。是通过在整数末尾附加字母 n 或调用构造函数来创建的
const x = BigInt(Number.MAX_SAFE_INTEGER);  
// 9007199254740991n  
x + 1n === x + 2n;
// false
Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2;
// true 
x +1 
// BigInt 不能与数字相互运算。否则，将抛出 TypeError

// 2. Symbol: 创建后独一无二且不可改变的数据类型,可作为对象的key值。主要解决可能出现的全局变量名称冲突的问题.能防止某一个键被不小心改写或覆盖
/**
 * Symbol作为属性名，遍历对象的时候.
 * 该属性不会出现在 for...in 、 for...of 循环中，也不会被 Object.keys() 、 Object.getOwnPropertyNames() 、 JSON.stringify() 返回
 * Object.getOwnPropertySymbols() 查所有用作属性名的 Symbol 值; Reflect.ownKeys() 包括常规键名和 Symbol 键名
 * 
 * */ 
// Symbol.for() 重新使用同一个 Symbol 值
let s1 = Symbol.for('foo');
let s2 = Symbol.for('foo');

s1 === s2 // true

Symbol.for("bar") === Symbol.for("bar")
// true
Symbol("bar") === Symbol("bar")
// false

// Symbol.keyFor() 方法返回一个已登记的 Symbol 类型值的 key
// ** Symbol.for() 为 Symbol 值登记的名字，是全局环境的，不管有没有在全局环境运行。 **
// ** Symbol.for() 的这个全局登记特性，可以用在不同的 iframe 或 service worker 中取到同一个值 **


// 二、数据结构
// 带键的集合 Map Set WeakMaps WeakSets
/**
 * 总结: 
 * WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用.
 * 也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中
 * 
 * 这是因为垃圾回收机制依赖引用计数，如果一个值的引用次数不为 0 ，垃圾回收机制就不会释放这块内存。
 * 结束使用该值之后，有时会忘记取消引用，导致内存无法释放，进而可能会引发内存泄漏。WeakSet 里面的引用，都不计入垃圾回收机制，所以就不存在这个问题。
 * 因此，WeakSet 适合临时存放一组对象，以及存放跟对象绑定的信息。只要这些对象在外部消失，它在 WeakSet 里面的引用就会自动消失。
 * */ 

// 1. Set 
// Set 值就是键，不能通过迭代器来改变 Set 的值,值是唯一的，没有重复的值
/**
 * .size 
 * 操作方法：.add(value) .delete(value) .has(value) .clear()
 * 遍历方法：.keys() .values() .entries()  .forEach() 
 * */  
// 用于去重
const unique = [...new Set([1,2,3,4,2,15])];
// 去除字符串里面的重复字符
const uniStr = [...new Set('ababbccc')].join('');
// 在 Set 内部，两个 NaN 是相等的、 两个对象总是不相等的

// 2. WeakSet 值是唯一的，没有重复的值；WeakSet 的成员只能是对象({}、[])，而不能是其他类型的值
/**
 * 操作的数据不计入垃圾回收机制，防止内存泄露
 * WeakSet 的成员只能是对象，而不能是其他类型的值
 * WeakSet 的一个用处，是储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏
 * */ 
const ws = new WeakSet();
const obj = {};
const foo = {};
ws.add(window);
ws.add(obj);

ws.has(window); // true
ws.has(foo);    // false

ws.delete(window);
ws.has(window);    // false

// 3. Map 键值对的集合, key 可以是任意类型不限制只能是字符串
/**
 * .size
 * 操作方法：.set(key, value) 可链式写法、.get(key)、.has(key)、.delete(key)、.clear()
 * 遍历方法：.keys()、.values()、.entries()、.forEach()
 *  */ 
const map = new Map([
    [1, 'one'],
    [2, 'two'],
    [3, 'three'],
]);

// 4. WeakMap 生成键值对的集合
/**
 * WeakMap 只接受对象作为键名（ null 除外），不接受其他类型的值作为键名。
 * WeakMap 的键名所指向的对象，不计入垃圾回收机制
 * WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用
 * */ 
const wm1 = new WeakMap();
const key = {foo: 1};
wm1.set(key, 2);
wm1.get(key) // 2

// 如何判断一个对象是空对象
// 1. JSON.stringify({}) === '{}' 缺陷： 判断不出Symbol
 JSON.stringify({[Symbol()]:1}) === '{}'
//  true

// 2. Object.keys({}).length === 0 缺陷： 判断不出Symbol
Object.keys({[Symbol()]:1}).length === 0 

// 3. 1和2的2中方法都不能判断出来Symbol 使用 Object.getOwnPropertySymbols({}).length  可以判断初步Symbol
Object.getOwnPropertySymbols({[Symbol()]:1}).length // 1

// 3. Reflect.ownKeys({}).length === 0 最优办法
Reflect.ownKeys({}).length === 0 // true
Reflect.ownKeys({[Symbol()]:1}).length === 0 // false

// 四、Reflect
/** Reflect设计的目的
 *  1.将 Object 对象的一些明显属于语言内部的方法（比如 Object.defineProperty ），放到 Reflect 对象上。
    现阶段，某些方法同时在 Object 和 Reflect 对象上部署，未来的新方法将只部署在 Reflect 对象上。
    也就是说，从 Reflect 对象上可以拿到语言内部的方法
    2. 修改某些 Object 方法的返回结果，让其变得更合理。
    比如， Object.defineProperty(obj, name, desc) 在无法定义属性时，会抛出一个错误，而 Reflect.defineProperty(obj, name, desc) 则会返回 false
    3. 让 Object 操作都变成函数行为。 .has(obj, name)、.deleteProperty(obj, name)、.set(target, name, value, receiver)
    4. Proxy 对象可以方便地调用对应的 Reflect 方法，完成默认行为，作为修改行为的基础
*/ 
// Reflect对象一共有13个静态方法:
Reflect.apply(target, thisArg, args) // 改变this
Reflect.construct(target, args) // 不用new 创建构造函数
Reflect.get(target, name, receiver) 
Reflect.set(target, name, value, receiver)
Reflect.defineProperty(target, name, desc) // 定义属性
Reflect.deleteProperty(target, name) // 删除属性
Reflect.has(target, name) 
Reflect.ownKeys(target)
Reflect.isExtensible(target) //是否可扩展
Reflect.preventExtensions(target) // 对象变为不可扩展
Reflect.getOwnPropertyDescriptor(target, name) // 获取属性描述对象
Reflect.getPrototypeOf(target) // 拿到__proto__
Reflect.setPrototypeOf(target, prototype) // 设置__proto__

/**总结: 
 *  Reflect.set(target, key, value, receiver)  第一个参数不是对象，会报错
 *  Reflect.has() 第一个参数不是对象，会报错
 *  Reflect.deleteProperty() 第一个参数不是对象，会报错
 *  Reflect.construct() 第一个参数不是函数，会报错
 *  Reflect.setPrototypeOf({}, null) 第一个参数不是对象，会报错
 *  第一个参数是 undefined 或 null ， Object.setPrototypeOf 和 Reflect.setPrototypeOf 都会报错
 *  Reflect.defineProperty 第一个参数不是对象，就会抛出错误
 *  Reflect.isExtensible 是否可扩展, 第一个参数不是对象，就会抛出错误
 *  Reflect.preventExtensions 不可扩展, 第一个参数不是对象，就会抛出错误
 *  Reflect.ownKeys() 方法的第一个参数不是对象，会报错
 * */ 

// Reflect.get(target, name, receiver) 
var myObject = {
  foo: 1,
  bar: 2,
  get baz() {
    return this.foo + this.bar;
  },
}

Reflect.get(myObject, 'foo'); // 1

var myReceiverObject = {
    foo: 4,
    bar: 4,
};
  
Reflect.get(myObject, 'baz', myReceiverObject) // 8

// Reflect.set(target, name, value, receiver)
var myObject = {
    foo: 1,
    set bar(value) {
        return this.foo = value;
    },
}

myObject.foo // 1
Reflect.set(myObject, 'foo', 2);
myObject.foo // 2

var myReceiverObject = {
    foo: 0,
};

Reflect.set(myObject, 'bar', 1, myReceiverObject);
myObject.foo // 4
myReceiverObject.foo // 1

/**
    如果 Proxy 对象和 Reflect 对象联合使用，前者拦截赋值操作，后者完成赋值的默认行为.
    而且传入了 receiver ，那么 Reflect.set 会触发 Proxy.defineProperty 拦截
 * */ 
let p = {
    a: 'a'
};
let handler = {
    set(target, key, value, receiver) {
        console.log('set');
        Reflect.set(target, key, value, receiver) // ** receiver 传值就会触发 defineProperty,不传就不会触发 defineProperty
    },
    defineProperty(target, key, attribute) {
        console.log('defineProperty');
        Reflect.defineProperty(target, key, attribute);
    }
};
let obj11 = new Proxy(p, handler);
obj11.a = 'A';
// set
// defineProperty
obj11.a
// A

Reflect.set(1, 'foo', {}) 

// Reflect.construct(target, args) 不使用 new ，来调用构造函数的方法
function Greeting(name) {
    this.name = name;
}
const instance = Reflect.construct(Greeting, ['张三']);
// new 的写法
const instance1 = new Greeting('张三');

// Reflect.getPrototypeOf(obj) 读取对象的__proto__属性. 对应 Object.getPrototypeOf(obj)
Reflect.getPrototypeOf(myObj) === FancyThing.prototype; // true
Object.getPrototypeOf(instance1) === Greeting.prototype // 等同于

// Reflect.setPrototypeOf(obj, newProto)
Reflect.setPrototypeOf({}, null)
// true
Reflect.setPrototypeOf(Object.freeze({}), null)
// false
Object.setPrototypeOf(1,{}) 
// 1 不会报错, 返回第一个参数本身

// Reflect.apply(func, thisArg, args) 等同于 Function.prototype.apply.call(func, thisArg, args) ，用于绑定 this 对象后执行给定函数
const ages = [11, 33, 12, 54, 18, 96];

Math.min.apply(Math, ages) === Reflect.apply(Math.min, Math, ages); // true
Object.prototype.toString.call(youngest) === Reflect.apply(Object.prototype.toString, youngest, []); // true

// Reflect.defineProperty(target, propertyKey, attributes)
/**
 * Reflect.defineProperty方法基本等同于Object.defineProperty ，用来为对象定义属性。
 * 未来，后者会被逐渐废除，请从现在开始就使用 Reflect.defineProperty 代替它
 * */ 

// Reflect.preventExtensions(target)
// Reflect.preventExtensions 对应 Object.preventExtensions 方法，用于让一个对象变为不可扩展

// Reflect.ownKeys
// Reflect.ownKeys 方法用于返回对象的所有属性，基本等同于 Object.getOwnPropertyNames 与 Object.getOwnPropertySymbols 之和
// 常用来判断对象是否为空对象

// 五、点运算符 Rest 参数
/** 目的: 获取函数多余的参数. 用来取代 arguments. 是真正的数组.  arguments是类数组. rest参数后不能再跟其他参数,只能作为最后一个参数
 * 
 * */ 
// ES5
function fn() {
    console.log(arguments);
}
fn(1,2,3,4); // [Arguments] { '0': 1, '1': 2, '2': 3, '3': 4 }

// ES6
function fun(...rest){
    console.log(rest);
}
fun(1,2,3,4,5) //[ 1, 2, 3, 4, 5 ]

// 对于函数的length属性，不包含rest
function fn(a, b, ...rest) {}
console.log(fn.length) // 2

// 六、Proxy