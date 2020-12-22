var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/technology',{useMongoClient: true});

//监听连接数据库是否成功
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('success to  connect mongodb!')
});

//创建Schema，设计文档模型
var Schema = mongoose.Schema;
var javascriptSchema = new Schema({
  article_id: String,
  title: String,
  description: String,
  content: String
})

//根据Schema，设计集合内文档模型
var JavascriptModel = mongoose.model('Javascript', javascriptSchema);//模型
/*
//根据模型创建具体文档对象
var documentJS = new Javascript({//创建文档
  article_id: "1",
  title: "JavaScript基本概念",
  description: "描述信息",
  content: "内容文字"
})

//文档进行保存
documentJS.save(function(err, data){//documentJS文档进行保存，且调用对应的回到函数
  console.log(data);
})
*/
module.exports = JavascriptModel; //导出该文档模型构造函数