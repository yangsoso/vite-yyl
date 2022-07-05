/** 节流： 每隔一段时间执行一次，间隔执行
 *  使用场景：拖拽、缩放、动画
 * 
*/

// 使用时间戳
const throttleUseTimeStamp = (cb, delay = 100) =>{
    let startTime = Date.now();
    return function(...args) {
        const context = this;
        const now = Date.now();
        if(now - startTime >= delay){
            cb.apply(context, args);
            startTime = Date.now();
        }
    }
}

// 使用定时器
const throttleUseTimer = (cb, delay = 100) =>{
    let timer  = null;
    return function(...args) {
        const context = this;
        if(!timer){
            timer = setTimeout(() => {
                cb.apply(context,args);
                timer = null;
            },delay);
        }
    }
}
