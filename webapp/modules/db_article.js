var mongoose = require('./mongooseConnect');
//创建Schema，设计文档模型
var Schema = mongoose.Schema;
var articleSchema = new Schema({
    article_id: Number,
    title: String,
    description: String,
    content: String,
    markdowncontent: String,
	tags: String,
	categories: String,
	type: String,
	status: Number,
	read_type: String,
	reason: String,
	resource_url: String,
	original_link: String,
	authorized_status: Boolean,
	check_original: Boolean,
	editor_type: Number,
    not_auto_saved: Number,
    classify_tags: String,
    classify_article: String, //
    classify_content: String
})

//根据Schema，设计集合内文档模型
var ArticleModel = mongoose.model('Article', articleSchema);//模型  articles集合

//导出该文档模型构造函数
module.exports = ArticleModel; 