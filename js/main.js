'use strict';

function timer(){
  let date = document.getElementById('date'),                         // id блока
    dateTwo = document.getElementById('dateTwo'),                     // id блока
    dateNow = new Date(),                                             // Текущее время
    year = dateNow.getFullYear(),                                     // Год
    month = dateNow.getMonth(),                                       // Месяц
    monthTwo = (`0${dateNow.getMonth()}`).replace(/.?(\d{2})/,'$1'),  // Месяц
    day = (`0${dateNow.getDate()}`).replace(/.?(\d{2})/,'$1'),        // Число
    presentDay = dateNow.getDay(),                                    // День недели
    hour = (`0${dateNow.getHours()}`).replace(/.?(\d{2})/,'$1'),      // Час
    minutes = (`0${dateNow.getMinutes()}`).replace(/.?(\d{2})/,'$1'), // Минуты
    seconds = (`0${dateNow.getSeconds()}`).replace(/.?(\d{2})/,'$1'), // Секунды
    week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
    monthName = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня',
    'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

  const declOfNum = (n, t) => t[ (n%100>4 && n%100<20)? 2 : [2, 0, 1, 1, 1, 2][(n%10<5)?n%10:5] ];  

  if(presentDay === 0){
    presentDay = 6;
  } else {
    presentDay = presentDay - 1;
  }  
  
  date.style.cssText = 'color: red; font-weight: bold';
  dateTwo.style.cssText = 'color: red; font-weight: bold';
  date.innerHTML = `Сегодня ${week[presentDay]}, ${day} ${monthName[month]} ${year} года, 
  ${hour} ${declOfNum(hour, ['час', 'часа', 'часов'])} 
  ${minutes} ${declOfNum(minutes, ['минута', 'минуты', 'минут'])}
  ${seconds} ${declOfNum(seconds, ['секунда', 'секунды', 'секунд'])}`;
  dateTwo.innerHTML = `${day}.${monthTwo}.${year} - ${hour}:${minutes}:${seconds}`;

}
function go(){
  window.timerId = window.setInterval(timer, 1000);  
}
go();
