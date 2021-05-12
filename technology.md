# Technology

[toc] 



第二版：

【HTML】【HTML5】

【CSS】【CSS3】【less】【sass】【bootstrap】

【canvas】【svg】

## 【JavaScript】【ES5】【ES6】

###  JavaScript 中的相等性判断

地址：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness

比较判断相等，也是有对应的规则规范的，比如IEEE754，

==：进行类型隐式转换，NaN == NaN  false

===：不进行类型转换，-0  === +0  true    NaN === NaN false

Object.is的行为方式与三等号相同，但是对于NaN和-0和+0进行特殊处理，所以最后两个不相同，而Object.is（NaN，NaN）将为 `true`。

```js
        console.log(Object.is(+0, 0))//true
        console.log(Object.is(-0, 0))//false
        console.log(Object.is(+0,  -0))//false
```



Object.js的相关使用点：Object.defineProperty， 向 Nmuber 构造函数添加一个不可变的属性 NEGATIVE_ZERO

```js

Object.defineProperty(Number, "NEGATIVE_ZERO",
                      { value: -0, writable: false, configurable: false, enumerable: false });

function attemptMutation(v)
{
  Object.defineProperty(Number, "NEGATIVE_ZERO", { value: v });
}
```

`Object.defineProperty` 在试图修改不可变属性时，如果这个属性确实被修改了则会抛出异常，反之什么都不会发生。例如如果 v 是 -0 ，那么没有发生任何变化，所以也不会抛出任何异常。但如果 v 是 +0 ，则会抛出异常。不可变属性和新设定的值使用 same-value 相等比较。**——同值相等由 [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) 方法提供。**



关于性能、全等和全等：有些开发者认为，最好永远都不要使用相等操作符。全等操作符的结果更容易预测，并且因为没有隐式转换，全等比较的操作会更快。（等式 `(x !== x)` 成立的唯一情况是 x 的值为 NaN）

==会默认调用对象的toString方法：

```js
        var a = {
            value: 1,
            toString: function(){
                return this.value++
            }
        } ;
        if (a == 1 && a == 2 && a == 3) {
            console.log(1);
        }
```



### 数字Number、Math对象、全局数字方法

js中的数字是双精度IEEE754 64位浮点型类型。

Number构造函数构造出来的数字对象，那么该对象instance Number是true 。否则为false。

Number方法，得到的结果要么是数字，是NaN

数字的toString方法：接收一个参数，指定输出多少进制的数字字符串。(123).toString(16)  结果：字符串7b

地址：https://blog.csdn.net/zyz00000000/article/details/108217648

**`BigInt`** 是一种内置对象，它提供了一种方法来表示大于 `253 - 1` 的整数。这原本是 Javascript中可以用 [`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number) 表示的最大数字。**`BigInt`** 可以表示任意大的整数。

不能让 BigInt 和 [`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number) 直接进行运算，你也不能用 [`Math`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math) 对象去操作 BigInt 数字。

>  typeof 9007199254740991n
> "bigint"
> typeof 9n
> "bigint"

### js进制

**十进制Decimal number**

十进制可以以0开头，后面接其他十进制数字，但是假如0后面的十进制数字都 小于8，那么该数字将会被当做八进制处理。

```js
1234567890
42
// 以零开头的数字的注意事项：
0888 // 888 将被当做十进制处理
0777 // 在非严格格式下会被当做八进制处理 (用十进制表示就是511)
```

**二进制Binary number**

二进制数字语法是以零为开头，后面接一个小写或大写的拉丁文字母B(`0b或者是0B`)。 假如0b后面的数字不是0或者1，那么就会提示这样的语法错误（ `SyntaxError）：` "Missing binary digits after 0b(0b之后缺失二有效的二进制数据)"。

```js
var FLT_SIGNBIT  = 0b10000000000000000000000000000000; // 2147483648
var FLT_EXPONENT = 0b01111111100000000000000000000000; // 2139095040
var FLT_MANTISSA = 0B00000000011111111111111111111111; // 8388607
```

**八进制Octal number**

八进制数字语法是以0为开头的。假如0后面的数字不在0到7的范围内，该数字将会被转换成十进制数字。

```js
var n = 0755; // 493
var m = 0644; // 420
```

在ECMAScript 5 严格模式下禁止使用八进制语法。八进制语法并不是ECMAScript 5规范的一部分，但是通过在八进制数字添加一个前缀0就可以被所有的浏览器支持：0644 === 420 而且 "\045" === "%"。在ECMAScript 6中使用八进制数字是需要给一个数字添加前缀"0o"。

```js
var a = 0o10; // ES6 :八进制
```



**十六进制：hexadecimal number**

十六进制数字语法是以零为开头，后面接一个小写或大写的拉丁文字母X(`0x或者是0X`)。假如`0x`后面的数字超出规定范围(0123456789ABCDEF)，那么就会提示这样的语法错误(`SyntaxError)：`"Identifier starts immediately after numeric literal".

```js
0xFFFFFFFFFFFFFFFFF // 295147905179352830000
0x123456789ABCDEF   // 81985529216486900
0XA                 // 10
```

**指数形式：exponentiation**

```js
1E3   // 1000
2e6   // 2000000
0.1e2 // 10
```

**数字和日期**：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Numbers_and_dates

### 字符串String

字符串的方法都不会改变原字符串，因为js中，字符串是原始值（基本类型），是无法改变的 。

字符串的方法：https://blog.csdn.net/zyz00000000/article/details/108101273

indexOf、lastIndexOf、endsWith、startsWith、includes，都接收两个参数，search和indexOf都是找到返回索引，没找到返回-1

一找search二拆split三替换**replace**四匹配**match**；

https://blog.csdn.net/zyz00000000/article/details/107957777

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

示例：有这么一个判断，可能会有更多值，

```js
if (code === 10 || code === 15 || code === 25){
....
}
```

可以通过数组实现 ：

```js
if ([10, 25, 35, 50].includes(code))
if ([10, 25, 35, 50].some(val => val === code))
if ([10, 25, 35, 50].indexOf(code) !== -1)
```



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

CSDN：https://blog.csdn.net/zyz00000000/article/details/116167362

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

1、操作对象原型

creat：创建一个指定了原型的对象

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

**isPrototypeOf**：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isPrototypeOf

isPrototypeOf() 方法用于测试一个对象是否存在于另一个对象的原型链上。



**instanceof**：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof

`instanceof` 运算符用来检测 `constructor.prototype `是否存在于参数 `object` 的原型链上。

isPrototypeOf和instanceof的区别：

A.isPrototypeOf(B)，A是不是在对象B的原型链上。

A instanceof F，对象A的原型链上是否有函数F的原型

> `isPrototypeOf()` 与 [`instanceof`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof) 运算符不同。在表达式 "`object instanceof AFunction`"中，`object` 的原型链是针对 `AFunction.prototype` 进行检查的，而不是针对 `AFunction` 本身。

原型链上指的是，对象原型链，不包括该对象。如下 ：

```js
        console.log(F.prototype instanceof F) //false
        console.log(F.prototype.isPrototypeOf(F.prototype)); //false
```



getPrototypeOf：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf

**构造函数Object上的方法，根据该方法的语义，也应该是Object上的方法，获取指定对象的原型——Object.getPrototypOf**



`**Object.getPrototypeOf()**` 方法返回指定对象的原型（内部`[[Prototype]]`属性的值），给定对象的原型**。——就是`__proto__`属性。**

如果没有继承属性，则返回 [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null) 。比如构造函数构造出来的对象的`__proto__`指向的原型；比如原型链上，指向的原型。

但是注意：**Object.getPrototypeOf(Object) 不是 Object.prototype**

因为Object是构造函数，它的prototype属性指向对象，即构造函数的原型对象。`Object.__proto__`才是getPrototypeOf方法查找的值，如下：

```js
        console.log(Object.__proto__ === Object.getPrototypeOf(Object)) //true
        console.log(Object.getPrototypeOf(Object)); //ƒ () { [native code] }
```

```js
JavaScript中的 Object 是构造函数（创建对象的包装器）。
一般用法是：
var obj = new Object();

所以：
Object.getPrototypeOf( Object );               // ƒ () { [native code] }
Object.getPrototypeOf( Function );             // ƒ () { [native code] }

Object.getPrototypeOf( Object ) === Function.prototype;        // true

Object.getPrototypeOf( Object )是把Object这一构造函数看作对象，
返回的当然是函数对象的原型，也就是 Function.prototype。

正确的方法是，Object.prototype是构造出来的对象的原型。
var obj = new Object();
Object.prototype === Object.getPrototypeOf( obj );              // true

Object.prototype === Object.getPrototypeOf( {} );               // true
```



setPrototypeOf：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf

**Object.setPrototypeOf()** 方法设置一个指定的对象的原型 ( 即, 内部[[Prototype]]属性）到另一个对象或  [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null)。

**警告:** 由于现代 JavaScript 引擎优化属性访问所带来的特性的关系，更改对象的 `[[Prototype]]`在***各个***浏览器和 JavaScript 引擎上都是一个很慢的操作。其在更改继承的性能上的影响是微妙而又广泛的，这不仅仅限于 `obj.__proto__ = ...` 语句上的时间花费，而且可能会延伸到***任何***代码，那些可以访问***任何***`[[Prototype]]`已被更改的对象的代码。如果你关心性能，你应该避免设置一个对象的 `[[Prototype]]`。相反，你应该使用 [`Object.create()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)来创建带有你想要的`[[Prototype]]`的新对象。



**2、循环遍历对象属性的方法**

遍历方法的区别：https://blog.csdn.net/zyz00000000/article/details/109204555

包括：values和entries

**3、数据属性和访问器属性**

Object.defineProperty：https://blog.csdn.net/zyz00000000/article/details/106854845

getter和setter的探讨：



4、ES5的操作对象，冻结、密封

Object.freeze()冰冻一个对象，不能增删改。此外，冻结一个对象后该对象的原型也不能被修改。`freeze()` 返回和传入的参数相同的对象。

但是对象的属性值是一个引用值，可以修改引用值的内容，除非该属性指向的引用值也是要一个冻结对象，才不可以修改。

比如冻结对象：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze







### Date对象



### new关键词

- 创建一个对象；

- 让该对象的`__proto__`指向函数原型；

- 让该对象作为this的上下文，即执行构造函数，this就是该对象；

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

```js
Function.prototype.isPrototypeOf(fn) //如果fn是函数，结果true
```



构造函数的prototype属性指向原型对象；原型对象的constructor属性指向构造函数；构造函数和原型是一一对应的，所以两者之间可以互相引用，而实例对象可以有多个，没有标准的引用，有非标准的__proto__属性指向原型。

函数的原型：**Function.prototype**也是一个函数，正如数组的原型是一个数组一样。**——对象的两种衍生方式**

那么如何区分函数和函数原型呢？函数原型没有prototype属性

> Function.prototype.prototype === undefined

函数原型上有隐式属性constructor，指向该函数。



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

**因为：apply可以接收类数组 兼容IE9**

结果：[undefined, undefined, undefined, "a", "b", "c"]

**属性arguments.callee**

指向当前函数，尤其是在递归时，使用该属性比较好。

**属性Symbol(Symbol.iterator)**



**剩余参数、默认参数、解构赋值参数 与arguments的关系——ES6中特殊参数导致arguments与形参解绑 **

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

**箭头函数中的arguments呢？——继承父函数的 **

```js
         function a(){
            var arr = ['a','b','c']
            arr.forEach((itme, index) => {
                console.log(arguments)//Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
            })
         }
         a(1,2,3)
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

**特点：this、arguments、new.target都是继承父函数的。**

参考：https://blog.csdn.net/zyz00000000/article/details/106719182



### this指向

**特点：**

- 非严格模式下，函数执行this默认都是指向window；严格模式下，函数执行，this默认为undefined
- 非严格模式下，call、apply、bind以及数组forEach、map、filter等遍历方法的thisArg，传undefined、null或者不传对象，this默认执行window，传入原始值，会被包装为包装类对象；严格模式下，不传值或传入undefined、null，this为undefined，传入原始值还是原始值，传入对象、数组 、函数还是他们本身。
- 箭头函数的this是外层第一个普通函数的this



**以下几个角度：**

- new构造函数时，this指向
- 严格模式和非严格模式下，函数执行时的this指向（此处说函数，却没有用方法这个词）
- 箭头函数的this指向
- vue实例钩子函数不能用箭头函数的原因
- ES5数组方法forEach、map、filter、some、every等thisArg
- ES5的访问器属性get和set方法中的this指向

MDN的this：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this



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



**call、apply实现bind：**

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

没有兼容new时，执行自实现的mybind

```js
        function Fn (a,b){
            this.a =  a;
            this.b = b;
            console.log(this)  //new时的打印：{ name: "obj" }
        }
        if(!Function.prototype.mybind){
            Function.prototype.mybind = function(){
               var bindFn = this; //获取函数，this指代函数
               var bindThisArgs = arguments[0]; //绑定的对象
                var bindArgs = Array.prototype.slice.call(arguments, 1); //获取bind的参数
                if(typeof bindFn !=="function"){
                    return new TypeError('Type Error')
                }
                return function(){//此处this来区分new或者不new
                    
                    //数组slice不传参，默认截取全部
                    var argArr = bindArgs.concat(Array.prototype.slice.call(arguments));
                    bindFn.apply(bindThisArgs, argArr)
                }
                
            }
        }
        var obj = { name: "obj" }

        var fn = Fn.mybind(obj, 1,2);

        console.log(new fn()) //空对象：{}
```

new时，实际上是对return function进行创建对象，而没有对Fn进行new。所以创建了空对象，且Fn中的this还是obj。



**如果要兼容new关键字，如何区分是new出来的对象呢？**

如果是new，那么bound中的this一定是通过bound函数构造出来的，这样就把this传递给原函数Fn。

如果不是new，那么this就是fn函数的自执行（不考虑bind后的函数再被别的对象调用），非严格模式下，是window。严格模式下是undefined。

```js
        function Fn (a,b){
            this.a =  a;
            this.b = b;
        }
        if(!Function.prototype.mybind){
            Function.prototype.mybind = function(){
               var bindFn = this; //获取函数，this指代函数
               var bindThisArgs = arguments[0]; //绑定的对象
                var bindArgs = Array.prototype.slice.call(arguments, 1); //获取bind的参数
                if(typeof bindFn !=="function"){
                    return new TypeError('Type Error')
                }
                var bound = function(){
                    console.log(this); //区分new或者不new
                    //数组slice不传参，默认截取全部
                    var argArr = bindArgs.concat(Array.prototype.slice.call(arguments));
                    return bindFn.apply(bound.prototype.isPrototypeOf(this) ? this: bindThisArgs, argArr)
                }
                return bound;
                
            }
        }
        var obj = { name: "obj" }

        var fn = Fn.mybind(obj, 1,2);
        fn();
        console.log(new fn()) //空对象：{}
```



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

**bind比较重要的一个作用：**

在默认情况下，使用 [`window.setTimeout()`](https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout) 时，`this` 关键字会指向 [`window`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window) （或 `global`）对象。当类的方法中需要 `this` 指向类的实例时，你可能需要显式地把 `this` 绑定到回调函数，就不会丢失该实例的引用。比如 ：

```js
        var obj1 = {
            name: 'obj1'
        }
        function a(){
            function b() {
                setTimeout((function(){
                    console.log(this);
                }).bind(obj1), 1000);
            }
            b();
        }
        a();
```



改变apply或call的this指向，得到一个bind后的函数：

bind绑定得到的函数，不影响bind原函数，比如函数fn，经过bind得到 函数a、b、c，不影响函数fn本身 。所以下面对apply绑定得到的函数slice，不影响原函数apply。

apply函数中的this是函数，因为apply被函数调用，所以this是指代调用的函数；apply接收两个参数，apply被bind作用时，只改变this，不影响两个参数

```js
        var unboundSlice = Array.prototype.slice;
        var slice = Function.prototype.apply.bind(unboundSlice);
        function a(){
            console.log(slice(arguments))
        }
        a(1,2,3,4)
        //接收两个参数
        Function.prototype.myapply = function(thisArg, arr){
            console.log(this)//this是函数，apply是让函数调用的
        }
        //也就是哪个函数调用apply，将apply接收的参数传递给它
        

        var obj = {name: 'obj'}
        var a = function(){
            console.log(this.name)//obj
        }
        a.apply(obj)
```



查看文章：https://blog.csdn.net/zyz00000000/article/details/109675986



###  剩余参数、默认参数、解构赋值参数



**访问器属性get和set方法的this指向：**

谁调用了get或set方法，this就指向谁



### 严格模式和非严格模式

严格模式可以应用到整个脚本或个别函数中。

1、arguments

2、call 、apply中的this

3、数组ES5几个遍历方法，接收的第二个参数thisArg

严格模式：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode

**特点：**

严格模式对于静默错误会抛出异常；

修复js引擎的执行优化缺陷，有时相同的代码，严格模式运行速度更快；

严格模式禁用了ES未来版本可能用到的语法；

**详细的说：**简化了 `eval` 以及 `arguments`；不能将意外创建全局变量；严格模式要求函数的参数名唯一；严格模式禁止八进制数字语法；禁用with；严格模式下的函数有改动：arguments、this；

**浏览器对严格模式的支持：**主流浏览器现在实现了严格模式。但是不要盲目的依赖它，因为市场上仍然有大量的浏览器版本只部分支持严格模式或者根本就不支持（比如IE10之前的版本）。



**关于八进制：**

 ECMAScript并不包含八进制语法, 但所有的浏览器都支持这种以零(`0`)开头的八进制语法: `0644 === 420` 还有 `"\045" === "%"`.在ECMAScript 6中支持为一个数字加"`0`o"的前缀来表示八进制数.

```
var a = 0o10; // ES6: 八进制
```

有些新手开发者认为数字的前导零没有语法意义, 所以他们会用作对齐措施 — 但其实这会改变数字的意义! 八进制语法很少有用并且可能会错误使用, 所以严格模式下八进制语法会引起语法错误:

```js
"use strict";
var sum = 015 + // !!! 语法错误
          197 +
          142;
```



### 闭包

一个函数和对其周围状态（**lexical environment，词法环境**）的引用捆绑在一起（或者说函数被引用包围），这样的组合就是**闭包**（**closure**）。也就是说，闭包让你可以在一个内层函数中访问到其外层函数的作用域。在 JavaScript 中，每当创建一个函数，闭包就会在函数创建的同时被创建出来。——MDN

*闭包*是由函数以及声明该函数的词法环境组合而成的。该环境包含了这个闭包创建时作用域内的任何局部变量。

性能：如果不是某些特定任务需要使用闭包，在其它函数中创建函数是不明智的，因为闭包在处理速度和内存消耗方面对脚本性能具有负面影响

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures

https://blog.csdn.net/zyz00000000/article/details/106643925

https://blog.csdn.net/zyz00000000/article/details/111698319



事件队列和事件循环



### with和eval

https://blog.csdn.net/zyz00000000/article/details/106626766



操作符

instanceof、typeof、

### 运算符



| 运算类型                                       | 运算符                                                       |
| ---------------------------------------------- | ------------------------------------------------------------ |
| 圆括号                                         | ()                                                           |
| 属性访问、计算属性访问、函数调用、new操作符    | `… . …`、`… [ … ]`、`… ( … )`、`new … ( … )`                 |
| 后置递增、后置递减                             | `… ++`、`… --`                                               |
| 逻辑非、一元加减、前置递增递减、typeof、wait   | `! …`、`+ …`、**`- …`**、`++ …`、**`-- …`**、`typeof …`、`await …` |
| 幂运算\|乘除取余\|加减                         | **`… \** …`**   |         **`… \* …`**、**`… / …`**、**`… % …`**     |               **`… + …`**、**`… - …`** |
| 大于、小于、大于等于、小于等于、in、instanceof | **`… > …`**、**`… < …`**、**`… >= …`**、**`… <= …`**、**`… in …`**、**`… instanceof …`** |
| 等于、不等于、全等于、非全等于                 | **`… == …`**、**`… != …`**、**`… === …`**、**`… !== …`**     |
| 逻辑与\|逻辑或\|三目运算符                     | &&    \|\|   **`… ? … : …`**                                 |
| 赋值                                           | =、+=、-=、*=、/=、%=                                        |
| 展开运算符                                     | ...                                                          |
| 逗号运算符                                     | ,                                                            |



**三目运算符（条件运算符）**

执行顺序，执行条件的判断，根据true或false，执行对应的表达式

查看文章：https://blog.csdn.net/zyz00000000/article/details/106278824

运算符优先级 ：https://blog.csdn.net/zyz00000000/article/details/108345985



### 正则表达式

基础知识：https://blog.csdn.net/zyz00000000/article/details/106768089

相关方法 ：https://blog.csdn.net/zyz00000000/article/details/107957777

实例题目：https://blog.csdn.net/zyz00000000/article/details/89002939

面试题目：https://blog.csdn.net/zyz00000000/article/details/108062090



### JSON字符串

 *JavaScript Object Notation* (**JSON**) 是一种**数据交换格式**。尽管不是严格意义上的子集，JSON 非常接近 [JavaScript](https://developer.mozilla.org/zh-CN/docs/Glossary/JavaScript) 语法的子集。

许多编程语言都支持 JSON，尤其是 JavaScript，它在网站和浏览器扩展应用广泛。

JSON 可以表示数字、布尔值、字符串、`null`、数组（有序序列），以及由这些值组成的对象（字符串与值的映射）。JSON 不支持复杂的数据类型（函数、正则表达式、日期等）。日期对象默认会转化为 ISO 格式的字符串，因此信息不会完全丢失。

如果你需要使用 JSON 来表示复杂的数据类型，请在它们转化为字符串值。



`JSON.stringify()`将值转换为相应的JSON格式：

- 1、转换值如果有 toJSON() 方法，该方法定义什么值将被序列化。

  

- 非数组对象的属性不能保证以特定的顺序出现在序列化后的字符串中。

- 布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值。

- `undefined`、任意的函数以及 symbol 值，在序列化过程中会被忽略（出现在非数组对象的属性值中时）或者被转换成 `null`（出现在数组中时）。函数、undefined 被单独转换时，会返回 undefined，如`JSON.stringify(function(){})` or `JSON.stringify(undefined)`.

- 对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误。

- 所有以 symbol 为属性键的属性都会被完全忽略掉，即便 `replacer` 参数中强制指定包含了它们。

- Date 日期调用了 toJSON() 将其转换为了 string 字符串（同Date.toISOString()），因此会被当做字符串处理。

- NaN 和 Infinity 格式的数值及 null 都会被当做 null。

- 其他类型的对象，包括 Map/Set/WeakMap/WeakSet，仅会序列化可枚举的属性。



主要先讨论对象和数组的JSON字符串序列化：

对象和数组共有特点：

- 无视隐式属性，比如对象中的`__proto__`属性和数组中的length属性 
- 布尔值、数字、字符串的包装类对象在序列化过程中，都会自动转换成原始值
- NaN、Infinity数值和null，都会当做null处理
- 数字、布尔值、null值，两侧不会被加双引号

对象中：

- 如果有toJSON方法，该方法定义什么值将被序列化

  ```js
  var obj = {
      _a: 1,
      toJSON: function(){
          return 1;
      }
  }
  console.log(JSON.stringify(obj)) //1
  ```

- 对象的属性不能保证序列化后的顺序

- undefined、函数function、Symbol值，都会被忽略

  ```js
          var obj = {
              a: function(){
                  console.log('1')
              },
              b: undefined,
              c: Symbol('m'),
              d: NaN,
              e: Infinity,
              f: null,
              g: ''
          }
          console.log(JSON.stringify(obj)) //{"d":null,"e":null,"f":null,"g":""}
  ```

- 对象之间相互引用（循环引用）会抛出错误
- 所有以 symbol 为属性键的属性都会被完全忽略掉
- Date 日期调用了 toJSON() 将其转换为了 string 字符串（同Date.toISOString()），因此会被当做字符串处理。

数组中：

- 数组中一切不可识别的数据类型，都会被处理为null——若忽略，数组长度发生变化，所以处理为null

  ```js
          let bool = [NaN, Symbol(), function () {}, undefined, Infinity]
          console.log(JSON.stringify(bool))//[null,null,null,null,null]
  ```



MDN：https://developer.mozilla.org/zh-CN/docs/Glossary/JSON

JSON对象：https://blog.csdn.net/zyz00000000/article/details/108221971

https://blog.csdn.net/zyz00000000/article/details/112219027



### setTimeout、clearTimeout、setInterval、clearInterval



MDN：https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout

### requestAnimationFrame

**`window.requestAnimationFrame()`** 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行。

> **注意：若你想在浏览器下次重绘之前继续更新下一帧动画，那么回调函数自身必须再次调用`window.requestAnimationFrame()`**

语法：

```js
window.requestAnimationFrame(callback);
```

参数：callback

下一次重绘之前更新动画帧所调用的函数(即上面所说的回调函数)。



返回值：一个 `long` 整数，请求 ID ，是回调列表中唯一的标识。是个非零值，没别的意义。你可以传这个值给 [`window.cancelAnimationFrame()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/cancelAnimationFrame) 以取消回调函数。

优点：`requestAnimationFrame`***最大的优势是由浏览器来决定回调函数的执行时机，即紧跟浏览器的刷新步调。\***

CPU节能：使用setTimeout实现的动画，当页面被隐藏（隐藏的<iframe>）或最小化（后台标签页）时，setTimeout仍然在后台执行动画任务，由于此时页面处于不可见或不可用状态，刷新动画是没有意义的，而且还浪费 CPU 资源和电池寿命。而requestAnimationFrame则完全不同，当页面处于未激活的状态下，该页面的屏幕绘制任务也会被浏览器暂停，因此跟着浏览器步伐走的requestAnimationFrame也会停止渲染，当页面被激活时，动画就从上次停留的地方继续执行，有效节省了 CPU 开销，提升性能和电池寿命。

60Hz 75Hz



setTImeOut实现requestAnimationFrame

https://github.com/darius/requestAnimationFrame/blob/master/requestAnimationFrame.js



MDN：https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame

https://www.cnblogs.com/onepixel/p/7078617.html

自己的文章：https://blog.csdn.net/zyz00000000/article/details/82759641



关于动画的总结：https://blog.51cto.com/u_15091652/2603280



位操作符：

https://developer.mozilla.org/zh-CN/docs/conflicting/Web/JavaScript/Reference/Operators_7c8eb9475d97a4a734c5991857698560#left_shift



【jquery 】

【Vue】

vue的diff算法：https://github.com/aooy/blog/issues/2



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

### 【性能问题】

1、字符串的concat性能也不好，尽量使用+拼接符；

2、尽量不使用数组的slice方法，使用相关的替代方法；

3、== 和 ===

4、vue和react中key的作用：https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/1

5、防抖和节流：https://segmentfault.com/a/1190000018428170

6、Object.setPrototypeOf()

7、闭包影响性能，造成内存泄漏

#### 实现继承的方式有哪些？

Object.create方法

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create#%E7%94%A8_object.create%E5%AE%9E%E7%8E%B0%E7%B1%BB%E5%BC%8F%E7%BB%A7%E6%89%BF

#### 手写深拷贝



【编码格式】

https://blog.csdn.net/zyz00000000/article/details/108234447



必会知识：

https://zhuanlan.zhihu.com/p/362868129

https://juejin.cn/post/6844903885488783374



## ES6

### let和const

let声明变量、const声明常量，都会形成块级作用域，

下面实例：Object.freeze和const都是无法修改引用值的地址，但可以该地址内容值

```js
        let arr = [1,2,3]
        const obj = {
            a: arr,
            b: 'str'
        }
        obj.a[0] = 'a';
        console.log(obj); //打印的是地址最终的值：{a: ["b", 2, 3], b: "str"}，console的特点
        Object.freeze(obj); //和const无区别
        obj.a[0] = 'b';
```

除非把对象内的所有的引用值都冰冻住，这样才实现正真的常量无法被修改值的效果：——项目中可以通过递归写一个绝对常量的函数

```js
        let arr = [1,2,3]
        const obj = {
            a: arr,
            b: 'str'
        }
        Object.freeze(obj.a);
        obj.a[0] = 'b';
        console.log(obj) //{a:[1, 2, 3], b: "str"}
```

### Symbol

Symbol()函数每次执行创建一个唯一的Symbol值，接收的参数作为描述

```js
Symbol("foo") === Symbol("foo"); // false
```

Symbol 作为属性名，遍历对象的时候，该属性不会出现在`for...in`、`for...of`循环中，也不会被`Object.keys()`、`Object.getOwnPropertyNames()`、`JSON.stringify()`返回。有一个`Object.getOwnPropertySymbols()`方法，可以获取指定对象的所有 Symbol 属性名

Symbol函数上有两个静态方法 ：Symbol.for() 和 Symbol.keyFor()

`Symbol.for()`不会每次调用就返回一个新的 Symbol 类型的值，而是会先检查给定的`key`是否已经存在，如果有，就返回这个 Symbol 值，否则就新建一个以该字符串为名称的 Symbol 值，并**将其注册到全局**。

所以Symbol.for根据描述符来区别 是否是相同的Symbol值，

```js
        let sym1 = Symbol.for('foo');
        let sym2 = Symbol.for('foo');
        sym1 === sym2 // true
```

`**Symbol.keyFor(sym)**` 方法用来获取 **symbol 注册表中**某个 **symbol 关联的键**

```js
        let sym1 = Symbol.for('foo');
        let sym2 = Symbol.for('bar');
        console.log(Symbol.keyFor(sym1),Symbol.keyFor(sym2)); foo bar
```



CSDN:https://blog.csdn.net/zyz00000000/article/details/106922044



### Set和Map

CSDN：https://blog.csdn.net/zyz00000000/article/details/107209326

Set 对象允许你存储任何类型的唯一值，无论是原始值或者是对象引用。

Set对象是值的集合，你可以按照插入的顺序迭代它的元素。 Set中的元素只会出现一次，即 Set 中的元素是唯一的。

在 ECMAScript 2015规范中-0  0  +0 是完全相等的。

NaN和undefined都可以被存储在Set 中， NaN之间被视为相同的值（NaN被认为是相同的，尽管 NaN !== NaN）。

Number.POSITIVE_INFINITY 和 Infinity都表示正无穷数，是相同的值。

引用值地址不能相同，原始值不能相等，这才能确保值的唯一性。



CSDN：https://blog.csdn.net/zyz00000000/article/details/107203800

Map和对象的重要区别：

- Map中的key可以是任意数据类型，而对象中的key是字符串或Symbol类型；
- Map中的key是有顺序的，对象的属性是无序的；
- Map是iterable（可迭代的），可以直接通过for of迭代，而对象需要先获取属性，然后才能迭代 
- 性能方面，在频繁增删键值对的情况下Map表现良好



关于同一个键，Map和Set的相等规则相同





### 1、解构赋值

CSDN：https://blog.csdn.net/zyz00000000/article/details/107629419

解构对象会查找原型链；ES6中只要某种数据有Iterator接口（也就是可以循环迭代 Iterable对象），都可以进行数组的解构赋值；

### 2、函数的解构赋值、默认参数、剩余参数

解构赋值：形参是一个对象或数组，通过解构赋值，接收一个对象或者数组，从而给形参赋值

```js
function userId({id}) {
  return id;
}
 
function whois({displayName, fullName: {firstName: name}}){
  console.log(displayName + " is " + name);
}
 
var user = { 
  id: 42, 
  displayName: "jdoe",
  fullName: { 
      firstName: "John",
      lastName: "Doe"
  }
};
 
console.log("userId: " + userId(user)); // "userId: 42"
whois(user); // "jdoe is John"
```

默认参数

剩余参数：

剩余参数得到一个数组——**剩余参数**语法允许我们将一个不定数量的参数表示为一个数组。

```js
        function a(m,...n){
            console.log(arguments) //Arguments(4) [1, 2, 3, 4, callee: (...), Symbol(Symbol.iterator): ƒ]
            console.log(m,n) //1  [2, 3, 4]
        }
        a(1,2,3,4)
```

注意 ：回顾arguments篇章，arguments不是从形参中获取数据，他和形参一样，都是从实参中获取数据。

CSDN：https://blog.csdn.net/zyz00000000/article/details/106677352

### 3、箭头函数

箭头函数没有自己的this、arguments、new.target、super

箭头函数的this：

箭头函数没有自己的this，它继承的是外层第一个非箭头函数的this，我们知道在非严格模式下，普通函数的this指向window，而在严格模式下this是undefined。

箭头函数没有自己的this指针，通过 `call()` *、* `apply()或bind（）` 方法调用一个函数时，只能传递参数，不能绑定this，他们的第一个参数会被忽略。



### 4、class类

CSDN：https://blog.csdn.net/zyz00000000/article/details/107000066

类和构造函数的区别：

类的声明不会提升；必须用new来调用，否则会报错；类原型上的constructor属性指向类本身；



注意static声明的静态方法、get和set设置的属性

可以通过get和set定义class类上的属性：

```js
    class Foo {
        constructor(){
            this.a = 1;
            this.b = 2;
        }
        func1(){
            console.log("func1");
        }
        func2(){
            console.log("func2");
        }
        get prop(){
            return this.b
        }
        set prop(value){
            this.b = value;
        }
    }
    var foo = new Foo();
    foo.prop = 10;//实例可以通过get set设置原型上的属性
    console.log(foo)
    console.log(Object.getOwnPropertyNames(foo));
```

类的静态方法：非静态方法可以被实例继承，而静态方法是供类使用，不被实例继承。——static关键词

```js
    class Foo {
        constructor(){
            this.a = 1;
            this.b = 2;
            Foo.func2();
        }
        func1(){
            console.log("func1");
        }
        static func2(){
            console.log(this);//this指向Foo，静态方法供类在内部使用
        }
    }
    var foo = new Foo();
    console.log(foo);
```

类的静态属性：直接在类上赋值属性

```js
Foo.prop1 = 11; 静态属性
Foo.prop2 = 22; 静态属性
```



**区分：类、类原型、实例对象**

CSDN：https://blog.csdn.net/zyz00000000/article/details/109577189

（1）实例对象foo

constructor构造函数内this上的属性和方法； constructor外的属性——类结构体内声明的属性；

（2）原型Foo.prototype（属性和方法都不可遍历）

类结构体内声明的方法；类结构体内通过getter和setter声明的属性；

（3）类Foo

类结构体通过static关键词申明的方法；类外部通过Foo. 或Foo[]的形式申明的属性或方法


**类的继承**

class、extends和super关键词

```js
    class Foo {
        constructor(){
            this.a = 1;
        }
        func1(){
            console.log("func1");
        }
    }
    class Bar extends Foo{
        constructor(){
            super();
            this.b = 2;
        }
        func2(){
            console.log("func2");
        }
    }
    var bar = new Bar();
    console.log(bar);
```



继承：子类 继承了父类 上的静态属性和方法；子类实例对象new时获取了父类constructor相关内容，同时子类实例对象的原型链上有子类原型，子类原型继承了父类原型的对象和方法

#### super

CSDN：https://blog.csdn.net/zyz00000000/article/details/107078428

super存在于：constructor中、普通方法中、static静态方法中，有不同的意义，该意义取决于所在函数的归属，

constructor属于new时构造实例对象的，

- super()执行代表，父类constructor执行，获取this实例；
- super赋值，super.a = 1，代表给this实例赋值
- super取值，super.b，代表父类原型上读取值

在子类的普通方法中，super代表父类原型，因为普通方法在类原型上

在static静态方法中，super代表父类，因为静态方法是类上的方法



## 迭代

###  for of

CSDN：https://blog.csdn.net/zyz00000000/article/details/107226489



### 迭代协议

**可迭代协议——规定可迭代对象是什么样的**

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols

默认情况下可迭代的数据类型都是有序的，比如Array、String、Map、Set、arguments。而对象Object是无须，不可迭代。

**可迭代**对象， 必须实现 `**@@iterator**` 方法，可以通过Symbol.iterator属性来访问该方法。该方法是一个无参的函数，返回值是一个符合迭代器的对象。

```js
        var str = 'abc'; //str是一个iterable
        var strIterator = str[Symbol.iterator]() //得到一个iterator对象
        console.log(strIterator) //迭代器对象，需通过next方法获取值
        console.log(strIterator.next()) //{value: "a", done: false}
```

当一个对象需要被迭代的时候（比如被置入一个 [`for...of`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of) 循环时），首先，会不带参数调用它的 `@@iterator` 方法，然后使用此方法返回的**迭代器**获得要迭代的值。——通过[Symbol.iterator]属性 调用@@iterator方法，得到迭代器对象，然后通过迭代器获取要迭代的值。



**迭代器协议 ——规定迭代器对象应该是什么 样的** 

**迭代器协议**定义了产生一系列值，无论是有限个还是无限个。当值为有限个时，所有的值都被迭代完毕后，则会返回一个默认返回值。

必须实现一个next方法，才能是一个迭代器对象。

next方法一个无参数函数，返回一个应当拥有以下两个属性的对象：

- `done`（boolean）

  如果迭代器可以产生序列中的下一个值，则为 `false`。（这等价于没有指定 `done` 这个属性。）如果迭代器已将序列迭代完毕，则为 `true`。这种情况下，`value` 是可选的，如果它依然存在，即为迭代结束之后的默认返回值。

- `value`

  迭代器返回的任何 JavaScript 值。done 为 true 时可省略。

`next()` 方法必须返回一个对象，该对象应当有两个属性： `done` 和 `value`，如果返回了一个非对象值（比如 `false` 或 `undefined`），则会抛出一个 [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError) 异常（`"iterator.next() returned a non-object value"`）

**备注：**不可能判断一个特定的对象是否实现了迭代器协议，然而，创造一个*同时*满足迭代器协议和可迭代协议的对象是很容易的（如下面的示例中所示）。

这样做允许一个迭代器能被各种需要可迭代对象的语法所使用。因此，很少会只实现迭代器协议，而不实现可迭代协议。

```
var myIterator = {
    next: function() {
        // ...
    },
    [Symbol.iterator]: function() { return this }
}
```



### Generator生成器对象

https://blog.csdn.net/zyz00000000/article/details/107496018

生成器对象是由一个generator 函数产生的，符合可迭代协议和迭代器协议 ，同时是可迭代对象和迭代器对象





##  Promise、async和await

### Promise

https://blog.csdn.net/zyz00000000/article/details/107386314

### async和await

https://blog.csdn.net/zyz00000000/article/details/107427989



https://blog.csdn.net/zyz00000000/article/details/116136668



### Proxy和Reflect

https://blog.csdn.net/zyz00000000/article/details/107345459

https://blog.csdn.net/zyz00000000/article/details/109598116



MDN：Proxy：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy

