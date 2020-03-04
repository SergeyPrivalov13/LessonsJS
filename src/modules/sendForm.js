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
  const postData = (body) => {
    // Fetch
    return fetch('./server.php', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(body),
      credentials: 'include'
    });
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
    
    formData.forEach((val, key) => {
      body[key] = val;
    });

    postData(body)
      .then((response) => {
        if(response.status !== 200){
          throw new Error('status network not 200');
        }
        
        statusMessage.textContent = successMessage;
        form.reset();
        setTimeout(() => {
          statusMessage.parentNode.removeChild(statusMessage);
        }, 3000);
      })
      .catch((error) => {
        statusMessage.textContent = errorMessage;
        console.error(error); 
      });  
  });
};

export default sendForm;