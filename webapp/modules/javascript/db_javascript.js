var mongoose = require('../mongooseConnect');
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

//导出该文档模型构造函数
module.exports = JavascriptModel; 