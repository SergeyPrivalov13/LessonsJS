document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const output = document.getElementById('output');

  const getData = (url) => {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open('GET', url);
      request.addEventListener('readystatechange', () => {
        if(request.readyState !== 4){
          return;
        }
        if(request.status === 200){
          const response = JSON.parse(request.responseText);
          resolve(response);
        } else{
          reject(request.statusText);  
        }
      });
      request.send();
    });
  };

  // Рандомная картинка
  /* const outputPhotos = (data) => {
    const random = Math.floor(Math.random() * data.length);
    const obj = data[random];
    output.innerHTML = `<h4>${obj.title}</h4>
                        <img src='${obj.thumbnailUrl}' alt='${obj.title}'>`;
  }; */
  const outputPhotos = (data) => {
    output.insertAdjacentHTML('beforebegin',
      `<h4>${data.title}</h4>
      <img src='${data.thumbnailUrl}' alt='${data.title}'>`) ;
  };

  const urlPhoto = 'https://jsonplaceholder.typicode.com/photos';

  const oneImg = getData('https://jsonplaceholder.typicode.com/photos/1'),
    twoImg = getData('https://jsonplaceholder.typicode.com/photos/2');

  // Выводить картинки когда ответ пришёл от двух картинок
  Promise.race([oneImg, twoImg])
    .then(outputPhotos)
    .catch(error => console.log(error));

  /* getData(urlPhoto)
    .then(outputPhotos)
    .catch(error => console.error(error)); */

  /* oneImg
    .then(outputPhotos)
    .catch(error => console.log(error));
  twoImg
    .then(outputPhotos)
    .catch(error => console.log(error)); */




});