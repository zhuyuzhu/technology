# Technology

[toc] 



第二版：

【HTML】【HTML5】

【CSS】【CSS3】【less】【sass】【bootstrap】

【canvas】【svg】

## 【JavaScript】【ES5】【ES6】

###  JavaScript 中的相等性判断

地址：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness

### 数字Number、Math对象、全局数字方法

js中的数字是双精度IEEE754 64位浮点型类型。

Number构造函数构造出来的数字对象，那么该对象instance Number是true 。否则为false。

Number方法，得到的结果要么是数字，是NaN

数字的toString方法：接收一个参数，指定输出多少进制的数字字符串。(123).toString(16)  结果：字符串7b

地址：https://blog.csdn.net/zyz00000000/article/details/108217648

### 字符串String

字符串的方法都不会改变原字符串，因为js中，字符串是原始值（基本类型），是无法改变的 。

字符串的方法：https://blog.csdn.net/zyz00000000/article/details/108101273

indexOf、lastIndexOf、endsWith、startsWith、includes，都接收两个参数，search和indexOf都是找到返回索引，没找到返回-1

一找search二拆split三替换**replace**四匹配**match**；

操作字符char，charAt和charCodeAt，大小写转换toUpperCase、toLowerCase，去除两侧空格trim

localeCompare与数组的sort方法结合，可以做首字母排序功能；

数组：sort——splice ——slice ——join

字符串：localeCompare——substring——slice——split





### 数组Array 

改变原数组的7个方法：push、pop、unshift、shift、sort、splice、reverse

问：push方法返回length值 ，

答：push多个值进去，返回length长度最合理。

pop方法移除项

unshift 和shift一样 。

reverse返回修改后的数组。

slice 方法和字符串的slice方法一样；splice方法是slice方法进阶版。

数组的indexOf和lastIndexOf 与字符串一样；数组也有includes方法，但兼容性不是特别好。



ES5的遍历方法，重点forEach：forEach、map函数返回值组成的数组、some结果true或false、every结果true或false、filter符合条件的return true的组成的数组

**forEach方法：**

（1）`forEach()` 方法按升序为数组中含有效值的每一项执行一次 `callback` 函数，那些已删除或者未初始化的项将被跳过（例如在**稀疏数组**上，new Array(7) 得到 [empty × 7]，Array.of(7)得到[7]）。



（2）关于this，查看下面this特点forEach



（3）关于修改原数组：

删除原数组某项时，以下示例：操作b这项时，处理函数中 index是1，item是b；移除了arr中b元素。导致arr为['a','c','d']，接下来index执行2。

所以打印结果：a b d

```js
        var obj = {
            name: 'obj'
        };
        var arr = ['a','b','c','d'];
        arr.forEach(function(item, index, arr){
            if(index == 1){//操作b这项数据时，index是1，item是b；移除了arr中的b元素
                arr.shift();
            }
            console.log(item);
        },obj)
```

移除项同时添加项：结果a b d e

```js
        var obj = {
            name: 'obj'
        };
        var arr = ['a','b','c','d'];
        arr.forEach(function(item, index, arr){
            if(index == 1){//操作b这项数据时，index是1，item是b；移除了arr中的b元素
                arr.shift();
                arr.push('e','f')
            }
            console.log(item);
        },obj)
```



**forEach修改元素组总结：**

`forEach()` 遍历的范围在第一次调用 `callback` 前就会确定。——会计算好有效遍历次数，只少不能多，比如上面的那两个实例。比如 ：[1,2,,3,4]遍历4次，最多遍历四次。

在确定遍历次数后，每次遍历根据index索引值进行——上述两个例子也能体现 。



**forEach不可中止或跳出遍历：**

 除了抛出异常以外，没有办法中止或跳出 `forEach()` 循环。如果你需要中止或跳出循环，`forEach()` 方法不是应当使用的工具。

数组方法具有中止遍历的有：some、every、finde、findIndex

for、for in、for of可以通过break  continue中止或跳出

forEach地址：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach



**forEach、map、filter、some、every：都是同样的参数，处理函数具有相同的处理效果，ES6又补充了find、findIndex方法**

（1）这些方法都不会改变原数组 

（2）空数组不会调用处理函数，且每个方法返回自己期望的类型值。比如some方法，如果用一个空数组进行测试，在任何情况下它返回的都是`false`。

forEach方法：没有返回值，或者说返回值是undefined，该方法的目的是处理数组中的每项，而不考虑返回值。

map方法：返回值是该数组中的每个元素是调用一次提供的函数后的返回值组成的数组 。map期望处理函数都有返回值，当你不打算使用返回的新数组却使用`map`是违背设计初衷的，请用forEach或for of代替。

filter方法：返回处理结果为 true 的项组成的数组，filter方法的目的是通过原数组过滤出一个期望的新数组 。

some方法：返回的是一个Boolean类型的值，some方法测试数组中是不是至少有1个元素符合处理函数期望 。

every方法：返回一个布尔值，测试一个数组内的所有元素是否都能通过某个指定函数的测试。注意：若收到一个空数组，此方法在一切情况下都会返回 `true`。

理解：some默认返回值为false，找到一个true ，结果就为true。every方法默认为true，遇到一个假，结果就false。

 **find()** 方法返回数组中满足提供的测试函数的第一个元素的值，否则返回undefined。

**findIndex()**方法返回数组中满足提供的测试函数的第一个元素的**索引**。若没有找到对应元素则返回-1。

**find和findIndex与ES5的5个方法在处理函数方面有点区别：**

index范围确定后，ES5的5个方法是根据index判断最新对应item是否合法，合法才会进行处理。而find和findIndex方法，是根据index值来判断是否合法，所以下面示例的结果是：10 20 30 40 undefined

```js
        var arr = [10,20,,30,40];
        arr.find((item, index, originArr) => {
            console.log(item)
            if(index==1){
                arr.shift();
            }
        })
```



join方法和字符串的split方法对应，join方法按什么拼接数组的每项，split方法按什么拆字符串的每项；

地址：https://blog.csdn.net/zyz00000000/article/details/106817618

**数组的reduce方法：**

**reducer** 函数接收4个参数:

1. Accumulator (acc) (累计器)
2. Current Value (cur) (当前值)
3. Current Index (idx) (当前索引)
4. Source Array (src) (源数组)

您的 **reducer** 函数的返回值分配给累计器，该返回值在数组的每个迭代中被记住，并最后成为最终的单个结果值。



reduce地址：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce

### 对象Object

**原型上的方法：**

Object.prototype.hasOwnProperty 配合for in使用

Object.prototype.toString 可以查看数据类型

Object构造函数上两个辅助方法：assign和is方法

assign：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign

is：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is

**Object构造函数上方法：**

**备注：**应当直接在 [`Object`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object) 构造器对象上调用此方法，而不是在任意一个 `Object` 类型的实例上调用。

> ES5的方法：Object.keys()、Object.

0、操作对象原型

create：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create

```js
o = Object.create(Object.prototype, {
  // foo会成为所创建对象的数据属性
  foo: {
    writable:true,
    configurable:true,
    value: "hello"
  },
  // bar会成为所创建对象的访问器属性
  bar: {
    configurable: false,
    get: function() { return 10 },
    set: function(value) {
      console.log("Setting `o.bar` to", value);
    }
  }
});
```

isPrototypeOf：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isPrototypeOf

getPrototypeOf：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf

setPrototypeOf：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf

1、循环遍历对象属性的方法

遍历方法的区别：https://blog.csdn.net/zyz00000000/article/details/109204555

包括：values和entries

2、数据属性和访问器属性

Object.defineProperty：https://blog.csdn.net/zyz00000000/article/details/106854845

getter和setter的探讨：



3、ES5的操作对象，冻结、密封

比如冻结对象：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze







### Date对象



### new关键词

- 创建一个对象；

- 让该对象的`__proto__`指向函数原型；

- 让该对象作为this的上下文，即执行构造函数，this就是该对象；new操作符的this指向实例对象（对后续call和apply 实现bind的理解有帮助）

- 如果没有显式的返回一个对象，隐式的返回this；

参考文章：https://blog.csdn.net/zyz00000000/article/details/106904163

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new

new执行函数时，this就是将要创建出来的实例对象。

```js
        function Fn (a, b) {
            console.log(this) //空对象{}
            this.a = a;
            this.b = b
            console.log(obj) //undefined
            console.log(this); // {a: 1, b: 2}
        }

       var obj = new Fn(1,2) // {a: 1, b: 2}
```



### 函数和原型

**函数类型判断**

```js
typeof function a(){}
"function"
```

```js
Object.prototype.toString.call(function a(){})
"[object Function]"
```

构造函数的prototype属性指向原型对象；原型对象的constructor属性指向构造函数；构造函数和原型是一一对应的，所以两者之间可以互相引用，而实例对象可以有多个，没有标准的引用，有非标准的__proto__属性指向原型。

函数的原型：**Function.prototype**也是一个函数，正如数组的原型是一个数组一样。

**函数内的几个关键字**

this、arguments、super、new.target

arguments 对象只能在函数内使用，new.target在new构造函数时才有用。在函数之外会报错。

### arguments

**类型判断**

```js
console.log(typeof arguments)//object
console.log(Object.prototype.toString.call(arguments))//[object Arguments]
```

原始值是把值赋给形参；引用值是把引用地址赋给形参，所以函数中通过地址修改引用值，引用值也会修改，如果是直接修改引用地址，引用值不会被修改。

**原始值使用：**隐式arguments[0] = m = 10;

```js
function a(m,n) {
    arguments[0] = 10; //隐式arguments[0] = m = 10;
    n = 20;             //隐式arguments[1] = n =20;
    console.log(m,arguments[1]);  //10 20
}
a(1,2);
```

**引用值使用**

```js
    var arr = [1,2,3];
    var arr1 = ['a','b','c']
    function a(m,n) {
        arguments[0] = [10]; //隐式arguments[0] = m = [10];
        n = ['d'];             //隐式arguments[1] = n =['d'];
        console.log(m,arguments[1]);  //[10] ["d"]
    }
    a(arr,arr1);
    console.log(arr,arr1); //[1, 2, 3]  ["a", "b", "c"]
```

**`arguments`** 是一个对应于传递给函数的参数的类数组对象。除了length属性和索引元素之外没有任何`Array`属性。可以被转换为数组：

```js
var args = Array.prototype.slice.call(arguments);
var args = [].slice.call(arguments);

// ES2015
const args = Array.from(arguments);
const args = [...arguments];
```

注意：使用slice方法会降低性能。可以通过遍历arguments对象来构造一个新的数组。或者使用被忽视的`Array`构造函数作为一个函数：

```js
var args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
```

**Array作为函数**：length值和索引值，决定了结果。

```js
        var likeArr = {
            3: 'a',
            4: 'b',
            5: 'c',
            length: 6
        }
        console.log(Array.apply(null, likeArr))
```

结果：[undefined, undefined, undefined, "a", "b", "c"]

**属性arguments.callee**

指向当前函数，尤其是在递归时，使用该属性比较好。

**属性Symbol(Symbol.iterator)**

**剩余参数、默认参数、解构赋值参数 与arguments的关系**

实参传入的值，也同样会传给arguments。且不区分严格模式 。如果参数中，含有剩余参数、默认参数、解构赋值参数，那么，arguments和形参将失去捆绑关系，相互直接不再跟踪。

arguments与剩余参数 

```js
    function foo(...args) {
        console.log(arguments) //{0:'a',1:'b',2:'c',length:3}
        console.log(args) //['a','b','c']
    }
    foo('a','b','c')
```

arguments与默认参数

```js
    function foo(x='A',y='B',z='C') {
        console.log(arguments) //{0:'a',1:'b',2:'c',length:3}
        console.log(x,y,z) //'a','b','c'
    }
    foo('a','b','c')
```

arguments与解构赋值参数。注意arguments是与实参对应关系

```js
    "use strict";
    function foo([x,y,z]) {
        console.log(arguments) //{0:["a", "b", "c"],length:1}
        console.log(x,y,z) //'a','b','c'
    }
    ffoo(['a','b','c'])
```

**严格模式下，**

**移除了arguments的callee和caller；**

详情：Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them

**也解绑了形参和arguments**

```js
        "use strict";
        function foo(x,y,z) {
            arguments[0] = "111"
            console.log(arguments[0]) //111
            console.log(x,y,z)//'a','b','c
        }
        foo('a','b','c')
```



**数组forEach内函数的this指向**

foreEach方法的第二个参数

ES5 ：如果第二个参数thisArg是对象，this指向该对象；如果是undefined或者null，this指向window。**——除非指定了this对象，不然函数的this指向window。（ES5中函数this的特性）**

严格模式下，如果指定了对象，那么this指向该对象，否则this为undefined。**除非指定了对象，不然this指向undefined——严格模式this的特性**

ES6箭头函数：**继承外层普通函数的this，——箭头函数特性**



### new.target

- new.target是构造函数通过new操作符被调用时，new.target指向该构造函数本身。非new操作符执行的函数或方法，new.target是undefined。——在构造方法调用中，`new.target`指向被`new`调用的构造函数。

- 箭头函数中，new.target 指向最近的外层函数的new.target。箭头函数中的arguments也是最近的外层函数的arguments

- 函数外调动new.target报错。

- 在类的构造方法中，`new.target`指向直接被`new`执行的构造函数

地址：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new.target



### 箭头函数



参考：https://blog.csdn.net/zyz00000000/article/details/106719182

### this指向
以下几个角度：

- new构造函数时，this指向
- 严格模式和非严格模式下，函数执行时的this指向（此处说函数，却没有用方法这个词）
- 箭头函数的this指向
- vue实例钩子函数不能用箭头函数的原因

非严格模式下，函数执行，默认指向window。注意实例中b函数执行的 this

```js
        function a(){
            console.log(this); //{name: "obj"}
            var b = function(){
                console.log(this); //window
            }
            b();
        }
        var obj = {
            name: 'obj'
        }
        a.call(obj);
```

严格模式下，函数执行，this默认为undefined

```js
        "use strict";
        function a(){
            console.log(this); //{name: "obj"}
            var b = function(){
                console.log(this); //undefined
            }
            b();
        }
        var obj = {
            name: 'obj'
        }
        a.call(obj);
```

### call、apply、bind

call的性质和数组的几个ES5遍历方法的处理函数的thisArg性质一样

```js
        //call的性质和数组的几个ES5遍历方法的处理函数的thisArg性质一样
        //非严格模式，call传undefined、null或者不传对象，this默认执行window。
        //传入原始值，成为包装类对象；
        //传入对象或者数组将指向对象或数组

        //严格模式下，不传值或传入undefined、null，this为undefined。
        //原始值，还是原始值
        //对象是对象，函数是函数，不会进行包装，是什么就是什么类型的值。
        function fn(){
            console.log(this);
        }
        var obj = {name: 'obj'}
        fn.call('str')
```

apply具有展开数组的功能，所以可以展开类数组或数组，进行其他操作。比如push接收多个 值，可以通过apply展开；Array构造函数可以接收多个值，通过apply展开。Math.max和Math.min接收多个值，通过apply展开。



apply实现bind：

```js
        function Fn (a, b) {
            console.log(this); //{name: "obj"}
            console.log(arguments)   //Arguments(5) [1, 2, 3, 4, 5, callee: ƒ, Symbol(Symbol.iterator): ƒ]
        }

       var obj = {name: 'obj'}
      
       //执行一次绑定对象和参数——得到一个函数(确定了this和部分参数)
       
       if(!Function.prototype.mybind){
           //bind的this是函数
           //bind返回的结果还是一个函数
           Function.prototype.mybind = function(){
            var thisFn = this;
            var thisArg = arguments[0] //绑定的对象，对象没有特殊处理，因为call、apply会有默认的处理方式
            if(typeof thisFn !=="function"){
                Error('Type Error')
            }
            var argArr = Array.prototype.slice.call(arguments, 1)
            return function(){//bind接收的对象，作为apply的对象；bind接收的参数，拼接给apply的参数
                var arr = argArr.concat(Array.prototype.slice.apply(arguments)); //使用mybind的参数
                thisFn.apply(thisArg, arr) //使用mybind的函数
            }
           }
       }
       var fn = Fn.mybind(obj,1,2)
       fn(3,4,5)
```

如果要兼容new关键字

搞清楚，bind得到到函数，执行new的时候，结果是什么？什么原理？

##### bind

**bind()** 方法创建一个新的函数，在 `bind()` 被调用时，这个新函数的 `this` 被指定为 `bind()` 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

> thisArg
> 调用绑定函数时作为 `this` 参数传递给目标函数的值。
>
>  如果使用new运算符构造绑定函数，则忽略该值。
>
> 当使用 `bind` 在 `setTimeout` 中创建一个函数（作为回调提供）时，作为 `thisArg` 传递的任何原始值都将转换为 `object`。
>
> 如果 `bind` 函数的参数列表为空，或者`thisArg`是`null`或`undefined`，执行作用域的 `this` 将被视为新函数的 `thisArg`。
>
> arg1, arg2, ...
> 当目标函数被调用时，被预置入绑定函数的参数列表中的参数。



返回值：返回一个原函数的拷贝，并拥有指定的 **`this`** 值和初始参数。

MDN地址：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind

查看文章：https://blog.csdn.net/zyz00000000/article/details/109675986



剩余参数、默认参数、解构赋值参数



### 严格模式和非严格模式

1、arguments

2、call 、apply

3、数组ES5几个遍历方法，接收的第二个参数thisArg



闭包

事件队列和事件循环

with和eval

运算符

地址：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new

操作符

instanceof、typeof、

正则表达式

JOSN字符串

setTimeout、clearTimeout、setInterval、clearInterval

https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout



【jquery 】

【Vue】

【node】【npm】

npx、nrm

【nginx】

【redis】【mysql】【MongoDB】

【websocket】【cometd】

【gulp】【webpack】

【Linux】【shell】

【网络】【IP、TCP、HTTP、HTTPS】

状态码：200、301、302、304、404、500



【chrome浏览器】

缓存机制：https://segmentfault.com/a/1190000039870274?utm_source=tag-newest

【性能问题】

字符串的concat性能也不好，尽量使用+拼接符；

尽量不使用数组的slice方法，使用相关的替代方法；



【编码格式】

https://blog.csdn.net/zyz00000000/article/details/108234447



必会知识：

https://zhuanlan.zhihu.com/p/362868129

