var mongoose = require('./mongooseConnect');
//创建Schema，设计文档模型
var Schema = mongoose.Schema;
var articleClassifySchema = new Schema({
    fatherName: String, //"基础知识"
    fatherNameFlag: String, //"basic"
    childrenData: [
        {
            childName: String, //"let和const"
            childUrl:  String //  "js_basic"
        }
    ]
})

//根据Schema，设计集合内文档模型
var ArticleClassifyModel = mongoose.model('articleClassify', articleClassifySchema);//模型  articleClassifys集合

//导出该文档模型构造函数
module.exports = ArticleClassifyModel; 