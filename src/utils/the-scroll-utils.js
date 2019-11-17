/**
 * 拉出 scrollHeight 并 parseInt 一下
 * (这个不必跟 vue 文件藕合在一块)
 * @returns { number } 整数值
 */
export function geScrollHeight() {
    const bodyScrollHeight = document.body.scrollHeight || 0;
    const documentScrollHeight = document.documentElement.scrollHeight || 0;
    // 返回两者中较大的一个 当页面内容超出浏览器可视窗口大小时，Html的高度包含body高度+margin+padding+border所以html高度可能会大于body高度
    return window.parseInt(Math.max(bodyScrollHeight, documentScrollHeight), 10);
    // return (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight
}

/**
 * 判断是否滑动到底部
 * (这个不必跟 vue 文件藕合在一块)
 * @returns { boolean } 是或否
 */
export function checkBottom() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;// 获取滚动条的高度
    const winHeight = document.documentElement.clientHeight || document.body.clientHeight; // 一屏的高度
    const scrollHeight = geScrollHeight();

    return scrollTop >= (scrollHeight - winHeight - 1);
}
