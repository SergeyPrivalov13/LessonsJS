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
// Цифра периода
periodAmount = document.querySelector('.period-amount'),

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
      let textError = document.querySelector('.textError');
      function textOpac(){
        textError.style.opacity = 0;
      }
      // Проверяем пустое ли поле Месячный доход
      if (salaryAmount.value === '') {
        if (textError.classList.contains('errorP') === false || textError.classList.contains('errorA') === true){
          textError.classList.remove('errorA');
          textError.classList.add('errorP');
          textError.style.opacity = 1;
        }        
        salaryAmount.style.cssText = `border: 2px solid red`;        
        return;
      } else {  
        if (textError.classList.contains('errorP') === true){
          textError.classList.remove('errorP');
          textError.classList.add('errorA');
          setTimeout(textOpac, 1000);          
        }          
        salaryAmount.style.cssText = `border: 1px solid #ff7f63`;
      }
      
      // Месячный доход
      this.budget = +salaryAmount.value;

      this.getExpenses();            // Вызов метода getExpenses
      this.getIncome();              // Вызов метода getIncome
      this.getExpensesMonth();       // Вызов метода getExpensesMonth
      this.getAddExpenses();         // Вызов метода getAddExpenses
      this.getAddIncome();           // Вызов метода getAddIncome
      this.getBudget();              // Вызов метода getBudget
      this.showResult();             // Вызов метода showResult
      
      start.style.display = 'none';     // После нажатия на Расчитать - кнопка пропадает
      cancel.style.display = 'block';   // Стновиться видимой
      // Убираем кнопку '+'
      incomeAdd.style.transform = 'translateX(-2000px)';   
      incomeAdd.style.transitionDuration = '500ms';   
      expensesAdd.style.transform = 'translateX(-2000px)';
      expensesAdd.style.transitionDuration = '500ms';

      // Все input в блоке data
      let data = document.querySelectorAll('.data input[type="text"]');
      // Делаем не активными input после нажатия Расчитать
      data.forEach(function(item) {                       
        item.disabled = true;
      }); 
    },
    // Функуия Показать результат
    showResult: function(){
      // Динамическое изменение Сумма накопления за период
      periodSelect.addEventListener('input', function(){
        let period = periodSelect.value;
        incomePeriodValue.value = 
        `${appData.calcPeriod(period)} ${declOfNum(appData.calcPeriod(period), ['рубль', 'рубля', 'рублей'])}`;
      });
      // Доход за месяц
      budgetMonthValue.value = 
      `${this.budgetMonth} ${declOfNum(this.budgetMonth, ['рубль', 'рубля', 'рублей'])}`;                     
      // Дневной бюджет
      budgetDayValue.value = 
      `${this.budgetDay} ${declOfNum(this.budgetDay, ['рубль', 'рубля', 'рублей'])}`;
      // Расход за месяц
      expensesMonthValue.value = 
      `${this.expensesMonth} ${declOfNum(this.expensesMonth, ['рубль', 'рубля', 'рублей'])}`;                 
      // Возможные доходы   
      additionalIncomeValue.value = this.addIncome.join(', ');
      // Возможные расходы
      additionalExpensesValue.value = this.addExpenses.join(', ');
      // Сумма накопления за период                
      incomePeriodValue.value =
      `${this.calcSaveMoney()} ${declOfNum(this.calcSaveMoney(), ['рубль', 'рубля', 'рублей'])}`;                
      // Cрок достижения цели в месяцах       
      targetMonthValue.value = this.getTargetMonth();
    },

    // Функция добавления нового блока в Обязательные расходы
    addExpensesBlock: function(){      
      // Делаем копию всего блока
      const  cloneExpensesItem = expensesItems[0].cloneNode(true);
      // В родителе перед кнопкой вставляем склонированный элемент
      expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
      // Ещё раз проверяем кол-во элементов
      expensesItems = document.querySelectorAll('.expenses-items');      
      // Удаляем '+' если > 3
      if(expensesItems.length === 3){
        expensesAdd.style.display = 'none';
      }
      // Валидация
      appData.langInput();
      // Очищаем input
      cloneExpensesItem.querySelectorAll('input').forEach(function(item) {
        item.value = '';
        });

      // Удаляем все дополнительные блоки
      cancel.addEventListener('click', function(){
        cloneExpensesItem.children[0].value = '';
        cloneExpensesItem.children[1].value = '';
        cloneExpensesItem.remove();
      });
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
      // Удаляем '+' если > 3
      if(incomeItems.length === 3){
        incomeAdd.style.display = 'none';
      }

      // Валидация
      appData.langInput();

      // Очищаем input
      cloneIncomeItem.querySelectorAll('input').forEach(function(item) {
        item.value = '';
        });

      // Удаляем все дополнительные блоки
      cancel.addEventListener('click', function(){
        cloneIncomeItem.children[0].value = '';
        cloneIncomeItem.children[1].value = '';
        cloneIncomeItem.remove();
      });
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

      for (let key in this.income) {
        this.incomeMonth += +this.income[key];
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
      for(let item in this.expenses){
        this.expensesMonth += +this.expenses[item];
      } 
    },

    // Функция возвращает накопления за месяц
    getBudget: function (){
      // Бюджет на месяц записываем в переменную
      this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
      // Бюджет на день
      this.budgetDay = Math.floor(this.budgetMonth / 30);
    },

    // Cрок достижения цели в месяцах
    getTargetMonth: function(){
      let target = Math.round(targetAmount.value / this.budgetMonth);
      if (target >= 0){
        return `${target} ${declOfNum(target, ['месяц', 'месяца', 'месяцев'])}`;
      } else {
        return 'Цель не будет достигнута';
      }
    },

    // Уровень дохода
    getStatusIncome: function(){
      const budgetDay = this.budgetDay;
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
      this.deposit = confirm('Есть ли у вас депозит в банке?');
      if(this.deposit){
        do {
          this.percentDeposit = prompt('Какой годовой процент?', 10);
          this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
          if(this.percentDeposit === null || this.moneyDeposit === null){
            this.percentDeposit = 0;
            this.moneyDeposit = 0;
            break;
          }  
        } while (!isNumber(this.percentDeposit) || !isNumber(this.moneyDeposit));
      }
    },    
    
    // Сумма накопления за период
    calcSaveMoney: function(){
      return this.budgetMonth * periodSelect.value;
    },
    // Для динамического изменения периода
    calcPeriod: function(period) {
      return this.budgetMonth * +period;
    },

    // Функция валидации цифр и букв
    langInput: function(){
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
      
    },

    // Функция для range
    getRange: function() {
      periodAmount.textContent = periodSelect.value;
      return +periodSelect.value;
    },

    // Сброс всех полей
    reset: function() {
      inputAll.forEach( function(item) {
        // Делаем поля активными
        item.disabled = false;
        // Пустые все input            
        item.value = '';
      });

      // Обнуляем все значения в переменных
      this.income = {};
      this.incomeMonth = 0;
      this.addIncome = [];
      this.expenses = {};
      this.addExpenses = [];
      this.deposit = false;
      this.percentDeposit = 0;
      this.moneyDeposit = 0;
      this.budget = 0;
      this.budgetDay = 0;
      this.budgetMonth = 0;
      this.expensesMonth = 0;

      // Возвращаем Range в начальное состояние
      periodSelect.value = 0;
      periodAmount.textContent = 1;

      // Меняем кнопку Сброс на Старт
      start.style.display = 'block';
      cancel.style.display = 'none';

      // Добавляем кнопку '+'
      incomeAdd.style.transform = 'translateX(0)';   
      incomeAdd.style.transitionDuration = '1ms';   
      incomeAdd.style.display = 'block';   
      expensesAdd.style.transform = 'translateX(0)';
      expensesAdd.style.transitionDuration = '1ms';
      expensesAdd.style.display = 'block';
    },
};

// Вызов метода вылидации
appData.langInput();

      // Обработчики события
// Для кнопки Рассчитать
start.addEventListener('click', appData.start.bind(appData));
// Для кнопки Сбросить
cancel.addEventListener('click', appData.reset.bind(appData));
// Для '+' Обязательные расходы
expensesAdd.addEventListener('click', appData.addExpensesBlock);
// Для '+' Дополнительный доход
incomeAdd.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('input', appData.getRange);


