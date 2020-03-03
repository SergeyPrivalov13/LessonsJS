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

export default scrollAnchors;