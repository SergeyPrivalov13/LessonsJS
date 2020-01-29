'use strict';
let arr = ['75632', '867476', '99682', '22274', '36958', '8711', '0492'];

if (arr.length > 0){  
  for(let i = 0; i < arr.length; i++){
    let num = arr[i].split('');
    console.log(num);
    
    
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
