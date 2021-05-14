[toc] 



https://juejin.cn/post/6844903885488783374#heading-111

### React / Vue 项目时为什么要在列表组件中写 key，其作用是什么？

没有绑定key的情况下，在遍历简单模板时，对比虚拟dom的新旧 节点会更快，节点也会就地复用。副作用，可能不会产生过渡效果，绑定数据会出现错位，这个模式虽然高效，但只适用不依赖子组件状态或临时dom状态的列表渲染。

而key的作用，给每个虚拟dom添加唯一的id，在diff算法对比新旧虚拟dom时，可以通过key更加快速精准的找到旧的虚拟dom节点，

### `['1', '2', '3'].map(parseInt)` what & why ?

**parseInt(string, radix)**  解析一个字符串并返回指定基数的十进制整数， `radix` 是2-36之间的整数，表示被解析字符串的基数

如果string数值不符合redix指定进制，结果为NaN。

如果 `radix` 是 `undefined`、`0`或未指定的，JavaScript会假定以下情况：

1. 如果输入的 `string`以 "`0x`"或 "`0x`"（一个0，后面是小写或大写的X）开头，那么radix被假定为16，字符串的其余部分被当做十六进制数去解析。
2. 如果输入的 `string`以 "`0`"（0）开头， `radix`被假定为`8`（八进制）或`10`（十进制）。具体选择哪一个radix取决于实现。ECMAScript 5 澄清了应该使用 10 (十进制)，但不是所有的浏览器都支持。**因此，在使用 `parseInt` 时，一定要指定一个 radix**。
3. 如果输入的 `string` 以任何其他值开头， `radix` 是 `10` (十进制)。

如果第一个字符不能转换为数字，`parseInt`会返回 `NaN`



map方法的处理函数，function：(item , index)



```js
console.log([1,2,3].map(parseInt)); //[1, NaN, NaN]
```

### 什么是防抖和节流？有什么区别？如何实现？

防抖：在短时间内连续触发的事件，让该事件在某个限度内只触发一次。

节流：在短时间内连续触发的事件，每个时间间隔内触发一次。

定时器未到指定时间，一直都是浏览器在帮忙计时，到达指定时间，浏览器才会把定时器的处理函数推到事件队列中执行。所以不影响js性能

滚动条防抖：有timer，先清除timer再建一个timer；无timer，直接建一个timer

```js
function debounce(fn,delay){
    let timer = null //借助闭包
    return function() {
        if(timer){
            clearTimeout(timer) 
        }
        timer = setTimeout(fn,delay) // 简化写法
    }
}
// 然后是旧代码
function showTop  () {
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
　　console.log('滚动条位置：' + scrollTop);
}
window.onscroll = debounce(showTop,1000) // 为了方便观察效果我们取个大点的间断值，实际使用根据需要来配置
```

输入框input事件的节流：

```js
        var input = document.getElementById('input')
        function throttle(fn, delay){
            var timeStamp = true;
            return function(){
                if(timeStamp){
                    timeStamp = false;
                    setTimeout(function(){
                        fn()
                        timeStamp = true;
                    }, delay)
                }
            }
        }
	/* 请注意，节流函数并不止上面这种实现方案,
   	例如可以完全不借助setTimeout，可以把状态位换成时间戳，然后利用时间戳差值是否大于指定间隔时间来做判定。
  	也可以直接将setTimeout的返回的标记当做判断条件-判断当前定时器是否存在，如果存在表示还在冷却，并且在执行fn之后消除定时器表示激活，原理都一样
    */
        function handler(){
            console.log(input.value)
        }
        input.oninput = throttle(handler, 200)
```

### 介绍下 Set、Map、WeakSet 和 WeakMap 的区别？

Set保证值的唯一性，Set和Map都认为-0 +0 0相同，NaN和NaN相同，Number.POSITIVE_INFINITY 和 infinity相同；

Set方法有：add和delete、has方法；keys、values、entries方法，forEach方法

```js
set.add()
set.delete()
set.has()
```

Set对数组去重简直是最佳途径



Map和对象的区别，

Map的方法：set、get、delete、has、forEach、keys、values、entries



**`WeakSet`** 对象允许你将*弱保持对象*存储在一个集合中。

- 与`Set`相比，`WeakSet` 只能是**对象的集合**，而不能是任何类型的任意值。
- `WeakSet`持弱引用：集合中对象的引用为弱引用。 如果没有其他的对`WeakSet`中对象的引用，那么这些对象会被当成垃圾回收掉。 这也意味着WeakSet中没有存储当前对象的列表。 正因为这样，`WeakSet` 是不可枚举的。

对象的数量或它们的遍历顺序无关紧要，因此，WeakSet比[`Set`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)更适合（和执行）跟踪对象引用，尤其是在涉及大量对象时。



**`WeakMap`** 对象是一组键/值对的集合，其中的键是弱引用的。其键必须是对象，而值可以是任意的。

在 JavaScript 里，map API 可以通过使其四个 API 方法共用两个数组(一个存放键,一个存放值)来实现。给这种 map 设置值时会同时将键和值添加到这两个数组的末尾。从而使得键和值的索引在两个数组中相对应。当从该 map 取值的时候，需要遍历所有的键，然后使用索引从存储值的数组中检索出相应的值。

但这样的实现会有两个很大的缺点，首先赋值和搜索操作都是 O(n) 的时间复杂度( n 是键值对的个数)，因为这两个操作都需要遍历全部整个数组来进行匹配。另外一个缺点是可能会导致内存泄漏，因为数组会一直引用着每个键和值。这种引用使得垃圾回收算法不能回收处理他们，即使没有其他任何引用存在了。

相比之下，原生的 WeakMap 持有的是每个键对象的“弱引用”，这意味着在没有其他引用存在时垃圾回收能正确进行。原生 WeakMap 的结构是特殊且有效的，其用于映射的 key 只有在其没有被回收时才是有效的。

正由于这样的弱引用，`WeakMap` 的 key 是不可枚举的 (没有方法能给出所有的 key)。如果key 是可枚举的话，其列表将会受垃圾回收机制的影响，从而得到不确定的结果。因此，如果你想要这种类型对象的 key 值的列表，你应该使用 [`Map`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)。

基本上，如果你要往对象上添加数据，又不想干扰垃圾回收机制，就可以使用 WeakMap。

### 介绍下深度优先遍历和广度优先遍历，如何实现？



深度优先遍历和广度优先遍历：https://developer.51cto.com/art/202004/614590.htm

generator +Interator接口实现深度遍历

```js
function *DFS(tree){
    yield tree;
    let children=tree.children;
    if(children){
        for(let i in children){
            yield *DFS(children[i])
        }
    }
}
console.log([...DFS(tree)])
```

递归操作就是深度优先遍历



大佬文章：https://github.com/yygmind/blog/issues/31

### ES5/ES6 的继承除了写法以外还有什么区别？

问题是继承的差异。

```js
class Super {}
class Sub extends Super {}

const sub = new Sub();

Sub.__proto__ === Super;
```

子类可以直接通过 __proto__ 寻址到父类。

ES5中的继承：子构造函数的原型指向父构造函数的实例，同时让constructor指向子构造函数本身：

```js
function Super() {}
function Sub() {}

Sub.prototype = new Super();
Sub.prototype.constructor = Sub;

var sub = new Sub();

Sub.__proto__ === Function.prototype;
```

而通过 ES5 的方式，`Sub.__proto__` === Function.prototype

区别：ES5中，构造函数内部[[prototype]]指向Function的原型；而ES6中，类内部[[prototype]]指向父类



#### 深入理解ES5中继承和ES6中的class继承



### setTimeout、Promise、Async/Await 的区别

宏任务和微任务的区别，事件队列，事件循环

#### 1. setTimeout

```js
console.log('script start')	//1. 打印 script start
setTimeout(function(){
    console.log('settimeout')	// 4. 打印 settimeout
})	// 2. 调用 setTimeout 函数，并定义其完成后执行的回调函数
console.log('script end')	//3. 打印 script start
// 输出顺序：script start->script end->settimeout
```

#### 2. Promise

Promise本身是**同步的立即执行函数**， 当在executor中执行resolve或者reject的时候, 此时是异步操作， 会先执行then/catch等，当主栈完成后，才会去调用resolve/reject中存放的方法执行，打印p的时候，是打印的返回结果，一个Promise实例。

```js
console.log('script start')
let promise1 = new Promise(function (resolve) {
    console.log('promise1')
    resolve()
    console.log('promise1 end')
}).then(function () {
    console.log('promise2')
})
setTimeout(function(){
    console.log('settimeout')
})
console.log('script end')
// 输出顺序: script start->promise1->promise1 end->script end->promise2->settimeout
```

当JS主线程执行到Promise对象时，

- promise1.then() 的回调就是一个 task
- promise1 是 resolved或rejected: 那这个 task 就会放入当前事件循环回合的 microtask queue
- promise1 是 pending: 这个 task 就会放入 事件循环的未来的某个(可能下一个)回合的 microtask queue 中
- setTimeout 的回调也是个 task ，它会被放入 macrotask queue 即使是 0ms 的情况

#### 3. async/await

```js
async function async1(){
   console.log('async1 start');
    await async2();
    console.log('async1 end')
}
async function async2(){
    console.log('async2')
}

console.log('script start');
async1();
console.log('script end')

// 输出顺序：script start->async1 start->async2->script end->async1 end
```

async 函数返回一个 Promise 对象，当函数执行的时候，一旦遇到 await 就会先返回，等到触发的异步操作完成，再执行函数体内后面的语句。可以理解为，是让出了线程，跳出了 async 函数体。

举个例子：

```js
async function func1() {
    return 1
}

console.log(func1())
```

[![在这里插入图片描述](https://camo.githubusercontent.com/cdf382b45dfc37ae972c480664cefd416ee13d234453deaae506230f6c3f55ea/68747470733a2f2f696d672d626c6f672e6373646e696d672e636e2f32303139303133313137343431333536322e706e67)](https://camo.githubusercontent.com/cdf382b45dfc37ae972c480664cefd416ee13d234453deaae506230f6c3f55ea/68747470733a2f2f696d672d626c6f672e6373646e696d672e636e2f32303139303133313137343431333536322e706e67)
很显然，func1的运行结果其实就是一个Promise对象。因此我们也可以使用then来处理后续逻辑。

```js
func1().then(res => {
    console.log(res);  // 30
})
```

await的含义为等待，也就是 async 函数需要等待await后的函数执行完成并且有了返回结果（Promise对象）之后，才能继续执行下面的代码。await通过返回一个Promise对象来实现同步的效果。

更多可见[setTimeout、Promise、Async/Await](https://github.com/sisterAn/blog/issues/21)

### Async/Await 如何通过同步的方式实现异步

**概述 async 和await原理：**

`async`/`await`的目的为了简化使用基于promise的API时所需的语法。`async`/`await`的行为就好像搭配使用了生成器和promise。

async函数一定会返回一个promise对象。如果一个async函数的返回值看起来不是promise，那么它将会被隐式地包装在一个promise中。



await表达式会暂停整个async函数的执行进程并出让其控制权，只有当其等待的基于promise的异步操作执行完毕之后才会恢复进程。promise的解决值会被当作该await表达式的返回值。

`await`关键字只在async函数内有效。如果你在async函数体之外使用它，就会抛出语法错误 [`SyntaxError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError) 。

await 表达式会暂停当前 [`async function`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function) 的执行，等待 Promise 处理完成。若 Promise 正常处理(fulfilled)，其回调的resolve函数参数作为 await 表达式的值，继续执行 [`async function`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)。

若 Promise 处理异常(rejected)，await 表达式会把 Promise 的异常原因抛出。

**async和await的执行：**

async函数的函数体可以被看作是由0个或者多个await表达式分割开来的。从第一行代码直到（并包括）第一个await表达式（如果有的话）都是同步运行的。这样的话，一个不含await表达式的async函数是会同步运行的。然而，如果函数体内有一个await表达式，async函数就一定会异步执行。

MDN async：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function

MDN await：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await



执行顺序：

```js
        async function async1() {
            console.log('async1 start');//2
            await async2();//此处在等待，如果是微任务，还属于第一个执行队列中。如果等待的是setTimeOut，将会往后续的宏任务中添加
            console.log('async1 end');
        }
        async function async2() {
            console.log('async2');//3
            new Promise(function (resolve) {
                console.log('promise10');//4
                resolve();
            }).then(function () {
                console.log('promise20');//微任务7
            });
        }
        console.log('script start'); //1
        setTimeout(function () {
            console.log('setTimeout');//第二个执行队列9
        }, 0)
        async1();
        new Promise(function (resolve) {
            console.log('promise1');//5
            resolve();
        }).then(function () {
            console.log('promise2');//微任务8，7先添加到微任务队列
        });
        console.log('script end');//6
```



实例二：

```js
        /**
         * 第一轮宏任务包括async函数内的宏任务和Promise立即执行函数的宏任务，以及async执行函数后面紧跟的宏任务
         * 
        **/
        function resolveAfter2Seconds() {
            let prom = new Promise(resolve => {
                console.log("0")//3
                let tiemr2 = setTimeout(() => {//第三个执行队列
                    console.log("1")//7
                    setTimeout(() => {//第五个执行队列--根据timer时间添加到事件执行队列
                        console.log("timer3");//13
                        Promise.resolve().then(function () {
                            console.log("promise4")//14
                        })
                    }, 2000)
                    resolve('promose2'); //9--微任务触发--触发对应的then方法--告知await等待的结果
                    Promise.resolve("permise3").then((value) => {
                        console.log(value);//11--permise3
                    })
                    console.log("2");//8
                }, 1000);
            });
            prom.then((value) => {
                console.log("promose2 prom.then1");//9--resolve触发该then
            }).then(() => {
                console.log("prom.then2")//12
            })
            return prom;
        }
        async function asyncCall() {
            console.log('start1');//1
            let timer1 = setTimeout(() => {
                console.log("setTime1");//6，await中等待是setTimeOut，所以此处是第二个任务队列，先执行
            }, 0);
            Promise.resolve("Promise1").then(function (value) {
                console.log(value)//5 第一个微任务：Promise1
            })
            console.log("aaa");//2
            const result1 = await resolveAfter2Seconds();
            console.log("end");//10--第四个执行队列
        }
        asyncCall();
        console.log('script end')//4
```

实例三：

```js
        async function async1() {
            await 1;//阻断，第一个执行队列不再往下
            console.log('async1 start');//4
            await async2();//此处在等待，如果是微任务，还属于第一个执行队列中。如果等待的是setTimeOut，将会往后续的宏任务中添加
            console.log('async1 end');//9
        }
        async function async2() {
            console.log('async2');//5
            new Promise(function (resolve) {
                console.log('promise10');//6
                resolve();//此处resolve执行，才算await等待结果，但在此之前的微任务都应该被执行。所以7执行了才执行了8
            }).then(function () {
                console.log('promise20');//8
            });
        }
        console.log('script start'); //1
        setTimeout(function () {
            console.log('setTimeout');//10
        }, 0)
        async1();
        new Promise(function (resolve) {
            console.log('promise1');//2
            resolve();//此处resolve先执行，先将对应的then添加到微任务队列中
        }).then(function () {
            console.log('promise2');//7
        });
        console.log('script end');//3
```



### 数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组

> 已知如下数组：
>
> var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];



`**flat()**` 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

指定要提取嵌套数组的结构深度，默认值为 1。数值可以是Infinity

```js
        var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
        var result = Array.from(new Set(arr.flat(Infinity))).sort((a,b)=> a-b)
        console.log(result)//[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
```



flat的兼容性极差，可以使用其他方法：

```js
        var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
        var result = arr.toString().split(',').map(item => Number(item)).sort((a,b) => a-b)

        console.log(Array.from(new Set(result)))//[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

        console.log([...new Set(result)])//[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
```



上面的方法只能在数组数据是布尔值、数字、字符串、函数时有效，因为在数组中，undefined和null会被toString方法解析为空字符串，对象会被解析为[object,Object]

### JS 异步解决方案的发展历程以及优缺点

JS 异步已经告一段落了，这里来一波小总结

#### 1. 回调函数（callback）

```
setTimeout(() => {
    // callback 函数体
}, 1000)
```

**缺点：回调地狱，不能用 try catch 捕获错误，不能 return**

回调地狱的根本问题在于：

- 缺乏顺序性： 回调地狱导致的调试困难，和大脑的思维方式不符
- 嵌套函数存在耦合性，一旦有所改动，就会牵一发而动全身，即（**控制反转**）
- 嵌套函数过多的多话，很难处理错误

```
ajax('XXX1', () => {
    // callback 函数体
    ajax('XXX2', () => {
        // callback 函数体
        ajax('XXX3', () => {
            // callback 函数体
        })
    })
})
```

**优点：解决了同步的问题**（只要有一个任务耗时很长，后面的任务都必须排队等着，会拖延整个程序的执行。）

#### 2. Promise

Promise就是为了解决callback的问题而产生的。

Promise 实现了链式调用，也就是说每次 then 后返回的都是一个全新 Promise，如果我们在 then 中 return ，return 的结果会被 Promise.resolve() 包装

**优点：解决了回调地狱的问题**

```
ajax('XXX1')
  .then(res => {
      // 操作逻辑
      return ajax('XXX2')
  }).then(res => {
      // 操作逻辑
      return ajax('XXX3')
  }).then(res => {
      // 操作逻辑
  })
```

**缺点：无法取消 Promise ，错误需要通过回调函数来捕获**

#### 3. Generator

**特点：可以控制函数的执行**，可以配合 co 函数库使用

```
function *fetch() {
    yield ajax('XXX1', () => {})
    yield ajax('XXX2', () => {})
    yield ajax('XXX3', () => {})
}
let it = fetch()
let result1 = it.next()
let result2 = it.next()
let result3 = it.next()
```

#### 4. Async/await

async、await 是异步的终极解决方案

**优点是：代码清晰，不用像 Promise 写一大堆 then 链，处理了回调地狱的问题**

**缺点：await 将异步代码改造成同步代码，如果多个异步操作没有依赖性而使用 await 会导致性能上的降低。**

```
async function test() {
  // 以下代码没有依赖性的话，完全可以使用 Promise.all 的方式
  // 如果有依赖性的话，其实就是解决回调地狱的例子了
  await fetch('XXX1')
  await fetch('XXX2')
  await fetch('XXX3')
}
```

下面来看一个使用 `await` 的例子：

```
let a = 0
let b = async () => {
  a = a + await 10
  console.log('2', a) // -> '2' 10
}
b()
a++
console.log('1', a) // -> '1' 1
```

对于以上代码你可能会有疑惑，让我来解释下原因

- 首先函数 `b` 先执行，在执行到 `await 10` 之前变量 `a` 还是 0，因为 `await` 内部实现了 `generator` ，**`generator` 会保留堆栈中东西，所以这时候 `a = 0` 被保存了下来**
- 因为 `await` 是异步操作，后来的表达式不返回 `Promise` 的话，就会包装成 `Promise.reslove(返回值)`，然后会去执行函数外的同步代码
- 同步代码执行完毕后开始执行异步代码，将保存下来的值拿出来使用，这时候 `a = 0 + 10`

上述解释中提到了 `await` 内部实现了 `generator`，其实 `await` 就是 `generator` 加上 `Promise`的语法糖，且内部实现了自动执行 `generator`。如果你熟悉 co 的话，其实自己就可以实现这样的语法糖。

### Promise 构造函数是同步执行还是异步执行，那么 then 方法呢？

Promise构造函数是同步执行的，then方法是异步执行的



### 如何实现一个 new？

```js
        function _new(fn, ...arg) {
            const obj = Object.create(fn.prototype);
            const ret = fn.apply(obj, arg);
            return ret instanceof Object ? ret : obj;
        }
```

### Json web token (JWT)原理、cookie+session的区别 和对应的攻击







### 介绍下 npm 模块安装机制，为什么输入 npm install 就可以自动安装对应的模块？

#### npm 模块安装机制：

npm install查询当前node_modules目录中有没有对应的指定的模块，如果有，不需要安装，如果没有需要从源仓库中下载依赖的压缩包，然后解压到node_modules目录中。

#### npm install命令执行经历的几个阶段：

确认首层依赖模块，也就是 dependencies 和 devDependencies 属性中直接指定的模块。工程本身是整棵依赖树的根节点，每个首层依赖模块都是根节点下面的一棵子树，npm 会开启多进程从每个首层依赖模块开始逐步寻找更深层级的节点。

根据 package.json和package-lock.json中的版本信息，得到版本依赖树，要处理重复的模块，并对重复模板的版本号进行处理，遍历所有节点，逐个将模块放在根节点下面，也就是 node-modules 的第一层。当发现有**重复模块**时，则将其丢弃。如果依赖的重复版本无法做兼容性处理 ，将同时保留。

最后一步是生成或更新版本描述文件，npm install 过程完成。



### 谈谈你对TCP三次握手和四次挥手的理解

由于TCP连接是全双工的，因此每个方向都必须单独进行关闭，所以即使没有最后一个包，也需要先回复断开连接的请求，然后再发送关闭请求。

TCP三次握手：1、客户端发送syn包到服务器，等待服务器确认接收。2、服务器确认接收syn包并确认客户的syn，并发送回来一个syn+ack的包给客户端。3、客户端确认接收服务器的syn+ack包，并向服务器发送确认包ack，二者相互建立联系后，完成tcp三次握手。

三次握手之所以是三次是保证client和server均让对方知道自己的接收和发送能力没问题而保证的最小次数。

第一次client => server 只能server判断出client具备发送能力
第二次 server => client client就可以判断出server具备发送和接受能力。此时client还需让server知道自己接收能力没问题于是就有了第三次
第三次 client => server 双方均保证了自己的接收和发送能力没有问题

其中，为了保证后续的握手是为了应答上一个握手，每次握手都会带一个标识 seq，后续的ACK都会对这个seq进行加一来进行确认。

四次挥手即终止TCP连接，就是指断开一个TCP连接时，需要客户端和服务端总共发送4个包以确认连接的断开。

由于TCP连接是全双工的，因此每个方向都必须单独进行关闭。这原则是当一方完成它的数据发送任务后就能发送一个FIN来终止这个方向的连接。收到一个 FIN只意味着这一方向上没有数据流动，一个TCP连接在收到一个FIN后仍能发送数据。首先进行关闭的一方将执行主动关闭，而另一方执行被动关闭。

（1） TCP客户端发送一个FIN，用来关闭客户到服务器的[数据传送](https://baike.baidu.com/item/数据传送)。

（2） 服务器收到这个FIN，它发回一个ACK，确认序号为收到的序号加1。和SYN一样，一个FIN将占用一个序号。

（3） 服务器关闭客户端的连接，发送一个FIN给客户端。

（4） 客户端发回ACK[报文](https://baike.baidu.com/item/报文)确认，并将确认序号设置为收到序号加1。



- MSL

> `Maximum Segment Lifetime`，译为“报文最大生存时间”。RFC 793中规定MSL为2分钟，实际应用中常用的是30秒，1分钟和2分钟等

- 为什么是`2MSL`

`2MSL`即两倍的MSL，TCP的`TIME_WAIT`状态也称为2MSL等待状态。

当TCP的一端发起主动关闭，在发出最后一个ACK包后，即第3次握手完成后发送了第四次握手的ACK包后就进入了`TIME_WAIT`状态，必须在此状态上停留两倍的MSL时间。

等待2MSL时间主要目的是怕最后一个ACK包对方没收到，那么对方在超时后将重发第三次握手的FIN包，主动关闭端接到重发的FIN包后可以再发一个ACK应答包。

在`TIME_WAIT`状态时两端的端口不能使用，要等到`2MSL`时间结束才可继续使用。
当连接处于`2MSL`等待阶段时任何迟到的报文段都将被丢弃。不过在实际应用中可以通过设置`SO_REUSEADDR`选项达到不必等待2MSL时间结束再使用此端口。

