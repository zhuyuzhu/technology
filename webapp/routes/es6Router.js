var express = require('express');
var fs = require('fs');
var path = require('path');
var es6Router = express.Router();
let ArticleModel = require('../modules/db_article');

//
// es6Router.use(function(req, res, next){
//     next();
// })
es6Router.get('/', (req, res, next) => {
    fs.readFile(path.join(__dirname, '../frontend/src/views/articleTpl.html'), (err, data) => {
        if(err){
            return next();
        }
        res.end(data);
    })
})

module.exports = es6Router;