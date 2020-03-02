document.addEventListener('DOMContentLoaded', () => {
  'use strict';

 /*  const doUniversity = (docs, resolve, reject) => {
    if(docs){
      console.log('Рассмотрение документов...');      
      setTimeout(() => {
        if(Math.random() > 0.3){
          let result = 'Принят';
          resolve(result);
        } else {
          reject('Отказано');
        }
      }, 3000);
    } else {
      reject('Отказано, не хватает документов');  
    }

  };
  // Отсрочка от армии
  const doArmy = (docs, resolve, reject) => {
    if(docs){
      console.log('Военком думает...');
      setTimeout(() => {
        if(docs === 'Принят'){
          resolve('Отсрочка');
        } else{
          reject('Повестка');
        }
      }, 2000); 
    } else {
      reject('Повестка');
    }
  };
  // Устройство на работу
  const doWork = (docs, resolve, reject) => {
    console.log('Директор Google думает...');
    setTimeout(() => {
      if(Math.random() > 0.3){
        let result = 'Приглашон на собеседование в Четверг';
        resolve(result);
      } else {
        reject('Не принят на работу');
      }
    }, 3000);
  };

  const documents = ['Паспорт', 'Аттестат'];

  doUniversity(documents, (result) => {
    console.log(result);
    doArmy(result, (militaryDocs) => {
      console.log(militaryDocs);
      doWork(militaryDocs, (data) => {
        console.log(data);        
      }, (reason) => {
        console.error(reason);
      });      
    }, (reason) => {
      console.error(reason);
    });    
  }, (reason) => {
    console.error(reason);  
  }); */

  // С помощью Промисов
  const doUniversity = (docs) => {
    return new Promise((resolve, reject) => {
      if(docs){
        console.log('Рассмотрение документов...');
        setTimeout(() => {
          if(Math.random() > 0.3){
            let result = 'Принят';
            resolve(result);
          } else {
            reject('Отказано');
          }
        }, 3000);
      } else {
        reject('Отказано, не хватает документов');  
      }
    });    
  };
  // Отсрочка от армии
  const doArmy = (docs) => {
    return new Promise((resolve, reject) => {
      if(docs){
        console.log('Военком думает...');
        setTimeout(() => {
          if(docs === 'Принят'){
            resolve('Отсрочка');
            console.log('Отсрочка');            
          } else{
            reject('Повестка');
          }
        }, 2000); 
      } else {
        reject('Повестка');
      }
    });
  };
  // Устройство на работу
  const doWork = (docs) => {
    return new Promise((resolve, reject) => {
      console.log('Директор Google думает...');
      console.log(`Документы от военкомата: ${docs}`);
      setTimeout(() => {
        if(Math.random() > 0.3){
          let result = 'Приглашон на собеседование в Четверг';
          console.log(result);
          
          resolve(result);
        } else {
          reject('Не принят на работу');
        }
      }, 3000);
    });
  };
  // Вечеринка если дали отсрочку
  const dance = (docs) => {
    console.log('Вечеринка');
    return Promise.resolve(docs);
  };

  const documents = ['Паспорт', 'Аттестат'];

  /* doUniversity(documents)
    .then((result) => {
      // Если положительный ответ
      console.log(result);
      return result;
      
    }, (reason) => {
      // Если отрицательный ответ
      console.log(reason);
      
    })
    .then(doArmy)
    .then(dance)
    .then(doWork)
    // catch Запускается если будет ошибка/отказ
    .catch((reason) => console.error(reason))
    .finally(() => console.warn('Выполниться в любом случае')); */

  const doWorking = (company) => {
    return new Promise((resolve, reject) => {
      const time = Math.ceil(Math.random() * 3000);
      setTimeout(() => {
        if(time % 10){
          resolve(company);
        } else{
          reject(company);
        }
      }, time);
    });
  };

  const hh = doWorking('HH'),
    yandex = doWorking('Yandex'),
    ozon = doWorking('Ozon'),
    pikabu = doWorking('Pikabu'),
    politics = doWorking('Гос Дума'),
    flash = doWorking('Flash');
  // Будет дожидаться ответа от всех промисов  
  Promise.all([hh, yandex, ozon, pikabu, politics, flash])
    .then(result => console.log(`Тебя пригласили на собеседование в ${result}`))
    .catch(result => console.error(`Компания ${result} отказала`));
  // Какой промис отработает первый тот и ваведется
  Promise.race([hh, yandex, ozon, pikabu, politics, flash])
    .then(result => console.log(`Тебя пригласили на собеседование в ${result}`))
    .catch(result => console.error(`Компания ${result} отказала`));
    
    
    

    
    
  













});