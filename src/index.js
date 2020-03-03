"'use strict'";
// Импортируем полифилы
import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);

// Импортиреум модули
import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import scrollAnchors from './modules/scrollAnchors';
import tabs from './modules/tabs';
import slider from './modules/slider';
import replaceImage from './modules/replaceImage';
import calculator from './modules/calculator';
import sendForm from './modules/sendForm';
import inputValidation from './modules/inputValidation';

// Таймер
countTimer('5 May 2020 19:00:50');

// Меню
toggleMenu();

// Модальное окно PopUp
togglePopUp();

// Плавный переход по якорю
scrollAnchors();

// Табы
tabs();

// Слайдер
slider();

// Замена изображения при наведении в блоке Наша команда
replaceImage();

// Калькулятор расчёта стоимости
calculator(100);

// Ajax - отправка формы
sendForm('form1');
sendForm('form2');
sendForm('form3');

// Валидация полей ввода
inputValidation();