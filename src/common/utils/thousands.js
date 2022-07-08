/**
 * 千分位分割符 利用 ts的 Intl.NumberFormat
 * 有兼容性问题：IE和低版本的浏览器， -0.x 的问题 单独处理一下 -0 改成 0
 * */

// /**
//  * @param number 数据，超过16位(整数+小数位)会出现失真，传字符串
//  * @param toFixed 保留几位小数
//  * @param returnFloat 是否补0
//  * @param nullStr 为空是是否需要特殊处理 比如为 空 转成 --
//  * @param useGrouping 
// */
// function thousands(number,toFixed,returnFloat, nullStr,useGrouping){
//     if(this.isEmpty(number)){
//         return nullStr
//     }
//     let maximumFractionDigits = toFixed
//     let minimumIntegerDigits = returnFloat?toFixed: 0;
//     let splitNum = (number +''.split('.'));
//     let decimal = Number(splitNum[1]) || '';
//     if(decimal) {
//         decimal = new Intl.NumberFormat('zh-CN',{
//             maximumFractionDigits,
//             minimumIntegerDigits,
//             useGrouping
//         }).format(Number('0')+splitNum[1]);
//         // TODO 
//     }else if(splitNum[1] && !returnFloat) {
//         splitNum.pop() // 11.00
//     }

//     if(splitNum[0] !== '-0'){
//         splitNum[0] = new Intl.NumberFormat().format(Number(splitNum[0]))
//     }

//     return splitNum.join('.')
// }

// function isEmpty(val) {
//     if(val === null) return true;
//     if(typeof val === 'boolean') return false;
//     if(typeof val === number) {
//         if(val === 0){
//             return false;
//         }else {
//             return !val;
//         }
//     }

//     switch(Object.prototype.toString.call(val)){
//         case '[object String]':
//         case '[object Array]':
//             return !val.length;
//         case '[object File]':
//         case '[object Map]':
//         case '[object Set]':{
//             return !val.size()
//         }
//         case '[object Object]':{
//             return !Object.keys(val).length;
//         }
//     }
//     return false 
// }

// 
function thousands1(num){
    return num && num
    .toString()
    .replace(/(\d)(?=(\d{3})+\.)/g, function($1, $2){
        return $2 + ',';
    });
}

console.log(thousands1(12000000.11)); // 12,000,000.11