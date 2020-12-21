let fs = require('fs');
let path = require('path');
let express = require('express');
let app = express();

let port = "8080";
let views = './frontend/src/views'; //前端views文件夹路径

//开放静态资源  当请求路径是/static实际请求目录是./frontend/src/static
app.use('/static', express.static(path.join(__dirname, './frontend/src/static')))

let server = app.listen(port, function(err, data){
    console.log("express listening port: " + port);
})
//favicon.ico
app.get('/favicon.ico', (req, res, next) => {
    fs.readFile(path.join(__dirname, './favicon.ico'), (err, data) => {
        res.status(200).end(data);
    })
})
//首页
app.get('/', (req, res, next) => {
    fs.readFile(path.join(__dirname, views+'/index.html'), (err, data) => {
        res.status(200).end(data);
    })
})
app.get('/javascript', (req, res, next) => {
    fs.readFile(path.join(__dirname, views+'/javascript.html'), (err, data) => {
        res.status(200).end(data);
    })
})

app.get('/javascript/basic/js_basic.html', (req, res, next) => {
    fs.readFile(path.join(__dirname, views+'/javascript.html'), (err, data) => {
        res.status(200).end(data);
    })
})
//统一处理没有不存在的网址
app.use(function(req, res, next){
    res.setHeader('content-type', 'text/html')
    return res.status(500).end('<h2>error </h2>')
})