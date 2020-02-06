'use strict';
const books = document.querySelectorAll('.books'),    // СайтБар books
  book = document.querySelectorAll('.book'),          // Блок с книгой
  body = document.querySelector('body'),              // Body
  adv = document.querySelector('.adv'),               // Блок с рекламой
  block1 = book[0].querySelector('ul'),               // Первый блок
  block2 = book[5].querySelector('ul'),               // Шестой блок
  block3 = book[2].querySelector('ul'),               // Третий блок
  clone = block3.children[7].cloneNode(true);         // Клонируем строку в третьем блоке

// Перемещаем блоки
books[0].insertBefore(book[1], book[0]);
books[0].insertBefore(book[2], null);
books[0].insertBefore(book[4], book[3]);

// Заменяем задний фон страницы
body.setAttribute('style', 'background: url(./image/you-dont-know-js.jpg) center no-repeat');

book[4].querySelector('a').textContent = 'Книга 3. this и Прототипы Объектов';  /* Переименовываем заголовок */

// Убираем блок с рекламой
body.removeChild(adv);

// Выстраиваем главы по порядку в Книга 2
block1.insertBefore(block1.children[6], block1.children[4]);
block1.insertBefore(block1.children[8], block1.children[5]);
block1.insertBefore(block1.children[2], block1.children[10]);
// Выстраиваем главы по порядку в Книга 5
block2.insertBefore(block2.children[9], block2.children[3]);
block2.insertBefore(block2.children[2], block2.children[6]);
block2.insertBefore(block2.children[6], block2.children[8]);
block2.insertBefore(block2.children[8], block2.children[7]);
// Добавляем новую строку в Книга 6
block3.appendChild(clone).textContent = 'Глава 8: За пределами ES6';  /* Добавляем строку и переименовываем */
block3.insertBefore(block3.children[10], block3.children[9]);
