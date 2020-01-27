'use strict';

// Задание 1

let lang = prompt('Введите язык ru или en'),
  langs = {
    ru: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
    en: ['Monday', 'Tuesday', 'Wednes­day', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  };

// При помощи if  
if (lang === 'ru') {
  console.log(langs[lang]);
  
} else if (lang === 'en') {
  console.log(langs[lang]);
  
} else {
  console.log('Выберите язык');  
}

// При помощи switch
switch (lang) {
  case 'ru':
    console.log(langs[lang]);
    break;
  case 'en':
    console.log(langs[lang]);
    break;

  default:
    console.log('Выберите язык'); 
    break;
}

// При помощи многомерного массива 
console.log(langs[lang]);


// Задание 2
let namePerson = 'максим';
namePerson = namePerson.toLowerCase();

if (namePerson === 'артём') {
  console.log('директор');  
} else if (namePerson === 'максим') {
  console.log('преподаватель');  
} else {
  console.log('студент');  
}

namePerson === 'артём' ? console.log('директор') 
: namePerson === 'максим' ? console.log('преподаватель') 
: console.log('студент');
