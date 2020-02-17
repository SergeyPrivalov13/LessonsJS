document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Функция Таймера
  const countTimer = (deadLine) => {
    const
      // Блок с полями
      timerBlock = document.getElementById('timer'),
      // Поле Часа
      timerHours = document.getElementById('timer-hours'),
      // Поле Минут
      timerMinutes = document.getElementById('timer-minutes'),
      // Поле Секунд
      timerSeconds = document.getElementById('timer-seconds');
    let timers;

    // Функция вычисления оставшегося времени
    const getTimeRemaning = () => {
      const 
      // Текущая дата в миллисекундах
      dateNow = new Date().getTime(),
      // Время окончания таймера(deadLine) в миллисекундах
      dateStop = new Date(deadLine).getTime(),
      // Разница между dateNow и dateStop в секундах;
      timeRemaining = (dateStop - dateNow) / 1000,
      // Секунды
      seconds = Math.floor(timeRemaining % 60),
      // Минуты
      minutes = Math.floor(timeRemaining / 60) % 60,
      // Часы
      hours = Math.floor(timeRemaining / 60 / 60) % 24;
      // Возврвщаем результат
      return {timeRemaining, hours, minutes, seconds};
    };

    // Таймер для вызова функции каждую секунду
    const updateClock = () => {
      // Привязываем вызов функции к переменной
      let timer = getTimeRemaning();      

      if(timer.timeRemaining > 0){
        // Задаём условие для появления "0"
        timerHours.textContent = timer.hours < 10 ? `0${timer.hours}` : `${timer.hours}`;
        timerMinutes.textContent = timer.minutes < 10 ? `0${timer.minutes}` : `${timer.minutes}`;
        timerSeconds.textContent = timer.seconds < 10 ? `0${timer.seconds}` : `${timer.seconds}`;        
      } else {
        // Если время истекло всё обнуляем
        timerHours.textContent = `00`;
        timerMinutes.textContent = `00`;
        timerSeconds.textContent = `00`;
        timerBlock.style.color = 'red';
        clearInterval(timers);
      }
    };
    timers = setInterval(updateClock, 1000);
  };
  countTimer('17 February 2020 19:00:50');



























});