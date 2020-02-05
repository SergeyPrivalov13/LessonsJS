'use strict';
const 
// Месячный доход
salaryAmount =document.querySelector('.salary-amount'),

// Дополнительный доход: input 'Наименование'
incomeTitle = document.querySelector('.income-title'),
// Дополнительный доход: input 'Сумма'
incomeAmount = document.querySelector('.income-amount'),
// Дополнительный доход: Кнопка '+'
incomeAdd = document.getElementsByTagName('button')[0],

// Возможный доход: input 'Наименование'
additionalIncomeItem = document.querySelectorAll('.additional_income-item'),

// Обязательные расходы: input 'Наименование'
expensesTitle = document.querySelector('.expenses-title'),
// Обязательные расходы: input 'Сумма'
expensesAmount = document.querySelector('.expenses-amount'),
// Обязательные расходы: Кнопка '+'
expensesAdd = document.getElementsByTagName('button')[1],

// Возможные расходы
additionalExpensesItem = document.querySelector('.additional_expenses-item'),

// Чекбокс депозит
depositCheck = document.querySelector('#deposit-check'),

// Цель
targetAmount = document.querySelector('.target-amount'),

// Период расчёта
periodSelect = document.querySelector('.period-select'),

// Доход за месяц
budgetMonthValue = document.querySelector('.budget_month-value'),
// Дневной бюджет
budgetDayValue = document.querySelector('.budget_day-value'),
// Расход за месяц
expensesMonthValue = document.querySelector('.expenses_month-value'),
// Возможные доходы
additionalIncomeValue = document.querySelector('.additional_income-value'),
// Возможные расходы
additionalExpensesValue = document.querySelector('.additional_expenses-value'),
// Накопления за период
incomePeriodValue = document.querySelector('.income_period-value'),
// Срок достижения цели в месяцах
targetMonthValue = document.querySelector('.target_month-value'),

// Кнопка Рассчитать
start = document.getElementById('start'),
// Кнопка Сбросить
cancel = document.getElementById('cancel');


console.log(salaryAmount);
console.log(incomeTitle);
console.log(incomeAmount);
console.log(incomeAdd);
console.log(additionalIncomeItem);
console.log(expensesTitle);
console.log(expensesAmount);
console.log(expensesAdd);
console.log(additionalExpensesItem);
console.log(depositCheck);
console.log(targetAmount);
console.log(periodSelect);
console.log(budgetMonthValue);
console.log(budgetDayValue);
console.log(expensesMonthValue);
console.log(additionalIncomeValue);
console.log(additionalExpensesValue);
console.log(incomePeriodValue);
console.log(targetMonthValue);
console.log(start);
console.log(cancel);

const isNumber = function(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const isEmpty = function(str) {
  return (!str || /^\s*$/.test(str));
};

//функция для склонения числительный
// n - число
// t - массив из 3 вариантов склонения 

const declOfNum = (n, t) => t[ (n%100>4 && n%100<20)? 2 : [2, 0, 1, 1, 1, 2][(n%10<5)?n%10:5] ],
  decl = [];

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
    budget: 0,
    // Бюджет на день
    budgetDay: 0,
    // Бюджет на месяц
    budgetMonth: 0,
    // Расходы за месяц
    expensesMonth: 0,
    // Вопросы к пользователю
    asking: function(){
      do {
        appData.budget = prompt('Ваш месячный доход?', 50000);
        if(appData.budget === null){
          appData.budget = 0;
          break;
        }    
      } while (!isNumber(appData.budget));

      if(confirm('Есть ли у вас дополнительный зароботок?')){ 
        let itemIncome,
          cashIncome;  
        do {
          itemIncome = prompt('Какой у вас есть дополнительный заработок?', 'Вязание');
          if(itemIncome === null){
            itemIncome = '';
            break;
          } 
        } while (isNumber(itemIncome) || isEmpty(itemIncome));
        do {
          cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
          if(cashIncome === null){
            cashIncome = 0;
            break;
          } 
        } while (!isNumber(cashIncome));
        appData.income[itemIncome] = cashIncome;
      }

      let addExpenses;
      do {
        // Дополнительные расходы
        addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'карп');
        if(addExpenses === null){
          addExpenses = 0;
          break;
        } 
        // Записываем результат в массив - Возможные расходы
        addExpenses = addExpenses.split(',');
        for(let i = 0; i < addExpenses.length; i++){
          const expens = addExpenses[i].trim();
          addExpenses[i] = expens.replace(expens.charAt(0), expens.charAt(0).toUpperCase());
        }
        appData.addExpenses = addExpenses;
        
        
      } while (isNumber(addExpenses) || isEmpty(addExpenses));
      let count,
          expenses;
      for (let i = 0; i < 2; i++){
        if (i === 0) {          
          do {
            expenses = prompt('Введите обязательную статью расходов 1?', 'садик государственный' );
            count = +prompt('Во сколько это обойдется 1?', 2300);
            if(expenses === null || count === null){
              expenses = '';
              count = 0;
              break;
            }
            // Записываем в объект expenses
            appData.expenses[expenses] = count;
          } while (!isNumber(count) || isNumber(expenses) || isEmpty(expenses));
        
        } else if (i === 1){
          do {
            expenses = prompt('Введите обязательную статью расходов 2?','садик частный');
            count = +prompt('Во сколько это обойдется 2?', 3400);
            if(expenses === null || count === null){
              expenses = '';
              count = 0;
              break;
            }
            // Записываем в объект expenses
            appData.expenses[expenses] = count; 
          } while (!isNumber(count) || isNumber(expenses) || isEmpty(expenses));
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
        return `Cрок достижения цели: ${appData.period} ${declOfNum(appData.period, ['месяц', 'месяца', 'месяцев'])}`;
      } else {
        return 'Цель не будет достигнута';
      }
    },
    // Уровень дохода
    getStatusIncome: function(){
      const budgetDay = appData.budgetDay;
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
          if(appData.percentDeposit === null || appData.moneyDeposit === null){
            appData.percentDeposit = 0;
            appData.moneyDeposit = 0;
            break;
          }  
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

console.log(`Расходы за месяц: ${appData.expensesMonth} 
${declOfNum(appData.expensesMonth, [ 'рубль', 'рубля', 'рублей' ])}`);
console.log(`${appData.getTargetMonth()}`);
console.log(appData.getStatusIncome());

console.log(`Годовой процент ${appData.percentDeposit}`);
console.log(`Заложенная сумма ${appData.moneyDeposit}`);
console.log(`Сумма накопления за период ${appData.calcSaveMoney()}`);

console.log('Возможные расходы: ', appData.addExpenses.join(', '));


/* for ( let key in appData) {
  console.log(`Наша программа включает в себя данные: ${key} : ${appData[key]}`);    
} */

/* 
console.log(`Накопления за месяц: ${appData.budgetMonth} ${declOfMon(appData.budgetMonth, [ 'рубль', 'рубля', 'рублей' ])}`);
// Cрок достижения цели в месяцах:
console.log(`${appData.getTargetMonth()}`);
// Уровень дохода
console.log(`Бюджет на день: ${appData.budgetDay} ${declOfMon(appData.budgetDay, [ 'рубль', 'рубля', 'рублей' ])}`);
console.log(`Доход за месяц: ${money} ${declOfMon(money, [ 'рубль', 'рубля', 'рублей' ])}`);
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