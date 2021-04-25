# Technology

[toc] 



第二版：

【HTML】【HTML5】

【CSS】【CSS3】【less】【sass】【bootstrap】

【canvas】【svg】

## 【JavaScript】【ES5】【ES6】

### 数字Number、Math对象、全局数字方法

js中的数字是双精度IEEE754 64位浮点型类型。

Number构造函数构造出来的数字对象，那么该对象instance Number是true 。否则为false。

Number方法，得到的结果要么是数字，是NaN

数字的toString方法：接收一个参数，指定输出多少进制的数字字符串。(123).toString(16)  结果：字符串7b

地址：https://blog.csdn.net/zyz00000000/article/details/108217648

### 字符串String

字符串的方法都不会改变原字符串，因为js中，字符串是原始值（基本类型），是无法改变的 。

字符串的方法：https://blog.csdn.net/zyz00000000/article/details/108101273

indexOf、lastIndexOf、endsWith、startsWith、includes，都接收两个参数

一找search二拆split三替换**replace**四匹配**match**；

localeCompare与数组的sort方法结合，可以做首字母排序功能；

数组的splice，连拆带替换，而字符串和数组的slice只有截取的功能，substring截取功能；

大小写转换toUpperCase、toLowerCase，去除两侧空格trim

操作字符char，charAt和charCodeAt

search和indexOf都是找到返回索引，没找到返回-1



### 数组Array 

改变原数组的7个方法：push、pop、unshift、shift、sort、splice、reverse

问：push方法返回length值 ，

答：push多个值进去，返回length长度最合理。

pop方法移除项

unshift 和shift一样 。

reverse返回修改后的数组。

slice 方法和字符串的slice方法一样；splice方法是slice方法进阶版。

数组的indexOf和lastIndexOf 与字符串一样；



ES5的遍历方法，重点forEach：forEach、map函数返回值组成的数组、some结果true或false、every结果true或false、filter符合条件的return true的组成的数组

join方法和字符串的split方法对应，join方法按什么拼接数组的每项，split方法按什么拆字符串的每项；

地址：https://blog.csdn.net/zyz00000000/article/details/106817618

数组的reduce方法

reduce地址：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce

### 对象Object



地址：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign



### new关键词

- 创建一个对象；

- 让该对象的`__proto__`指向函数原型；

- 让该对象作为this的上下文，即执行构造函数，this就是该对象；new操作符的this指向实例对象（对后续call和apply 实现bind的理解有帮助）

- 如果没有显式的返回一个对象，隐式的返回this；

参考文章：https://blog.csdn.net/zyz00000000/article/details/106904163

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new

new执行函数时，this就是将要创建出来的实例对象。



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

**修改this指向的call、apply、bind**

剩余参数、默认参数、解构赋值参数



严格模式和非严格模式

闭包

事件队列和事件循环

with和eval

运算符

地址：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new

操作符

instanceof、typeof、

正则表达式

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

