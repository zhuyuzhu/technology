import { constructLeftTree } from './lefttree.js';
let projectName = "/javascript";
let treeData = [
    //基础知识：
    {
        fatherName: "基础知识",
        fatherNameFlag: "basic",
        childrenData: [
            {
                childName: "基础知识(一)",
                childUrl: "js_basic"
            },
            {
                childName: "基础知识(二)",
                childUrl: "js_basic_knowledge"
            },
            {
                childName: "运算符优先级",
                childUrl: "js_operational_character_priority"
            }, {
                childName: "JavaScript的位操作符",
                childUrl: "js_bitwise_perators"
            },
            {
                childName: "keyCode码",
                childUrl: "js_keyCode"
            }
        ]
    },
    //高级知识
    {
        fatherName: "高级知识",
        fatherNameFlag: "advancedKnowledge",
        childrenData: [
            {
                childName: "数据类型",
                childUrl: "js_dataType"
            },
            {
                childName: "typeOf",
                childUrl: "js_typeOf"
            },
            {
                childName: "instanceof",
                childUrl: "js_instanceof"
            },
            {
                childName: "toString",
                childUrl: "js_toString"
            },
            {
                childName: "constructor判断数据类型",
                childUrl: "js_constructor"
            },
            {
                childName: "操作符--隐式类型转换",
                childUrl: "js_dataTypeTransform"
            },
            {
                childName: "包装类对象",
                childUrl: "js_primitiveObject"
            }, {
                childName: "with",
                childUrl: "js_with"
            },
            {
                childName: "递归",
                childUrl: "js_recursion"
            }
        ]
    },

    //布尔值
    {
        fatherName: "布尔值",
        fatherNameFlag: "",
        childrenData: [
            {
                childName: "Boolean",
                childUrl: "js_boolean"
            }
        ]
    },
    //数字
    {
        fatherName: "数字",
        fatherNameFlag: "",
        childrenData: [
            {
                childName: "Number",
                childUrl: "js_number"
            }
        ]
    },
    //字符串
    {
        fatherName: "字符串",
        fatherNameFlag: "",
        childrenData: [
            {
                childName: "String",
                childUrl: "js_string"
            },
            {
                childName: "String字符串方法",
                childUrl: "js_string_funcs"
            }
        ]
    },
    //数组
    {
        fatherName: "数组",
        fatherNameFlag: "",
        childrenData: [
            {
                childName: "js数组",
                childUrl: "js_array"
            },
            {
                childName: "js数组方法",
                childUrl: "js_array_methods"
            },
            {
                childName: "数组练习题",
                childUrl: "js_array_problem"
            }
        ]
    },
    //对象
    {
        fatherName: "对象",
        fatherNameFlag: "js_object",
        childrenData: [
            {
                childName: "new操作符",
                childUrl: "object_new"
            },
            {
                childName: "获取对象属性的方法",
                childUrl: "js_object_getProperty_funcs"
            },
            {
                childName: "数据属性和访问器属性",
                childUrl: "object_property"
            },
            {
                childName: "Object构造函数方法(一)",
                childUrl: "object_method1"
            },
            {
                childName: "Object构造函数方法(二)",
                childUrl: "object_method2"
            },
            {
                childName: "Object构造函数方法(三)",
                childUrl: "object_method3"
            },
            {
                childName: "继承和原型链",
                childUrl: "object_inherit"
            }
        ]
    },
    //函数
    {
        fatherName: "函数",
        fatherNameFlag: "function",
        childrenData: [
            {
                childName: "Function类型",
                childUrl: "js_function"
            },
            {
                childName: "内置构造函数原型",
                childUrl: "js_prototype"
            },
            {
                childName: "函数原型",
                childUrl: "js_proto__"
            },
            {
                childName: "arguments",
                childUrl: "js_arguments"
            },
            {
                childName: "闭包",
                childUrl: "js_closure"
            },
        ]
    },
    //内置对象
    {
        fatherName: "内置对象",
        fatherNameFlag: "",
        childrenData: [
            {
                childName: "日期对象Date",
                childUrl: "js_internal_date"
            },
            {
                childName: "Math对象 ",
                childUrl: "js_math"
            }
        ]
    },
    {
        fatherName: "JOSN对象",
        fatherNameFlag: "js_JSON",
        childrenData: [
            {
                childName: "JSON对象",
                childUrl: "js_json"
            }
        ]
    },
    {
        fatherName: "正则表达式",
        fatherNameFlag: "RegularExpression",
        childrenData: [
            {
                childName: "js正则表达式",
                childUrl: "js_regular_expression"
            }, {
                childName: "正则表达式相关方法",
                childUrl: "js_regular_expression_methods"
            }, {
                childName: "练习题一",
                childUrl: "js_limit_number_length"
            }, {
                childName: "面试题",
                childUrl: "reg_interview_question"
            }
        ]
    },
    //额外补充
    {
        fatherName: "额外补充",
        fatherNameFlag: "js_garbageColletion",
        childrenData: [
            {
                childName: "垃圾回收机制",
                childUrl: "js_garbageColletion"
            }, {
                childName: "事件循环和任务队列",
                childUrl: "js_EventLoop"
            }, {
                childName: "浏览器渲染和性能优化",
                childUrl: "browser_render"
            }, {
                childName: "浏览器工作原理",
                childUrl: "browser_work_principle"
            }
        ]
    },
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


// $('.content-wrapper').width($(window).width() - 280)

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
    let newContent = JSON.parse($contentViews.text()); //输入的新内容，来自CSDN复制的内容JSON对象。
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
