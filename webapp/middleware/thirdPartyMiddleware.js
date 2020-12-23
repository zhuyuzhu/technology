/**
 * 添加body-parser中间件
 * 添加express-art-templete
 * 
 */
let path = require('path');
let bodyParser = require('body-parser'); //处理post请求的body
let views = '../frontend/src/views'; //前端views文件夹路径

module.exports = function (app) {
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
}