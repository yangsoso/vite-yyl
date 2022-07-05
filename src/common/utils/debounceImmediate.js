/** 防抖： 事件被触发 N 秒后在执行回调， 小于 N 秒内不重新计算时间 不执行回调
 *  使用场景： 按钮提交、服务端验证、搜索框请求
 * 
*/

const debounceImmediate = (cb, delay = 1000, immediate = true) =>{
    let timer = null;
    return function(...args){
        const context = this;

        const execNow = immediate && !timer;

        if(timer) clearTimeout(timer);
        timer = setTimeout(()=> {
            cb.apply(context,args);
            timer = null
        },delay);

        execNow && cb.apply(context,args); // 立即先执行一次
    }
}

debounceImmediate(this.add('1','2'), 100)