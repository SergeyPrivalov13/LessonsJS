'use strict';

/* const inputText = document.getElementById('myText'),
  myBtn = document.getElementById('myBtn'),
  text = document.getElementById('text');

const showText =function(){
  // Вставляем текст из input в параграф
  //text.textContent = localStorage.myText;

  // Получаем значение из localStorage
  text.textContent = localStorage.getItem('memory');
};

myBtn.addEventListener('click', function(){
  // Берём значение из input и сохраняем его в localStorage с ключом myText
  //localStorage.myText = inputText.value;

  // Получаем value из input с ключом memory
  localStorage.setItem('memory', inputText.value);
  
  // Показываем введённый текст
  showText();
});

// Удаляет все данные из localStorage
localStorage.removeItem('myText');
  
// Если запустить здесь функцию, то введённое значение сохраниться и покажеться в парагрвфе
showText(); */

/* document.cookie = 'имяКлюча=значение';
document.cookie = 'имя2Ключа=значение';
document.cookie = 'имя3Ключа=значение';
document.cookie = 'имяКлюча=значение4'; */

// Сохранение cookie до определённой даты
//document.cookie = 'hope=life; expires=Tue, 7 May 2024 00:00:00 GMT';

function setCookie(key, value, year, month, day, path, domain, secure){
  // Переменная содержащая временную строку
  // Кодировка encodeURI
  let cookieStr = encodeURI(key) + '=' + encodeURI(value);
  if(year){
    const expires = new Date(year, month-1, day);
    cookieStr += '; expires=' + expires.toGMTString();
  }
  // Проверяем передали ли нам path, domain, secure
  cookieStr += path ? '; path=' + encodeURI(path) : '';
  cookieStr += domain ? '; domain=' + encodeURI(domain) : '';
  cookieStr += secure ? '; secure=' : '';

  // Записываем в cookie
  document.cookie = cookieStr;
}

// Добавляем новую cookie
setCookie('Привет', 'Мир');
setCookie('Любимый праздник детей', 'Новый Год', 2021, 1, 1);