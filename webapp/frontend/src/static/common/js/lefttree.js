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

let constructLeftTree = function (data, projectName) {
    let $leftTree = document.getElementById('lefttree');
    let leftTreeHtml = '';


    data.forEach(item => {
        let childHtml = '';
        item.childrenData.forEach(childItem => {
            childHtml += `<a href="${projectName+'/'+item.fatherNameFlag+'/'+childItem.childUrl}"><li>${childItem.childName}</li></a>`
        })
        leftTreeHtml += `<div>
        <div class="sidebar-item">
            <div class="technology-title">
                <i class="iconfont icon-chevron-right">&#xe618;</i>
                <span>${item.fatherName}</span> 
            </div>
            <ul>
                ${childHtml}
            </ul>
        </div>
    </div>`
    })
    $leftTree.innerHTML = leftTreeHtml;

    // 获取不到dom，是因为html结构还没有构造出来
    let $iconChevronRights = $('#lefttree .technology-title'); //
    let $itemUl = $('.sidebar-item ul'); //所有的UL

    $iconChevronRights.on('click', function (event) {
        let $ul = $(this).parents('div.sidebar-item').find('ul');
        let $icon = $(this).parents('div.sidebar-item').find('.icon-chevron-right'); //该icon
        let $rotate90Icon = $('.rotate90'); //旋转90°的icon
        if ($icon.hasClass('rotate90')) {//展开——收起
            $icon.removeClass('rotate90').addClass('rotate0');
            $ul.hide();
        } else { //收起——展开
            $icon.addClass('rotate90').removeClass('rotate0')
            $ul.show();
        }
    })
}

export {constructLeftTree};
