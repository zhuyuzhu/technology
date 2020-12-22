let fs = require('fs');
let path = require('path');
let express = require('express');
let bodyParser = require('body-parser'); //处理post请求的body

let jsRouter = require('./routes/javascirptRouter');

let app = express();

let port = "8080";
let views = './frontend/src/views'; //前端views文件夹路径

//开放静态资源  当请求路径是/static实际请求目录是./frontend/src/static
app.use('/static', express.static(path.join(__dirname, './frontend/src/static')))

let server = app.listen(port, function(err, data){
    console.log("express listening port: " + port);
})

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

/* 配置express-art-template */
//识别html文件
app.engine('html', require('express-art-template')); 
//设置参数配置
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production' //开启调试
});
//修改默认目录
app.set('views', path.join(__dirname, views));
//设置加载文件类型
app.set('view engine', 'html'); 

//favicon.ico
app.get('/favicon.ico', (req, res, next) => {
    fs.readFile(path.join(__dirname, './favicon.ico'), (err, data) => {
        res.status(200).end(data);
    })
})

app.use('/javascript', jsRouter)

//首页
app.get('/', (req, res, next) => {
    fs.readFile(path.join(__dirname, views+'/index.html'), (err, data) => {
        res.status(200).end(data);
    })
})



//统一处理没有不存在的网址
app.use(function(req, res, next){
    res.setHeader('content-type', 'text/html')
    return res.status(500).end('<h2>error </h2>')
})

//统一处理所有的err报错
app.use(function(err, req, res, next){
    console.log(err);
    return res.status(500).end(err)
})
