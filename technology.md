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



剩余参数、默认参数、解构赋值参数



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



MDN：https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFram



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