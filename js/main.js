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
      // Блок с точками
      dotsBlock = document.querySelector('.portfolio-dots');
      
    // Присваиваем перому слайду класс active
    slide[0].classList.add('portfolio-item-active');

    // Функция добавления точек
    const addDots = () => {
      // Проходимся в цикле по слайдам
      slide.forEach((elem, index) => {
        // Создаём элемент li
        const li = document.createElement('li');
        // Добавляем класс
        li.classList.add('dot');
        // Добавляем элемент в блок dotsBlock
        dotsBlock.appendChild(li);

        // Добавляем первой точке класс active
        if (index === 0) {
          li.classList.add('dot-active');
        }
      });      
    };
    addDots();

    const // Точки 
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
    startSlide(5000);

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

  // Замена изображения при наведении в блоке Наша команда
  const replaceImage = () => {
    const 
      // Изображения
      commandPhoto = document.querySelectorAll('.command__photo');
    
      // Проходимся в цикле по всем изображениям
    commandPhoto.forEach((elem) => {
      // Записываем путь к начальному изображению
      let image = elem.src;      

      // Если навели курсор на блок с картинкой
      elem.addEventListener('mouseenter', (event) => {
        let target = event.target;
        // Заменяем картинку на data-img
        target.src = target.dataset.img;        
      });

      // Если убрали курсор с блока
      elem.addEventListener('mouseleave', (event) => {
        let target = event.target;
        // Возвращаем прежнее значение картинки
        target.src = image;  
      });     
    });    
  };
  replaceImage();

  // Калькулятор расчёта стоимости
  const calculator = (price = 100) => {
    const
      // Блок со всеми полями 
      calcBlock = document.querySelector('.calc-block'),
      // Поле Select
      calcType = document.querySelector('.calc-type'),
      // Поле Общая площадь*
      calcSquare = document.querySelector('.calc-square'),
      // Поле Количество помещений
      calcСount = document.querySelector('.calc-count'),
      // Поле Срок исполнения
      calcDay = document.querySelector('.calc-day'),
      // Результат
      total = document.getElementById('total'),
      // Поля ввода
      calcItem = calcBlock.querySelectorAll('input');

    // Функция подсчёта итоговой цены
    const countSum = () => {
      const 
        // Значение value у Select -> Option
        typeValue = calcType.options[calcType.selectedIndex].value,
        // Вычисление площади
        squareValue = +calcSquare.value;
      // Результата по умолчанию

      let result = 0,
        // Количество помещений по умолчанию
        countValue = 1,
        // Срок исполнения по умолчанию
        dayValue = 1;

      // Условие для кол-ва помещений
      if (calcСount.value > 1) {
        countValue += (calcСount.value - 1) / 10;
      }

      // Условие для срока исполнения
      if(calcDay.value && calcDay.value <= 5){
        dayValue *= 2;  
      } else if (calcDay.value && calcDay.value <= 10){
        dayValue *= 1.5;  
      }

      // Условие на заполненость полей 
      if(typeValue && squareValue){
        // Вычисляем результат
        result = price * typeValue * squareValue * countValue * dayValue;
      }

      // Выводим результат на страницу
      total.textContent = Math.floor(result);
    };

    // Отлавливаем изменение в блоке
    calcBlock.addEventListener('change', (event) => {
      let target = event.target;      
      // Проверяем были ли изминения в полях
      if(target.matches('select') || target.matches('input')){
        countSum();  
      }
    });

    // Валидация калькулятора
    const validationCalculator = () => {
      calcItem.forEach((elem) => {
        elem.addEventListener('input', () => {
          elem.value = elem.value.replace(/\D/, '');  
        });
      });  
    };
    validationCalculator();
  };
  calculator(100);

// Ajax - отправка формы
const sendForm = (formId) => {
  const
    errorMessage = 'Что то пошло не так...',
    loadMessage = 'Загрузка...',
    successMessage = 'Спасибо! Мы скоро с вами свяжемся!',
    spiner = document.getElementById('cube-loader'),
    // Форма
    form = document.getElementById(formId),
    // Блок для показа сообщения
    statusMessage = document.createElement('div');
    statusMessage.textContent = 'Тут будет сообщение!';
    statusMessage.style.cssText = `
      font-size: 2rem;
      font-family: sans-serif;
      color: white; 
    `;

  // Функция запроса на сервер
  const postData = (body, outputData, errorData) => {
    // Создаём элемент XMLHttpRequest
    const request = new XMLHttpRequest();

    // Отслеживаем статус отправки сообщения
    request.addEventListener('readystatechange', () => {

      if(request.readyState !== 4){
        return;
      }

      if(request.status === 200){
        outputData();        
      } else {
        errorData(request.status);      
      } 

    });

    // Метод отправки и путь к серверу
    request.open('POST', './server.php');

    // Настройка заголовков
    //request.setRequestHeader('Content-type', 'multipart/form-data');
    // Настройка заголовков для формата JSON
    request.setRequestHeader('Content-type', 'application/json');    

    // Открываем соединение и отправляем данные на сервер
    //request.send(formData);
    // Отправляем данные в формате JSON
    request.send(JSON.stringify(body));
  };

  // Отслеживаем клик по кнопке
  form.addEventListener('submit', (event) => {
    // Запрещаем стандартное поведение кнопки (отправку формы)
    event.preventDefault();
    // Добавляем элемент на страницу
    form.appendChild(statusMessage);
    // Добавляем сообщение о Загрузке
    statusMessage.textContent = loadMessage;

    // Объект FormData - содержит данные из формы
    const formData = new FormData(form);
    let body = {};
    /* for(let val of formData.entries()){
      // Записываем в объект ключ и значение отправленных данных
      body[val[0]] = val[1];        
    } 
    или
    */
    formData.forEach((val, key) => {
      body[key] = val;
    });
    //console.log(body);
    postData(body,
      () => {
        statusMessage.textContent = successMessage;
        form.reset();
        setTimeout(() => {
          statusMessage.remove();
        }, 3000);
      },
      (error) => {
        statusMessage.textContent = errorMessage;
        console.error(error); 
      }
    );  
  });
};
sendForm('form1');
sendForm('form2');
sendForm('form3');

// Валидация полей ввода
const inputValidation = () => {
  const inputs = document.querySelectorAll('input');

  inputs.forEach(elem => {
    elem.addEventListener('input', () => {
      if (elem.type === 'text') {
          elem.value = elem.value.replace(/[^а-яА-Я ]/, '');
      }
      if (elem.type === 'tel') {
          elem.value = elem.value.replace(/[^\+\d]/, '');
      }
    });
  });
};
inputValidation();
















});