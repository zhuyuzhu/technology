let express = require('express');
let app = express();

//第三方中间件先引入且生效
let thirdPartyMidWare = require('./middleware/thirdPartyMiddleware');
thirdPartyMidWare(app);

//各个项目路由引入到webapp中
let jsRouter = require('./routes/javascirptRouter');

let port = "8080";

let server = app.listen(port, function(err, data){
    console.log("express listening port: " + port);
})

//以/javascript开头的请求，进入jsRouter进行处理
app.use('/javascript', jsRouter)

//公共路由处理，比如图标，静态资源，错误路由，错误处理
let publicRouter = require('./routes/publicRouter');
publicRouter(app);