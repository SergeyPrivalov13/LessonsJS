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

/* let
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
}); */


const form = document.querySelector('.todo-control'),
  headerInput = document.querySelector('.header-input'),
  todoList = document.getElementById('todo'),
  completedList = document.getElementById('completed');

// Создаём объект  
let data = {
  todo: [],
  completed: []
};

// Проверка localStorage на наличие данных
if(localStorage.getItem('localData')){
  data = JSON.parse(localStorage.getItem('localData'));
}
// Функция пишет в Storage
const dataUpdateToLocalS = function(){
  localStorage.setItem('localData', JSON.stringify(data));
};

const itemRemove = function(elem){
  const
    // Родительский элемент 
    item = elem.parentNode.parentNode,
    itemParent = item.parentNode,
    // id родителя
    id = itemParent.id,
    // Введённый текст
    text = item.textContent;

  if(id === 'todo'){
    data.todo.splice(data.todo.indexOf(text), 1);
  } else {
    data.completed.splice(data.completed.indexOf(text), 1);
  }
  
  // Удаляем элемент
  itemParent.removeChild(item);

  dataUpdateToLocalS();
  
};
const itemComplete = function(elem){
  const
    // Родительский элемент 
    item = elem.parentNode.parentNode,
    itemParent = item.parentNode,
    // id родителя
    id = itemParent.id,
    // Введённый текст
    text = item.textContent;

  let target;

  if(id === 'todo'){
    target = completedList;
  } else {
    target = todoList;
  }

  if(id === 'todo'){
    data.todo.splice(data.todo.indexOf(text), 1);
    data.completed.push(text);
  } else {
    data.completed.splice(data.completed.indexOf(text), 1);
    data.todo.push(text);
  }
  
  itemParent.removeChild(item);
  target.insertBefore(item, target.childNodes[0]);

  dataUpdateToLocalS();
};

const renderItem = function(text, completed = false){
  const  // Создаём элемент li
    item = document.createElement('li'),
    // Создаём элемент div
    btnBlock = document.createElement('div'),
    // Создаём элемент button-remove
    btnRemove = document.createElement('button'),
    // Создаём элемент button-complete
    btnComplete = document.createElement('button'); 
    
  let list = todoList;
  if(completed){
    list = completedList;
  } else {
    list = todoList;
  }

  item.textContent = text;
  
  item.classList.add('todo-item');
  btnBlock.classList.add('todo-buttons');
  btnRemove.classList.add('todo-remove');
  btnComplete.classList.add('todo-complete');

  btnRemove.addEventListener('click', function(event){
    itemRemove(event.target);
  });

  btnComplete.addEventListener('click', function(event){
    itemComplete(event.target);
  });

  btnBlock.appendChild(btnRemove);
  btnBlock.appendChild(btnComplete);
  item.appendChild(btnBlock);

  list.insertBefore(item, list.childNodes[0]);

};

// Функция рендерит данные из storage? если они там есть
const renderItemsForUpdate = function(){
  if(!data.todo && !data.complited){
    return;
  }
  for(let i = 0; i < data.todo.length; i++){
    renderItem(data.todo[i]);
  }
  for(let i = 0; i < data.completed.length; i++){
    renderItem(data.completed[i], true);
  }
};

const addItem = function(text) {
  renderItem(text);
  headerInput.value = '';
  data.todo.push(text);

  dataUpdateToLocalS();
};

// Обработчик клика по кнопке
form.addEventListener('click', function(even){
  event.preventDefault();

  if(headerInput.value !== ''){
    addItem(headerInput.value);
  }
});

renderItemsForUpdate();
