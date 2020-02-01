'use strict';

function guessTheNumber() {

  // Функция рандомного числа
  function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }  
  const number = getRandomInRange(1, 100);
  console.log(number); 
  
  const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  // Функция проверки
  function guess() {    
    let numberUser = prompt('Угадай число от 1 до 100');

    if (numberUser === null) {
      alert('Игра оконченна');
    } else if(isNumber(numberUser)){
      numberUser = +numberUser;

      if(numberUser > number) {
        alert('Загаданное число меньше');
        guess(); 
      } else if(numberUser < number) {
        alert('Загаданное число больше');
        guess();  
      } else{
        alert('Вы угадали!!!');
        return;
      }      
    } else {
      alert('Введите число');
      guess();     
    }
  }
  return guess();
}
guessTheNumber();

