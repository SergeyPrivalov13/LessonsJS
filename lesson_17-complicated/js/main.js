document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const airplane = document.getElementById('airplane'),
    girl = document.getElementById('girl'),
    girl2 = document.getElementById('girl2'),
    start = document.getElementById('start'),
    stop = document.getElementById('stop'),
    reset = document.getElementById('reset');
  let count = 0,
    flyInterval;

  const flyAnimate = () => {
    flyInterval = requestAnimationFrame(flyAnimate);
    count++;
    if(count < 50){
      girl.style.top = `-300px`;
      girl.style.width = `80px`;
      girl.style.left = `${count * 2}px`;
      airplane.style.left = `${count * 2}px`;
    } else if (count < 700){
      girl.style.top = `${count - 150}px`;
      girl.style.left = `${count + 150}px`;
      girl.style.width = `${(count - 10) / 3}px`;
      airplane.style.left = `${count * 2}px`;
    } else {
      girl.style.display = `none`;
      girl2.style.display = `block`;
      start.style.display = `none`;
      stop.style.display = `none`;
      cancelAnimationFrame(flyInterval);
    }
    console.log(count);
  };
  
  start.addEventListener('click', () => {
      flyInterval = requestAnimationFrame(flyAnimate); 
      start.style.display = `none`;   
      stop.style.display = `block`;   
  });
  stop.addEventListener('click', () => {    
      cancelAnimationFrame(flyInterval);
      start.style.display = `block`;   
      stop.style.display = `none`;  
  });
  reset.addEventListener('click', () => {    
    window.location.reload();  
  });    
});