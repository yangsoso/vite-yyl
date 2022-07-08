# 面试题汇总
 这些内容是6月份还没有问的问题

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
    router是VueRouter的一个对象，通过Vue.use(VueRouter)和VueRouter构造函数得到一个router的实例对象，
    这个对象中是一个全局的对象，他包含了所有的路由包含了许多关键的对象和属性。
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


### 渐进式框架的理解
    [渐进式框架的理解](https://www.zhihu.com/question/51907207)

### assets和static的区别
    assets和static两个都是存放静态资源文件。项目中所需要的资源文件图片，字体图标，样式文件等都可以放在这两个文件下，这是相同点
    assets中存放的静态资源文件在项目打包时，也就是运行npm run build时会将assets中放置的静态资源文件进行打包上传，所谓打包简单点可以理解为压缩体积，代码格式化。
    而压缩后的静态资源文件最终也都会放置在static文件中跟着index.html一同上传至服务器 
    static中放置的静态资源文件就不会要走打包压缩格式化等流程，而是直接进入打包好的目录，直接上传至服务器。
    因为避免了压缩直接进行上传，在打包时会提高一定的效率，但是static中的资源文件由于没有进行压缩等操作，所以文件的体积也就相对于assets中打包后的文件提交较大点。在服务器中就会占据更大的空间。

    所以简单点使用建议如下:
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
    1. 多层嵌套的组件、兄弟组件间的状态会更好管理维护。
    2. 缓存一些当前要使用请求远程或本地的数据集（刷新后会自己销毁）。
    3. 有了第二条，就可以减少向服务器的请求，节省资源。如果你的用户足够多，那么每多出一个请求，对公司来说，都是一大笔钱。
    4. 对开发者来说，如果你的项目足够复杂，团队的规模也不仅是一个人，数据集中处理更利于程序的稳定和维护。
    
    Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。
    Vuex 也集成到 Vue 的官方调试工具 devtools extension，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。

### MVVM 定义
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
    
### jQuery立即执行函数为什么要传入jQuery
    首先函数会构建作用域，把jQuery传进去，可以减少作用域的查询，提供js的执行速度。把jQuery传进去后，则只需要在函数体内查找即可。

### Promise.all 与 Promise.race的区别
    - Promise.all
        可以将多个promise实例包装成一个新的Promise实例。同时，成功和失败的返回值是不同的，成功的时候返回的是数组，而失败的时候返回的是最先被reject失败状态的值。
    - Promise.race
         是哪个结果获取的最快，就返回哪个结果的值。不管结果本身是成功还是失败。

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

### webpack优势
    对 CommonJS 、AMD 、ES6的语法做了兼容；
    对js、css、图片等资源文件都支持打包；
    良好的插件机制和模块加载器,让其具有更好的灵活性和扩展性
    独立的配置文件webpack.config.js
    将代码切割成不同的chunk，实现按需加载，降低了初始化时间

