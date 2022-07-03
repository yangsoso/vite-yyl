# 2022年 面经

## 自我介绍
```
  我叫杨玉玲，18年毕业於贵州大学，软件工程专业，大数据方向，本科。
  之后的工作中主要从事前端开发、网页设计、需求设计相关的工作。
  目前已经有4年的工作经验了。
  项目中有涉及平台类、金融类、管理系统类、财务展示看板类型的项目。独立负责项目中分配需求的开发和维护，封装通用组件，业务组件，公共方法。
  我熟悉的技术栈主要是vue.js框架，es6， js，Html5.使用过elementui、iview、vui、echarts 前端框架和库.
  此外，会利用vue-cli和webpack搭建前端工程。利用过 vueDragable， z-tree 实现拖拽插件。实现我的收藏夹功能。
  具体项目中做过页面的性能优化，代码重构，新功能的预演，动态表单等复杂的功能。
  项目中也时常会帮别的同时解决问题或者任务分担，上级对我评价也很满意。
  目前，自己的架构设计能力还有些浅薄，后续自己会在框架设计能力上专研。已提升自己的框架能力吧。
  最近有在学习提升自己的node.js和webpack能力。
```

## 性能优化
   首先是找到慢的原因，就要要根据项目自身的情况，针对性的做优化。
   慢的原因主要有 浏览器渲染慢、服务器响应慢

   浏览器加载和渲染慢，可能是 js运行阻塞、html 代码量文件多、css样式重绘重排 
   服务器响应慢，可能是一次性加载了所有需要的资源、数据库设计太重、缓存机制

  常用的方法：
	减少http请求、资源合并和压缩、代码tree-shaking、使用cdn 网络加载、 利用缓存、交互体验上的优化、懒加载、骨架屏、loading

## 千分位的实现 js
1. 项目中使用Intl.NumberFormat，ts内置的一个格式化方法实现，但是这个方法在不同的浏览器上在输入整数12位，小数5位以上，就会导致失真，
   转换之后，小数位后的数据会丢失。和传进去的本地国际化语言也有关系。
   
2. 正则表达式
3. 采用数组分割法 主要思路是：将串转为数组，反向遍历，求模 %3等于0的时候就添加一个 逗号。否则就不处理。
	
```
function format_with_array(number) { 
  	// 转为字符串，并按照.拆分
  	const arr = (number + '').split('.');
  	// 整数部分再拆分
  	const int = arr[0].split('');
  	// 小数部分
  	const fraction = arr[1] || '';
  	// 返回的变量
  	let r = '';
  	int.reverse().forEach(function (v, i) {
    		// 非第一位并且是位值是3的倍数，添加“,”
    		if (i !== 0 && i % 3 === 0) {
     		 r = v + ',' + r;
    		} else {
      		// 正常添加字符(这是好写法)
      		r = v + r;
    	}
 	 });
  	// 整数部分和小数部分拼接
  	return r + (!!fraction ? '.' + fraction : '');
}
// 测试用例
console.log(format_with_array(1234567893.99));	
```

1. 保留小数点后2位的方法 num.toFixed(2)
2. 只能是数字的正则 str.replace(/[^\d.]/g,'')
		
3. 请求超时了，想要中止掉promise，但是promise的状态是开启之后就无法中止的。es7给出的新的api Promise.race()可以处理这种超时断开的行为

## ES6 模块加载规则
   代码是在模块作用域之中运行，而不是在在全局作用域运行。模块内部的顶层变量，外部不可见。
   模块脚本自动采用严格模式，不管有没有声明 use strict。
   模块之中，可以使用 import 命令加载其他模块( .js后缀不可省略，需要提供绝对地址 url 或相对地址 url)，也可以使用 export 命令输出对外接口。
   模块之中，顶层的this关键字返回undefined,而不是指向window.也就是说，在模块顶层使用this关键字，是无意义。
  
# 算法

## 快速排序  核心是 “分治”
   > 思路：选择数组某一个数为基数，一趟排序将小的放基数左边，大的放基数右边，基数在中间。然后开始从左边继续快排，循环递归，最终让整个数组有序。
   > 基数选择：随机一个，第一个，中间，最后一个 ，左中右3个数取中位数
    ```
   function quickSort(arr) {
	  if(arr.length <=1) return arr;
	    // 定基数,找到数组的中间项，在原来的数组中移除他
	    const midIndex = Math.floor(arr.length/2)；
	    const middle = arr.splice(midIndex,1)[0];
	    // 定义左右接收数组
	    const leftArr= [];
	    const rightArr = [];
        // 遍历
        for(let i = 0; i< arr.length; i++) {
            let current = arr[i];
            current<middle?leftArr.push(current):rightArr.push(current)
        }
	    return quickSort(leftArr).concat(middle ).concat(quickSort(rightArr));	
    }

	const arr = [5, 2, 7, 8, 34, 7, 39, 12, 56, 9, 1];
 	console.log(bubbleSort(arr));
    ```

## 冒泡排序 主要是遍历交换
> 交换
```
    function swap(arrar,i,j) {
        [ array[i], array[j] ] = [ array[j], array[i] ]
    }
    // 遍历交换
    function bubbleSort(array) {
        for(let i = 0 ; i <array.length; i++){
            if(array[ i ] < array[i+1] ){
                swap(array, i,i+1)
            }
        }
    }

```
## 选择排序 ，找到一个最小或最大的放在最左侧，然后继续遍历。不稳定
```
selectSort(arr){
	for(let i= 0;i<arr.length -1;i++){
	 	let minIndex = i;
		for(let j = i+1; j<arr.length;j++){
			if(arr[ j ] < arr[ i ]){
				minIndex = j;
			}
				
		}
		if(minIndex != i){
			int temp = arr[i];
			arr[i] = arr[minIndex];
			arr[minIndex] = temp;
			
		}
	}
}
```






# vue 

1. v-thml 会遇到的问题
   > 容易造成安全问题，比如 xss 攻击。
   > v-html 中有样式，样式是作用不上的。除非使用 >>> 深度选择器，/deep/, 或在写一个style


# 保诚科技面试准备
> 第一步：完成笔试 HackerRank

```
function miniMaxSum(arr) {
    // Write your code here
    arr.sort((a, b) => a - b);
    let min = arr.slice(0, arr.length - 1).reduce((a,b) => a+b)
    let max = arr.slice(1).reduce((a,b) => a+b)

    console.log(min, max)
}
```
