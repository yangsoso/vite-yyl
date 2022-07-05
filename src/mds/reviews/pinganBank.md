# 面试题汇总
    前端面试过程中，往往由于我们紧张或者没有听懂面试官的问题。导致我们回答问题的时候缺少思路，没有形成框架回答。面试官就判断你的能力和级别就会偏低。这篇 md 就是记录一下我在今年的面试中，和面试官说了很多废话，然后可能让面试官觉得我解释过多，没有一下说到重点，这是比较尴尬的。下面我整理的内容都会是简要回答模板和深入分析的内容2个部分来梳理。

    **问题简要回答深入刨析**

### link 和 @import 有什么区别
  - 简答
    link 是 HTML 标签；@import 是 css 语法；
    页面被加载时，link 会和 html 同时被加载；@import 在页面记载完后才被加载；
    @import 是 css2.1 才有的语法，IE5以下不支持；link 不存在兼容性问题；
    link 的样式权重高于 @import 的权重
    javaScript 只能控制 dom 去改变 link 标签引入的样式；而 @import 的样式不是 dom 可以控制的
    
### ::before 和 :after 中双冒号和单冒号有什么区别，解释一下伪元素的作用
    单冒号(:) 用于 CSS3伪类，双冒号(::)用于 CSS3 伪元素
    ::before 就是以一个子元素存在，定义在元素主体之前的一个伪元素。并不存在于 dom 之中，只存在页面之中。

    :before 和 :after 这2个伪元素，是在 CSS2.1中新出现的。起初，伪元素的前缀使用的是单冒号语法，但随着 Web 的进化，在 CSS3 的规范里，伪元素的语法就被替换为双冒号，成为 ::before ::after

### CSS3 新增的伪类有哪些
    div:first-child —— 匹配 div 中第一个元素
    div:last-child —— 匹配 div 中最后一个元素
    div:nth-child(n) —— 匹配父元素中第n个子元素 n可以是数字、关键字、公式。
        注意:n也可以是 even（表示偶数） odd（表示奇数） n也可以是公式，从0开始
        
    div:first-of-type —— 指定类型 div 的第一个
    div:last-of-type —— 指定类型 div 的最后一个
    div:nth-of-type(n) —— 指定类型e的第n个

    div:not(div2)    //除div2之外的全部div
    :enable 选择可用表单元素
    :disable 选择禁用表单元素
    :checked 选择被选中的表单元素

### css 伪类元素
    :before —— 在元素内部的前面插入内容
    :after —— 在元素内部的后面插入内容

值得注意的是:
    before、after 必须得有 content 属性
    before 在内容的前面，after 在内容的后面
    before 和 after 创建一个元素，都属于行内元素
    因为在 dom 里面看不见伪元素，所以称之为这类元素为 伪元素
    伪元素和标签选择器一样，权重为 1

### BFC
    简要回答:
   > 块级格式化上下文。是一个独立的区域。
   > 作用: 可以清除浮动、避免margin重叠、避免某元素被浮动元素覆盖(避免高度塌陷)、实现灵活健壮的自适应布局(自适应两栏布局)。

   BFC布局规则:
    内部的 box 会在垂直方向上一个接一个的放置。
    Box 垂直方向的距离由 margin 决定，属于同一 BFC 的两个相邻 box 的 margin 会发生重叠。
    每个元素的 margin box 的左边，与包含块 border box 的左边接触
    BFC 区域不会与 float box 重叠
    子元素不会影响到外面的元素，形成一个隔离的容器
    计算 BFC 的高度时，浮动元素也会参与计算
    BFC 布局的都是块级元素

    如何创建 BFC ？
    * 根元素
    * float 的值不是 none
    * overflow 的值不是 visible 
    * position 的值不是 static 或 relative
    * display 的值为 table-cell，table-caption，或 inline-block 中的任意一个
    * contain 的值为 layout，content，paint，或 strict 中的任意一个

    总结：
    BFC 内外互不影响 
    BFC 包含内部的浮动   --解决内部浮动元素导致的塌陷
    BFC 排斥外部的浮动   --BFC 的元素不会和外部的浮动发生重叠
    外边距折叠的计算不能跨域 BFC 的边界 
    兄弟 BFC 元素互不影响 --实现多列布局

    BFC 应用场景
    解决块级元素垂直方向margin重叠
    解决高度塌陷问题
    清除浮动

### 常见的 格式化上下文有哪些
    简答： BFC(block 块级) IFC(inline 内联行内) FFC(flex 弹性 css3) GFC(grid 栅格 css3)
    
    总结：
    一般来说，FFC能做的事情，通过GFC都能搞定，反过来GFC能做的事通过FFC也能实现。 通常弹性布局使用FFC，二维网格布局使用GFC。
    所有的 FFC 与 GFC 也是一个 BFC，在遵循自己的规范的情况下，向下兼容 BFC 规范。

#### IFC
 > 行级格式化上下文
    
   如何触发IFC
    块级元素中仅包含内联级别元素

   IFC布局规则
   * 在一个IFC内，子元素是水平方向横向排列的，并且垂直方向起点为元素顶部
   * 子元素只会计算横向样式空间，【padding、border、margin】，垂直方向样式空间不会被计算，【padding、border、margin】
   * 在垂直方向上，子元素会以不同形式来对齐（vertical-align）
   * 能把在一行上的框都完全包含进去的一个矩形区域，被称为该行的行框（line box）。行框的宽度是由包含块（containing box）和与其中的浮动来决定。
   * IFC中的line box一般左右边贴紧其包含块，但float元素会优先排列。
   * IFC中的line box高度由 CSS 行高计算规则来确定，同个IFC下的多个line box高度可能会不同。
   * 当 inline boxes的总宽度少于包含它们的line box时，其水平渲染规则由 text-align 属性值来决定。
   * 当一个inline box超过父元素的宽度时，它会被分割成多个boxes，这些boxes分布在多个line box中。如果子元素未设置强制换行的情况下，inline box将不可被分割，将会溢出父元素。

    IFC 应用场景
    元素水平居中(display: inline-block;; text-align: center;)
    多行文本水平垂直居中(多行文本水平垂直居中display: inline-block;vertical-align: middle;)

#### GFC 栅格格式化上下文
 > Grids网格布局

 如何触发GFC？
 当为一个元素设置display值为grid或者inline-grid的时候，此元素将会获得一个独立的渲染区域

 应用场景
 表格，合并，自由拼接，任意魔方布局

#### FFC 弹性格式化上下文
> flex布局,弹性盒模型,用作自适应布局比较多
> FFC布局中，float、clear、vertical-align属性不会生效

    如何触发FFC？
    当 display 的值为 flex 或 inline-flex 时，将生成弹性容器（Flex Containers）, 一个弹性容器为其内容建立了一个新的弹性格式化上下文环境（FFC）

    FFC布局规则
    * 设置为 flex 的容器被渲染为一个块级元素
    * 设置为 inline-flex 的容器被渲染为一个行内元素
    * 弹性容器中的每一个子元素都是一个弹性项目。弹性项目可以是任意数量的。弹性容器外和弹性项目内的一切元素都不受影响。简单地说，Flexbox 定义了弹性容器内弹性项目该如何布局

    FFC应用场景
    自动撑开剩余高度/宽度
    问题：看一个经典两栏布局：左边为侧边导航栏，右边为内容区域，用我们之前的常规布局，可能就需要使用到css的calc方法来动态计算剩余填充宽度了，但如果使用flex布局的话，只需要一个属性就能解决这个问题

### 分别简述 computed 和 watch 的使用场景
    computed 内部的函数在调用时不加()
    computed 是依赖 vm 中 data 的属性变化而变化的，也就是说，当 data 中的属性发生改变的时候，当前函数才会执行，data 中的属性没有改变的时候，当前函数不会执行
    computed 中的函数必须用 return 返回。
    在computed 中不要对 data 中的属性进行赋值操作。如果对data中的属性进行赋值操作了，就是 data 中的属性发生改变，从而触发 computed 中的函数，形成死循环了
    
    watch 中的函数名称必须要和data中的属性名一致，因为 watch 是依赖 data 中的属性，当 data 中的属性发生改变的时候，watch 中的函数就会执行
    watch 中的回调函数有两个参数，前者是 newVal，后者是oldVal
    watch 中的回调函数是不需要调用的 可以设置立即执行和深度监听

    ```
    get curName() {
        return this.name;
    },

    watch: {
        'cityName.name': {
            handler(newName, oldName) {
            // ...
            },
            deep: true,
            immediate: true
        }
    }
    ```
    使用场景:computed----当一个属性受多个属性影响的时候。watch----当一条数据影响多条数据的时候，使用watch。
    todo 原理

### Map Set Object 的用法和区别
    JavaScript 的对象 Object，本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。这给它的使用带来了很大的限制.
    Map 键值对结构，和 JSON 对象类似; key 可以是字符串或对象的任意类型, 完善 Object 的 key 只能是字符串的缺憾。
    Set 值就是键，不能通过迭代器来改变 Set 的值
    - 区别
    Object 是 字符串-值 的对应，Map 是 值-值 的对应。
    Map 和 Set 都具有极快的查找速度
    初始化的值不一样，Map 需要一个二位数组，而 Set 需要的是一维 Array 数组
    Map 和 Set 都不允许健重复

### created 和 mounted 的区别
    created: 在模板渲染成 html 前调用，即通常初始化某些属性值，然后再渲染成视图。
    mounted: 在模板渲染成 html 后调用，通常是初始化页面完成后，再对 html 的 dom 节点进行一些需要的操作。

### 简述每个周期具体适合哪些场景
    beforeCreate : 可以在这加个loading事件，在加载实例时触发 
    created : 初始化完成时的事件写在这里，如在这结束loading事件，异步请求也适宜在这里调用 
    mounted : 挂载元素，获取到DOM节点 
    updated : 如果对数据统一处理，在这里写上相应函数 
    beforeDestroy : 可以做一个确认停止事件的确认框 
    nextTick : 更新数据后立即操作dom

    vue-router 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。hash（#）是URL 的锚点，代表的是网页中的一个位置，单单改变#后的部分，浏览器只会滚动到相应位置，不会重新加载网页，也就是说 #是用来指导浏览器动作的，对服务器端完全无用，HTTP请求中也不会不包括#；同时每一次改变#后的部分，都会在浏览器的访问历史中增加一个记录，使用”后退”按钮，就可以回到上一个位置；所以说 Hash模式通过锚点值的改变，根据不同的值，渲染指定DOM位置的不同数据
    由于hash模式会在url中自带#，如果不想要很丑的 hash，我们可以用路由的 history 模式，只需要在配置路由规则时，加入"mode: 'history'",这种模式充分利用 history.pushState API 来完成 URL 跳转而无须重新加载页面。
    router-link  router-view 

### vue-router 是什么?它有哪些组件
    window.onHashChange

    是onHashChange事件，可以在window对象上监听这个事件。Hash发生变化的url都会被浏览器记录下来，这样一来，尽管浏览器没有请求服务器，但是页面状态和url一一关联起来，实现了浏览器前进后退跳转的功能。Hash因为占用的锚点功能，所有页面中锚点功能不可用。
    History可以分为两大部分:切换和修改，切换历史状态包括back，forward，go三个方法，修改历史状态包括pushState，replaceState两个方法。History模式下，因为可以自由的修改path，当刷新时，如果服务器中没有相应的响应或资源，会报404。
    在任何组件内通过 this.$router 访问路由器，也可以通过 this.$route 访问当前路由

### active-class 是哪个组件的属性
    active-class 属于vue-router的样式方法，当router-link标签被点击时将会应用这个样式,。
    active-class是vue-router模块的router-link组件中的属性，用来做选中样式的切换；
    使用方法:1.直接在路由js文件中配置linkActiveClass,2。在router-link中写入active-class

### 怎么定义 vue-router 的动态路由? 怎么获取传过来的值
    在 router 目录下的 index.js 文件中，对 path 属性加上 /:id，使用 router 对象的 params.id 获取。

    第一种:是全局导航钩子:router.beforeEach(to,from,next)
    第二种: 组件内的钩子:
    ```
### vue-router 有哪几种导航钩子
    beforeRouteEnter(to, from, next) {
        // 在渲染该组件的对应路由被 confirm 前调用,不能获取组件实例this，因为组件实例还未创建
    },
    beforeRouteUpdate(to, from, next) {
        // 在当前路由改变，但是依然渲染该组件时调用，组件被复用时调用，可以获取组件实例this
    },
    beforeRouteLeave(to, from ,next) {
        // 导航离开该组件的对应路由时被调用
    }
    ```
    第三种:单独路由独享钩子  beforeEnter(to, from, next)
    router是VueRouter的一个对象，通过Vue.use(VueRouter)和VueRouter构造函数得到一个router的实例对象，这个对象中是一个全局的对象，他包含了所有的路由包含了许多关键的对象和属性。
    route是一个跳转的路由对象，每一个路由都会有一个route对象，是一个局部的对象，可以获取对应的name,path,params,query等

### route 和 router 的区别
    query要用path来引入，params要用name来引入，接收参数都是类似的，分别是this.$route.query.name和this.$route.params.name。
    注意接收参数的时候，已经是$route而不是$router
    query更加类似于我们ajax中get传参，params则类似于post，说的再简单一点，前者在浏览器地址栏中显示参数，后者则不显示

### vue路由传参params和query的用法和区别
    vue-router传递参数分为两大类: 编程式的导航 router.push, 声明式的导航 <router-link>

    像vue这种SPA，如果没有应用懒加载，运用webpack打包后的文件将会异常的大，造成进入首页时，需要加载的内容过多，时间过长，会出现长时间的白屏，即使做了loading也是不利于用户体验，而运用懒加载则可以将页面进行划分，需要的时候加载页面，可以有效的分担首页所承担的加载压力，减少首页加载用时，进入首页不用一次加载过多资源造成用时过长

### vue-router传参
    第一种写法:使用 AMD 风格的 require，于是就更简单了:
    第二种写法:(使用import)

### vue-router 实现路由懒加载（ 动态加载路由 ）
    第三种写法:使用webpack特有的require.ensure()。注:require.ensure 是Webpack的特殊语法，用来设置 code-split point

    vue-loader是解析 .vue 文件的一个加载器，将template/js/style转换成 js 模块；
    vue-loader会解析文件，提取出每个语言块，如果有必要会通过其他loader处理，最后将他们组装成一个commonjs模块；module.exports出一个vue.js组件对象；

### vue 中key的作用
列表循环，为什么使用 key
    因为vue组件高度复用，增加Key可以标识组件的唯一性，key的作用主要是为了高效的更新虚拟DOM

### 请说出 vue.cli 项目中 src 目录每个文件夹和文件的用法？
    assets文件夹是放静态资源；
    components是放组件；
    router是定义路由相关的配置;
    store  vuex
    utils 工具
    config 配置
    view视图；
    app.vue是一个应用主组件
    main.js是入口文件

### v-on可以监听多个方法吗
    v-on可以监听多个方法,对象形式 <button v-on="{ mousedown: doThis, mouseup: doThat }"></button>

### $nextTick的使用
    nextTick的使用原则主要就是解决单一事件更新数据后立即操作dom的场景。

### Mixins使用
    混入，分发 Vue 组件中可复用功能的方式
    特点1:方法和参数在各组件中不共享
    特点2:值为对象的选项，如methods,components等，选项会被合并，键冲突的组件会覆盖混入对象的
    特点3:值为函数的选项，如created,mounted等，就会被合并调用，混合对象里的钩子函数在组件里的钩子函数之前调用混入对象中的方法
    与vuex的区别:
        vuex定义的变量在每个组件中均可以使用和修改，在任一组件中修改此变量的值之后，其他组件中此变量的值也会随之修改
        Mixins:个变量是相互独立的，值的修改在组件中不会相互影响
    与公共组件的区别
        组件:在父组件中引入组件，相当于在父组件中给出一片独立的空间供子组件使用，然后根据props来传值，但本质上两者是相对独立的。
        Mixins:则是在引入组件之后与组件中的对象和方法进行合并，相当于扩展了父组件的对象与方法，可以理解为形成了一个新的组件。

### vue组件中data为什么必须是一个函数
    组件被定义时data必须申明为一个初始化数据对象的函数，因为组件可能被用来创建多个实例。如果data任然是一个纯粹的对象，则所有的实例将共享引用同一个数据对象！通过提供data函数，每次创建一个新实例后，我们能调用到data函数，从而返回初始数据的一个全新的副本数据对象（也就是说写成函数会有函数作用域的概念，是私有函数只能作用于当前组件中）

### 组件间的通信
    方法一、props/$emit
    方法二、$emit/$on，这种方法通过一个空的 Vue 实例作为中央事件总线（事件中心），用它来触发事件和监听事件,巧妙而轻量地实现了任何组件间的通信，包括父子、兄弟、跨级
    方法三、vuex
    方法四、$attrs/$listeners
    方法五、provide/inject，Vue2.2.0 新增 API,这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效。一言而蔽之:祖先组件中通过 provider 来提供变量，然后在子孙组件中通过 inject 来注入变量。provide / inject API 主要解决了跨级组件间的通信问题，不过它的使用场景，主要是子组件获取上级组件的状态，跨级组件间建立了一种主动提供与依赖注入的关系。

### 渐进式框架的理解
    https://www.zhihu.com/question/51907207

### Vue中双向数据绑定是如何实现的
    VUE实现双向数据绑定的原理就是利用了 Object.defineProperty() 这个方法重新定义了对象获取属性值(get)和设置属性值(set)的操作来实现的

### assets和static的区别
    assets和static两个都是存放静态资源文件。项目中所需要的资源文件图片，字体图标，样式文件等都可以放在这两个文件下，这是相同点
    assets中存放的静态资源文件在项目打包时，也就是运行npm run build时会将assets中放置的静态资源文件进行打包上传，所谓打包简单点可以理解为压缩体积，代码格式化。而压缩后的静态资源文件最终也都会放置在static文件中跟着index.html一同上传至服务器 
    static中放置的静态资源文件就不会要走打包压缩格式化等流程，而是直接进入打包好的目录，直接上传至服务器。因为避免了压缩直接进行上传，在打包时会提高一定的效率，但是static中的资源文件由于没有进行压缩等操作，所以文件的体积也就相对于assets中打包后的文件提交较大点。在服务器中就会占据更大的空间。所以简单点使用建议如下:
    将项目中template需要的样式文件js文件等都可以放置在assets中，走打包这一流程。减少体积。而项目中引入的第三方的资源文件如iconfoont.css等文件可以放置在static中，因为这些引入的第三方文件已经经过处理，我们不再需要处理，直接上传。

### vue.js的两大核心
    数据驱动和组件化
    Vue 响应式核心就是，getter 的时候会收集依赖，setter 的时候会触发依赖更新
    vue将遍历data中对象的所有property，并使用 Object.defineProperty 把这些 property 全部转为 getter/setter。

    这些 getter/setter 对用户来说是不可见的，但是在内部它们让 Vue 能够追踪依赖，在 property 被访问和修改时通知变更。
    每个组件实例都对应一个 watcher 实例，它会在组件渲染的过程中把“接触”过的数据 property 记录为依赖。
    getter 的时候我们会收集依赖，依赖收集就是订阅数据变化watcher的收集，依赖收集的目的是当响应式数据发生变化时，能够通知相应的订阅者去处理相关的逻辑。
    setter 的时候会触发依赖更新，之后当依赖项的 setter 触发时，会通知 watcher，从而使它关联的组件重新渲染。
    
    组件系统
    1 模板（template）:模板声明了数据和最终展现给用户的DOM之间的映射关系。
    2 初始数据（data）:一个组件的初始数据状态。对于可复用的组件来说，这通常是私有的状态。
    3 接受的外部参数(props):组件之间通过参数来进行数据的传递和共享。
    4 方法（methods）:对数据的改动操作一般都在组件的方法内进行。
    5 生命周期钩子函数（lifecycle hooks）:一个组件会触发多个生命周期钩子函数，最新2.0版本对于生命周期函数名称改动很大。
    6 私有资源（assets）:Vue.js当中将用户自定义的指令、过滤器、组件等统称为资源。一个组件可以声明自己的私有资源。私有资源只有该组件和它的子组件可以调用。

### Vuex 有哪几种属性？
    有五种，分别是 State、 Getter、Mutation 、Action、 Module

### Vuex的State特性
    1、Vuex就是一个仓库，仓库里面放了很多对象。其中state就是数据源存放地，对应于一般Vue对象里面的data
    2、state里面存放的数据是响应式的，Vue组件从store中读取数据，若是store中的数据发生改变，依赖这个数据的组件也会发生更新
    3、它通过mapState把全局的 state 和 getters 映射到当前组件的 computed 计算属性中
### Vuex的Getter特性
    1、getters 可以对State进行计算操作，它就是Store的计算属性
    2、虽然在组件内也可以做计算属性，但是getters 可以在多组件之间复用
    3、如果一个状态只在一个组件内使用，是可以不用getters
### Vuex的Mutation特性
    Action 类似于 mutation，不同在于:Action 提交的是 mutation，而不是直接变更状态；Action 可以包含任意异步操作。
### Vuex的Module特性
    Module 可以让每一个模块拥有自己的state、mutation、action、getters,使得结构非常清晰，方便管理。

### 使用Vuex的好处？
1、多层嵌套的组件、兄弟组件间的状态会更好管理维护。
2、缓存一些当前要使用请求远程或本地的数据集（刷新后会自己销毁）。
3、有了第二条，就可以减少向服务器的请求，节省资源。如果你的用户足够多，那么每多出一个请求，对公司来说，都是一大笔钱。
4、对开发者来说，如果你的项目足够复杂，团队的规模也不仅是一个人，数据集中处理更利于程序的稳定和维护。
Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex 也集成到 Vue 的官方调试工具 devtools extension，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。

### Mvvm定义
    MVVM是Model-View-ViewModel的简写。即模型-视图-视图模型。【模型】指的是后端传递的数据。【视图】指的是所看到的页面。【视图模型】mvvm模式的核心，它是连接view和model的桥梁。
    它有两个方向:
    一是将【模型】转化成【视图】，即将后端传递的数据转化成所看到的页面。实现的方式是:数据绑定。
    二是将【视图】转化成【模型】，即将所看到的页面转化成后端的数据。实现的方式是:DOM 事件监听。
    这两个方向都实现的，我们称之为数据的双向绑定。
    总结:在MVVM的框架下视图和模型是不能直接通信的。它们通过ViewModel来通信，ViewModel通常要实现一个observer观察者，当数据发生变化，ViewModel能够监听到数据的这种变化，然后通知到对应的视图做自动更新，而当用户操作视图，ViewModel也能监听到视图的变化，然后通知数据做改动，这实际上就实现了数据的双向绑定。并且MVVM中的View 和 ViewModel可以互相通信

### VUE的优点
    轻量级框架, 双向数据绑定, 组件化，视图,数据,结构分离，虚拟DOM

### VueX之actions与mutations的区别
    actions
        1、用于通过提交mutation改变数据
        2、会默认将自身封装为一个Promise
        3、可以包含任意的异步操作

    mutations
        1、通过提交commit改变数据
        2、只是一个单纯的函数
        3、不要使用异步操作，异步操作会导致变量不能追踪

### XSS攻击 跨站脚本攻击
    是说攻击者通过恶意的脚本，在用户浏览网页的时候进行攻击，比如获取cookie，或者其它用户信息。XSS可以分为存储型和反射型。存储型是攻击者输入一些数据并存储在数据库中，其他浏览者看到的时候进行攻击。反射型是将攻击代码放在url地址的请求参数中。
    如何防御:cookie设置httpOnly属性，对用户的输入进行校验，进行特殊字符过滤。

### CSRF 跨站点伪造请求
    攻击者通过各种方法伪造一个请求，模仿用户提交表单的行为，从而达到修改用户数据，或者执行特定的任务目的。
    如何防御:1，采用post请求增加攻击难度。2，对请求进行认证，确保请求时用户发起的，如验证码。

### 从输入url到页面解析的完整过程
    （1），请求发起后，浏览器首先会解析这个域名，首先它会查看本地的host文件，看有没有这个域名对应的IP，如果有，就直接使用这个IP，如果没有，浏览器会发出一个DNS请求到本地DNS服务器查询IP。
    （2），在拿到IP后，浏览器会向对应的web服务器发起TCP连接请求，通过三次握手，建立TCP链接。
    （3），建立TCP链接后，浏览器向web服务器发送HTTP请求。
    （4），服务器在接收请求后，解析用户请求，调度对应的资源文件，处理请求，最后将结果通过web服务器返回给浏览器。
    （5），在数据传输完成后，为了避免服务器与客户端双方的资源占用与损耗，会通过四次挥手关闭TCP连接。
    （6），在拿到HTML，CSS，JS等资源后，浏览器会开始解析，通过解析HTML生成DOM树，解析CSS生成CSS规则树，然后通过DOM树和CSS规则树 生成渲染树

### 什么是微事件，什么是宏事件
    宿主环境提供的叫宏事件，如浏览器或node。
    语言标准提供的叫微事件，如ES6。
    宏事件有:setTimeout，setInerval，setImmediate，requestAnimationFrame
    微事件有:Promise，nextTick，MutationObserver

### 深拷贝和浅拷贝
    深拷贝和浅拷贝最根本的区别在于是否真正获取看一个对象的复制实体，而不是引用。
    深拷贝的方法:
    （1）JSON.parse(JSON.stringIfy()) 
        **这种方式无法正确处理函数和正则，会丢失掉这部分的数据。**
    （2）用递归去复制所有层级属性
    （3）通过jQuery的$.extend(true,[],obj)

    浅拷贝的方式：
    Object.assign()、扩展运算符、Array.prototype.slice() 、Array.prototype.concat()

### 节流和防抖
    在前端开发过程中，我们经常会需要绑定一些持续触发的事件，如:resize，scroll，mousermove。但是有些时候我们并不想在事件持续触发的过程中那么频繁的去执行事件回调函数。所有我们就需要节流和防抖。
    节流就是指，在事件持续触发的过程中，我们设置一个定时器，在规定的时间触发一次回调函数。
    防抖就是指，我们设置一个计时器，在最后一次事件触发后开始计时，时间到了触发一次回调函数，如果时间没到又触发了事件，则将计时器的时间归位，重新计时。
    简单来说:节流是控制频率，防抖是控制次数。

### nextTick（）的原理及使用场景
    nextTick是在下次DOM更新循环结束后执行延迟回调。
    在修改数据之后立即使用这个方法，获取更新后的DOM。
### jQuery立即执行函数为什么要传入jQuery
    首先函数会构建作用域，把jQuery传进去，可以减少作用域的查询，提供js的执行速度。把jQuery传进去后，则只需要在函数体内查找即可。

### SFC
    平时写的.vue文件称为SFC，单文件组件规范。
    每个vue文件包含三种类型的顶级语言块，template，script，style。还允许添加可选的自定义块。

### Promise.all 与 Promise.race的区别
    - Promise.all
        可以将多个promise实例包装成一个新的Promise实例。同时，成功和失败的返回值是不同的，成功的时候返回的是数组，而失败的时候返回的是最先被reject失败状态的值。
    - Promise.race
         是哪个结果获取的最快，就返回哪个结果的值。不管结果本身是成功还是失败。

### proxy 相对于 Object.defineProperty 的优势
    - 直接监听对象，数组的变化，而非属性
    - Proxy 返回一个新的对象，可以只操作新对象达到目的，而 Object.defineProperty 只能遍历对象属性 直接修改

### Object.defineProperty VS Proxy 
   - Object.defineProperty 只能劫持对象的属性，而 Proxy 是直接代理对象
   - Object.defineProperty对新增属性需要手动进行Observe

   - Proxy兼容性差
   
   总结：
    - Object.defineProperty 对数组和对象的表现一致，并非不能监控数组下标的变化，vue2.x中无法通过数组索引来实现响应式数据的自动更新是vue本身的设计导致的，不是 defineProperty 的锅。
    - Object.defineProperty 和 Proxy 本质差别是，defineProperty 只能对属性进行劫持，新增属性需要手动 Observe 的问题。
    - Proxy 作为新标准，浏览器厂商势必会对其进行持续优化，但它的兼容性也是块硬伤，并且目前还没有完整的polyfill方案。

### 单页面与多页面的区别
    单页面应用（SPA）只有一个web页面的应用。单页面跳转仅刷新局部资源，公共资源仅需加载一次，常用与PC端官网，购物网站。
    多页面应用（MPA）多页面跳转刷新所有的资源，每个公共资源需选择性重新加载，常用与APP或客户端。
    单页面优点:用户体验好，内容改变不需要刷新整个页面。前后端分离。页面效果会比较炫酷
    单页面缺点:不利于SEO，导航不可用，需自行实现。初次加载耗时多。

### v-for与v-if的优先级
    v-for比v-if具有更高的优先级，可以有条件的展示循环数据的值。

### Vue.set()
    动态的新增与修改数据，会触发视图更新的方法。
    有三个参数:target:需要修改的数据源。Key:需要修改的具体数据（下标或属性名）。newValue:新值。
    在methods中可以写成 this.$set()

### delete和vue.delete删除数组的区别
    Delete只是被删除的元素变成了empty/undefined，其它元素的键值不变。
    Vue.delete直接删除了元素，改变了数组的键值。

### VUE的路由守卫
    有时候，我们需要通过路由来进行一些操作，比如常见的登录权限验证，当用户不满足条件时，取消跳转。
    路由守卫分为:全局守卫 ，组件内的守卫，路由独享的守卫
    全局守卫:router.beforeEach,router.beforeResolve,router.afterEach
    组件内的守卫:beforeRouteEnter,beforeRouteUpdata,beforeRouteLeave
    路由独享的守卫:beforeEnter

### WebSocket
    WebSocket是HTML5中的协议，支持持久连接，HTTP不支持持久连接。
    在WebSocket API中，浏览器和服务器只需要做一个握手的动作，然后浏览器和服务器之间就形成了一条快速的通道，就直接可以进行数据的相互传输。

### Http2.0和Http1.x相比的新特性
    Http2.0 性能惊人 、新的二进制格式、多路复用、header压缩、服务端推送server push

### Http 1.0和 Http 1.1的一些区别

### Https与Http的一些区别
    HTTP2.0的多路复用和HTTP1.X中的长连接复用有什么区别？

### v-on 有哪些事件修饰符
    .stop 阻止冒泡
    .prevent 阻止默认事件
    .capture 添加事件侦听器时使用事件捕获模式
    .self 只当该事件在该元素本身时（不是子元素）触发时才回调
    .once 事件只触发一次

### vue与angular的区别

### http 的请求头有哪些

### webpack优势
    对 CommonJS 、AMD 、ES6的语法做了兼容；
    对js、css、图片等资源文件都支持打包；
    良好的插件机制和模块加载器,让其具有更好的灵活性和扩展性
    独立的配置文件webpack.config.js
    将代码切割成不同的chunk，实现按需加载，降低了初始化时间

### 同构渲染应用/单页面应用
