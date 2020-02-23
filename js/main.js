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
      // Блок с меню
      menu = document.querySelector('menu'),
      body = document.querySelector('body');

    // Функция отселживает translateX
    const handlerMenu = () => {
      // Добавляем/Убираем класс active-menu
      menu.classList.toggle('active-menu');
    };
    
    body.addEventListener('click', (event) => {
      let target = event.target;
      // Показать меню если кликнули по кнопке Меню
      if(target.closest('.menu')){
        handlerMenu();        
      } // Убрать меню если кликнули на крестик или вне меню
      else if (target.closest('.close-btn') || !target.closest('menu')){
        menu.classList.remove('active-menu'); 
      } else{
        // Иначе target присваиваем тэг li
        target = target.closest('li');
        // Если нажали на li закрываем окно
        if(target){
          handlerMenu();
        }
      }
    });
  };
  toggleMenu();

  // Модальное окно PopUp
  const togglePopUp = () => {
    const
      // Весь блок PopUp
      popUp = document.querySelector('.popup'),
      // Блок с PopUp
      popupContent = popUp.querySelector('.popup-content'),
      // Кнопка "Оставить заявку"
      btnPopUp = document.querySelectorAll('.popup-btn'),
      // Ширина окна
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

      // Отслеживаем клик по PopUp
      popUp.addEventListener('click', (event) => {
        let target = event.target;
        
        if(target.classList.contains('popup-close')){
          // Закрытие PopUp окна при нажатии на крестик
          movePopUp2 = requestAnimationFrame(popUpAnimate2);
        } else {
          target = target.closest('.popup-content');
          
          if(!target){
            // Закрытие PopUp окна если кликнули мимо него
            movePopUp2 = requestAnimationFrame(popUpAnimate2);
          }
        }        
      });
      
    } else {
      // Появление PopUp окна при нажатии на кнопку  
      btnPopUp.forEach((elem) => {
        elem.addEventListener('click', () => {
          popUp.style.display = 'block';
        });  
      });

      // Отслеживаем клик по PopUp
      popUp.addEventListener('click', (event) => {
        let target = event.target;
        
        if(target.classList.contains('popup-close')){
          // Закрытие PopUp окна при нажатии на крестик
          popUp.style.display = 'none';
        } else {
          target = target.closest('.popup-content');
          
          if(!target){
            // Закрытие PopUp окна если кликнули мимо него
            popUp.style.display = 'none';
          }
        }        
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

  // Табы
  const tabs = () => {
    const
      // Блок с табами
      tabHeader = document.querySelector('.service-header'),
      // Табы
      tab = tabHeader.querySelectorAll('.service-header-tab'),
      // Контент табов
      tabContent = document.querySelectorAll('.service-tab');

    // Функция будет менять контент в зависимости от выбранного таба
    const toggleTabContent = (index) => {
      for(let i = 0; i < tabContent.length; i++){
        if(index === i){
          // Удаляем класс - делаем блок видимым
          tabContent[i].classList.remove('d-none');
          // Присваиваем класс - делаем таб активным
          tab[i].classList.add('active');
        } else {
          // Присваиваем класс - делаем блок НЕ видимым
          tabContent[i].classList.add('d-none');
          // Удаляем класс - делаем таб НЕ активным
          tab[i].classList.remove('active');
        }
      }
    }; 

    tabHeader.addEventListener('click', (event) => {
      // Элемент по которому кликнули
      let target = event.target;
      // Присваиваем к target метод closest, который ищет нужный селектор
      target = target.closest('.service-header-tab');

      // Проверяем есть ли в target что то
      if(target){
        // Проверяем на какой Таб кликнули
        tab.forEach((item, i) => {
          if(item === target){
            toggleTabContent(i);  
          }          
        });        
      }      
    });
  };
  tabs();

  // Слайдер
  const slider = () => {
    const
      // Блок слайдера
      slider = document.getElementById('all-progects'),
      // Каждый слайд
      slide = document.querySelectorAll('.portfolio-item'),
      // Точки 
      dot = document.querySelectorAll('.dot');

    // Номер слайда
    let currentSlide = 0,
      // Интервал
      interval;

    // Функция удаления класса у слайда
    const prevSlide = (elem, index, strClass) => {
      // Берём текущий слайд и удаляем класс
      elem[index].classList.remove(strClass);
    };
    // Функция добавления класса у слайда
    const nextSlide = (elem, index, strClass) => {
      // Берём следующий слайд и добавляем класс
      elem[index].classList.add(strClass);
    };

    // Функция автоматического перелистывания слайдов
    const autoPlaySlide = () => {

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      // Точки
      prevSlide(dot, currentSlide, 'dot-active');

      // Переходим к следующему слайду
      currentSlide++;
      // Условие для пролистывания слайдоа
      if(currentSlide === slide.length){
        currentSlide = 0;
      }

      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };

    // Функция запуска слайдера
    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };
    startSlide(1500);

    // Функция остановки слайдера
    const stopSlide = () => {
      clearInterval(interval);
    };

    // Обработчик события - клик по кнопкам или точкам
    slider.addEventListener('click', (event) => {
      // Сбрасываем стандарьное поведение кнопок
      event.preventDefault();
      let target = event.target;

      if(!target.matches('#arrow-right, #arrow-left, .dot')){
        return;
      }

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      // Точки
      prevSlide(dot, currentSlide, 'dot-active');
      
      // Если цель была кнопка с id arrow-right'
      if(target.matches('#arrow-right')) {
        currentSlide++;
      } else if(target.matches('#arrow-left')) {
        currentSlide --;
      } else if(target.matches('.dot')){
        dot.forEach((elem, index) => {
          if(elem === target){
            currentSlide = index;
          }
        });
      }

      if(currentSlide >= slide.length){
        currentSlide = 0;
      }
      if(currentSlide < 0){
        currentSlide = slide.length - 1;
      }

      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');

    });

    // Обработчик события - остановка слайдера
    // Если навели мышку на кнопку
    slider.addEventListener('mouseover', (event) => {
      let target = event.target;
      if(target.matches('.portfolio-btn') || target.matches('.dot')){
        stopSlide(1500);
      }
    });
    // Если убрали мышку с кнопки
    slider.addEventListener('mouseout', (event) => {
      let target = event.target;
      if(target.matches('.portfolio-btn') || target.matches('.dot')){
        startSlide(1500);
      }
    });
  };
  slider();























});