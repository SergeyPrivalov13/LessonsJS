'use strict';
let week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'], 
  date = new Date(),
  presentDay = date.getDay(),
  blockWeek = document.getElementById('week');

  for(let i = 0; i < week.length; i++){  
    console.log(presentDay);
    
  if(presentDay - 1 === i){
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

