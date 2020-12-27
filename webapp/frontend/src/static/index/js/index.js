const projectData = [
    {
        name: "HTML",
        img: "../static/index/images/html.jpg",
        href: "",
        decscription: "超文本标记语言（英语：HyperText Markup Language，简称：HTML）是一种用于创建网页的标准标记语言。"
    },
    {
        name: "CSS",
        img: "../static/index/images/css.png",
        href: "",
        decscription: "层叠样式表 (Cascading Style Sheets，缩写为 CSS），是一种样式表语言，用来描述HTML或XML文档的呈现。"
    },
    {
        name: "JavaScript",
        img: "../static/index/images/javascript.jpg",
        href: "./javascript/basic/js_basic",
        decscription: "JavaScript ( JS ) 是一种具有函数优先的轻量级，解释型或即时编译型的编程语言。"
    },
    {
        name: "HTML5",
        img: "../static/index/images/html5.jpg",
        href: "",
        decscription: ""
    },
    {
        name: "CSS3",
        img: "../static/index/images/css3.jpg",
        href: "",
        decscription: ""
    },
    {
        name: "ES6",
        img: "../static/index/images/es6.jpg",
        href: "/es6",
        decscription: ""
    },
    {
        name: "VUE",
        img: "../static/index/images/vue.jpg",
        href: "",
        decscription: "Vue是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用，Vue 的核心库只关注视图层。"
    }, {
        name: "Node.js",
        img: "https://cdn.jsdelivr.net/npm/@bootcss/www.bootcss.com@0.0.35/dist/img/nodejs.png",
        href: "",
        decscription: "Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效。"
    }
]

let $projectUl = document.getElementsByClassName('pro_wrap')[0];
let projectHtml = '';

projectData.forEach(itemPro => {
    projectHtml += `
    <li>
        <a href="${itemPro.href}" target="_self">
            <img src= "${itemPro.img}" alt ="">
            <div class="project_name"><span>${itemPro.name}</span></div>
        </a>
        <div class="description">${itemPro.decscription}</div>
    </li>
    `
})

$projectUl.innerHTML = projectHtml;
