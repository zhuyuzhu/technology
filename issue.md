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

浏览器窗口加载过的资源，不会多次加载。

比如：某个图片上有很多的图标，每个图标通过img标签的src获取。当前窗口获取过该图片资源后。就不再发送请求获取。其他使用该图片的img标签，都不再进行资源获取。

局部获取html文件：

a标签可以局部获取html文件，两个思路，第一个a标签可以下载文件的功能。第二，a标签的点击事件，进行ajax请求，获取资源。

a标签的特性：跳转路由，且刷新页面。如果组织默认事件，a标签将失去所有的默认行为。

`location.href`的特点：页面跳转到指定路径，且刷新页面。——研究一下。

难道不是a标签的局部获取资源？而是a标签的本窗口打开新的路径

BOM修改页面url。

> window对象、location对象、navigator对象、history对象、screen对象

window：https://developer.mozilla.org/zh-CN/docs/Web/API/Window

location：https://developer.mozilla.org/zh-CN/docs/Web/API/Window/location

https://developer.mozilla.org/zh-CN/docs/Web/API/Location

Navigator：https://developer.mozilla.org/zh-CN/docs/Web/API/Window/navigator

https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator

虽然MDN上有很多的方法和属性。但是不建议使用。因为兼容性是个问题，而且也很少用的bom的其他属性方法。

BOM菜鸟教程：https://www.runoob.com/js/js-window.html

发送ajax请求获取html资源



### 原生js

判断浏览器是否支持某个标签的属性：判断标签的兼容性

```js
    var supportDownload = "download" in document.createElement("a");
    if(!supportDownload){
//        code...
    }
```



HTML和CSS

居中问题：

如果让一个块具有inline特性，那么就可以使用text-align属性让其居中。

a标签的样式引发的问题：在a标签的父级标签已经设置了color颜色，但是a标签必须单独设置color颜色才能生效。因为a标签有自己的color默认颜色，父级无效。只有在a标签中重新设置color值，才可以。

HTML5和CSS3

线性渐变

文字阴影

盒子阴影