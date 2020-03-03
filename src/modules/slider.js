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

export default slider;