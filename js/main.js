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
    /* if (Boolean(numberUser) === true ){
      console.log('Что то ввели');
      numberUser = numberUser.trim();
      if(numberUser === ''){
        console.log('Пустая строка'); 
      } else {
        console.log('Ввели даные');  
        if(+numberUser > number) {
          console.log('Загаданное число меньше'); 
        } else if(+numberUser < number) {
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
  }

  return guess();

}
let guess = guessTheNumber();
guess();
