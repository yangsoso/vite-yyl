# 2022年 面经

## 自我介绍
```
  我叫杨玉玲，18年毕业於贵州大学，软件工程专业，大数据方向，本科。
  之后的工作中主要从事前端开发、网页设计、需求设计相关的工作。
  目前已经有4年的工作经验了。
  项目中有涉及平台类、金融类、管理系统类、财务展示看板类型的项目。独立负责项目中分配需求的开发和维护，封装通用组件，业务组件，公共方法。
  我熟悉的技术栈主要是vue.js框架，es6， js，Html5.使用过 elementui、iview、vui、echarts 前端框架和库.
  此外，会利用vue-cli和webpack搭建前端工程。利用过 vueDragable， z-tree 实现拖拽插件。实现我的收藏夹功能。
  具体项目中做过页面的性能优化，代码重构，新功能的预演，动态表单等复杂的功能。
  项目中也时常会帮别的同时解决问题或者任务分担，上级对我评价也很满意。
  目前，自己的架构设计能力还有些浅薄，后续自己会在框架设计能力上专研。已提升自己的框架能力吧。
  最近有在学习提升自己的 node.js和 webpack 能力。
```

## 性能优化
   首先是找到慢的原因，就要要根据项目自身的情况，针对性的做优化。
   慢的原因主要有 浏览器渲染慢、服务器响应慢

   浏览器加载和渲染慢，可能是 js运行阻塞、html 代码量文件多、css样式重绘重排 
   服务器响应慢，可能是一次性加载了所有需要的资源、数据库设计太重、缓存机制

  常用的方法：
	减少http请求、资源合并和压缩、代码tree-shaking、使用cdn 网络加载、 利用缓存、交互体验上的优化、懒加载、骨架屏、loading

## webpack 如何性能优化，打包文件更小，时间更短
    如何利用webpack来优化前端性能？ 问的是生产环境优化
    如何提高webpack的构建速度？ 问的是构建速度的优化

### tree-shaking 删除没有使用的代码 优化前端性能/提高构建速度
    tree-shaking是一种基于 ES Module 规范的 Dead Code Elimination 技术打包，在打包过程中检测工程中没有引用过的模块并进行标记，删除没有引用过的模块，提高构建速度，较少程序运行时间。

    **使用tree-shaking需要注意什么？**
        1.默认mode = production ，生产环境默认开启tree-shaking功能。
        2.需要是使用 ES6 规范编写模块代码,ES6的模块依赖关系是确定的，和运行时状态无关
        3.尽量不写带有副作用的代码。如编写了立即执行函数，在函数里使用了外部变量等。

### 如何利用webpack来优化前端性能
    - 代码压缩
    - 按需加载
        * 代码分割 splitChunks - 在optimization配置项中配置
            1.可以将node__mudules中代码单独打包成一个chunk输出（比如使用了jqury？）
            2.会自动分析多入口chunk中，有没有公共的文件，如果有会打包成单独的一个chunk不会重复打包
        * 使用Dll进行分包
            1.正常情况下node_module会被打包成一个文件
            2. 使用dll技术，对可以将那些不常更新的框架和库进行单独打包，生成一个chunk
        * 使用路由懒加载
            在代码中所有被 import()函数引用的模块，都将打成一个单独的包，放在 chunk 存储的目录下。在浏览器运行到这一行代码时，就会自动请求这个资源，实现异步加载
        * 资源压缩
            js压缩:利用 terser-webpack-plugin
            css压缩:利用了optimize-css-assets-webpack-plugin 插件
            图片压缩：image-webpack-loader 插件
            commonsChunkPlugin
            删除了console、注释、空格、换行、没有使用的css代码等，其实作用很小

### 如何提高webpack的构建速度
    首先使用 webpack-bundle-analyzer 构建出打包后的chunkb包查看 打包后那些文件过大
    - 减少需要构建的文件或代码
    
    - webpack4.0 带来的优化
        v8 引擎带来的优化（for of 替代 forEach、Map 和 Set 替代 Object、includes 替代 indexOf）
        默认使用更快的 md4 hash 算法
        webpack AST 可以直接从 loader 传递给 AST，减少解析时间
        使用字符串方法替代正则表达式

详情看webpack.js

## 项目中遇到的问题有哪些？怎么解决+
    form 表单中，只有一个输入框，按下回车键会触发页面刷新。解决：在 form 中配置 @submit.native.prevent
    new Map() 结构的数据，vue 2.0监听不到，在子组件中。解决： 存入store 保证刷新页面数据会重新 set

    vue2.0 的项目中使用 echarts 库，切换tabs 时，页面崩溃了，卡死。
        解决1：初始化 echarts 时，先清掉上一次的实例，不然浏览器占用的内存会成倍数增加。导致内存溢出。
        解决2：vue组件在beforeDestroy勾子中，最好也要清掉echarts实例，原因也是为了及时清空不必要占用的内存
    
    import a from './a.vue'; export { a,b,c } 这样的公共文件里面导出组件 a, a 在首页要用，在详情页要用。但是在先打开了首页后， 在详情也就医pain空白了。
    解决： 在详情页使用 import a from './a.vue';形式使用。因为a组件在首页加载过一次就不会在加载了，所以在详情页不加载就拿不到了。



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

<!-- JS 作用域考题
    1. 除了函数外，js是没有块级作用域
    2.作用域链： 内部可以访问外部的变量，但是外部不能访问内部的变量
    注意：内部有，优先查找内部，如果内部没有就查找外部的

    3.注意声明的变量是用var 还是没有写
    4.js有变量和函数提升的机制【变量悬挂声明】
    5. 优先级： 声明变量-> 声明普通函数-> 参数 -> 变量提升
 -->

 


# vue 

1. v-thml 会遇到的问题
   > 容易造成安全问题，比如 xss 攻击。
   > v-html 中有样式，样式是作用不上的。除非使用 >>> 深度选择器，/deep/, 或在写一个style

# vue3.0 和 react 的区别 说说你的看法
 react 声明式，高效且灵活的用于构建用户界面的 JavaScript 库，提取代码片段组成 UI 界面
 vue 是 MVVM 设计模式的框架

 从框架的设计思路上来说：
    react 是 html in javaScript,或者说all in javaScript,所以有JSX语法。
    vue 是吧 HTML CSS JS 组合到一个文件，使用各自的处理方式，自己写了一套模板语法。
 核心思想：
    React 声明式渲染、组件化、单向数据流，setSate 更新data 值后，组件自己处理; differ 是首位是除删除外是固定不动的,然后依次遍历对比。
    vue 核心是只关注试图

 区别：
    - react
    更灵活，有丰富的javaScript库。扩展性好，跨多平台开发（通过react native 实现将react组件模型实现 ios和 android 开发） 
    大型应用一般用 react
    - vue
    易于使用，性能更好，文档社区齐全国内，比较流行

 diff算法实现
    react 首位是除删除外的是固定不动的，然后依次遍历对比
    vue 的 compile 阶段的optimize标记了static点，可以减少differ的次数，采用双向遍历

 相同点：
    都使用了 Virtual DOM
    提供了响应式 (Reactive) 和组件化 (Composable) 的视图组件
    将注意力集中保持在核心库，而将其他功能如路由和全局状态管理交给相关的库





