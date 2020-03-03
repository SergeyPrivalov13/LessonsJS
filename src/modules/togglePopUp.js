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

export default togglePopUp;