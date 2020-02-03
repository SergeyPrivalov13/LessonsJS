'use strict';

let isNumber = function(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let addExpenses;
do {
  // Дополнительные расходы
  addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Квартира, Машина');
  // Записываем результат в массив - Возможные расходы
  addExpenses = addExpenses.toLowerCase().split(',');
  for(let i = 0; i < addExpenses.length; i++){
    let addExpens = addExpenses[i].trim();
    console.log(addExpens);
    
  }
} while (isNumber(addExpenses));

console.log(addExpenses); 

//функция для склонения числительный
// n - число
// t - массив из 3 вариантов склонения 

/* const declOfNum = (n, t) => t[ (n%100>4 && n%100<20)? 2 : [2, 0, 1, 1, 1, 2][(n%10<5)?n%10:5] ],
  month = ['месяц', 'месяца', 'месяцев'];
const declOfMon = (n, t) => t[ (n%100>4 && n%100<20)? 2 : [2, 0, 1, 1, 1, 2][(n%10<5)?n%10:5] ],
  moneys = ['рубль', 'рубля', 'рублей'];

let money;  // Доход за месяц
const start = function(){
  do {
    money = prompt('Ваш месячный доход?', 50000);    
  } while (!isNumber(money));
};
start();

const appData = {    
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
    // Процент депозита
    percentDeposit: 0,
    // Вложения на депозит
    moneyDeposit: 0,
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

      if(confirm('Есть ли у вас дополнительный зароботок?')){ 
        let itemIncome,
          cashIncome;   
        do {
          itemIncome = prompt('Какой у вас есть дополнительный заработок?', 'Вязание');
        } while (isNumber(itemIncome) || itemIncome.trim() === '');
        do {
          cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
        } while (!isNumber(cashIncome));
        appData.income[itemIncome] = cashIncome;
      }

      let addExpenses;
      do {
        // Дополнительные расходы
        addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Квартира, Машина');
        // Записываем результат в массив - Возможные расходы
        appData.addExpenses = addExpenses.toLowerCase().split(',');
      } while (isNumber(addExpenses) || addExpenses.trim() === '');
              
      let count,
          expenses;
      for (let i = 0; i < 2; i++){
        if (i === 0) {          
          do {
            expenses = prompt('Введите обязательную статью расходов 1?', 'садик государственный' );
            count = +prompt('Во сколько это обойдется 1?', 2300);
            // Записываем в объект expenses
            appData.expenses[expenses] = count;
          } while (!isNumber(count) || isNumber(expenses) || expenses.trim() === '');
        
        } else if (i === 1){
          do {
            expenses = prompt('Введите обязательную статью расходов 2?','садик частный');
            count = +prompt('Во сколько это обойдется 2?', 3400);
            // Записываем в объект expenses
            appData.expenses[expenses] = count; 
          } while (!isNumber(count) || isNumber(expenses) || expenses.trim() === '');
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
    // Депозит в банке
    getInfoDeposit: function(){
      appData.deposit = confirm('Есть ли у вас депозит в банке?');
      if(appData.deposit){
        do {
          appData.percentDeposit = prompt('Какой годовой процент?', 10);
          appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);  
        } while (!isNumber(appData.percentDeposit) || !isNumber(appData.moneyDeposit));
      }
    },
    // Сумма накопления за период
    calcSaveMoney: function(){
      return appData.budgetMonth * appData.period;
    }
};

appData.asking();                 // Объявляем свойство ascing
appData.getExpensesMonth();       // Объявляем свойство getExpensesMonth
appData.getBudget();              // Объявляем свойство getBudget
appData.getTargetMonth();         // Объявляем свойство getTargetMonth
appData.getStatusIncome();        // Объявляем свойство getStatusIncome
appData.getInfoDeposit();

console.log(`Расходы за месяц: ${appData.expensesMonth} ${declOfMon(appData.expensesMonth, moneys)} 
${typeof(appData.expensesMonth)}`);
console.log(`${appData.getTargetMonth()}`);
console.log(appData.getStatusIncome());

console.log(`Годовой процент ${appData.percentDeposit} ${typeof(appData.percentDeposit)}`);
console.log(`Заложенная сумма ${appData.moneyDeposit} ${typeof(appData.moneyDeposit)}`);
console.log(`Сумма накопления за период ${appData.calcSaveMoney()} ${typeof(appData.calcSaveMoney())}`);

console.log(appData.addExpenses); */


/* for ( let key in appData) {
  console.log(`Наша программа включает в себя данные: ${key} : ${appData[key]}`);    
} */

/* 
console.log(`Накопления за месяц: ${appData.budgetMonth} ${declOfMon(appData.budgetMonth, moneys)}`);

// Cрок достижения цели в месяцах:
console.log(`${appData.getTargetMonth()}`);
// Уровень дохода

console.log(`Бюджет на день: ${appData.budgetDay} ${declOfMon(appData.budgetDay, moneys)}`);

console.log(`Доход за месяц: ${money} ${declOfMon(money, moneys)}`);
console.log(`Цель: ${appData.mission}`);

console.log(appData.expenses);
console.log(appData.addExpenses);

console.log(`Дополнительные доходы ${appData.income}`);
console.log(appData.income);
console.log(`Перечисление доп. дохдов ${appData.addIncome}`);
console.log(appData.addIncome);
console.log(`Дополнительные рассходы ${appData.expenses}`);
console.log(appData.expenses);
console.log(`Возможные расходы ${appData.addExpenses}`);
console.log(appData.addExpenses);
console.log(`Депозит ${appData.deposit}`);
console.log(`Цель накопить ${appData.mission}`);
console.log(`Cрок достижения цели в месяцах ${appData.period}`);
console.log(`Доход за месяц ${appData.budget}`);
console.log(`Бюджет на день ${appData.budgetDay}`);
console.log(`Бюджет на месяц ${appData.budgetMonth}`);
console.log(`Расходы за месяц ${appData.expensesMonth}`); */