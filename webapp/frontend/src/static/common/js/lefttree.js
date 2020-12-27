const data = [
    {
        fatherNameFlag: "name",
        childrenData: [
            {
                childName: "child1",
                childUrl: "c1",
                childData: "111"
            }, {
                childName: "child2",
                childUrl: "c2",
                childData: "222"
            }
        ]
    }, {
        fatherNameFlag: "name",
        childrenData: [
            {
                childName: "child1",
                childUrl: "c1",
                childData: "111"
            }, {
                childName: "child2",
                childUrl: "c2",
                childData: "222"
            }
        ]
    }
]
/**
 * 根据数据构建树
 * 根据当前url确定展开哪个节点
 * @param {*} data 
 * @param {*} projectName 
 */
let constructLeftTree = function (data, projectName) {
    //正则匹配获取url地址中的文章分类，比如/javascript/basic 中javascript和basic
    let locationUrl = new URL(location.href);
    let pathname = locationUrl.pathname; //    /javascript/basic/js_basic
    let reg = /(?<=\/)\w+/g;//匹配前面是/的字符串
    let resultArr = pathname.match(reg)

    let $leftTree = document.getElementById('lefttree');
    let leftTreeHtml = '';
    data.forEach(item => {
        let childHtml = '';
        item.childrenData.forEach(childItem => {
            childHtml += `
            <li class="${childItem.childUrl} ${childItem.childUrl == resultArr[2] ? 'active' : ''}">
                <a href="${projectName + '/' + item.fatherNameFlag + '/' + childItem.childUrl}">${childItem.childName}</a>
            </li>`
        })
        childHtml += `<li class="iconfont new_article">新增&nbsp;&nbsp;&#xe604;</li>`;

        leftTreeHtml += `<div>
        <div class="sidebar-item">
            <div class="technology-title ${item.fatherNameFlag}">
                <i class="iconfont icon-chevron-right ${item.fatherNameFlag == resultArr[1] ? 'rotate90deg' : ''}">&#xe618;</i>
                <span>${item.fatherName}</span> 
            </div>
            <ul style="display:${item.fatherNameFlag == resultArr[1] ? 'block' : 'none'}">
                ${childHtml}
            </ul>
        </div>
    </div>`
    })
    leftTreeHtml += `<div class="sidebar-item">
                        <div class="technology-title">
                            <i class="iconfont icon-chevron-right">&#xe618;</i>
                            <span>新增</span> 
                        </div>
                        <ul style="display:block'}">
                            <li class="iconfont new_article">新增&nbsp;&nbsp;&#xe604;</li>
                        </ul>
                    </div>`
    $leftTree.innerHTML = leftTreeHtml;

    // 获取不到dom，是因为html结构还没有构造出来
    let $iconChevronRights = $('#lefttree .technology-title');
    let $itemUl = $('.sidebar-item ul'); //所有的UL

    $iconChevronRights.on('click', function (event) {
        let $ul = $(this).parents('div.sidebar-item').find('ul');
        let $icon = $(this).parents('div.sidebar-item').find('.icon-chevron-right'); //该icon
        let $rotate90Icon = $('.rotate90'); //旋转90°的icon
        if ($icon.hasClass('rotate90')) {//展开——收起
            $icon.removeClass('rotate90').addClass('rotate0');
            $ul.hide();
        } else if ($icon.hasClass('rotate90deg')) { //页面加载时添加的类，点击时需要移除
            $icon.removeClass('rotate90deg').addClass('rotate0')
            $ul.hide();
        } else { //收起——展开
            $icon.addClass('rotate90').removeClass('rotate0')
            $ul.show();
        }
    })

    let $new_article = $('.new_article')
}

export { constructLeftTree };
