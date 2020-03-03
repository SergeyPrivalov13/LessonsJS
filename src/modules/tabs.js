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

export default tabs;