[toc] 



# meeting技术总结

### 一 、打包工具

#### gulp 

基础知识：

创建task任务：gulp.task('' , function) 

处理函数中，

- （1）gulp.src()资源； 
- （2）pipe()管道要做的事情
  - 管道内可以处理版本
  - gulp.dest()输出到指定目录



版本号

**css打版本**

指定目录`dir/**/*.css` dir目录下的所有css文件和文件里面的css文件；`!dir/static/project/**`非project目录中的文件；

```js
gulp.task("css", () => {
  return gulp
    .src([
      `${versionConfig.home}/**/*.css`,
      `!${versionConfig.home}/static/project/**`,
    ])
    .pipe(VersionGenerator(versionConfig))
    .pipe(gulp.dest(versionConfig.home));
});
```

**页面css合并**

写一个json文件，合并文件名属性下有个多个单独文件的相对地址，这样很直观的知道合并文件是由哪些文件合并而成。

fs.readFile 读取json文件内容

循环把每个合并文件下的单独文件路径，放在arr数组中，每次for循环处理一个合并文件。

压缩css文件：let cleanCSS = require("gulp-clean-css");  可以设置兼容性，比如：compatibility：‘ie9’

```js
gulp.task("page_concat_css", function (done) {
  fs.readFile(
    SRC + "/static/page_concat_resource/concat.json",
    "utf8",
    function (err, data) {
      var json = JSON.parse(data);
      for (var key in json) {
        var arr = [];
        if (!json[key].css_arr) continue;
        for (var i = 0; i < json[key].css_arr.length; i++) {
          if (json[key].css_arr[i].path && json[key].css_arr[i].path != "")
            arr.push(SRC + json[key].css_arr[i].path);
        }
        if (arr.length == 0) {
          continue;
        }
        gulp
          .src(arr)
          .pipe(
            cleanCSS({
              compatibility: "ie9",
              rebase: true,
              rebaseTo: SRC + "/static/page_concat_resource/css",
              inline: ["local"],
            })
          )
          .pipe(concat(key + ".css"))
          .pipe(gulp.dest(SRC + "/static/page_concat_resource/css/"));
      }
    }
  );
  done();
});
```



gulp同步执行任务和异步执行任务

gulp3中，

```js
// 默认任务，执行scripts和styles这两个任务
gulp.task('default', ['scripts', 'styles'], function() {...});
 
// scripts 和 styles 任务都调用了 clean 任务
gulp.task('styles', ['clean'], function() {...});
gulp.task('scripts', ['clean'], function() {...});
 
// Clean 任务清空了build目录
gulp.task('clean', function() {...});
```

gulp4中，parallel：平行线

- `gulp.series` 用于串行（顺序）执行
- `gulp.parallel` 用于并行执行

同步执行，比如：

```js
gulp.task("page", gulp.series("page_concat_js", "page_concat_css"));
```

异步执行，比如：

```js
gulp.task('default', gulp.parallel('scripts', 'styles'));
```



Glob详解：https://www.gulpjs.com.cn/docs/getting-started/explaining-globs/



#### webpack



### 二、comet和WebSocket

#### comet

Comet方式通俗的说就是一种长连接机制(long lived http)。同样是由Browser端主动发起请求，但是Server端以一种似乎非常慢的响应方式给出回答。这样在这个期间内，服务器端可以使用同一个connection把要更新的数据主动发送给Browser。因此请求可能等待较长的时间，期间没有任何数据返回，但是一旦有了新的数据，它将立即被发送到客户机。Comet又有很多种实现方式，但是总的来说对Server端的负载都会有增加.虽然对于单位操作来说，每次只需要建议一次connection,但是由于connection是保持较长时间的,对于 server端的资源的占用要有所增加。

优 点： 实时性好（消息延时小）；性能好（能支持大量用户）

缺点： 长期占用连接，丧失了无状态高并发的特点。

Comet是一种用于web的技术，能使服务器能实时地将更新的信息传送到客户端，而无须客户端发出请求，目前有两种实现方式，长轮询和iframe流。

**项目中，**每隔30s，服务器响应一次，同时客户端给服务器发一次数据——保持连接



#### DWR

基于 Java 的成熟的服务器推送框架有 DWR 。

DWR是一个开放源码的使用 Apache许可协议的解决方案，它包含服务器端 Java库、一个 DWR servlet以及 JavaScript库。虽然 DWR不是 Java平台上唯一可用的 Ajax-RPC 工具包，但是它是最成熟的，而且提供了许多有用的功能。

DWR 从 2.0 开始增加了 push 功能 , 也就是在异步传输的情况下可以从 Web-Server 端发送数据到 Browser。

#### websocket

https://blog.csdn.net/sinat_36422236/article/details/85051547

Websocket 使用 ws 或 wss 的统一资源标志符，类似于 HTTPS，其中 wss 表示在 TLS 之上的 Websocket

Websocket 使用和 HTTP 相同的 TCP 端口，可以绕过大多数防火墙的限制。默认情况下，Websocket 协议使用 80 端口；运行在 TLS 之上时，默认使用 443 端口。

TLS：传输层安全性协议

**对比comet：**comet这种技术虽然可以双向通信，但依然需要反复发出请求。而且在Comet中，普遍采用的长链接，也会消耗服务器资源。

**握手：**

WebSocket 是独立的、创建在 TCP 上的协议。——和http协议一样，都是建立在TCP协议之上的协议。

Websocket 通过[HTTP](https://baike.baidu.com/item/HTTP)/1.1 协议的101状态码进行握手。——所以不会被屏蔽

为了创建Websocket连接，需要通过浏览器发出请求，之后服务器进行回应，这个过程通常称为“[握手](https://baike.baidu.com/item/握手)”（handshaking）。

查看WebSocket发的请求进行握手的信息：

> 请求方法：GET
>
> 状态码：101
>
> 还有一些关于WebSocket的其他信息

![image-20210527105843711](C:\Users\朱玉柱\AppData\Roaming\Typora\typora-user-images\image-20210527105843711.png)



**WebSocket的事件和方法：**

| 事件    | 事件处理程序     | 描述                       |
| :------ | :--------------- | :------------------------- |
| open    | Socket.onopen    | 连接建立时触发             |
| message | Socket.onmessage | 客户端接收服务端数据时触发 |
| error   | Socket.onerror   | 通信发生错误时触发         |
| close   | Socket.onclose   | 连接关闭时触发             |

| 方法           | 描述             |
| :------------- | :--------------- |
| Socket.send()  | 使用连接发送数据 |
| Socket.close() | 关闭连接         |



### 三、调试模式

通过特定url请求，修改服务器的全局变量，jsp加载文件时，判断isDebugger值，进而判断加载调试分散的js文件还是打包的js文件



### 四、打开外部exe程序

参考文章：https://admx.help/?Category=Chrome&Policy=Google.Policies.Chrome::ExternalProtocolDialogShowAlwaysOpenCheckbox&Language=zh-cn

https://blog.csdn.net/h4329201/article/details/78929109



注册表，找到对应的软件注册名

```html
    <a href="kcmp://">打开外部程序</a>
    <a href="Notes://">exe程序</a>
```

```js
        iframe = document.createElement("iframe");
        iframe.src = "kcmp://";
        iframe.style.display = "none";
        document.body.appendChild(iframe);
```



### 五、Jenkins上编译前端版本



### 六、组件MO

Mo前端组件主要基于jQuery、EasyUI、zTree、ArtDialog和mCustomScrollbar开发的用户界面插件集合。

传入一个对象options，包括：值、样式、事件处理函数等



### 节流--安全锁

上锁：

解锁：

判断锁：



```js
TS.mcc.throttle = {
    time: 5 * 1000,
    data: {},
    reg: function (key, time) {
        var time = time || this.time;
        this.data[key] = {lock: false, time: time, thread: null};
        return this.data[key];
    },

    lock: function (key, time) {
        var data = this.getData(key);
        if (!data) {
            data = this.reg(key, time);
        }
        clearTimeout(data.thread);
        var that = this;
        this.getData(key).lock = true;

        if (time == -1) {
            return;
        }

        this.getData(key).thread = setTimeout(function () {
            that.getData(key).lock = false;
        }, data.time);
    },

    unLock: function (key) {
        var data = this.getData(key);
        if (!data) {
            //data = this.reg(key);
            printf("unlock error key: " + key);
            return;
        }
        clearTimeout(data.thread);
        setTimeout(()=>{
            this.getData(key).lock = false;
        },300)
    },

    isLock: function (key) {
        var data = this.getData(key);
        if (!data) {
            return false;
        }
        return data.lock;
    },

    getData: function (key) {
        return this.data[key];
    }
};

```



### websocket连接本地软件，与本地软件交互

ReconnectingWebSocket 是一个小型的 JavaScript 库，封装了 WebSocket API 提供了在连接断开时自动重连的机制。

GitHub地址：https://github.com/joewalnes/reconnecting-websocket



只需要简单的将：

```
ws = new WebSocket('ws://....');
```

替换成：

```
ws = new ReconnectingWebSocket('ws://....');
```

https://www.uedbox.com/post/9276/



判断是否支持webpack：

> 'WebSocket' in window

判断是不是IE浏览器：

> "ActiveXObject" in window

判断是否是chrome内核：

> navigator.userAgent 
>
> "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36"

火狐浏览器：

> navigator.userAgent
>
> "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:88.0) Gecko/20100101 Firefox/88.0"



判断是否安装了软件：

localStorage存储是否安装了软件、是否需要提示安装

判断是否要升级软件：



通过localStorage.getItem 来判断是否安装过，是否第一次安装，是否记住了不再提醒安装



WebSocket自动连接和手动连接

自动连接：软件自启，开启本地服务器和指定端口，访问页面时，WebSocket自动连接

手动连接：通过页面手动开启软件，注册表中对应的软件协议，开启软件后，进行WebSocket连接



WebSocket的基本用法：

> 1、创建WebSocket实例
>
> WsInstance = new  ReconnectingWebSocket（{
>
> }）
>
> 2、实例上对事件进行监听
>
> （1）连接成功：WsInstance.onopen
>
> （2）接收消息：WsInstance.onmessage
>
> （3）关闭连接：WsInstance.onclose
>
> （4）监听错误（包括连接失败）：WsInstance.onerror



逻辑流程：页面渲染完成，触发自定义事件`$('body').trigger('mtlist_render_over')`——> 监听该事件的处理函数将会执行`$('body').on('mtlist_render_over'`——判断是否支持WebSocket，以及项目中其他限制条件——>执行函数创建WebSoket实例`WebSocketStart()`——》如上WebSocket的基本用法——



交互：

通过`WsInstance.send` WebSocket的send方法进行数据交互，告知软件，在window的哪个位置打开等。

拖拽与软件交互：页面元素拖拽的过程中，将数据存于鼠标中，当拖放在软件上时，软件监听事件，并把数据处理，处理数据后，再通过WebSocket通知页面

拖拽事件的处理函数中，依赖的对象：`ev.dataTransfer.setData("text", ev.target.id);`   `var data = ev.dataTransfer.getData("text");`

### 国际化项目——STAR法则

情境(situation)



任务（task）

行动(action)

研究i18n的js插件

遍历项目中所有文件，找出中文内容，存入excel表格中

让专门负责海外市场的同事，将中文翻译成英文

读取翻译的excel文档，提起里面的数据，成json文件

> node读写excel文件的插件：var xlsx = require('node-xlsx');
>
> node同步读取目录的api：var filesNameArr = fs.readdirSync(dirpath);
>
> node同步读取文件的api：var filedata = fs.readFileSync(fReadName, "utf-8");
>
> node获取文件状态的api：var stats = fs.statSync(fileordirpath);
>
> 获取的文件状态，可以判断是文件还是目录：stats.isFile()、stats.isDirectory()
>
> node同步写入文件的api：fs.writeFileSync('./1.xlsx', buffer, "buffer");



帮助文档写两套



中英文切换

错误码



结果(result)



### artTemplate——js模板引擎



### 维护Vue项目

#### webpack

刷新模式：https://segmentfault.com/a/1190000014141798

webpack-dev-server的使用：

node的express框架启的本地服务器

content-base启动服务器的目录：

```js
webpack-dev-server --content-base ./dist
```

inline模式：自动编译打包、页面自动刷新

iframe模式：在网页中嵌入了一个`iframe`，将我们自己的应用注入到这个`iframe`当中去

config：指定配置文件

```js
"dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js"
```



Vue

入口文件：main.js  

导入一些文件：注意导入的css文件，没有命名

```js
import axios from './axios/api';
import './assets/css/common.css';
import './assets/css/messagebox.css';
import './assets/css/reset.css';
import './assets/css/reset-easyui.css';
import 'animate.css';
import store from '@/store'
import echarts from 'echarts'
import Element from 'element-ui';
```



**vue.use的使用**

```js
Vue.use(Element);
Vue.use(echarts);
```

插件的调用，通过全局方法 `Vue.use()` 使用插件。它需要在你调用 `new Vue()` 启动应用之前完成。

vue插件：https://cn.vuejs.org/v2/guide/plugins.html



**vue-router的beforeEach——全局前置守卫**

当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于 **等待中**。

可以使用 `router.beforeEach` 注册一个全局前置守卫。

```js
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
})
```

路由守卫：全局守卫、单个路由守卫、组件守卫



**$mount进行挂载**

render函数进行渲染

在vue实例上添加axios、router路由、store状态管理（vuex）

```js
new Vue({
  render: h => h(App),
  axios,
  router,
  store
}).$mount('#app')
```



App.vue文件

Vue.nextTick 和 组件内$nextTick

Vue 实现响应式并**不是数据发生变化之后 DOM 立即变化**，而是按一定的策略进行 DOM 的更新

vue异步更新队列：https://cn.vuejs.org/v2/guide/reactivity.html#%E5%BC%82%E6%AD%A5%E6%9B%B4%E6%96%B0%E9%98%9F%E5%88%97

为了在数据变化之后等待 Vue 完成更新 DOM，可以在数据变化之后立即使用 `Vue.nextTick(callback)`。这样回调函数将在 DOM 更新完成后被调用。`$nextTick()` 返回一个 `Promise` 对象，



#### $route和$router的区别？

**$route**

> route是路由信息对象，里面主要包含路由的一些基本信息，包括name、meta、path、hash、query、params、fullPath、matched、redirectedFrom

**$router**

> router是VueRouter的实例，包含了一些路由的跳转方法，钩子函数等



路由：将组件 (components) 映射到路由 (routes)，然后告诉 Vue Router 在哪里渲染它们

通过注入路由器，我们可以在任何组件内通过 `this.$router` 访问路由器，也可以通过 `this.$route` 访问当前路由：

复用组件时，组件的生命周期钩子不会再被调用，如果相对路由参数变化做出响应，可以通过watch监听`$route`对象：

```js
const User = {
  template: '...',
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
    }
  }
}
```

注意路由组件



**$refs**

一个对象，持有注册过 [`ref` attribute](https://cn.vuejs.org/v2/api/#ref) 的所有 DOM 元素和组件实例。

ref属性：尽管存在 prop 和事件，有的时候你仍可能需要在 JavaScript 里直接访问一个子组件。为了达到这个目的，你可以通过 `ref` 这个 attribute 为子组件赋予一个 ID 引用。

```html
<base-input ref="usernameInput"></base-input>
```

可以通过父组件，让子组件的methods内的方法执行：

> this.$refs.about.open(); 找到ref="about"的子组件，调用它的open方法



### 项目中遇到的困难

海外版的正则找出所有的中文字段

对Linux的操作和对项目升级

排序，localeCompare()

