var isIOS = navigator.userAgent.match(/iphone|ipod|ipad/gi);
(function (doc, win) {
    var docEl = doc.documentElement,
        dpr = isIOS ? Math.min(win.devicePixelRatio, 3) : 1,
        scale = 1 / dpr,
        resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize';
    docEl.dataset.dpr = dpr;
    var metaEl = doc.createElement('meta');
    metaEl.name = 'viewport';
    metaEl.content = 'initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ", user-scalable=no";
    docEl.firstElementChild.appendChild(metaEl);
    var recalc = function () {
        var width = docEl.clientWidth;
        docEl.style.fontSize = 100 * (width / 640) + 'px';
    };
    recalc();
    win.addEventListener(resizeEvt, recalc, false);
})(document, window);