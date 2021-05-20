[toc] 





# CSS3

媒体查询

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



# CSS interview

https://zhuanlan.zhihu.com/p/84212558

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

em：子元素字体大小的em是相对于父元素字体大小，元素的width/height/padding/margin用em的话是相对于该元素的font-size

vw/vh：全称是 Viewport Width 和 Viewport Height，视窗的宽度和高度，相当于 屏幕宽度和高度的 1%，不过，处理宽度的时候%单位更合适，处理高度的 话 vh 单位更好。

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

### 画一个三角形？

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

