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

// 2. Symbol: 创建后独一无二且不可改变的数据类型,可作为对象的key值。主要解决可能出现的全局变量名称冲突的问题

// 二、数据结果
// 带键的集合 Map Set WeakMaps WeakSets

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
// 1. JSON.stringify({}) == {}
// 2. Object.keys({}).length 

