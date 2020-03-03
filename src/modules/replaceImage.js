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

export default replaceImage;