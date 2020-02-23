document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const polindrom = (str) => {
    // Создаём пустой массив
    const arrPolindrom = [];
    // Разбиваем строку на массив из букв
    str = str.split(''); 

    for (let i = 0; i <= str.length - 1; i++) {  
      for (let j = i + 1; j < str.length + 1; j++) {
        let newStr = str.slice(i, j);
        // Если новая строка равна перевёрнутой новой строке
        if (newStr.join('') === newStr.reverse().join('')) {
          // Добавляем в массив
          arrPolindrom.push(newStr.join(''));
        }
      }
    }

    arrPolindrom.sort((a, b) => {
      return a.length > b.length ? -1 : a.length < b.length ? 1 : 0;
    });
    return arrPolindrom[0];
};
console.log(polindrom('fffkffgffkfdk'));
console.log(polindrom('абвгоогвфф'));
});