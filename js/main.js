'use strict';
let date = document.getElementById('date'),   // id блока
  dateNow = new Date(),             // Текущее время в миллисекундах
  year = dateNow.getFullYear(),
  month = dateNow.getMonth(),
  day = dateNow.getDate(),
  hour = dateNow.getHours(),
  minutes = dateNow.getMinutes(),
  seconds = dateNow.getSeconds(),
  fMonth;

switch (month)
  {
    case 0: fMonth="января"; break;
    case 1: fMonth="февраля"; break;
    case 2: fMonth="марта"; break;
    case 3: fMonth="апреля"; break;
    case 4: fMonth="мае"; break;
    case 5: fMonth="июня"; break;
    case 6: fMonth="июля"; break;
    case 7: fMonth="августа"; break;
    case 8: fMonth="сентября"; break;
    case 9: fMonth="октября"; break;
    case 10: fMonth="ноября"; break;
    case 11: fMonth="декабря"; break;
  }
date.style.cssText = 'color: red; font-weight: bold';
date.innerHTML = `Сегодня ${day} ${fMonth} ${year} года`;


console.log(date);
console.log(dateNow);
console.log(`Секунд: ${seconds} секунда`);
console.log(`Минут: ${minutes} минута`);
console.log(`Часов: ${hour} час`);
console.log(`Дней: ${day}`);
console.log(`Месяц: ${month}`);
console.log(`Год: ${year}`);

