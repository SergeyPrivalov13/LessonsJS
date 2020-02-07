'use strict';
const 
// Месячный доход
salaryAmount =document.querySelector('.salary-amount');
// Блоки с input
let incomeItems = document.querySelectorAll('.income-items');
const// Дополнительный доход: Кнопка '+'
incomeAdd = document.getElementsByTagName('button')[0],

// Возможный доход: input 'Наименование'
additionalIncomeItem = document.querySelectorAll('.additional_income-item');

// Блоки с input
let expensesItems = document.querySelectorAll('.expenses-items');
const// Обязательные расходы: Кнопка '+'
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
cancel = document.getElementById('cancel'),
// Все input
inputAll = document.querySelectorAll('input');

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
    //
    incomeMonth: 0,
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
    // Доход за месяц
    budget: 0,
    // Бюджет на день
    budgetDay: 0,
    // Бюджет на месяц
    budgetMonth: 0,
    // Расходы за месяц
    expensesMonth: 0,
    // Вопросы к пользователю
    start: function(){
      
      /* do {
        appData.budget = prompt('Ваш месячный доход?', 50000);
        if(appData.budget === null){
          appData.budget = 0;
          break;
        }    
      } while (!isNumber(appData.budget)); */

      // Месячный доход
      appData.budget = +salaryAmount.value;

      appData.getExpenses();            // Вызов метода getExpenses
      appData.getIncome();              // Вызов метода getIncome
      appData.getExpensesMonth();       // Вызов метода getExpensesMonth
      appData.getAddExpenses();         // Вызов метода getAddExpenses
      appData.getAddIncome();           // Вызов метода getAddIncome
      appData.getBudget();              // Вызов метода getBudget
      appData.getStatusIncome();        // Вызов метода getStatusIncome
      appData.showResult();             // Вызов метода showResult
    },
    // Функуия Показать результат
    showResult: function(){
      budgetMonthValue.value = appData.budgetMonth;                     // Доход за месяц
      budgetDayValue.value = appData.budgetDay;                         // Дневной бюджет
      expensesMonthValue.value = appData.expensesMonth;                 // Расход за месяц
      additionalExpensesValue.value = appData.addExpenses.join(', ');   // Возможные расходы
      additionalIncomeValue.value = appData.addIncome.join(', ');       // Дополнительные доходы
      targetMonthValue.value = appData.getTargetMonth();                // Cрок достижения цели в месяцах
      incomePeriodValue.value = appData.calcSaveMoney();                // Сумма накопления за период
    },

    // Функция добавления нового блока в Обязательные расходы
    addExpensesBlock: function(){  
      // Делаем копию всего блока
      const  cloneExpensesItem = expensesItems[0].cloneNode(true);
      // В родителе перед кнопкой вставляем склонированный элемент
      expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
      // Ещё раз проверяем кол-во элементов
      expensesItems = document.querySelectorAll('.expenses-items');

      // Очистка инпута 
      cloneExpensesItem.querySelectorAll('input').forEach(function(item) {
        item.value = '';
        });

      if(expensesItems.length === 3){
        expensesAdd.style.display = 'none';
      }
    },
    // Получаем все расходы и записываем их в объект
    getExpenses: function(){
      // Перебираем все элемениты
      expensesItems.forEach(function(item){
        // Обязательные расходы: input 'Наименование'
        let itemExpenses = item.querySelector('.expenses-title').value,
        // Обязательные расходы: input 'Сумма'
          cashExpenses = item.querySelector('.expenses-amount').value;

          if (itemExpenses !== '' && cashExpenses !== '') {
            appData.expenses[itemExpenses] = cashExpenses;
          } 
      });
    },    

    // Функция добавления нового блока в Дополнительный доход
    addIncomeBlock: function(){ 
      // Делаем копию всего блока
      const cloneIncomeItem = incomeItems[0].cloneNode(true);
      // В родителе перед кнопкой вставляем склонированный элемент
      incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
      // Ещё раз проверяем кол-во элементов
      incomeItems = document.querySelectorAll('.income-items');

      // Очистка инпута
      cloneIncomeItem.querySelectorAll('input').forEach(function(item) {
        item.value = '';
        });

      if(incomeItems.length === 3){
        incomeAdd.style.display = 'none';
      }
    },

    getIncome: function(){
      // Перебираем все элемениты
      incomeItems.forEach(function(item) {
        // Дополнительный доход: input 'Наименование'
        let itemIncome = item.querySelector('.income-title').value,
        // Дополнительный доход: input 'Сумма'
          cashIncome = item.querySelector('.income-amount').value;

        if (itemIncome !== '' && cashIncome !== '') {
          appData.income[itemIncome] = cashIncome;
        }
      });

      for (let key in appData.income) {
        appData.incomeMonth += +appData.income[key];
      }
    },

    // Возможные расходы
    getAddExpenses: function(){
      // Запишем значения Возможных расходов в переменную
      let addExpenses = additionalExpensesItem.value.split(',');
      addExpenses.forEach(function(item){
        let itemValue = item.trim();
        item = itemValue.replace(itemValue.charAt(0), itemValue.charAt(0).toUpperCase());
        if (item !== '') {
          appData.addExpenses.push(item);
        }
      });
    },

    // Возможный доход
    getAddIncome: function(){
      // Перебираем все input
      additionalIncomeItem.forEach(function(item){
        let itemValue = item.value.trim();
        item = itemValue.replace(itemValue.charAt(0), itemValue.charAt(0).toUpperCase());
        if (itemValue !== '') {
          appData.addIncome.push(item);
        }
      });
    },

    // Расходы за месяц
    getExpensesMonth: function(){
      // Сумируем все обязательные рассходы записываем в переменную expensesMonth 
      for(let item in appData.expenses){
        appData.expensesMonth += +appData.expenses[item];
      } 
    },

    // Функция возвращает накопления за месяц
    getBudget: function (){
      // Бюджет на месяц записываем в переменную
      appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
      // Бюджет на день
      appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },

    // Cрок достижения цели в месяцах
    getTargetMonth: function(){
      let target = Math.ceil(targetAmount.value / appData.budgetMonth);
      if (target >= 0){
        return `${target} ${declOfNum(target, ['месяц', 'месяца', 'месяцев'])}`;
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
      return appData.budgetMonth * periodSelect.value;
    }
};

      // Обработчики события
// Для кнопки Рассчитать
start.addEventListener('click', appData.start);
// Для '+' Обязательные расходы
expensesAdd.addEventListener('click', appData.addExpensesBlock);
// Для '+' Дополнительный доход
incomeAdd.addEventListener('click', appData.addIncomeBlock);


/* Ввод только русских букв */
let input1 = document.querySelectorAll('input[placeholder="Наименование"]'),
  input2 = document.querySelectorAll('input[placeholder="Название"]');
input1.forEach(function (item) {
  item.addEventListener('input', function () {
    let placeName = item.value,
      rep = /[-\.;":'a-zA-Z0-9]+$/i;
    if (rep.test(placeName)) {
      placeName = placeName.replace(rep, '');
      item.value = placeName;
    }
  });
});
input2.forEach(function (item) {
  item.addEventListener('input', function () {
    let placeName = item.value,
      rep = /[-\.;":'a-zA-Z0-9]+$/i;
    if (rep.test(placeName)) {
      placeName = placeName.replace(rep, '');
      item.value = placeName;
    }
  });
});

/* Ввод только цифр */
let inputSum = document.querySelectorAll('input[placeholder="Сумма"]');
inputSum.forEach(function (item) {
  item.addEventListener('input', function () {
    let placeSum = item.value,
      rep = /[-\.;":'a-zA-Zа-яА-Я]/;
    if (rep.test(placeSum)) {
      placeSum = placeSum.replace(rep, '');
      item.value = placeSum;
    }
  });
});

