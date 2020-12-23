/**
 * header头部信息
 * 在html末尾加载，填充id="header" div标签
 * 加载即执行
 */
;(function(){
    const headeritems = [
        {
            flag: "index",
            name: "首页",
            linkSrc: "/"
        },
        {
            flag: "github",
            name: "Github",
            linkSrc: "https://github.com/zhuyuzhu"
        }, {
            flag: "csdn",
            name: "CSDN",
            linkSrc: "https://blog.csdn.net/zyz00000000"
        }, {
            flag: "sifou",
            name: "思否",
            linkSrc: "https://segmentfault.com/"
        }, {
            flag: "jianshu",
            name: "简书",
            linkSrc: "https://www.jianshu.com/"
        },
        {
            flag: "juejin",
            name: "掘金",
            linkSrc: "https://juejin.im/"
        },
        {
            flag: "about",
            name: "关于",
            linkSrc: "/about"
        }
    ];


    let $headerUl = document.getElementById('header').firstElementChild;
    let  headerHtml = '';
    headeritems.forEach((item, index) => {
        headerHtml += `<a href="${item.linkSrc}" target="${item.flag == "about" || item.flag=="index" ? '_self' : '_blank'}"><li flag='${item.flag}'>${item.name}</li><a>`
    })
    $headerUl.innerHTML = headerHtml;
    
})()

