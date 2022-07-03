/**
 * @Description 排序算法 algorithms
 * TODO 检查代码执行是否ok 性能比较
*/

// 选择排序
function selectSort(arr) {
	for(let i= 0;i<arr.length -1;i++){
	 	let minIndex = i;
		for(let j = i+1; j<arr.length;j++){
			if(arr[ j ] < arr[ i ]){
				minIndex = j;
			}
				
		}

		if(minIndex != i){
			let temp = arr[i];
			arr[i] = arr[minIndex];
			arr[minIndex] = temp;
			
		}
	}
    
}

// 冒泡排序
function swap(arr, i, j) {
    [ arr[i], arr[j] ] = [ arr[j], arr[i] ]
}

// 遍历交换
function bubbleSort(arr) {
    for(let i = 0 ; i < arr.length; i++){
        if(arr[i] < arr[i+1] ) {
            swap(arr, i, i+1)
        }
    }
}

// 快速排序
function quickSort(arr) {
    if(arr.length <=1) return arr;
    // 定基数,找到数组的中间项，在原来的数组中移除他
    const midIndex = Math.floor(arr.length/2);
    const middle = arr.splice(midIndex,1)[0];
    // 定义左右接收数组
    const leftArr= [];
    const rightArr = [];
    // 遍历
    for(let i = 0; i< arr.length; i++) {
        let current = arr[i];
        current<middle ? leftArr.push(current) : rightArr.push(current)
    }
    return quickSort(leftArr).concat(middle ).concat(quickSort(rightArr));	
}

const arr = [5, 2, 7, 8, 34, 7, 39, 12, 56, 9, 1];

console.time('time');
console.log(selectSort(arr));
console.timeEnd('time');