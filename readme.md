## 个人博客网站

描述：

使用技术：

HTML、CSS、HTML5、CSS3

自适应布局



首页：

index.html

h5 css3 ES6



## 路由

#### 首页

| 名称 | 路由       | 资源       |
| ---- | ---------- | ---------- |
| 首页 | /index   / | index.html |
| 关于 | /about     | about.html |

#### javascript模块

| 名称           | 路由        | 响应                            |
| -------------- | ----------- | ------------------------------- |
| javascript项目 | /javascript | 302——/javascript/basic/js_basic |



## MongoDB

所有文章的集合类型都一样，集合设计如下面的编辑和保存的数据

Model对象名为：Article，在MongoDB中为articles



参考网站：webpack中文文档

https://webpack.html.cn/concepts/



### 编辑和保存

编辑内容来自CSDN的博客文章，是一个JSON对象

数据结构：

```json
{
    "article_id": "107078428",
    "title": "ES6 super",
    "description": "我理解的super",
    "content": "<p><strong>super存在于类的函数中",
    "markdowncontent": "",
	"tags": "ES6 super,类的继承",
	"categories": "ES6",
	"type": "original",
	"status": 0,
	"read_type": "public",
	"reason": "",
	"resource_url": "",
	"original_link": "",
	"authorized_status": false,
	"check_original": false,
	"editor_type": 0,
	"not_auto_saved": 1,
     "classify_tags": "javascript",
    "classify_article": "basic",
    "classify_content": "js_basic"
}
```









