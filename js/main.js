document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Таймер
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
  countTimer('5 May 2020 19:00:50');

  // Меню
  const toggleMenu = () => {
    const
      // Кнопка Меню
      btnMenu = document.querySelector('.menu'),
      // Блок с меню
      menu = document.querySelector('menu'),
      // Крестик закрытия окна
      btnClose = document.querySelector('.close-btn'),
      // Список меню
      menuItem = menu.querySelectorAll('ul>li');
    
    // Функция отселживает translateX
    const handlerMenu = () => {
      /* if(!menu.style.transform || menu.style.transform === `translateX(-100%)`){
        menu.style.transform = `translateX(0)`;
      } else {
        menu.style.transform = `translateX(-100%)`;
      } */
      menu.classList.toggle('active-menu');
    };
      
      // Клик по меню
      btnMenu.addEventListener('click', handlerMenu);

      // Клик по крестику
      btnClose.addEventListener('click', handlerMenu);

      // Отслеживаем клик по пунктам меню
      menuItem.forEach((elem) => {
        elem.addEventListener('click', handlerMenu);
      });      
  };
  toggleMenu();

  // Всплывающий блок PopUp
  const togglePopUp = () => {
    const
      // Блок с PopUp
      popUp = document.querySelector('.popup'),
      popupContent = popUp.querySelector('.popup-content'),
      // Кнопка "Оставить заявку"
      btnPopUp = document.querySelectorAll('.popup-btn'),
      // Крестик в PopUp
      popUpClose = document.querySelector('.popup-close'),
      width = document.documentElement.clientWidth;
      
    let movePopUp,
      movePopUp2,
      count = -50;

    // Анимация появления окна
    const popUpAnimate = () => {
      movePopUp = requestAnimationFrame(popUpAnimate);
      popUp.style.display = 'block';
      if(count < 10){
        count += 2.5;
        popupContent.style.top = `${count}%`;
      } else {
        cancelAnimationFrame(movePopUp);
      }
    };

    // Анимация скрытия окна
    const popUpAnimate2 = () => {
      movePopUp2 = requestAnimationFrame(popUpAnimate2);
      setTimeout(() => {
        popUp.style.display = 'none';
      }, 200);
      if(count > -50){
        count -= 5;
        popupContent.style.top = `${count}%`;
      } else {
        cancelAnimationFrame(movePopUp2);
      }
    };
    
    if(width >= 768) {
      // Появление PopUp окна при нажатии на кнопку  
      btnPopUp.forEach((elem) => {
        elem.addEventListener('click', () => {
          movePopUp = requestAnimationFrame(popUpAnimate);
        });  
      });
      // Закрытие PopUp окна при нажатии на крестик
      popUpClose.addEventListener('click', () => {  
        movePopUp2 = requestAnimationFrame(popUpAnimate2);
      });
    } else {
      // Появление PopUp окна при нажатии на кнопку  
      btnPopUp.forEach((elem) => {
        elem.addEventListener('click', () => {
          popUp.style.display = 'block';
        });  
      });
      // Закрытие PopUp окна при нажатии на крестик
      popUpClose.addEventListener('click', () => {  
        popUp.style.display = 'none';
      });
    }
  };
  togglePopUp();

// Плавный переход по якорю
  const scrollAnchors = () => {
    // Все ссылки где есть #
    const anchors = document.querySelectorAll('a[href^="#"]');
    
    // Перебираем массив
    anchors.forEach((item) => {
      // Отслеживаем событие click
      item.addEventListener('click', (event) => {
        // Сбрасываем стандартное поведение
        event.preventDefault();
        //requestAnimationFrame(step);

        let
          // Скорость прокрутки
          speed = 0.23,
          // Текущее положение скролла
          startScroll = window.pageYOffset,
          // DOM элемент
          myItem = item.getAttribute('href'),
          // положение элемента по Y относительно окна браузера 
          finishScroll = document.querySelector(myItem).getBoundingClientRect().top,
          // Тут будем считать затраченное время 
          start = null; 

        function step(time) {
          // В первый кадр запомним время старта
          if (start === null) {
            start = time;
          }
          let
            // Сколько прошло времени с начала анимации 
            progress = time - start,
            // Текущее положение скролла 
            nowScroll = null; 
            
          // Определяем текущее положение скрола по оси Y
          if (finishScroll < 0) {
            nowScroll = Math.max(startScroll - progress / speed, startScroll + finishScroll);
          } else {
            nowScroll = Math.min(startScroll + progress / speed, startScroll + finishScroll);
          }
          // Прокрутим скролл
          window.scrollTo(0, nowScroll);
          // Если прокрутка не окончина повторим шаг
          if (nowScroll !== startScroll + finishScroll) {
            // Запланировать отрисовку следующего кадра
            requestAnimationFrame(step);
          }
        }
        requestAnimationFrame(step);
      }, false);
    });
  };
  scrollAnchors();

























});