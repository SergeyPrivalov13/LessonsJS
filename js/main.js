'use strict';
/* function funcMath(a) {
  // Задаём переменную
  //const a = 10;
  // Возвращаем результат функцию
  return function(b) {
    console.log(a * b);    
  };
}

// Переменная которая вызывает функцию 
// и результат сохраняет в себе

const mathPow = funcMath(10);

// Получаю результат работы функции
mathPow(2); */
  
  /* let str = prompt;
  function name(val) {
    return function (str) {
      if(isNaN(str)) {          
        str = prompt;
        return temp(str);
      }
    };
  }
  const temp = name(24);
  temp(str); */

/* let isNumber = function(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let random = 10,
  numberUser = prompt('Угадай число от 1 до 100');

if (Boolean(numberUser) === true ){
  console.log('Что то ввели');
  numberUser = numberUser.trim();
  if(numberUser === ''){
    console.log('Пустая строка'); 
  } else {
    console.log('Ввели даные');  
    if(+numberUser > random) {
      console.log('Загаданное число меньше'); 
    } else if(+numberUser < random) {
      console.log('Загаданное число больше');  
    } else{
      console.log('Вы угадали!!!');
    }    
  }
} else {  
  if(numberUser === null){
    console.log('Нажали Отмена');  
  } else {
    console.log('Нажали OK с пустой строкой');  
  }  
} */


let question;
function check(val){
  let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  const start = function(){
    do {
      val = prompt('Угадай число от 1 до 100');    
    } while (!isNumber(val));
    
  };
  start();
  console.log(val);
  




  return val;
  

}
console.log(check(question));


function guessTheNumber() {

  function getRandomNumber() {
    
  }
  let number = getRandomNumber();

  function guess() {

  }

  let count = 23;
  function checkCounter() {

  }

  function endGame() {

  }

  return guess();

}
guessTheNumber();
