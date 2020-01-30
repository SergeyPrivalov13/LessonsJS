'use strict';
function random(a){
  // Проверка число или нет
  let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  do {
    a = prompt('Угадай число от 1 до 100');
    
  } while (!isNumber(a));

  

  console.log(a);
  console.log(typeof(a));

}
random();