export function throttle(fn,delay){
        var lastTime;
        var timer;
        // console.log(1)
        var delay = delay || 200;
        return function() {
          var args = arguments;
          // 记录当前函数触发的时间
          var nowTime = Date.now();
          if (lastTime && nowTime - lastTime < delay) {
            clearTimeout(timer);
            timer = setTimeout(function () {
              // 记录上一次函数触发的时间
        //       console.log(3)
              lastTime = nowTime;
              // 修正this指向问题
              fn.apply(this, args);
            }, delay);
          }else{
            lastTime = nowTime;
            fn.apply(this, args);
          }
        }
      } 
export function debounce(fn, delay) {

  let timer = null
  return function () {
      let arg = arguments
      
      clearTimeout(timer)
      
      timer = setTimeout(() => {
          fn.apply(this, arg)
      }, delay)
    }
}
  