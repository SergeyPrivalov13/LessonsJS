'use strict';

function guessTheNumber() {

  // Функция рандомного числа
  function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }  
  let number = getRandomInRange(1, 100);
  console.log(number); 
  
  let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  // Функция проверки
  function guess() {    
    let numberUser = prompt('Угадай число от 1 до 100');

    if (numberUser === null) {
      console.log('Нажали Отмена');
      alert('Игра оконченна');
    } else if(isNumber(numberUser)){
      console.log(numberUser);
      console.log(typeof(numberUser));

      numberUser = +numberUser;

      if(numberUser > number) {
        console.log('Загаданное число меньше');
        alert('Загаданное число меньше');
        guess(); 
      } else if(numberUser < number) {
        console.log('Загаданное число больше');
        alert('Загаданное число больше');
        guess();  
      } else{
        console.log('Вы угадали!!!');
        alert('Вы угадали!!!');
        return;
      }      
    } else {
      console.log('Введите число'); 
      alert('Введите число');
      guess();     
    }
  }
  return guess();
}
let guess = guessTheNumber();

