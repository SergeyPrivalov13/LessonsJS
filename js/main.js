'use strict';

let week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'], 
  date = new Date('2020-02-17'),
  presentDay = date.getDay(),
  blockWeek = document.getElementById('week');

  if(presentDay === 0){
    presentDay = 6;
  } else {
    presentDay = presentDay - 1;
  }

  for(let i = 0; i < week.length; i++){  
    console.log(presentDay);
    
  if(presentDay === i){
    if(i === 5 || i === 6){
      blockWeek.innerHTML += `<i><b>${week[i]}</b></i> <br>`;
    }else {
      blockWeek.innerHTML += `<b>${week[i]}</b> <br>`;
    }
    
  } else if(i === 5 || i === 6){
    //document.write(`<i>${week[i]}</i> <br>`);
    blockWeek.innerHTML += `<i>${week[i]}</i> <br>`;
  } else{
    blockWeek.innerHTML += `${week[i]} <br>`;
  }  
}



