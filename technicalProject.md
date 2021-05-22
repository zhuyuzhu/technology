# meeting技术总结

### 一 、打包工具

#### gulp 

版本号



#### webpack



### 二、comet和webpack

#### comet

Comet方式通俗的说就是一种长连接机制(long lived http)。同样是由Browser端主动发起请求，但是Server端以一种似乎非常慢的响应方式给出回答。这样在这个期间内，服务器端可以使用同一个connection把要更新的数据主动发送给Browser。因此请求可能等待较长的时间，期间没有任何数据返回，但是一旦有了新的数据，它将立即被发送到客户机。Comet又有很多种实现方式，但是总的来说对Server端的负载都会有增加.虽然对于单位操作来说，每次只需要建议一次connection,但是由于connection是保持较长时间的,对于 server端的资源的占用要有所增加。

优 点： 实时性好（消息延时小）；性能好（能支持大量用户）

缺点： 长期占用连接，丧失了无状态高并发的特点。

#### websocket

https://blog.csdn.net/sinat_36422236/article/details/85051547



### 三、调试模式

通过特定url请求，修改服务器的全局变量，jsp加载文件时，判断isDebugger值，进而判断加载调试分散的js文件还是打包的js文件



### 四、打开外部exe程序

参考文章：https://admx.help/?Category=Chrome&Policy=Google.Policies.Chrome::ExternalProtocolDialogShowAlwaysOpenCheckbox&Language=zh-cn

https://blog.csdn.net/h4329201/article/details/78929109



注册表，找到对应的软件注册名

```html
    <a href="kcmp://">打开外部程序</a>
    <a href="Notes://">exe程序</a>
```

```js
        iframe = document.createElement("iframe");
        iframe.src = "kcmp://";
        iframe.style.display = "none";
        document.body.appendChild(iframe);
```



### 五、Jenkins上编译前端版本



### 六、组件MO

Mo前端组件主要基于jQuery、EasyUI、zTree、ArtDialog和mCustomScrollbar开发的用户界面插件集合。



节流--安全锁

