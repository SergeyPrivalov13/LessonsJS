'use strict';

let isNumber = function(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
};

//функция для склонения числительный
// n - число
// t - массив из 3 вариантов склонения  
const declOfNum = (n, t) => t[ (n%100>4 && n%100<20)? 2 : [2, 0, 1, 1, 1, 2][(n%10<5)?n%10:5] ],
  month = ['месяц', 'месяца', 'месяцев'];
const declOfMon = (n, t) => t[ (n%100>4 && n%100<20)? 2 : [2, 0, 1, 1, 1, 2][(n%10<5)?n%10:5] ],
  moneys = ['рубль', 'рубля', 'рублей'];

let money;  // Доход за месяц
const start = function(){
  do {
    money = prompt('Ваш месячный доход?');    
  } while (!isNumber(money));
};
start();

let appData = {    
    // Дополнительные доходы - объект
    income: {},
    // Перечисление доп. дохдов - массив
    addIncome: [],
    // Дополнительные рассходы
    expenses: {},
    // Возможные расходы
    addExpenses: [],
    // Депозит
    deposit: false,
    // Цель накопить
    mission: 50000,
    // Cрок достижения цели в месяцах
    period: 0,
    // Доход за месяц
    budget: money,
    // Бюджет на день
    budgetDay: 0,
    // Бюджет на месяц
    budgetMonth: 0,
    // Расходы за месяц
    expensesMonth: 0,
    // Вопросы к пользователю
    asking: function(){
      const
        // Дополнительные расходы
        addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        // Записываем результат в массив - Возможные расходы
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        // Депозит
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        
      let count,
          expenses;
    
      for (let i = 0; i < 2; i++){
        if (i === 0) {
          do {
            expenses = prompt('Введите обязательную статью расходов?', 'садик государственный' );
            count = +prompt('Во сколько это обойдется?', 2300);
            // Записываем в объект expenses
            appData.expenses[expenses] = count;
          } while (!isNumber(count));
        
        } else if (i === 1){
          do {
            expenses = prompt('Введите обязательную статью расходов?','садик частный');
            count = +prompt('Во сколько это обойдется?', 3400);
            // Записываем в объект expenses
            appData.expenses[expenses] = count; 
          } while (!isNumber(count));
        }        
      }
    },
    // Расходы за месяц
    getExpensesMonth: function(){
      // Сумируем все обязательные рассходы записываем в переменную expensesMonth 
      for(let item in appData.expenses){
        appData.expensesMonth += appData.expenses[item];
      } 
    },
    // Функция возвращает накопления за месяц
    getBudget: function (){
      // Бюджет на месяц записываем в переменную
      appData.budgetMonth = appData.budget - appData.expensesMonth;
      // Бюджет на день
      appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    // Cрок достижения цели в месяцах
    getTargetMonth: function(){
      appData.period = Math.ceil(appData.mission / appData.budgetMonth);
      if (appData.period >= 0){
        return `Cрок достижения цели: ${appData.period} ${declOfNum(appData.period, month)}`;
      } else {
        return 'Цель не будет достигнута';
      }
    },
    // Уровень дохода
    getStatusIncome: function(){
      let budgetDay = appData.budgetDay;
      if (budgetDay > 1200) {
        return('У вас высокий уровень дохода!');  
      } else if (budgetDay > 600 && budgetDay < 1200) {
        return('У вас средний уровень дохода');  
      } else if (budgetDay >= 0 && budgetDay < 600) {
        return('К сожалению у вас уровень дохода ниже среднего');  
      } else {
        return('Что то пошло не так');  
      }
    },
};

let programIncludes = function() {
  console.log('Наша программа включает в себя данные: ');  
  for ( let key in appData) {
    console.log(key + ' : ' + appData[key]);    
  }
};
//programIncludes();

appData.asking();                 // Объявляем свойство ascing
appData.getExpensesMonth();       // Объявляем свойство getExpensesMonth
appData.getBudget();              // Объявляем свойство getBudget
appData.getTargetMonth();         // Объявляем свойство getTargetMonth
appData.getStatusIncome();        // Объявляем свойство getStatusIncome



console.log(`Расходы за месяц: ${appData.expensesMonth} ${declOfMon(appData.expensesMonth, moneys)}`);

console.log(`Накопления за месяц: ${appData.budgetMonth} ${declOfMon(appData.budgetMonth, moneys)}`);

// Cрок достижения цели в месяцах:
console.log(`${appData.getTargetMonth()}`);
// Уровень дохода
console.log(appData.getStatusIncome());

console.log(`Бюджет на день: ${appData.budgetDay} ${declOfMon(appData.budgetDay, moneys)}`);

console.log(`Доход за месяц: ${money} ${declOfMon(money, moneys)}`);
console.log(`Цель: ${appData.mission}`);

console.log(appData.expenses);
console.log(appData.addExpenses);

console.log(`Дополнительные доходы ${appData.income}`);
console.log(`Перечисление доп. дохдов ${appData.addIncome}`);
console.log(`Дополнительные рассходы ${appData.expenses}`);
console.log(`Возможные расходы ${appData.addExpenses}`);
console.log(`Депозит ${appData.deposit}`);
console.log(`Цель накопить ${appData.mission}`);
console.log(`Cрок достижения цели в месяцах ${appData.period}`);
console.log(`Доход за месяц ${appData.budget}`);
console.log(`Бюджет на день ${appData.budgetDay}`);
console.log(`Бюджет на месяц ${appData.budgetMonth}`);
console.log(`Расходы за месяц ${appData.expensesMonth}`);

