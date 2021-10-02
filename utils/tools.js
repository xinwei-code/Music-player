/*函数节流（时间差）：如果interval不传，则默认300ms*/
function throttle(fn, interval) {
    var enterTime = 0; //触发的时间
    var gapTime = interval || 300; //间隔时间，如果interval不传，则默认300ms
    return function () {
        var context = this;
        var backTime = new Date(); //第一次函数return即触发的时间
        if (backTime - enterTime > gapTime) {
            fn.call(context, arguments);
            enterTime = backTime; //赋值给第一次触发的时间，这样就保存了第二次触发的时间
        }
    };
}

/*函数防抖（定时器）：如果interval不传，则默认1000ms*/
function debounce(fn, interval) {
    let timer = null
    let delay = interval || 1000; //间隔时间，如果interval不传，则默认1000ms
    return function () {
        clearTimeout(timer);
        let context = this;
        let args = arguments; //保存此处的arguments，因为setTimeout是全局的，arguments不是防抖函数需要的。
        timer = setTimeout(() => {
            fn.call(context, args);
        }, delay);
    };
}

module.exports = {
    throttle,
    debounce
};