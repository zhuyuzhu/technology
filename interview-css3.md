[toc] 





# CSS3

弹性盒子是 CSS3 的一种新的布局模式。

CSS3 弹性盒（ Flexible Box 或 flexbox），是一种当页面需要适应不同的屏幕大小以及设备类型时确保元素拥有恰当的行为的布局方式。

引入弹性盒布局模型的目的是提供一种更加有效的方式来对一个容器中的子元素进行排列、对齐和分配空白空间。

**要先阅读该文章：**https://www.runoob.com/w3cnote/flex-grammar.html

https://www.cnblogs.com/echolun/p/11299460.html

MDN：https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout

示例：https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Typical_Use_Cases_of_Flexbox

### 容器属性

#### display: inline-flex  行内元素也可以使用 Flex 布局。

示例：让子项均等的分布

```css
.inline-wrap {
    display: inline-flex;
    width: 200px;
    height: 100px;
    border: 1px solid black;
    justify-content: space-evenly;
}
```



#### display: flex

https://blog.csdn.net/zyz00000000/article/details/82925070

以下知识在flex-direction: row的情况下分析

子项宽高的设置，默认情况下弹性盒子

默认值：

> display: flex;
>
> flex-direction: row;
>
> flex-wrap: nowrap;
>
> justify-content: 



#### flex-direction

flex-direction属性决定主轴的方向（即项目的排列方向）。

```css
flex-direction: row | row-reverse | column | column-reverse;
```

#### flex-wrap

flex-wrap属性定义，如果一条轴线排不下，如何换行。

```css
flex-wrap: nowrap | wrap | wrap-reverse;
```

#### flex-flow

flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。

```css
flex-flow: <flex-direction> <flex-wrap>;
```



#### justify-content

- flex-start（默认值）：左对齐
- flex-end：右对齐
- center： 居中
- space-between：两端对齐，项目之间的间隔都相等。
- space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

对齐居中

>   justify-content: center;  左右居中
>
>   flex-wrap:wrap;   align-content: center;   上下居中
>
> 如果不换行：flex-wrap: nowrap;  align-items: center;  该行居中



#### align-content

`align-content` 属性用于修改 `flex-wrap` 属性的行为。

特点：不换行flex-wrap: nowrap;，align-content无效。注意是不换行的情况，align-content无效；而不是一行的时候，无效。flex-wrap: wrap换行，且只有一行时，也是有效的。

**行为：**每行的最大高度height值的子项，作为该行块的高度

**默认值：**stretch，留下的空白间隙，被每个均匀得到。

![image-20210524194226734](C:\Users\朱玉柱\AppData\Roaming\Typora\typora-user-images\image-20210524194226734.png)

值：flex-start

![image-20210524194931249](C:\Users\朱玉柱\AppData\Roaming\Typora\typora-user-images\image-20210524194931249.png)

值：flex-end

![image-20210524195038167](C:\Users\朱玉柱\AppData\Roaming\Typora\typora-user-images\image-20210524195038167.png)

值：center

![image-20210524195102760](C:\Users\朱玉柱\AppData\Roaming\Typora\typora-user-images\image-20210524195102760.png)



**为什么每个元素在所在行都是顶部对齐呢？因为align-items的默认值flex-start**

#### align-items

align-items是指每行所占块，是如何对齐的。因为弹性盒布局模型的目的是提供一种更加有效的方式来对一个容器中的子元素进行排列、对齐和**分配空白空间**。

如果不换行（只有一行），第一行下面的所有空白都是一个整块，即整个容器上下是一个整块，

那么align-items:flex-end; 生效，排列在容器底部

如果是多行，每行及其行的空白为一个块，align-items规定了该行在所在块的对齐方式。





### 子项属性



#### order

order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。



#### flex-grow: 0;

每行中，设置每个元素分配剩余空间的比例。默认是0，都不分配剩余空间，如果子项有该值，该行的子项，将分配该行的剩余空间。——主轴剩余空间

本来经过宽度计算，如下图所示：

![image-20210524201502022](C:\Users\朱玉柱\AppData\Roaming\Typora\typora-user-images\image-20210524201502022.png)

给每个子项添加：flex-grow: 1;让子项分配所在行的剩余空间

结果如下：

![image-20210524201552867](C:\Users\朱玉柱\AppData\Roaming\Typora\typora-user-images\image-20210524201552867.png)



如果主轴为：flex-direction: column; 特性为display: block;

![image-20210524202238434](C:\Users\朱玉柱\AppData\Roaming\Typora\typora-user-images\image-20210524202238434.png)



#### flex-shrink

如果空间不够，指定哪些子项按比例缩小

默认值：1，每行每项都要按相同大小失去。

如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。

比如：

(每行子项盒模型的width之和 - 容器盒模型的content宽)  /  每行子项盒模型的width之和  



#### flex-basic

flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。

它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。



#### flex

flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。

```css
flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
```



#### align-self

align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。

```css
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```



#### 容器属性

（1）display: flex;

（2）flex-wrap: nowrap;

不换行意味着什么？所有的子项都要排在一行，排的下，按子项的盒模型宽度；如果子项盒模型的宽度和大于容易宽度，会将子项均等的排列在一行。——紧挨着

flex-wrap: wrap;

可以换意味着什么？按子项的盒模型宽度进行排列，排不下的，会排到下一行。——紧挨着

因为是多行排列，那么行与行之间是怎么呈现的呢？默认align-items:stretch; 

align-items:stretch; 多行盒模型的高度之和小于 容器的高度，那么

![image-20210521141244654](C:\Users\朱玉柱\AppData\Roaming\Typora\typora-user-images\image-20210521141244654.png)

如果多行的盒模型的高度之和大于容器的高度：溢出显示

![image-20210521141422272](C:\Users\朱玉柱\AppData\Roaming\Typora\typora-user-images\image-20210521141422272.png)



align-items在侧轴上如何对齐：默认值是stretch，**stretch值在有height值时，height值决定高度，在子项无height值时，铺满所占的行高**

align-items:flex-start; 和上面的变现一致

align-items:flex-end;

align-items:center;







**align-content：该属性在多行下，设置每一行在容器的排列。**

align-content:stretch;默认值

![image-20210521154542602](C:\Users\朱玉柱\AppData\Roaming\Typora\typora-user-images\image-20210521154542602.png)





align-content:flex-start; 每行与上一行紧挨着

![image-20210521154441358](C:\Users\朱玉柱\AppData\Roaming\Typora\typora-user-images\image-20210521154441358.png)

align-content:center;



![image-20210521154651323](C:\Users\朱玉柱\AppData\Roaming\Typora\typora-user-images\image-20210521154651323.png)

#### justify-content

justify-content对齐内容的方式

justify-content 用于设置或检索弹性盒子元素在主轴（横轴）方向上的对齐方式。

**提示：**使用 align-content 属性对齐交叉轴上的各项（垂直）。

默认值：flex-start左对齐、flex-end右对齐、center居中、

留出间距space-between、

![image-20210521145808513](C:\Users\朱玉柱\AppData\Roaming\Typora\typora-user-images\image-20210521145808513.png)

space-around每个子元素两侧的间距相等、

![image-20210521145837588](C:\Users\朱玉柱\AppData\Roaming\Typora\typora-user-images\image-20210521145837588.png)

justify-content: space-evenly;

![image-20210521153232889](C:\Users\朱玉柱\AppData\Roaming\Typora\typora-user-images\image-20210521153232889.png)

#### align-content（多行下生效）

align-content 属性在弹性容器内的各项没有占用交叉轴上所有可用的空间时对齐容器内的各项（垂直）

**默认值：stretch**

**提示：**使用 justify-content 属性对齐主轴上的各项（水平）。

**注意多行下生效：**容器内必须有多行的项目，该属性才能渲染出效果。

**子项高度：**

菜鸟教程：https://www.runoob.com/cssref/css3-pr-align-content.html

测试效果地址：https://www.runoob.com/try/playit.php?f=playcss_align-content&preval=stretch

### 媒体查询

css2中媒体查询

在link标签中使用，引入的css只有在指定的media范围内生效

```css
<link rel="stylesheet" media="screen and (max-width:800px) and (min-width:500px)" href="./demo.css">
```



css3中媒体查询

常用的设置如下：

> @media screen and (min-width:1200px)
>
> @media screen and (min-width:992px)
>
> @media screen and (min-width:768px)
>
> @media screen and (min-width:480px)

在设置时，需要注意先后顺序，不然后面的会覆盖前面的样式。

```css
    <style>
        @media screen and (max-width:800px) and (min-width:500px){
            div{
                width: 100px;
                height: 100px;
                background-color: green;
            }
            span{
                color: red;
            }
        }
        @media screen and (max-width:500px){
            div{
                width: 200px;
                height: 200px;
                background: blue;
            }
            span{
                color: pink;
            }
        }
    </style>
```



### transition

> transition: property | duration | timing-function | delay
>
> 属性、时间、动画、延迟

`transition`属性可以被指定为一个或多个 CSS 属性的过渡效果，多个属性之间用逗号进行分隔。

过渡可以为一个元素在不同状态之间切换的时候定义不同的过渡效果。比如在不同的伪元素之间切换，像是 [`:hover`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:hover)，[`:active`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:active) 或者通过 JavaScript 实现的状态变化。

CSDN：https://blog.csdn.net/zyz00000000/article/details/82901478



### animation+@keyframes关键帧

@keyframes定义动画状态改变过程，from to的形式或者百分比的形式

animation：动画名、运动时长、动画函数，延迟时间，循环次数、

```css
    <style>
        .demo{
            position: absolute;
            top: 100px;
            left: 100px;
            width: 100px;
            height: 100px;
            background: green;
            animation: move 3s linear; 
        }
        @keyframes move{
            from{
                background: red;
            }
            to{
                background: blue;
            }
            /* 或 */
            0%{
                background: red;
            }
            50%{
                background: yellow;
            }
            100%{
                background: blue;
        	}
    </style>


```

### transform变换

注意：都是视觉上的变换，而实际的位置、宽高值都是没有改变的。如果块被放大了一倍，只是视觉上被放大了一倍，与周边元素的位置关系没有变化。

CSDN：https://blog.csdn.net/zyz00000000/article/details/82890644

translate平移

> transform：translate3d(x, y, z)、 translateX()、translateY()、translateZ()

比如：

**rotate旋转**

以某个轴进行顺时针转动

> transform：rotate3d（x,y,z,angle）| rotateX（）| rotateY（）|rotateZ（）

**scale缩放**

缩放系数

> transform：scale(x, y) | scaleX() | scaleY()

**skew拉伸**

>  transform：skew(xdeg, ydeg) | skewX(deg) | skewY(deg)

skewX(30deg)，意味着向+X方向拉伸30度，即+Y偏向+X的角度为30度

skewY(30deg)，意味着向+Y方向拉伸30deg，即+X偏向+Y的角度为30度



![三位坐标图](https://img-blog.csdnimg.cn/20210128153555243.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1laUzEzNDE0,size_16,color_FFFFFF,t_70)



**transform-origin：改变图形的中心点**



### 文本效果：阴影和换行

https://blog.csdn.net/zyz00000000/article/details/82886507



### 边框border

https://blog.csdn.net/zyz00000000/article/details/82881346

#### 圆角border-radius



#### 边框图片：border-image



#### 边框阴影：border-shadow



### 背景background



### IE6盒模型

默认border-sizing: content-box

IE6混杂盒模型：border-sizing: border-box



# CSS interview

https://zhuanlan.zhihu.com/p/84212558

https://zhuanlan.zhihu.com/p/122987171

https://zhuanlan.zhihu.com/p/143929973

https://segmentfault.com/a/1190000013325778

https://segmentfault.com/a/1190000013860482

https://www.jianshu.com/p/758399a1b99b

https://zhuanlan.zhihu.com/p/114257330

### calc, support, media各自的含义及用法？

#### （1）calc函数  兼容性IE9

calc()：此css函数允许在声明 CSS 属性值时执行一些计算。

```css
width: calc(100% - 80px);
```

此 calc()函数用一个表达式作为它的参数，用这个表达式的结果作为值。这个表达式可以是任何如下操作符的组合，采用标准操作符处理法则的简单表达式。比如：加、减、乘、除

**备注：**运算符两侧都需要空白符；

- **`+` 和 `-` 运算符的两边必须要有空白字符。**比如，`calc(50% -8px)` 会被解析成为一个无效的表达式，解析结果是：一个百分比 后跟一个负数长度值。而加有空白字符的、有效的表达式 `calc(8px + -50%)` 会被解析成为：一个长度 后跟一个加号 再跟一个负百分比。
- `*` 和 `/` 这两个运算符前后不需要空白字符，但如果考虑到统一性，仍然推荐加上空白符。
- 用 0 作除数会使 HTML 解析器抛出异常。
- 涉及自动布局和固定布局的表格中的表列、表列组、表行、表行组和表单元格的宽度和高度百分比的数学表达式，`auto` 可视为已指定。
- `calc()` 函数支持嵌套，但支持的方式是：把被嵌套的 `calc()` 函数全当成普通的括号。（译者注：所以，函数内直接用括号就好了。）

#### （2）@supports 特性查询 兼容性Edge12

**`@supports`** 您可以指定依赖于浏览器中的一个或多个特定的CSS功能的支持声明。这被称为*特性查询*。

`@supports` 支持条件由一条或多条使用 逻辑与（`and`）、逻辑或（`or`）、逻辑非（`not`）结合的名称-值对（name-value pair）组成。可以使用圆括号调整操作符的优先级。

如果支持某个特性：

```css
@supports (display: grid) {
  div {
    display: grid;
  }
}
```

如果不支持某个特性：

```css
@supports not (display: grid) {
  div {
    float: right;
  }
}
```

#### （3）media

### css水平、垂直居中的写法，请至少写出4种

（1）水平居中

- 行内元素: `text-align: center`
- 块级元素: `margin: 0 auto`
- position:absolute +left:50%+ transform:translateX(-50%)
- `display:flex + justify-content: center`

（2）垂直居中

- 设置line-height 等于height
- position：absolute +top:50%+ transform:translateY(-50%)
- `display:flex + align-items: center`
- display:table+display:table-cell + vertical-align: middle;

### 1rem、1em、1vh、1px各自代表的含义？

rem是全部的长度都相对于根元素<html>元素。通常做法是给html元素设置一个字体大小，然后其他元素的长度单位就为rem。

以下实例中，div的宽高为20px

```css
        html {
            font-size: 20px;
        }
        div {
            width: 1rem;
            height: 1rem;
            border: 1px solid black;
        }
```

rem 布局的优缺点，相对于 em 的好处是：

> 不会发生逐渐增大或者减小字体尺寸的情况，因为始终继承根元素的字体尺寸；
> rem 单位不仅可应用于字体大小，还可以用于设定宽高等其他大小，使页面可以适配不同屏幕尺寸。

rem 一般只用于移动端。



em：子元素字体大小、width/height/padding/margin等相对于父元素的font-size

示例：子元素的宽高是8px

```css
        .fa {
            width: 100px;
            height: 100px;
            font-size: 16px;
        }
        .son {
            width: 0.5em;
            height: 0.5em;
            border: 1px solid black;
        }
```



vw/vh：全称是 Viewport Width 和 Viewport Height，视窗的宽度和高度，相当于 屏幕宽度和高度的 1%，不过，处理宽度的时候%单位更合适，处理高度的 话 vh 单位更好。

vw：1vw等于视口宽度的1%。vh：1vh等于视口高度的1%。

示例：50vw等于视图宽度的一半

```css
        .fa {
            width: 50vw;
            height: 10px;
            border: 1px solid black;
        }
```



px像素（Pixel）。相对长度单位。像素px是相对于显示器屏幕分辨率而言的。

一般电脑的分辨率有{1920*1024}等不同的分辨率

1920*1024 前者是屏幕宽度总共有1920个像素,后者则是高度为1024个像素

### 画一条0.5px的直线？

>  考查的是css3的transform

```css
height: 1px;
transform: scale(0.5);
```

### 说一下盒模型？

盒模型的组成，由里向外content,padding,border,margin.

在IE盒子模型中，width表示content+padding+border这三个部分的宽度

在标准的盒子模型中，width指content部分的宽度

box-sizing的使用

```text
  box-sizing: content-box 是W3C盒子模型
  box-sizing: border-box 是IE盒子模型
```

box-sizing的默认属性是content-box

### 画一个三角形？border

```css
 .a{
            width: 0;
            height: 0;
            border-width: 100px;
            border-style: solid;
            border-color: transparent #0099CC transparent transparent;
            transform: rotate(90deg); /*顺时针旋转90°*/
 }

<div class="a"></div>
```

要通过border属性来实现，border属性的特性是什么样的呢？

```css
        .fa {
            width: 0;
            height: 0;
            border-left: 50px solid green;
            border-right: 50px solid blue;
            border-bottom: 100px solid red;
            border-top: 50px solid darkgoldenrod;
        }
```

![image-20210523123612119](C:\Users\朱玉柱\AppData\Roaming\Typora\typora-user-images\image-20210523123612119.png)

通过transform：rotate，进行适当的旋转。

如果有宽高，又是什么样的效果呢？

```css
        .fa {
            width: 50px;
            height: 50px;
            border-top: 20px solid black;
            border-right: 20px solid green;
            border-bottom: 20px solid blue;
            border-left: 20px solid rebeccapurple;
        }
```

![image-20210523141159725](C:\Users\朱玉柱\AppData\Roaming\Typora\typora-user-images\image-20210523141159725.png)

### 清除浮动的几种方式，及原理？BFC

如何触发BFC?——块级格式上下文

- float除了none以外的值
- overflow除了visible之外的值
- display(table-cell table-caption,inline-block)
- position(absolute,fixed)

一般用伪元素after来清除浮动，既不会对页面的HTML结构造成混乱，也可以清除浮动

三点 ：让伪元素成为一个块元素；内容为空；清除两侧的浮动。

```css
display: block;
content: '';
clear: both;
```

关于BFC的MDN文档：https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context

中文叫块级格式上下文，BFC 原理（BFC 的渲染规则）如下：

> 1）在 BFC 这个元素的垂直方向的外边距会发生重叠，即 BFC 内部的兄弟元素中间会发生边距重叠。解决方法，给某个兄弟元素增加一个父元素，给父元素创建一个 BFC，其他兄弟元素不会和这个新增的父元素发生边距重叠；
> 2）BFC 区域不会与浮动元素 box 重叠，这就是用来清除浮动的原理。比如左边是浮动元素，右边是一个 div，如果两者高度不相等，整个布局就会坍塌，所以为这个 div 创建一个 BFC，就能得到我们想要的布局；
> 3）BFC 在页面是一个独立的容器，外面的元素不会影响里面的元素，反之亦然；
> 4）计算 BFC 高度时，浮动元素也会参与计算。这就是在浮动元素父元素上增加 overflow:hidden 会将浮动元素计算入内，而不会使父元素高度坍塌或者背景颜色显示不出来的原因

创建 BFC 的方式：

> 1）只要 overflow 值不为 visible（默认值），就创建了 BFC；
> 2）float 值不为 noun（默认值），只要设置了浮动，就创建了 BFC；
> 3）position 值不为 static（默认值）或者是 relative，就创建了 BFC；
> 4）将 display 值设置为 inline-box 或者是 table-cell（只要跟 table 相关的那几个），就创建了 BFC。

对应的内联元素的格式化上下文叫 IFC。

通过 BFC/IFC 解决边距重叠问题，三种边距重叠的情况：

> 1）父子元素，父元素的高度跟子元素重叠，解决方法是为父元素创建一个 BFC；
> 2）兄弟元素，比如一个有上边距，一个有下边距，这个时候会发生重叠，重叠的原则是取最大值，解决方法是给其中一个元素增加一个父元素，为这个父元素创建一个 BFC；
> 3）空元素同时有 marging-top 和 marging-bottom 时，会取一个最大值作为边距，解决方法是为空元素创建一个 BFC。



什么是BFC：https://blog.csdn.net/sinat_36422236/article/details/88763187



### CSS选择器有哪些？



### CSS哪些属性可以继承

css继承属性不能取消，只能重新定义而取代。

可继承的属性有：字体font-size、font-famliy，文本颜色color、行高line-height，列表元素的样式list-style等，其他的基本上是不可继承的属性，比如宽高、背景颜色等。



### CSS优先级（权重）



### position定位的理解

static（默认）：按照正常文档流进行排列；
relative（相对定位）：不脱离文档流，参考自身静态位置通过 top, bottom, left, right 定位；
absolute(绝对定位)：参考距其最近一个不为static的父级元素通过top, bottom, left, right 定位；
fixed(固定定位)：所固定的参照对像是可视窗口。



### 为什么要初始化CSS样式

因为浏览器的兼容问题，不同浏览器对有些标签的默认值是不同的，如果没对CSS初始化往往会出现浏览器之间的页面显示差异。

比如：

1. Chrome 中文界面下默认会将小于 12px 的文本强制按照 12px 显示,可通过加入 CSS 属性 -webkit-text-size-adjust: none; 解决。
2. 不同浏览器的标签默认的margin和padding不一样。*{margin:0;padding:0;}



### CSS里的visibility属性有个collapse属性值？在不同浏览器下以后什么区别？

当一个元素的visibility属性被设置成collapse值后，对于一般的元素，它的表现跟hidden是一样的。

chrome中，使用collapse值和使用hidden没有区别。
firefox，opera和IE，使用collapse值和使用display：none没有什么区别。



### display:none与visibility：hidden的区别？

display：none 不显示对应的元素，在文档布局中不再分配空间（回流+重绘）
visibility：hidden 隐藏对应元素，在文档布局中仍保留原来的空间（重绘

### 相邻的两个inline-block节点为什么会出现间隔，该如何解决

是换行符引起的间隔问题，间隙为 4px。

消除间隙的方法：

> 1）去掉换行符；
> 2）对父元素添加 font-size:0，将字体大小设置为 0，换行符也会为 0px，从而消除间隙，再为 inline-block 元素设置我们需要的字体大小；
> 3）将 inline-block 的 margin-right/left 设置为 -4px；
> 4）将父元素的 letter-spacing 或 word-spacing 设置为 -4px，这两个属性会增加或减少字符间隔。[word-spacing 对中文无效](https://link.zhihu.com/?target=https%3A//www.cnblogs.com/OrangeManLi/p/4107536.html)

inline-block 还有两个问题：即不同高度的两个 inline-block 顶部不对齐，以及 inline-block 底部多出几像素（多出空白）。解决方法是为 inline-block 元素设置 vertical-align:top。[设置元素的垂直对齐方式](https://link.zhihu.com/?target=https%3A//www.w3school.com.cn/css/pr_pos_vertical-align.asp)



### 1像素边框问题

原因：有些手机分辨率比较高，是二倍屏或者三倍屏，在 CSS 中定义 border 为 1px，这些手机可能是两个物理像素或者是三个物理像素的高度（即看起来比 1px 粗）。

解决方法：通过背景图片实现、通过 transform:scale(0.5) 实现、通过 viewport + rem 实现

[参考资料](https://link.zhihu.com/?target=https%3A//www.jianshu.com/p/fa670b737a29)

还可以引入 border.css 来实现



### 关于布局

https://zhuanlan.zhihu.com/p/124302579



###  **使用 base64 编码的优缺点**

```text
·base64编码是一种图片处理格式，通过特定的算法将图片编码成一长串字符串，
在页面上显示时可用该字符串来代替图片的url属性
·使用base64的优点：
① 减少一个图片的 HTTP 请求
·使用base64的缺点：
① 根据base64的编码原理，编码后的大小会比源文件大小大1/3，如果把大图片编码到html/css中，
不仅会造成文件体积增加，影响文件的加载速度，还会增加浏览器对html或css文件解析渲染的时间。
② 使用base64无法直接缓存，要缓存只能缓存包含base64的文件，比如HTML 或CSS，
这相比于直接缓存图片的效果要差很多。
③ ie8以前的浏览器不支持
一般一些网站的小图标可以使用base64图片引入
```



### **为什么要清除浮动？清除浮动的方式？**





### CSS优化，提高性能的方法有哪些？

加载性能：
① CSS 压缩：将写好的CSS 进行打包压缩，可以减少很多的体积。
② CSS单一样式：当需要下边距和左边距的时候，很多时候选择：margin: top 0 bottom 0;
但margin-top: top;margin-bottom: bottom;执行的效率更高。
选择器性能：
① 关键选择器。选择器的最后面的部分为关键选择器（即用来匹配目标元素的部分）。



### display: table

display:table=>相当于“table”标签；
display:table-row=>相当于“tr”标签；
display:table-cell=>相当于“td”标签；

```css
    <style>
        .fa {
            display: table;
            width: 100px;
            height: 100px;
            border: 1px solid black;
        }
        .row {
            display: table-row;
            width: 20px; /*无效，行的宽度为table的宽*/
            height: 20px;
            background-color: aqua;
        }
        .cell {
            display: table-cell;
            width: 30px;
            height: 50px;
            /** 宽高都生效*/
        }
    </style>

    <div class="fa">
        <div class="row">
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
        </div>
        <div class="row"></div>
        <div class="row"></div>
        <div class="row"></div>
        <div class="row"></div>
    </div>
```

注意：虽然display：table解决了避免使用表格的问题，但有几个需要注意的：

（1）display: table时padding会失效

（2）display: table-row时margin、padding同时失效

（3）display: table-cell时margin会失效

table标签好像在diff算法中经过三次计算（多次计算），比较浪费时间；

### table标签

**Tables的缺点**

1、Table要比其它html标记占更多的字节。(延迟下载时间，占用服务器更多的流量资源。)

2、Tablle会阻挡浏览器渲染引擎的渲染顺序。(会延迟页面的生成速度，让用户等待更久的时间。)

3、Table里显示图片时需要你把单个、有逻辑性的图片切成多个图。(增加设计的复杂度，增加页面加载时间，增加HTTP会话数。)

4、在某些浏览器中Table里的文字的拷贝会出现问题。(这会让用户不悦。)

5、Table会影响其内部的某些布局属性的生效(比如<td>里的元素的height:100%)(这会限制你页面设计的自由性。)

6、一旦学了CSS知识，你会发现使用table做页面布局会变得更麻烦。(先花时间学一些CSS知识，会省去你以后大量的时间。)

7、table对对于页面布局来说，从语义上看是不正确的。(它描述的是表现，而不是内容。)

8、table代码会让阅读者抓狂。(不但无法利用CSS，而且会你不知所云)

9、table一旦设计完成就变成死的，很难通过CSS让它展现新的面貌。

**Tables的优点**

在某些场合，使用Table是100%的适合、恰当和正确。比如，用table做表格是完全正确的。



### position定位

static（默认）：按照正常文档流进行排列；
relative（相对定位）：不脱离文档流，参考自身静态位置通过 top, bottom, left, right 定位；
absolute(绝对定位)：参考距其最近一个不为static的父级元素通过top, bottom, left, right 定位；——参照元素的padding区进行定位的
fixed(固定定位)：所固定的参照对像是可视窗口。

### **请解释一下CSS3的flexbox（弹性盒布局模型）,以及适用场景？**

**CSS 弹性盒子布局**是 CSS 的模块之一，定义了一种针对用户界面设计而优化的 CSS 盒子模型。在弹性布局模型中，弹性容器的子元素可以在任何方向上排布，也可以“弹性伸缩”其尺寸，既可以增加尺寸以填满未使用的空间，也可以收缩尺寸以避免父元素溢出。子元素的水平对齐和垂直对齐都能很方便的进行操控。通过嵌套这些框（水平框在垂直框内，或垂直框在水平框内）可以在两个维度上构建布局。

该布局模型的目的是提供一种更加高效的方式来对容器中的条目进行布局、对齐和分配空间。在传统的布局方式中，block 布局是把块在垂直方向从上到下依次排列的；而 inline 布局则是在水平方向来排列。弹性盒布局并没有这样内在的方向限制，可以由开发人员自由操作。
试用场景：弹性布局适合于移动前端开发，在Android和ios上也完美支持。



### **常见的兼容性问题？为什么要初始化CSS样式**

1. 不同浏览器的标签默认的margin和padding不一样。

   *{margin:0;padding:0;}

2. IE6双边距bug：块属性标签float后，又有横行的margin情况下，在IE6显示margin比设置的大。hack：display:inline;将其转化为行内属性。

3. 渐进识别的方式，从总体中逐渐排除局部。首先，巧妙的使用“9”这一标记，将IE浏览器从所有情况中分离出来。接着，再次使用“+”将IE8和IE7、IE6分离开来，这样IE8已经独立识别。

   ```
   {
   background-color:#f1ee18;/*所有识别*/
   .background-color:#00deff\9; /*IE6、7、8识别*/
   +background-color:#a200ff;/*IE6、7识别*/
   _background-color:#1e0bd1;/*IE6识别*/
   }
   ```

4. 设置较小高度标签（一般小于10px），在IE6，IE7中高度超出自己设置高度。hack：给超出高度的标签设置overflow:hidden;或者设置行高line-height 小于你设置的高度。

5. IE下，可以使用获取常规属性的方法来获取自定义属性,也可以使用getAttribute()获取自定义属性；Firefox下，只能使用getAttribute()获取自定义属性。解决方法:统一通过getAttribute()获取自定义属性。

6. Chrome 中文界面下默认会将小于 12px 的文本强制按照 12px 显示,可通过加入 CSS 属性 -webkit-text-size-adjust: none; 解决。

7. 超链接访问过后hover样式就不出现了，被点击访问过的超链接样式不再具有hover和active了。解决方法是改变CSS属性的排列顺序:L-V-H-A ( love hate ): a:link {} a:visited {} a:hover {} a:active {}

因为浏览器的兼容问题，不同浏览器对有些标签的默认值是不同的，如果没对CSS初始化往往会出现浏览器之间的页面显示差异。



### vertical-align和text-align

vertical-align元素文本的垂直对齐方式，默认：baseline，文本基线对齐

vertical-align的使用：https://www.jianshu.com/p/ce7e4a997a2c

