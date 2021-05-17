[toc] 



https://juejin.cn/post/6844903885488783374#heading-111

# Vue和React



### React / Vue 项目时为什么要在列表组件中写 key，其作用是什么？

没有绑定key的情况下，在遍历简单模板时，对比虚拟dom的新旧 节点会更快，节点也会就地复用。副作用，可能不会产生过渡效果，绑定数据会出现错位，这个模式虽然高效，但只适用不依赖子组件状态或临时dom状态的列表渲染。

而key的作用，给每个虚拟dom添加唯一的id，在diff算法对比新旧虚拟dom时，可以通过key更加快速精准的找到旧的虚拟dom节点。

### Virtual DOM 真的比操作原生 DOM 快吗？谈谈你的想法。

https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/47

### 为什么 Vuex 的 mutation 和 Redux 的 reducer 中不能做异步操作？

https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/65

### 在 Vue 中，子组件为何不可以修改父组件传递的 Prop

https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/60

### Vue 的父组件和子组件生命周期钩子执行顺序是什么



### React 和 Vue 的 diff 时间复杂度从 O(n^3) 优化到 O(n) ，那么 O(n^3) 和 O(n) 是如何计算出来的？

https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/151

### vue 在 v-for 时给每项元素绑定事件需要用事件代理吗？为什么？



# ES5和ES6

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

### 请分别用深度优先思想和广度优先思想实现一个拷贝函数

```js
// 工具函数
let _toString = Object.prototype.toString
let map = {
  array: 'Array',
  object: 'Object',
  function: 'Function',
  string: 'String',
  null: 'Null',
  undefined: 'Undefined',
  boolean: 'Boolean',
  number: 'Number'
}
let getType = (item) => {
  return _toString.call(item).slice(8, -1)
}
let isTypeOf = (item, type) => {
  return map[type] && map[type] === getType(item)
}
```

#### 深复制 深度优先遍历

```js
let DFSdeepClone = (obj, visitedArr = []) => {
  let _obj = {}
  if (isTypeOf(obj, 'array') || isTypeOf(obj, 'object')) {
    let index = visitedArr.indexOf(obj)
    _obj = isTypeOf(obj, 'array') ? [] : {}
    if (~index) { // 判断环状数据
      _obj = visitedArr[index]
    } else {
      visitedArr.push(obj)
      for (let item in obj) {
        _obj[item] = DFSdeepClone(obj[item], visitedArr)
      }
    }
  } else if (isTypeOf(obj, 'function')) {
    _obj = eval('(' + obj.toString() + ')');
  } else {
    _obj = obj
  }
  return _obj
}
```

#### 广度优先遍历

```js
let BFSdeepClone = (obj) => {
    let origin = [obj],
      copyObj = {},
      copy = [copyObj]
      // 去除环状数据
    let visitedQueue = [],
      visitedCopyQueue = []
    while (origin.length > 0) {
      let items = origin.shift(),
        _obj = copy.shift()
      visitedQueue.push(items)
      if (isTypeOf(items, 'object') || isTypeOf(items, 'array')) {
        for (let item in items) {
          let val = items[item]
          if (isTypeOf(val, 'object')) {
            let index = visitedQueue.indexOf(val)
            if (!~index) {
              _obj[item] = {}
                //下次while循环使用给空对象提供数据
              origin.push(val)
                // 推入引用对象
              copy.push(_obj[item])
            } else {
              _obj[item] = visitedCopyQueue[index]
              visitedQueue.push(_obj)
            }
          } else if (isTypeOf(val, 'array')) {
            // 数组类型在这里创建了一个空数组
            _obj[item] = []
            origin.push(val)
            copy.push(_obj[item])
          } else if (isTypeOf(val, 'function')) {
            _obj[item] = eval('(' + val.toString() + ')');
          } else {
            _obj[item] = val
          }
        }
        // 将已经处理过的对象数据推入数组 给环状数据使用
        visitedCopyQueue.push(_obj)
      } else if (isTypeOf(items, 'function')) {
        copyObj = eval('(' + items.toString() + ')');
      } else {
        copyObj = obj
      }
    }
  return copyObj
}
```

**深度优先遍历——自实现**

```js
        var deepClone = function (target, weakset = new WeakSet()) {
            if (typeof target === 'object' && target !== null) { //包括数组、对象、类数组，Set、WeakSet、Map、WeakMap
                var o = Array.isArray(target) ? [] : {};
                if (weakset.has(target)) {
                    return target;
                } else {
                    weakset.add(target);
                    for (let prop in target) {//无法遍历到对象的Symbol属性
                        if (prop === 't') {
                            console.log(target[prop])
                        }
                        o[prop] = deepClone(target[prop], weakset)
                    }
                    return o;
                }

            } else if (typeof target === "function") {
                return eval('(' + target.toString() + ')')
            } else {
                return target
            }
        }
        var obj = {
            a: 'a',
            m: {
                x: '12'
            }
        }
        var target1 = {
            a: 1,
            b: 'a',
            c: function () {
                console.log('c')
            },
            d: [1, 2, 3],
            f: obj
        }
        target1.o = target1;//必须通过这种方式产生循环引用。如果在申明对象时，写在对象结构体中，无法赋值，值为undefined
        var result = deepClone(target1)
        console.log(result)
```

### 模拟实现一个深拷贝，并考虑对象相互引用以及 Symbol 拷贝的情况

**注意：对象中的Symbol属性，必须使用[]，不管是在对象内作为属性，还是访问时，都要有[]。**

**如果Symbol()的形式值作为属性，对象自身都无法访问。所以使用Symbol.for('a')的形式作为对象的Symbol属性。**

```js
        var deepClone = function (target, weakset = new WeakSet()) {
            if (typeof target === 'object' && target !== null) { //包括数组、对象、类数组，Set、WeakSet、Map、WeakMap
                var o = Array.isArray(target) ? [] : {};
                if (weakset.has(target)) {
                    return target;
                } else {
                    weakset.add(target);
                    for (let prop in target) {
                        o[prop] = deepClone(target[prop], weakset)
                    }
                    var targetSymArr = Object.getOwnPropertySymbols(target);//获取target对象中的Symbol属性
                    if(targetSymArr.length > 0){
                        targetSymArr.forEach(item => {
                            o[item] = deepClone(target[item], weakset)
                        })
                        console.log(targetSymArr)
                    }
                    return o;
                }

            } else if (typeof target === "function") {
                return eval('(' + target.toString() + ')')
            } else {
                return target
            }
        }
        var obj = {
            a: 'a',
            m: {
                x: '12'
            }
        }
        var target1 = {
            a: 1,
            b: 'a',
            c: function () {
                console.log('c')
            },
            d: [1, 2, 3],
            f: obj,
            [Symbol.for('1')]: 1
        }
        target1.o = target1; //必须通过这种方式产生循环引用。如果在申明对象时，写在对象结构体中，无法赋值，值为undefined
        var result = deepClone(target1)
        console.log(result)
```



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

### 介绍下 Promise.all 使用、原理实现及错误处理?

https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/130

### 设计并实现 Promise.race()



### 打印出 1 - 10000 之间的所有对称数?

```js
console.time('s')
var reg = /^(\d)\1$|^(\d)\d\2$|(\d)(\d)\4\3/g
var arr = [];
for(var i = 1; i <= 10000; i++){
    var v = reg.exec(String(i))
    if(v){
        arr.push(Number(v[0]))
    }
}
console.log(arr)
console.timeEnd('s')//s: 3.13916015625 ms
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

JWT：认证机制，让服务端知道这是受认证的用户

JWT由服务端的authentication server认证服务器生成，且返回给客户端；客户端每次访问都要带上该JWT传给application server 应用服务器，

格式：由三部分组成，header、payload、signature（签名 ）

header包含信息：JWT类型、加密算法类型

payload包含：用户信息、一些数据；

signature：签名，通过算法生成的一个能够认证的字符串 

最后再解释一下application server如何认证用户发来的JWT是否合法，首先application server 和 authentication server必须要有个约定，例如双方同时知道加密用的secret（这里假设用的就是简单的对称加密算法），那么在applicaition 收到这个JWT是，就可以利用JWT前两段（别忘了JWT是个三段的拼成的字符串哦）数据作为输入，用同一套hash算法和同一个secret自己计算一个签名值，然后把计算出来的签名值和收到的JWT第三段比较，如果相同则认证通过，如果不相同，则认证不通过。就这么简单，当然，上面是假设了这个hash算法是对称加密算法,其实如果用非对称加密算法也是可以的，比方说我就用非对称的算法，那么对应的key就是一对，而非一个，那么一对公钥+私钥可以这样分配：私钥由authentication server保存，公钥由application server保存，application server验证的时候，用公钥解密收到的signature,这样就得到了header和payload的拼接值，用这个拼接值跟前两段比较，相同就验证通过。总之，方法略不同，但大方向完全一样。

提两个best practice:

1. 发送JWT要用https，原因前面说了，JWT本身不保证数据安全

 2.JWT的payload中设置expire时间，为什么要这样做其实跟cookie为什么要设置过期时间一样，都是为了安全。

参考文章：https://www.cnblogs.com/cxxtreasure/p/14173315.html

token有效期：https://my.oschina.net/odetteisgorgeous/blog/1920762



CSRF（Cross-site request forgery），中文名称：跨站请求伪造

![img](https://pic002.cnblogs.com/img/hyddd/200904/2009040916453171.jpg)



如果已知的伪造请求是get请求，那么可以直接使用img或iframe的src属性去发送请求。

如果是post请求：





CRSF防御 ：

1、表单中增加一个hash值，hash值有客户端请求服务端页面时生成的随机值，该值不可能被第三方伪造。

```php
　　<?php
　　　　$hash = md5($_COOKIE['cookie']);
　　?>
　　<form method=”POST” action=”transfer.php”>
　　　　<input type=”text” name=”toBankId”>
　　　　<input type=”text” name=”money”>
　　　　<input type=”hidden” name=”hash” value=”<?=$hash;?>”>
　　　　<input type=”submit” name=”submit” value=”Submit”>
　　</form>
```

参考：https://www.cnblogs.com/lr393993507/p/9834856.html

### cookie 和 token 都存放在 header 中，为什么不会劫持 token？

https://juejin.cn/post/6844903885488783374#heading-111



### 介绍下 npm 模块安装机制，为什么输入 npm install 就可以自动安装对应的模块？

#### npm 模块安装机制：

npm install查询当前node_modules目录中有没有对应的指定的模块，如果有，不需要安装，如果没有需要从源仓库中下载依赖的压缩包，然后解压到node_modules目录中。

#### npm install命令执行经历的几个阶段：

确认首层依赖模块，也就是 dependencies 和 devDependencies 属性中直接指定的模块。工程本身是整棵依赖树的根节点，每个首层依赖模块都是根节点下面的一棵子树，npm 会开启多进程从每个首层依赖模块开始逐步寻找更深层级的节点。

根据 package.json和package-lock.json中的版本信息，得到版本依赖树，要处理重复的模块，并对重复模板的版本号进行处理，遍历所有节点，逐个将模块放在根节点下面，也就是 node-modules 的第一层。当发现有**重复模块**时，则将其丢弃。如果依赖的重复版本无法做兼容性处理 ，将同时保留。

最后一步是生成或更新版本描述文件，npm install 过程完成。

# htpp、https



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

### 简单讲解一下http2的多路复用

HTTP2采用二进制格式传输，取代了HTTP1.x的文本格式，二进制格式解析更高效。
多路复用代替了HTTP1.x的序列和阻塞机制，所有的相同域名请求都通过同一个TCP连接并发完成。在HTTP1.x中，并发多个请求需要多个TCP连接，浏览器为了控制资源会有6-8个TCP连接都限制。
HTTP2中

- 同域名下所有通信都在单个连接上完成，消除了因多个 TCP 连接而带来的延时和内存消耗。
- 单个连接上可以并行交错的请求和响应，之间互不干扰

### HTTP1.0、 HTTP1.1 、HTTP2.0的区别

在 HTTP/1 中，每次请求都会建立一次HTTP连接，也就是我们常说的3次握手4次挥手，这个过程在一次请求过程中占用了相当长的时间，即使开启了 Keep-Alive ，解决了多次连接的问题，但是依然有两个效率上的问题：

- 第一个：串行的文件传输。当请求a文件时，b文件只能等待，等待a连接到服务器、服务器处理文件、服务器返回文件，这三个步骤。我们假设这三步用时都是1秒，那么a文件用时为3秒，b文件传输完成用时为6秒，依此类推。（注：此项计算有一个前提条件，就是浏览器和服务器是单通道传输）
- 第二个：连接数过多。我们假设Apache设置了最大并发数为300，因为浏览器限制，浏览器发起的最大请求数为6，也就是服务器能承载的最高并发为50，当第51个人访问时，就需要等待前面某个请求处理完成。

HTTP/2的多路复用就是为了解决上述的两个性能问题。
在 HTTP/2 中，有两个非常重要的概念，分别是帧（frame）和流（stream）。
帧代表着最小的数据单位，每个帧会标识出该帧属于哪个流，流也就是多个帧组成的数据流。
多路复用，就是在一个 TCP 连接中可以存在多条流。换句话说，也就是可以发送多个请求，对端可以通过帧中的标识知道属于哪个请求。通过这个技术，可以避免 HTTP 旧版本中的队头阻塞问题，极大的提高传输性能。

参考文章：https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/14

### http和https的区别

HTTP协议传输的数据都是未加密的，也就是明文的，因此使用HTTP协议传输隐私信息非常不安全，为了保证这些隐私数据能加密传输，于是网景公司设计了SSL（Secure Sockets Layer）协议用于对HTTP协议传输的数据进行加密，从而就诞生了HTTPS。简单来说，HTTPS协议是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议，要比http协议安全。

　　HTTPS和HTTP的区别主要如下：

　　1、https协议需要到ca申请证书，一般免费证书较少，因而需要一定费用。——**身份认证（CA数字证书）**

　　2、http是超文本传输协议，信息是明文传输，https则是具有安全性的ssl加密传输协议。

　　3、http和https使用的是完全不同的连接方式，用的端口也不一样，前者是80，后者是443。

　　4、http的连接很简单，是无状态的；HTTPS协议是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议，比http协议安全

参考文章：https://www.cnblogs.com/wqhwe/p/5407468.html

### 介绍下 HTTPS 中间人攻击

https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/142



### 有以下 3 个判断数组的方法，请分别介绍它们之间的区别和优劣

> Object.prototype.toString.call() 、 instanceof 以及 Array.isArray()

#### 1. Object.prototype.toString.call()

每一个继承 Object 的对象都有 `toString` 方法，如果 `toString` 方法没有重写的话，会返回 `[Object type]`，其中 type 为对象的类型。但当除了 Object 类型的对象外，其他类型直接使用 `toString` 方法时，会直接返回都是内容的字符串，所以我们需要使用call或者apply方法来改变toString方法的执行上下文。

```
const an = ['Hello','An'];
an.toString(); // "Hello,An"
Object.prototype.toString.call(an); // "[object Array]"
```

这种方法对于所有基本的数据类型都能进行判断，即使是 null 和 undefined 。

```
Object.prototype.toString.call('An') // "[object String]"
Object.prototype.toString.call(1) // "[object Number]"
Object.prototype.toString.call(Symbol(1)) // "[object Symbol]"
Object.prototype.toString.call(null) // "[object Null]"
Object.prototype.toString.call(undefined) // "[object Undefined]"
Object.prototype.toString.call(function(){}) // "[object Function]"
Object.prototype.toString.call({name: 'An'}) // "[object Object]"
```

`Object.prototype.toString.call()` 常用于判断浏览器内置对象时。

更多实现可见 [谈谈 Object.prototype.toString](https://juejin.im/post/591647550ce4630069df1c4a)

#### 2. instanceof

`instanceof` 的内部机制是通过判断对象的原型链中是不是能找到类型的 `prototype`。

使用 `instanceof`判断一个对象是否为数组，`instanceof` 会判断这个对象的原型链上是否会找到对应的 `Array` 的原型，找到返回 `true`，否则返回 `false`。

```
[]  instanceof Array; // true
```

但 `instanceof` 只能用来判断对象类型，原始类型不可以。并且所有对象类型 instanceof Object 都是 true。

```
[]  instanceof Object; // true
```

#### 3. Array.isArray()

- 功能：用来判断对象是否为数组

- instanceof 与 isArray

  当检测Array实例时，`Array.isArray` 优于 `instanceof` ，因为 `Array.isArray` 可以检测出 `iframes`

  ```
  var iframe = document.createElement('iframe');
  document.body.appendChild(iframe);
  xArray = window.frames[window.frames.length-1].Array;
  var arr = new xArray(1,2,3); // [1,2,3]
  
  // Correctly checking for Array
  Array.isArray(arr);  // true
  Object.prototype.toString.call(arr); // true
  // Considered harmful, because doesn't work though iframes
  arr instanceof Array; // false
  ```

- `Array.isArray()` 与 `Object.prototype.toString.call()`

  `Array.isArray()`是ES5新增的方法，当不存在 `Array.isArray()` ，可以用 `Object.prototype.toString.call()` 实现。

  ```
  if (!Array.isArray) {
    Array.isArray = function(arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
    };
  }
  ```

### 介绍下重绘和回流（Repaint & Reflow），以及如何进行优化

#### 1. 浏览器渲染机制

- 浏览器采用流式布局模型（`Flow Based Layout`）
- 浏览器会把`HTML`解析成`DOM`，把`CSS`解析成`CSSOM`，`DOM`和`CSSOM`合并就产生了渲染树（`Render Tree`）。
- 有了`RenderTree`，我们就知道了所有节点的样式，然后计算他们在页面上的大小和位置，最后把节点绘制到页面上。
- 由于浏览器使用流式布局，对`Render Tree`的计算通常只需要遍历一次就可以完成，**但`table`及其内部元素除外，他们可能需要多次计算，通常要花3倍于同等元素的时间，这也是为什么要避免使用`table`布局的原因之一**。

#### 2. 重绘

由于节点的几何属性发生改变或者由于样式发生改变而不会影响布局的，称为重绘，例如`outline`, `visibility`, `color`、`background-color`等，重绘的代价是高昂的，因为浏览器必须验证DOM树上其他节点元素的可见性。

#### 3. 回流/重排

回流是布局或者几何属性需要改变就称为回流。回流是影响浏览器性能的关键因素，因为其变化涉及到部分页面（或是整个页面）的布局更新。一个元素的回流可能会导致了其所有子元素以及DOM中紧随其后的节点、祖先节点元素的随后的回流。

```
<body>
<div class="error">
    <h4>我的组件</h4>
    <p><strong>错误：</strong>错误的描述…</p>
    <h5>错误纠正</h5>
    <ol>
        <li>第一步</li>
        <li>第二步</li>
    </ol>
</div>
</body>
```

在上面的HTML片段中，对该段落(`<p>`标签)回流将会引发强烈的回流，因为它是一个子节点。这也导致了祖先的回流（`div.error`和`body` – 视浏览器而定）。此外，`<h5>`和`<ol>`也会有简单的回流，因为其在DOM中在回流元素之后。**大部分的回流将导致页面的重新渲染。**

**回流必定会发生重绘，重绘不一定会引发回流。**

#### 4. 浏览器优化

现代浏览器大多都是通过队列机制来批量更新布局，浏览器会把修改操作放在队列中，至少一个浏览器刷新（即16.6ms）才会清空队列，但当你**获取布局信息的时候，队列中可能有会影响这些属性或方法返回值的操作，即使没有，浏览器也会强制清空队列，触发回流与重绘来确保返回正确的值**。

主要包括以下属性或方法：

- `offsetTop`、`offsetLeft`、`offsetWidth`、`offsetHeight`
- `scrollTop`、`scrollLeft`、`scrollWidth`、`scrollHeight`
- `clientTop`、`clientLeft`、`clientWidth`、`clientHeight`
- `width`、`height`
- `getComputedStyle()`
- `getBoundingClientRect()`

所以，我们应该避免频繁的使用上述的属性，他们都会强制渲染刷新队列。

#### 5. 减少重绘与回流

1. CSS

   - **使用 `transform` 替代 `top`**

   - **使用 `visibility` 替换 `display: none`** ，因为前者只会引起重绘，后者会引发回流（改变了布局

   - **避免使用`table`布局**，可能很小的一个小改动会造成整个 `table` 的重新布局。

   - **尽可能在`DOM`树的最末端改变`class`**，回流是不可避免的，但可以减少其影响。尽可能在DOM树的最末端改变class，可以限制了回流的范围，使其影响尽可能少的节点。

   - **避免设置多层内联样式**，CSS 选择符**从右往左**匹配查找，避免节点层级过多。

     ```
     <div>
       <a> <span></span> </a>
     </div>
     <style>
       span {
         color: red;
       }
       div > a > span {
         color: red;
       }
     </style>
     ```

     对于第一种设置样式的方式来说，浏览器只需要找到页面中所有的 `span` 标签然后设置颜色，但是对于第二种设置样式的方式来说，浏览器首先需要找到所有的 `span` 标签，然后找到 `span` 标签上的 `a` 标签，最后再去找到 `div` 标签，然后给符合这种条件的 `span` 标签设置颜色，这样的递归过程就很复杂。所以我们应该尽可能的避免写**过于具体**的 CSS 选择器，然后对于 HTML 来说也尽量少的添加无意义标签，保证**层级扁平**。

   - **将动画效果应用到`position`属性为`absolute`或`fixed`的元素上**，避免影响其他元素的布局，这样只是一个重绘，而不是回流，同时，控制动画速度可以选择 `requestAnimationFrame`，详见[探讨 requestAnimationFrame](https://github.com/LuNaHaiJiao/blog/issues/30)。

   - **避免使用`CSS`表达式**，可能会引发回流。

   - **将频繁重绘或者回流的节点设置为图层**，图层能够阻止该节点的渲染行为影响别的节点，例如`will-change`、`video`、`iframe`等标签，浏览器会自动将该节点变为图层。

   - **CSS3 硬件加速（GPU加速）**，使用css3硬件加速，可以让`transform`、`opacity`、`filters`这些动画不会引起回流重绘 。但是对于动画的其它属性，比如`background-color`这些，还是会引起回流重绘的，不过它还是可以提升这些动画的性能。

2. JavaScript

   - **避免频繁操作样式**，最好一次性重写`style`属性，或者将样式列表定义为`class`并一次性更改`class`属性。
   - **避免频繁操作`DOM`**，创建一个`documentFragment`，在它上面应用所有`DOM操作`，最后再把它添加到文档中。
   - **避免频繁读取会引发回流/重绘的属性**，如果确实需要多次使用，就用一个变量缓存起来。
   - **对具有复杂动画的元素使用绝对定位**，使它脱离文档流，否则会引起父元素及后续元素频繁回流。

   ### 介绍下观察者模式和订阅-发布模式的区别，各自适用于什么场景

   https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/25

   ### 聊聊 Redux 和 Vuex 的设计思想

   **共同点**

   首先两者都是处理全局状态的工具库，大致实现思想都是：全局state保存状态---->dispatch(action)
   ------>reducer(vuex里的mutation)----> 生成newState; 整个状态为同步操作；

   **区别**

   最大的区别在于处理异步的不同，vuex里面多了一步commit操作，在action之后commit(mutation)之前处理异步，而redux里面则是通过中间件处

   ### 说说浏览器和 Node 事件循环的区别

   https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/26

   ### 介绍模块化发展历程

   可从IIFE、AMD、CMD、CommonJS、UMD、webpack(require.ensure)、ES Module、`<script type="module">` 这几个角度考虑

   ### 全局作用域中，用 const 和 let 声明的变量不在 window 上，那到底在哪里？如何去获取

   在ES5中，顶层对象的属性和全局变量是等价的，var 命令和 function 命令声明的全局变量，自然也是顶层对象。

   ```
   var a = 12;
   function f(){};
   
   console.log(window.a); // 12
   console.log(window.f); // f(){}
   ```

   但ES6规定，var 命令和 function 命令声明的全局变量，依旧是顶层对象的属性，但 let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性。

   ```
   let aa = 1;
   const bb = 2;
   
   console.log(window.aa); // undefined
   console.log(window.bb); // undefined
   ```

   在哪里？怎么获取？通过在设置断点，看看浏览器是怎么处理的：

   [![letandconst](https://user-images.githubusercontent.com/20290821/53854366-2ec1a400-4004-11e9-8c62-5a1dd91b8a5b.png)](https://user-images.githubusercontent.com/20290821/53854366-2ec1a400-4004-11e9-8c62-5a1dd91b8a5b.png)

   通过上图也可以看到，在全局作用域中，用 let 和 const 声明的全局变量并没有在全局对象中，只是一个块级作用域（Script）中

   怎么获取？在定义变量的块级作用域中就能获取啊，既然不属于顶层对象，那就不加 window（global）呗。

   ```
   let aa = 1;
   const bb = 2;
   
   console.log(aa); // 1
   console.log(bb); // 2
   ```

### 下面代码输出什么?

**例题1：**

```js
var a = 10;
(function () {
    console.log(a)//undefined
    a = 5
    console.log(window.a)//10
    var a = 20;
    console.log(a)//20
})()
```

**例题2：**

```js
var obj = {
    '2': 3,
    '3': 4,
    'length': 2,
    'splice': Array.prototype.splice,
    'push': Array.prototype.push
}
obj.push(1)
obj.push(2)
console.log(obj)
```

答案：

```js
{
    '2': 1,
    '3': 2,
    'length': 2,
    'splice': Array.prototype.splice,
    'push': Array.prototype.push
}
```

**例题3：连等号赋值。**

```js
var a = {n: 1};
var b = a;
a.x = a = {n: 2};

console.log(a.x) 	
console.log(b.x)
```

注意：连等号的顺序，不是从右向左；而是从左向右的顺序每项都赋同样的值

所以如下 ：

```js
var a = {n: 1};
var b = a;
// a.x = a = {n: 2};
a.x = {n: 2}
a = {n: 2}

console.log(a.x)//undefined
console.log(b.x)//{n: 2}
```

**例题4：**

```js
        function Foo() {
            Foo.a = function () {
                console.log(1)
            }
            this.a = function () {
                console.log(2)
            }
        }
        Foo.prototype.a = function () {
            console.log(3)
        }
        Foo.a = function () {
            console.log(4)
        }
        Foo.a();//4
        let obj = new Foo();
        obj.a();//2
        Foo.a();//1

```

例题5：

```js
function changeObjProperty(o) {
  o.siteUrl = "http://www.baidu.com"
  o = new Object()
  o.siteUrl = "http://www.google.com"
} 
let webSite = new Object();
changeObjProperty(webSite);
console.log(webSite.siteUrl)//"http://www.baidu.com"
```



### 实现 (5).add(3).minus(2) 功能

> 例： 5 + 3 - 2，结果为 6

```js
Number.prototype.add = function(num){
    if(typeof num !=="number"){
        throw Error('Type Error')
    }
    return this + num;
}
Number.prototype.minus = function(num){
    if(typeof num !=="number"){
        throw Error('Type Error')
    }
    return this - num;
}
var num = (5).add('3a').minus(2)
console.log(num)
```

### 请实现一个 add 函数，满足以下功能。

```js
add(1); 			// 1
add(1)(2);  	// 3
add(1)(2)(3)// 6
add(1)(2, 3); // 6
add(1, 2)(3); // 6
add(1, 2, 3); // 6
```

### 周一算法题之「两数之和」

> 给定一个整数数组和一个目标值，找出数组中和为目标值的两个数。
>
> 你可以假设每个输入只对应一种答案，且同样的元素不能被重复利用。
>
> 示例：
>
> ```js
> 给定 nums = [2, 7, 11, 15], target = 9
> 
> 因为 nums[0] + nums[1] = 2 + 7 = 9
> 所以返回 [0, 1]
> ```

以下答案无法处理数组中重复的数据，比如7+7=14

```js
 var nums = [2, 7, 11, 15], target = 9;

 var map = {}

 nums.forEach((item, index) => {//时间复杂度O(nums.length)
     if(item < target){
        map[item] = index
     }
 })
 for(prop in map){
     var findV = map[target - Number(prop)];
    if(findV){
        console.log([map[prop],findV])//[0, 1]
        break;
    }
 }
```

### 编程算法题

> 用 JavaScript 写一个函数，输入 int 型，返回整数逆序后的字符串。如：输入整型 1234，返回字符串“4321”。要求必须使用递归函数调用，不能用全局变量，输入函数必须只有一个参数传入，必须返回字符串。

```js
var translateInt = function(intNum){
    var result = '';
    result += intNum % 10;
    var num = parseInt(intNum / 10, 10);
    if(num !== 0){
       return  result += arguments.callee(num)//每一层都是得到自己的result
    }
    return result
}
console.log(translateInt(123456789))//987654321
```

### 递归存储值的思考

可以全局变量存储；可以使用默认参数存储，联想到深度遍历的代码；可以使用上面的方式存储。



### 某公司 1 到 12 月份的销售额存在一个对象里面

> 如下：{1:222, 2:123, 5:888}，请把数据处理为如下结构：[222, 123, null, null, 888, null, null, null, null, null, null, null]。

```js
    var obj = {1:222, 2:123, 5:888, length:13}//最大index值为12，所以length写13，结果去开头index0
    var result = [];
    Array.prototype.find.call(obj, item => {
        item ? result.push(item): result.push(null)
    })
    result.shift()
    console.log(result)//[222, 123, null, null, 888, null, null, null, null, null, null, null]


onsole.log(Array.from({length: 12}))//[undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]
//方法2：
let obj = {1:222, 2:123, 5:888};
const result = Array.from({ length: 12 }).map((_, index) => obj[index + 1] || null);
console.log(result)
```

### 给定两个数组，写一个方法来计算它们的交集？

这道题不是工程题，是道算法题。空间换时间的思路，时间复杂度就是(m+n)

```js
        var arr1 = [1,2,2,1]
        var arr2 = [2,2]
        var map = {}

        arr1.forEach(item => map[item] ? map[item]++ : map[item] = 1)
        var result = arr2.filter(item => {
            if(map[item]){//非undefined，非0
                map[item] --;
                return true
            }
        })

        console.log(result)// [2, 2]

```

### 给定两个大小为 m 和 n 的有序数组 nums1 和 nums2。请找出这两个有序数组的中位数。要求算法的时间复杂度为 O(log(m+n))。

> 示例 1：
>
> ```js
> nums1 = [1, 3]
> nums2 = [2]
> 复制代码
> ```
>
> 中位数是 2.0
>
> 示例 2：
>
> ```js
> nums1 = [1, 2]
> nums2 = [3, 4]
> 复制代码
> ```
>
> 中位数是(2 + 3) / 2 = 2.5



### 如何把一个字符串的大小写取反（大写变小写小写变大写），例如 ’AbC' 变成 'aBc' 

```js
        var str = 'AbC'
        var reg = /([A-Z])|([a-z])/g
        var result = str.replace(reg, function (match, p1, p2) {
            if (p1) {
                return p1.toLowerCase()
            }
            if (p2) {
                return p2.toUpperCase()
            }
        })
        console.log(result)//aBc
```



### 下面代码中 a 在什么情况下会打印 1？

```js
var a = ?;
if(a == 1 && a == 2 && a == 3){
 	console.log(1);
}
```

答案：

```js
var a = {
    i: 1,
    toString(){
        return this.i++
    }
};
if(a == 1 && a == 2 && a == 3){
 	console.log(1); //1
}
```



### 改造下面的代码，使之输出0 - 9，写出你能想到的所有解法

```js
for (var i = 0; i< 10; i++){
	setTimeout(() => {
		console.log(i);
    }, 1000)
}
```

1、立即执行函数添加一个函数作用域

```js
    for (var i = 0; i < 10; i++) {
        (function(j){
            setTimeout(function(){
                console.log(j)
             },1000)
        })(i)
    }
```



2、let生成块级作用域

```js
        for (let i = 0; i < 10; i++) {
            setTimeout(function () {
                console.log(i)
            }, 1000)
        }
```



3、setTimeout接收参数，打印自己作用域的局部变量

```js
    for (var i = 0; i < 10; i++) {
        setTimeout(function(j){
            console.log(j)
        },1000, i)
    }
```

### 下面的代码打印什么内容，为什么？

例题1：IIFE的函数无法进行被赋值（内部机制，类似const定义的常量）

```js
        var b = 10;
        (function b() {
            b = 20;//在chrome控制台中查看，此处赋值没有生效
            console.log(b);
        })();


```

> ƒ b() {
>             b = 20;
>             console.log(b);
>         }

例题2：

```js
        var b = 10;
        var b = function () {
            b = 20;
            console.log(b);//20
        }
        b()
```

例题3：函数变量声明提升，此时的b是数值10

```js
        var b = 10;
        function b() {
            b = 20;
            console.log(b);
        }
        b()//b is not a function
```

例题4：

```js
        function b() {
            b = 20;
            console.log(b);//20
        }
        b()
```

### 简单改造下面的代码，使之分别打印 10 和 20。

```js
var b = 10;
(function b(){
    b = 20;
    console.log(b); 
})();
```

打印10：

```js
        var b = 10;
        (function b() {
            b = 20;
            console.log(window.b);//10
        })();
```

打印20：

```js
        var b = 10;
        (function m() {
            b = 20;
            console.log(b);//20
        })();
```

### 浏览器缓存读取规则？

>可以分成 Service Worker、Memory Cache、Disk Cache 和 Push Cache，那请求的时候 from memory cache 和 from disk cache 的依据是什么，哪些数据什么时候存放在 Memory Cache 和 Disk Cache中？


参考：https://www.jianshu.com/p/54cc04190252

### 使用迭代的方式实现 flat 函数



MDN flat函数：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat

### 在输入框中如何判断输入的是一个正确的网址？

从url对象出发



### 介绍下 BFC 及其应用

https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/59

### 实现模糊搜索结果的关键词高亮显示

我的大概思路是，用正则替换掉关键词。

```js
let panter = new RegExp(关键词, 'g')
该行字符串.replace(panter, '<b style="color: #2D7BFF">' + 关键词 + '</b>')
```

ps:如果是vue项目，直接与v-html结合使用更爽哦~



### 介绍下前端加密的常见场景和方法?

https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/150