var express = require('express');
var fs = require('fs');
var path = require('path');
var jsRouter = express.Router();
let ArticleModel = require('../modules/db_article');

// middleware that is specific to this router
jsRouter.use(function (req, res, next) {
    console.log('Time: ', Date.now())
    next()
})
//handel /javascript request 302永久重定向
jsRouter.get('/', (req, res, next) => {
    fs.readFile(path.join(__dirname, '../frontend/src/views/javascript.html'), (err, data) => {
        res.status(302).end(data);
    })
})
/**
 * 基础知识
 */
jsRouter.get('/basic/js_basic', function (req, res, next) {
    //Model.find 返回数组，包含多个结果
    ArticleModel.findOne({ article_id: "107078428" }, function (err, docs) {
        if(err){
            return res.status(200).end('1111')
        }
        res.status(200).render('articleTpl.html', {
            docs
        })
    })
})
jsRouter.post('/basic/js_basic', function (req, res, next) {
    //Model.find 返回数组，包含多个结果
    ArticleModel.findOneAndUpdate({ article_id: "107078428" }, { content: req.body.content }, function (err, docs) {
        if(err){
            return next(err)
        }
        res.status(200).end(JSON.stringify({
            success: true,
            code: 1,
            data: req.body.content
        }))
    })

})

//事件循环和任务队列
jsRouter.get('/js_garbageColletion/js_EventLoop', function (req, res, next) {
    //Model.find 返回数组，包含多个结果
    ArticleModel.findOne({ article_id: "107390035" }, function (err, docs) {
        res.status(200).render('javascript.html', {
            docs
        })
    })
})
//内置构造函数原型
jsRouter.get('/function/js_prototype', function (req, res, next) {
    //Model.find 返回数组，包含多个结果
    ArticleModel.findOne({ article_id: "106559385" }, function (err, docs) {
        res.status(200).render('javascript.html', {
            docs
        })
    })
})
//函数原型
jsRouter.get('/function/js_proto__', function (req, res, next) {
    //Model.find 返回数组，包含多个结果
    ArticleModel.findOne({ article_id: "106425207" }, function (err, docs) {
        res.status(200).render('javascript.html', {
            docs
        })
    })
})

//Function函数类型
jsRouter.get('/function/js_functionn', function (req, res, next) {
    //Model.find 返回数组，包含多个结果
    ArticleModel.findOne({ article_id: "106559765" }, function (err, docs) {
        res.status(200).render('javascript.html', {
            docs
        })
    })
})

// define the save button route
jsRouter.post('/save', (req, res, next) => {
    var reqbody = req.body;
    var documentJS = new ArticleModel({//根据模型创建文档对象
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

jsRouter.use('/', (req, res, next) => {
    res.status(200).render('articleTpl.html', {
        docs: {
            content: "未实现的页面"
        }
    })
})

module.exports = jsRouter