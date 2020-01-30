'use strict';
let arr = ['75632', '867476', '99682', '22274', '36958', '8711', '0492'];

if (arr.length > 0){  
  for(let i = 0; i < arr.length; i++){
    let num = arr[i],
      result = /[24]/.test(num);
      if(result === true ){
        console.log(num);  
      } 
  }  
}else {
  console.log('Массив пуст');  
}


// Задание 2
let n = 100;
nextPrime:
for (let i = 2; i <= n; i++) { 
  for (let j = 2; j < i; j++) { 
    if (i % j === 0) {continue nextPrime;} 
  }
  console.log(`Делители числа ${i}: 1 и ${i}`); // простое число
}

function primes(N) {
  let res = [2];
  for (let i = 3; i < N; i+=2) {
    let isPrime = true;
    for (let k = 0, limit = Math.sqrt(i); res[k] <= limit; ++k) {
      let d = res[k];
      if (i % d === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      res.push(i);
    }
  }
  return res;
}

let res = primes(100);

// res.join(', ')
function listJoin(list, sep = ',') {
  let str = '';
  for (let i = 0; i < list.length; ++i) {
    let el = list[i];
    str += el;
    if (i < list.length-1) {
      str += sep;
    }
  }
  return str;
}
//console.log(res.length);
let result = listJoin(res, ', ').split(',');
for(let k = 0; k < result.length; k++){
  console.log(`Делители числа ${result[k]}: 1 и ${result[k]}`);
  
}