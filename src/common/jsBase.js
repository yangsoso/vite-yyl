// 一、原型和原型链的继承
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

/** 
 * 1. 使用语法结构创建对象
 *  */ 
var o = {a:1}
// 原型链： o => Object.prototype => null
var a = ['yo','xx']
// 原型链： a => Array.prototype => Object.prototype => null
function f(){
    return 2;
}
// 原型链： f => Function.prototype => Object.prototype => null


/**
 * 2.使用构造器创建的对象
 * 使用 new 来作用这个函数时，它可以被称为构造函数
 * */   
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

/**
 * 3. 使用 Object.create 创建的对象
 * ES5 引入的新方法 Object.create(),可以调用这个方法来创建一个新的对象，新对象的原型就是调用create() 时传入的第一个参数
 * */ 
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

/**
 * 4. 使用 class 关键字创建的对象
 * ES6 引入的新的关键字 class. JavaScript 仍然是基于原型。新的关键字包括 class constructor static extends super
 * */
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


/**
 *  二、检查某个属性是否是该对象自定义的属性 b.hasOwnProperty('a') 不会遍历原型链的方法
 *  Object.keys() 和 for..in 的返回并不总能保持先来后到的顺序
 * */
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

// 三、prototype 和 Object.getPrototypeOf 
/**
 * 原型链中，函数和对象的关系就是 new 一个函数发生的过程 的那条链
 * */ 

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

// 2. new fn 和 new fn() 过程和结果有什么区别？
/**
 * 简答：
 *  new fn() 的构造函数时有括号的执行的优先级会提升，
 *  能通过 new fn().xxx 拿到构造函数中的属性和方法。如果没有括号就会报错 new fn.xxx 会报错(Uncaught TypeError: fn.xx is not a constructor)
 *  new fn().xxx 执行相当于 (new fn()).xxx;  new fn.xxx 执行顺序相当于 new (fn.name)
 *  所以：用 new 创建构造函数的实例时，通常情况下 new 的构造函数后面需要带括号(如： new Person() )，不拿构造函数里得值和属性是可不需要括号
*/

// 简写一个 new 函数
function _New(fn, ...args){
    var obj = Object.create(fn.prototype);
    var rest = fn.apply(obj,args);
    return (typeof rest ==='object'&& typeof rest ==='function'&&typeof rest !== null) ? rest: obj
}

// 3. 判断函数被调用的方式
/**
 * ES5 经常依据this是否为构造函数的实例，来判断函数被调用的方式
 * 缺陷：不是很准确。
 * 比如let person = new Person(); Person.call(person)，用call或者apply修改函数内的this 指向到函数的实例上，那么就不能区分是否通过new调用
*/
function Person() {
    if(this instanceof Person){
        console.log('使用new 调用了构造函数');
    }else{
        console.log('普通函数调用');
    }
}
new Person() // 使用new 调用了构造函数
Person() // 普通函数调用

/**
 * ES6 判断函数调用方式
 * 判断函数是否通过new调用,es6 引入了new.target- 这个元属性,非对象的属性
 * new.target在函数体外是一个语法错误
 * */ 
function Person(){
    if(new.target === Person){
        console.log(new.target);
    }else {
        console.log(new.target);
    }
}
new Person()   // Person
Person()   // undefined

//  4. instanceof 原理和实现
/**
 * 原理：右边变量的原型 prototype 在左边变量的原型链上即可
 * 实现：遍历左边变量的原型链，直到找到右边变量的 prototype ,查找失败就是 false
 * */ 
function _Instanceof(leftVal, rightVal){
    // 基本类型直接返回 false
    const baseType = ['string','number','boolean',' undefined','symbol']
    if(baseType.includes(typeof(leftVal))) { return false }

    let rightProto = rightVal.prototype;
    leftVal = leftVal.__proto__;
    while(true){
        // 找到最顶层
        if(leftVal === null){
            return false;
        }

        // 找到了严格相等
        if(leftVal === rightProto){
            return true;
        }

        // 没有就继续向上一层寻找
        leftVal = leftVal.__proto__;
    }
}

// instanceof 使用 demo
let person55 = function () {}
let nicole = new person55()
nicole instanceof person55 // true

// 四、函数如何继承
/**
    1. 原型链继承 Child.prototype = new Parent()
    2. 调用构造函数 Parent.call(this)
    3. 组合继承(原型链和构造函数) Parent.call(this, name);Child.prototype = new Parent();
    4. 原型式继承
    5. 寄生式继承
    6. 寄生组合时继承(常用) var F = function () {};F.prototype = Parent.prototype;Child.prototype = new F();
 * */ 

// 1. 原型链继承： 让新实例的原型等于父类的实例
/**
 * 实例可继承的属性有：实例的构造函数的属性，父类构造函数属性，父类原型的属性。不会继承父类实例的属性
 * 优点：实例间可以复用
 * 缺点： 无法向父类构造函数传参、继承单一、所有新实例都共享父类实例的属性(任意一个新实例修改了属性，都会被影响)
*/
function Person() {
    this.name = 'john';
    this.say = function(){
        console.log(this.name);
    }
}

Person.prototype.job = function(){
    console.log('teacher');
}
Person.prototype.age = 24;

function Child() {}
Child.prototype = new Person(); // 父类的实例 等于 子类的原型
let child = new Child()
// {
//     name: "john"
//     say: ƒ ()
//     __proto__: Person
//         name: "john"
//         say: ƒ ()
//         __proto__:
//             age: 24
//             job: ƒ ()
//             constructor: ƒ Person()
//             __proto__:
//                 constructor: ƒ Object()
// }

// 2. 构造函数实现继承： 用.call()和.apply()将父类构造函数引入子类函数(在子类函数中做了父类函数的自执行(复制))
/** 特点：
 *  仅继承父类构造函数的属性，没有继承父类原型的属性
 *  解决了原型链继承的缺点
 *  新的实例可传参
 *  可继承多个构造函数属性(call 可以传多个)
 * 缺点：
 *  仅继承父类构造函数的属性
 *  无法实现构造函数的复用(每次都要重新调用)
 *  每个新实例都有父类构造函数的副本
 * */ 
function Person(name) {
  this.name = name || 'sai';
  this.sex="女";
  this.say = function(){
    console.log(this.name);
  }
}
Person.prototype.age =18;
Person.prototype.job = function(){
    console.log('sales');
}
function Child(name) {
    Person.call(this,name); // 通过call，apply在父类构造函数中传入子类函数
}

let child1 = new Child('xie')
let child2 = new Child('yang')

child1.age // undefined

// 3. 组合继承（组合原型链继承和借用构造函数继承）
/**
 * 结合原型链继承和构造函数继承的优点，传参和复用
 * 特点：
    可以继承父类原型上的属性，可以传参，可复用。
　  每个新实例引入的构造函数属性是私有的。
  缺点：
    调用了两次父类构造函数(耗内存)，子类的构造函数会代替原型上的那个父类构造函数
 * */ 
function Person(name) {
    this.name = name|| 'default';
    this.age = 12;
}
Person.prototype.age =18;
Person.prototype.job = function(){
    console.log('farm');
}
function Child(name) {
    Person.call(this, name);
}
Child.prototype = new Person();
let child3 = new Child('ting')

// 4. 原型式继承
/**
 * 用一个函数包装一个对象，然后返回这个函数的调用，这个函数就变成了可以随意添加属性的实例或对象。Object.create()就是这个原理
 * 特点：类似复制一个对象，用函数包装。
 优点：父类方法可复用
  缺点：
    所有实例都会继承原型上的属性
    无法复用,子类无法向父类传参
 * */ 
function createObj(o){
    function F(){}
    F.prototype=o
    return new F()
}
    
let person= {
    name:'lou',
    age:23,
    say:function(){
        console.log('hi');
    }
}
    
let person1=createObj(person)
let person2=createObj(person)

console.log(person1.say()); // hi
person2.age=24
console.log(person2.age); // 24
console.log(person1.age); // 23

// 5. 寄生式继承
/**
 * 优点：没有创建自定义类型，因为只是套了个壳子返回对象，这个函数顺理成章就成了创建的新对象。
   缺点：没用到原型，无法复用
*/
function createObj(o){
    let clone=Object.create(o)
    clone.sayName=function() {
        console.log('hi');
    }
    return clone
}
  
let personObj = {
    name:'xxx',
    age:23,
    say:function(){
      console.log('hi');
    }
}
  
let person11 = createObj(personObj)
let person22 = createObj(personObj)

person11.say();
person22.age=24
person22.age;
person11.age;

// 6. 寄生组合式继承，是目前引用类型的最佳模式
/**
 优点：
  只调用一次父类构造函数
  子类和向父类传参
  父类方法可以复用
  父类的实例不会被共享
 * */ 
function Parent(name){
    this.name = name;
    this.colors = ['red','blue','green']
    this.age = 0
}
  
Parent.prototype.getName=function(){
    console.log(this.name);
}
  
function Child(name,age){
    Parent.call(this,name);
    this.age=age;
    this.name=name;
}

// 重点：封装一下
function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}

// 重点：原型替换一下
function prototype(child, parent) {
    var prototype = object(parent.prototype);
    // 将子类的构造函数给父类的构造函数
    prototype.constructor = child;
    // 将父类的原型给子类的原型
    child.prototype = prototype;
}
  
// 当我们使用的时候：
prototype(Child, Parent);

let child33 = new Child('lucky',18)
let child44 = new Child('lucky')

console.log(child33);
console.log(child44);

// 五、闭包的理解
/**
 *  理解: 由函数以及声明该函数的词法环境组合而成的。该环境包含了这个闭包创建时作用域内的任何局部变量。
    表现为： 就是可以在一个内层函数中访问到其外层函数的作用域。当创建一个函数的时候，闭包就会在创建函数的同时被创建出来

    应用场景：疯转私有变量或函数、函数柯里化、模仿块级作用域、实现数据缓存、防抖节流等

    缺点：
        闭包产生的参数和变量不会被垃圾回收机制回收，容易造成内存泄露，通常使用完之后将变量设置为null
        有一定的性能损耗
 * */ 