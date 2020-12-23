var express = require('express');
var path = require('path');
var fs = require('fs');

let views = '../frontend/src/static';
module.exports = function (app) {
    //开放静态资源  当请求路径是/static实际请求目录是./frontend/src/static
    app.use('/static', express.static(path.join(__dirname, views)))

    //favicon.ico
    app.get('/favicon.ico', (req, res, next) => {
        fs.readFile(path.join(__dirname, './favicon.ico'), (err, data) => {
            res.status(200).end(data);
        })
    })
    //首页
    app.get('/', (req, res, next) => {
        fs.readFile(path.join(__dirname, '../frontend/src/views/index.html'), (err, data) => {
            res.status(200).end(data);
        })
    })
    //统一处理没有不存在的网址
    app.use(function (req, res, next) {
        res.setHeader('content-type', 'text/html')
        return res.status(500).end('<h2>error </h2>')
    })

    //统一处理所有的err报错
    app.use(function (err, req, res, next) {
        console.log(err);
        return res.status(500).end(err)
    })
}