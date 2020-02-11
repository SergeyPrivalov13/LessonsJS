window.addEventListener('DOMContentLoaded', function() {
  'use strict';
let body = document.querySelector('body');    

const DomElement = function() {
  this.selector = '';
  this.height = 0;
  this.width = 0;
  this.bg = '';
  this.fontSize = 0;
  this.text = '';
};

DomElement.prototype.isNumber = function(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
};

DomElement.prototype.isEmpty = function(str) {
  return (!str || /^\s*$/.test(str));
};

DomElement.prototype.getSelector = function() {
  let selectorItem;
  do {
    selectorItem = prompt('Введите пожалуйста "."  или  "#"', '.');      
  } while (this.isNumber(selectorItem) || this.isEmpty(selectorItem));

  this.selector = selectorItem;

  let textItem;
  do {
    textItem = prompt('Введите текст сооющения', 'Привет, мой друг!!!');      
  } while (this.isNumber(textItem) || this.isEmpty(textItem));

  this.text = textItem;  

  let allSelector = this.selector.trim().toLowerCase(),   
      firstSelector = allSelector.split(''),
      lastSelector = allSelector.slice(1);                
  
  if (firstSelector[0] === '.') {
    if (lastSelector !== ''){
      body.insertAdjacentHTML('afterbegin', `<div class="${lastSelector}">${textItem}</div>`);
    } else {
      body.insertAdjacentHTML('afterbegin', `<div>${textItem}</div>`);
    }

  } else if (firstSelector[0] === '#') {
    if (lastSelector !== '') {
      body.insertAdjacentHTML('afterbegin', `<p id="${lastSelector}">${textItem}</p>`);
    } else {
      body.insertAdjacentHTML('afterbegin', `<p>${textItem}</p>`);
    }
  } else {
    console.log('Введите коректное значение');
  }
};

DomElement.prototype.getHeight = function() {
  let heightItem;
  do {
    heightItem = +prompt('Введите пожалуйста значенте высоты, оно не должно быть отрицательным: ', 200);      
  } while (!this.isNumber(heightItem) || heightItem <= 0 || this.isEmpty(heightItem));

  this.height = heightItem;    
};

DomElement.prototype.getWidth = function() {
  let widthItem;
  do {
    widthItem = +prompt('Введите пожалуйста значенте ширины, оно не должно быть отрицательным: ', 300);      
  } while (!this.isNumber(widthItem) || widthItem <= 0 || this.isEmpty(widthItem));

  this.width = widthItem;
};

DomElement.prototype.getBg = function() {
  let bgItem;
  do {
    bgItem = prompt('Введите пожалуйста цвет: Красный, Синий или Зелёный', 'Красный');      
  } while (this.isEmpty(bgItem) || this.isNumber(bgItem));  
  
  bgItem = bgItem.toLowerCase();

  if (bgItem === 'красный') {
    bgItem = bgItem.replace('красный', 'red'); 
  } else if (bgItem === 'синий') {
    bgItem = bgItem.replace('синий', 'blue');
  } else if (bgItem === 'зелёный' || bgItem === 'зеленый') {
    bgItem = bgItem.replace('зелёный', 'green');
    bgItem = bgItem.replace('зеленый', 'green');
  } 
  this.bg = bgItem; 
};
DomElement.prototype.getFontSize = function() {
  let fontSizeItem;
  do {
    fontSizeItem = +prompt('Введите пожалуйста размер шрифта, оно не должно быть отрицательным: ', 12);      
  } while (!this.isNumber(fontSizeItem) || fontSizeItem <= 0 || this.isEmpty(fontSizeItem));

  this.fontSize = fontSizeItem;
};

DomElement.prototype.getResult = function() {
  let elemD = document.querySelector('div'),
      elemP = document.querySelector('p');    
  if (elemD) {                   
    elemD.style.cssText = `height: ${this.height}px; width: ${this.width}px; 
    background-color: ${this.bg}; font-size: ${this.fontSize}px; 
    text-align: center; padding: 10px; border-radius:10px; position: absolute;`;
  } else if (elemP) {
    elemP.style.cssText = `height: ${this.height}px; width: ${this.width}px; 
    background-color: ${this.bg}; font-size: ${this.fontSize}px;
    text-align: center; padding: 10px; border-radius:10px; position: absolute;`;
  }
  console.log('D', elemD);
  console.log('P', elemP);
};

DomElement.prototype.start = function() {
  this.getSelector();
  this.getHeight();
  this.getWidth();
  this.getBg();
  this.getFontSize();
  this.getResult();
};

const domElement = new DomElement();
domElement.start();

console.log(domElement);
console.log('body', body);

});
