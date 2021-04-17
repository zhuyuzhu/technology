let express = require('express');
let app = express();

//第三方中间件先引入且生效
let thirdPartyMidWare = require('./middleware/thirdPartyMiddleware');
thirdPartyMidWare(app);

//各个项目路由引入到webapp中
let jsRouter = require('./routes/javascirptRouter');
let es6Router = require('./routes/es6Router');

let port = "8080";

let server = app.listen(port, function(err, data){
    console.log("express listening port: " + port);
})
//预检和post请求都走了这里
// app.use((req, res, next) => {
//     console.log(req)
//     res.header( 'Access-Control-Allow-Origin' , 'http://localhost:3000') // 跨域最重要的一步 设置响应头
//     res.header('Access-Control-Allow-Credentials','true'); //Access-Control-Allow-Origin不能是*
//     res.header('Access-Control-Allow-Headers', 'x-pingother, Content-Type')
//     res.status(200).end('111')
//     next(); // 执行next函数执行后续代码
// })

/**
 * 预检请求：检查  允许的源、允许的请求头信息、如果客户端想带cookie凭证，也要预检Credentials凭证
 */
app.options('/crossOrigin', (req, res) => {
    console.log(req)
    res.header( 'Access-Control-Allow-Origin' , 'http://localhost:3000') // 跨域最重要的一步 设置响应头
    //res.header('Access-Control-Allow-Credentials','true'); //Access-Control-Allow-Origin不能是*
    res.header('Access-Control-Allow-Headers', 'x-pingother, Content-Type')
    res.status(200).end();
})
app.post('/crossOrigin', (req, res) => {
    console.log(req.cookies)
    res.header( 'Access-Control-Allow-Origin' , 'http://localhost:3000')
    res.header('Access-Control-Allow-Methods', 'POST')
    res.header('Access-Control-Allow-Headers', 'x-pingother, Content-Type')
    res.header('Access-Control-Allow-Credentials','true'); //Access-Control-Allow-Origin不能是*
    res.header("Content-Type", "application/json;charset=utf-8")
    res.status(200).end(JSON.stringify(req.body))
})

//以/javascript开头的请求，进入jsRouter进行处理
app.use('/javascript', jsRouter)
app.use('/es6', es6Router);


//公共路由处理，比如图标，静态资源，错误路由，错误处理
let publicRouter = require('./routes/publicRouter');
publicRouter(app);