'use strict';

function timer(){
  let date = document.getElementById('date'),                         // id блока
    dateTwo = document.getElementById('dateTwo'),                     // id блока
    dateNow = new Date(),                                             // Текущее время
    year = dateNow.getFullYear(),                                     // Год
    month = dateNow.getMonth(),                                       // Месяц
    monthTwo = (`0${dateNow.getMonth()}`).replace(/.?(\d{2})/,'$1'),  // Месяц
    day = (`0${dateNow.getDate()}`).replace(/.?(\d{2})/,'$1'),        // Число
    weekDay = dateNow.getDay(),                                       // День недели
    hour = (`0${dateNow.getHours()}`).replace(/.?(\d{2})/,'$1'),      // Час
    minutes = (`0${dateNow.getMinutes()}`).replace(/.?(\d{2})/,'$1'), // Минуты
    seconds = (`0${dateNow.getSeconds()}`).replace(/.?(\d{2})/,'$1'), // Секунды
    fMonth,                                                           // Название месяца
    fday;                                                             // Название дня


  const declOfNum = (n, t) => t[ (n%100>4 && n%100<20)? 2 : [2, 0, 1, 1, 1, 2][(n%10<5)?n%10:5] ],
    decl = [];
  
  

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
  
  switch (weekDay - 1)
    {
      case 0: fday="Понедельник"; break;
      case 1: fday="Вторник"; break;
      case 2: fday="Среда"; break;
      case 3: fday="Четверг"; break;
      case 4: fday="Пятница"; break;
      case 5: fday="Суббота"; break;
      case 6: fday="Воскресенье"; break;
    }
  
  date.style.cssText = 'color: red; font-weight: bold';
  dateTwo.style.cssText = 'color: red; font-weight: bold';
  date.innerHTML = `Сегодня ${fday}, ${day} ${fMonth} ${year} года, 
  ${hour} ${declOfNum(hour, ['час', 'часа', 'часов'])} 
  ${minutes} ${declOfNum(minutes, ['минута', 'минуты', 'минут'])}
  ${seconds} ${declOfNum(seconds, ['секунда', 'секунды', 'секунд'])}`;
  dateTwo.innerHTML = `${day}.${monthTwo}.${year} - ${hour}:${minutes}:${seconds}`;

}
function go(){
  window.timerId = window.setInterval(timer, 1000);  
}
go();
