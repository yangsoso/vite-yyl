var a  = '2.3,3,5.6,7,6;11,3,8.6,25,1;0.3,9,5.3,66,7.8;1,3,2,7,5;340,670,80.6;<=,<=,<=';
// a11 = 2.3, 3, 5.6, 7, 6;
// a21 = 11, 3,  8.6, 25, 1;
// a31 = 0.3, 9, 5.3, 66, 7.8;

// x1 = 1, 3, 2, 7, 5;
// b1 = 340,b2= 670, b3= 80.6;

// <=,<=,<=

// 2.3*1 + 3*3+ 5.6*2 + 7*7+6*5
var b = a.split(';')
let c1, c2,c3 = 0;
let r = []
for(let i = 0;i< b.length; i++){
   let item =  b[i].split(',')
   //    拿到每一个数组
   console.log(item);
   if(i<= 3){
       let temp = 0
       for(let j = 0; j< item.length; j ++){
            temp = temp + (item[j] * item[3][j])
            console.log(b[3][j]);
       }
   }

//    console.log(c1,2.3*1+3*3+5.6*2+7*7+6*5);

}

function update(progressBarId, increase) {
    // Write the code that goes here
    function a(n) {
      return increase + n
    }
    const result = a()
    let value = document.getElementById(progressBarId).attributes('value')
    if(result >= 100) {
        document.getElementById(progressBarId).setAttribute('value',100);
        return true;
    }else {
        document.getElementById(progressBarId).setAttribute('value',result)
        return false;
    }
   
  }
  
  // Example case. 
  document.body.innerHTML = `<progress id="loading-bar" value="0" max="100"></progress>`;
  console.log(update("loading-bar", 50)); // should return false and loading-bar's value should be 50.
  console.log(update("loading-bar", 50)); // should return true and loading-bar's value should be 100.


  