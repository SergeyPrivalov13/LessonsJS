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

export default toggleMenu;