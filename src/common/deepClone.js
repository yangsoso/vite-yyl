/**
 * 在JavaScript中，存在浅拷贝的现象有：
    Object.assign
    Array.prototype.slice(), Array.prototype.concat()
    使用拓展运算符实现的复制
    
    浅拷贝的定义：如果属性是基本类型，拷贝的就是基本类型的值。如果属性是引用类型，拷贝的就是内存地址

    常见的深拷贝方式有：
        _.cloneDeep()
        jQuery.extend()
        JSON.stringify()  会忽略undefined、symbol、函数、正则
        手写循环递归

    总结：
    1.如果属性是基本类型，拷贝的就是基本类型的值。如果属性是引用类型，拷贝的就是内存地址
    2.深拷贝是递归拷贝深层次，属性为对象时，深拷贝是新开栈，两个对象指向不同的地址
 * */ 

// 手写循环
function deepClone(source) {
    // null数据需要特殊处理
    if (source === null) {
      return source
    }

    if (source instanceof Date) {
        return new Date(source);
    }

    if (source instanceof RegExp) {
        return new RegExp(source);
    }

    // 校验要拷贝的数据是对象还是数组
    const target = Array.isArray(source) ? [] : {}

    for (const k in source) {
      const val = source[k]
      const valueType = typeof val
      // 校验拷贝的数据类型
      if (valueType === 'function') {
        target[k] = new Function(`return ${val.toString()}`)()
      } else if (valueType === 'object') {
        target[k] = deepClone(val)
      } else {
        target[k] = val
      }
    }
    return target
  }
  
  const obj1 = { name: 'dog', info: { age: 3 }, fn: function () {} }
  const obj2 = deepClone(obj1)
  obj2.name = 'cat'
  obj2.info.age = 4
  console.log(obj1) // { name: 'dog', info: { age: 3 }, fn: function(){} }
  console.log(obj2) // { name: 'cat', info: { age: 4 }, fn: function(){} } 

// 验证 JSON.parse(JSON.stringify(obj)) 缺陷
var obj = {
    name: 'A',
    name1: undefined,
    name3: function() {},
    name4:  Symbol('A')
}
const obj2 = JSON.parse(JSON.stringify(obj));
console.log(obj2); // {name: "A"}