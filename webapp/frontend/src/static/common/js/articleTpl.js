import { constructLeftTree } from './lefttree.js';
let projectName = "/javascript";
let treeData = [
    //基础知识：
]

constructLeftTree(treeData, projectName);

let $contentViews = $('#content_views'); // 内容区
let $editBtn = $('#article_content .edit_content'); //编辑此页按钮
let $saveBtn = $('#article_content .save_content'); // 保存按钮
let $cancelBtn = $('#article_content .cancel_content'); // 取消按钮

let oldContent = ''; //旧内容 结构是html

//正则匹配获取url地址中的文章分类，比如/javascript/basic 中javascript和basic
let locationUrl = new URL(location.href);
let pathname = locationUrl.pathname; //    /javascript/basic/js_basic
let reg = /(?<=\/)\w+/g;//匹配前面是/的字符串
let resultArr = pathname.match(reg)


//编辑此页
$editBtn.on('click', function () {
    oldContent = $contentViews.html();
    $contentViews.attr('contenteditable', true).text("").css('border', '1px solid black');
    $(this).hide();
    $saveBtn.show();
    $cancelBtn.show();
})

//保存
$saveBtn.on('click', function () {
    newContent = JSON.parse($contentViews.text()); //输入的新内容，来自CSDN复制的内容JSON对象。
    let param = {
        classify_tags: resultArr[0],
        classify_article: resultArr[1],
        classify_content: resultArr[2]
    };
    let propertiesArr = Object.keys(newContent)
    propertiesArr.forEach(prop => {
        param[prop] = newContent[prop]
    })
    //发送ajax请求
    $.post(location.href, param, res => {
        res = JSON.parse(res);
        if (res.success) {
            $contentViews.attr('contenteditable', false).html(res.data).css('border', '');
            $(this).hide();
            $cancelBtn.hide();
            $editBtn.show();
        } else {
            alert('编辑内容失败')
        }
    })
})

//取消保存
$cancelBtn.on('click', function () {
    $(this).hide();
    $saveBtn.hide();
    $editBtn.show();
    $contentViews.attr('contenteditable', false).css('border', '').html(oldContent)
})
