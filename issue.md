# 项目中遇到的issue

### Git

##### 1、gitignore

配置**.gitignore**文件

匹配规则：

https://www.cnblogs.com/wzjwffg/p/9884042.html

指定忽略的文件 

> 1）/mtk/        过滤整个文件夹
> 2）*.zip         过滤所有.zip文件
> 3）/mtk/do.c     过滤某个具体文件
>
> 

指定不忽略的文件：

> 1）!*.zip
> 2）!/mtk/one.txt

需要强调的一点是，如果你不慎在创建.gitignore文件之前就push了项目，那么即使你在.gitignore文件中写入新的过滤规则，这些规则也不会对已经push到仓库的文件起作用，Git仍然会对push到仓库的文件进行版本管理。

git 对于 .gitignore 配置文件是按行从上到下进行规则匹配的，意味着如果前面的规则匹配的范围更大，则后面的规则将不会生效；

注释：

```
# 注释内容
```



示例：忽略所有，除了这些

```
/*
!webapp/
!issue.md
!package-lock.json
!package.json
!readme.md
!technology.md
```

示例
a）规则：fd1/*
说明：忽略目录 fd1 下的全部内容；注意，不管是根目录下的 /fd1/ 目录，还是某个子目录 /child/fd1/ 目录，都会被忽略；
b）规则：/fd1/*
说明：忽略根目录下的 /fd1/ 目录的全部内容；
c）规则：
/*
!.gitignore
!/fw/bin/
!/fw/sf/
说明：忽略全部内容，但是不忽略 .gitignore 文件、根目录下的 /fw/bin/ 和 /fw/sf/ 目录；

### Node

1、启动服务器后的根路径

| 路径             | 解释                                                |
| ---------------- | --------------------------------------------------- |
| /                | 磁盘根路径，比如D盘中，表示D:/  Linux中，表示根目录 |
| http://localhost |                                                     |

关于根目录：

前端：引入文件的时使用的 / 是localhost

后端：使用的 / 是盘符根目录

查看此文章：https://blog.csdn.net/zyz00000000/article/details/111485843

注意：node中，处理请求的路径，比如app.get()  app.use()这些是url请求。

### Linux

shell中的注释：

```sh
# 注释内容
```



### 浏览器特性

页面某次加载时，不会多次加载同一个资源。

比如：某个图片上有很多的图标，每个图标通过img标签的src获取。当前窗口获取过该图片资源后。就不再发送请求获取。其他使用该图片的img标签，都不再进行资源获取。

局部获取html文件：

a标签可以局部获取html文件，两个思路，第一个a标签可以下载文件的功能。第二，a标签的点击事件，进行ajax请求，获取资源。

a标签的特性：跳转路由，且刷新页面。如果阻止默认事件，a标签将失去所有的默认行为。

`location.href`的特点：页面跳转到指定路径，且刷新页面。——研究一下。

webpack中文网的实现特点：页面刷新和点击a标签，进行ajax请求。两种策略去实现的网站。



BOM修改页面url。

> window对象、location对象、navigator对象、history对象、screen对象

window：https://developer.mozilla.org/zh-CN/docs/Web/API/Window

location：https://developer.mozilla.org/zh-CN/docs/Web/API/Window/location

https://developer.mozilla.org/zh-CN/docs/Web/API/Location

Navigator：https://developer.mozilla.org/zh-CN/docs/Web/API/Window/navigator

https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator

虽然MDN上有很多的方法和属性。但是不建议使用。因为兼容性是个问题，而且也很少用的bom的其他属性方法。

BOM菜鸟教程：https://www.runoob.com/js/js-window.html



### 原生js

**判断浏览器是否支持某个标签的属性：判断标签的兼容性**

```js
    var supportDownload = "download" in document.createElement("a");
    if(!supportDownload){
//        code...
    }
```



**js修改url，却不刷新页面**

发现一个可以改变地址栏，而不导致页面刷新的东东。 Chrome, FF测试通过，不支持IE.

https://www.cnblogs.com/ygunoil/p/12815615.html

### HTML和CSS

**居中问题：**

如果让一个块具有inline特性，那么就可以使用text-align属性让其居中。



**a标签的样式引发的问题：**

在a标签的父级标签已经设置了color颜色，但是a标签必须单独设置color颜色才能生效。因为a标签有自己的color默认颜色，父级无效。只有在a标签中重新设置color值，才可以。

需要全方面对a标签进行研究。

**伪元素：**



HTML中怎么写，才能防止，后端注入的html字符串生效。而不识别为字符串。

art-template插件内部实现：

```
{{@docs.content}}
```

https://blog.csdn.net/weixin_44673034/article/details/102666548

### HTML5和CSS3

CSS3菜鸟教程：https://www.runoob.com/css3/css3-gradients.html

**渐变**

线性渐变和径向渐变



**文字阴影**

text-shadow  兼容性IE10

```css
text-shadow: h-shadow v-shadow blur color;
```

**注意：** text-shadow属性连接一个或更多的阴影文本。属性是阴影，指定的每2或3个长度值和一个可选的颜色值用逗号分隔开来。已失时效的长度为0。

| 值         | 描述                             |
| :--------- | :------------------------------- |
| *h-shadow* | 必需。水平阴影的位置。允许负值。 |
| *v-shadow* | 必需。垂直阴影的位置。允许负值。 |
| *blur*     | 可选。模糊的距离。               |
| *color*    | 可选。阴影的颜色                 |

```js
object.style.textShadow="2px 2px #ff0000"
```



**盒子阴影**  

box-shadow  兼容性IE9

```css
box-shadow: h-shadow v-shadow blur spread color inset;
```

| 值         | 说明                                                         |
| :--------- | :----------------------------------------------------------- |
| *h-shadow* | 必需的。水平阴影的位置。允许负值                             |
| *v-shadow* | 必需的。垂直阴影的位置。允许负值                             |
| *blur*     | 可选。模糊距离                                               |
| *spread*   | 可选。阴影的大小                                             |
| *color*    | 可选。阴影的颜色。在[CSS颜色值](https://www.runoob.com/cssref/css_colors_legal.aspx)寻找颜色值的完整列表 |
| inset      | 可选。从外层的阴影（开始时）改变阴影内侧阴影                 |

**注意：**box-shadow 属性把一个或多个下拉阴影添加到框上。该属性是一个用逗号分隔阴影的列表，每个阴影由 2-4 个长度值、一个可选的颜色值和一个可选的 inset 关键字来规定。省略长度的值是 0。

*object*.style.boxShadow="10px 10px 5px #888888"



**媒体查询**

```css
屏幕宽度在1280px——1440px之间时，以下内容生效
@media screen and (min-width:1280px) and (max-width:1440px){
    #content .project ul {
        width: 1160px
    }
}
```



### 项目中express的使用

在webapp.js引入express

```js
var express = require('express');

var app = express();

```

### 项目中路由的使用

在路由中

```js
var express = require('express');

var Router = express.Router();
```







### 额外

一个有趣的背景：https://www.cnblogs.com/MrZhujl/p/11510496.html



张鑫旭：https://www.zhangxinxu.com/



Typora画流程图：

https://www.cnblogs.com/yiyangyu/p/typora.html

官网流程图：

https://support.typora.io/Draw-Diagrams-With-Markdown/

```sequence

Alice->Bob: Hello Bob, how are you?
Note right of Bob: Bob thinks
Bob-->Alice: I am good thanks!

```

响应式PC端媒体查询：

电脑屏蔽及尺寸的例表上我们得到了几个宽度

**1024    1280 a      1366    1440 a    1680    1920** 