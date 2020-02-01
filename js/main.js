'use strict';
let week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'], 
  date = new Date(),
  presentDay = date.getDay(),
  blockWeek = document.getElementById('week');

for(let i = 0; i < week.length; i++){
  console.log(week[i]);
  blockWeek = blockWeek.innerHTML(week[i]);
  
}

console.log(date);
console.log(presentDay);
console.log(week);
console.log(blockWeek);
