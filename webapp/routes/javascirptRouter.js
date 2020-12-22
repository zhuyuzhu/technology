var express = require('express');
var fs = require('fs');
var path = require('path');
var jsRouter = express.Router();
let JavascriptModel = require('../modules/javascript/db_javascript');


let views = '../frontend/src/views'; //前端views文件夹路径

// middleware that is specific to this router
jsRouter.use(function (req, res, next) {
    console.log('Time: ', Date.now())
    next()
})
//handel /javascript request
jsRouter.get('/', (req, res, next) => {
    fs.readFile(path.join(__dirname, views + '/javascript.html'), (err, data) => {
        res.status(200).end(data);
    })
})

jsRouter.get('/basic/js_basic', function (req, res, next) {
    //Model.find 返回数组，包含多个结果
    JavascriptModel.findOne({ article_id: "106322980" }, function (err, docs) {
        res.status(200).render('javascript.html', {
            docs
        })
    })
})
//keycode码
jsRouter.get('/basic/js_keyCode', function (req, res, next) {
    //Model.find 返回数组，包含多个结果
    JavascriptModel.findOne({ article_id: "88551188" }, function (err, docs) {
        res.status(200).render('javascript.html', {
            docs
        })
    })
})
//事件循环和任务队列
jsRouter.get('/js_garbageColletion/js_EventLoop', function (req, res, next) {
    //Model.find 返回数组，包含多个结果
    JavascriptModel.findOne({ article_id: "107390035" }, function (err, docs) {
        res.status(200).render('javascript.html', {
            docs
        })
    })
})
//内置构造函数原型
jsRouter.get('/function/js_prototype', function (req, res, next) {
    //Model.find 返回数组，包含多个结果
    JavascriptModel.findOne({ article_id: "106559385" }, function (err, docs) {
        res.status(200).render('javascript.html', {
            docs
        })
    })
})
//函数原型
jsRouter.get('/function/js_proto__', function (req, res, next) {
    //Model.find 返回数组，包含多个结果
    JavascriptModel.findOne({ article_id: "106425207" }, function (err, docs) {
        res.status(200).render('javascript.html', {
            docs
        })
    })
})

//Function函数类型
jsRouter.get('/function/js_functionn', function (req, res, next) {
    //Model.find 返回数组，包含多个结果
    JavascriptModel.findOne({ article_id: "106559765" }, function (err, docs) {
        res.status(200).render('javascript.html', {
            docs
        })
    })
})

// define the save button route
jsRouter.post('/save', (req, res, next) => {
    var reqbody = req.body;
    var documentJS = new JavascriptModel({//根据模型创建文档对象
        article_id: reqbody.article_id,
        title: reqbody.title,
        description: reqbody.description,
        content: reqbody.content
    })
    //   文档进行保存
    documentJS.save(function (err, data) {//documentJS文档进行保存，且调用对应的回到函数
        res.status(200).end(data.article_id)
    })
})

module.exports = jsRouter