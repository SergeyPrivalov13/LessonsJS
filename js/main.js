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
showText();

document.cookie = 'имяКлюча=значение';
document.cookie = 'имя2Ключа=значение';
document.cookie = 'имя3Ключа=значение';
document.cookie = 'имяКлюча=значение4';

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
setCookie('Любимый праздник детей', 'Новый Год', 2021, 1, 1); */

let
  // Кнопка "+"
  btnAdd = document.getElementById('add'),
  // Поле ввода
  headerInput = document.querySelector('.header-input'),
  // Блок надо сделать
  todo = document.getElementById('todo'),
  // Блок сделано
  completed = document.getElementById('completed');

const todoText =function(){  
const  // Создаём элемент li
  todoItem = document.createElement('li'),
  // Создаём элемент div
  blockButton = document.createElement('div'),
  // Создаём элемент button-remove
  btnRemove = document.createElement('button'),
  // Создаём элемент button-complete
  btnComplete = document.createElement('button'); 
  
  todoItem.textContent = headerInput.value;
  
  todoItem.classList.add('todo-item');
  blockButton.classList.add('todo-buttons');
  btnRemove.classList.add('todo-remove');
  btnComplete.classList.add('todo-complete');

  blockButton.appendChild(btnRemove);
  blockButton.appendChild(btnComplete);
  todoItem.appendChild(blockButton);

  todo.insertBefore(todoItem, todo.childNodes[0]);



  
};

const completeText =function(){
  let  // Создаём элемент li
  li = document.createElement('li'),
  // Создаём элемент div
  div = document.createElement('div'),
  // Создаём элемент button-remove
  btnRemove = document.createElement('button'),
  // Создаём элемент button-complete
  btnComplete = document.createElement('button');  
  // Добавляем класс к li
  li.className = 'todo-item';
  // Добавляем текст к li
  li.innerHTML = localStorage.getItem('task'); 
  completed.prepend(li);
  div.className = 'todo-buttons';
  li.append(div);
  btnRemove.className = 'todo-remove';
  div.append(btnRemove);
  btnComplete.className = 'todo-complete';
  btnRemove.after(btnComplete);
};

btnAdd.addEventListener('click', function(event){

  event.preventDefault();
  
  todoText();
});





