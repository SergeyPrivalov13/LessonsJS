'use strict';
// Блоки с input Дополнительный доход
let incomeItems = document.querySelectorAll('.income-items'),
// Блоки с input Обязательные расходы
expensesItems = document.querySelectorAll('.expenses-items');

const 
// Месячный доход
salaryAmount =document.querySelector('.salary-amount'),
// Дополнительный доход: Кнопка '+'
incomeAdd = document.getElementsByTagName('button')[0],

// Возможный доход: input 'Наименование'
additionalIncomeItem = document.querySelectorAll('.additional_income-item'),

// Обязательные расходы: Кнопка '+'
expensesAdd = document.getElementsByTagName('button')[1],

// Возможные расходы
additionalExpensesItem = document.querySelector('.additional_expenses-item'),

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
inputAll = document.querySelectorAll('input'),

// Чекбокс депозит
depositCheck = document.querySelector('#deposit-check'),
// Выпадающий список депозита
depositBank = document.querySelector('.deposit-bank'),
// Поле 'Сумма' депозита
depositAmount = document.querySelector('.deposit-amount'),
// Поле 'Процент' депозита
depositPercent = document.querySelector('.deposit-percent');

const isNumber = function(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
};

//функция для склонения числительный
// n - число
// t - массив из 3 вариантов склонения 

const declOfNum = (n, t) => t[ (n%100>4 && n%100<20)? 2 : [2, 0, 1, 1, 1, 2][(n%10<5)?n%10:5] ],
  decl = [];

class AppData {
  constructor() {
    // Дополнительные доходы - объект
    this.income = {};
    //
    this.incomeMonth = 0;
    // Перечисление доп. дохдов - массив
    this.addIncome = [];
    // Дополнительные рассходы
    this.expenses = {};
    // Возможные расходы
    this.addExpenses = [];
    // Депозит
    this.deposit = false;
    // Процент депозита
    this.percentDeposit = 0;
    // Вложения на депозит
    this.moneyDeposit = 0;
    // Доход за месяц
    this.budget = 0;
    // Бюджет на день
    this.budgetDay = 0;
    // Бюджет на месяц
    this.budgetMonth = 0;
    // Расходы за месяц
    this.expensesMonth = 0;
    }
  // Вопросы к пользователю
  start() {
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
  
    //this.getExpenses();            // Вызов метода getExpenses
    //this.getIncome();              // Вызов метода getIncome
    this.getExpInc();
    this.getExpensesMonth();       // Вызов метода getExpensesMonth
    this.getAddExpenses();         // Вызов метода getAddExpenses
    this.getAddIncome();           // Вызов метода getAddIncome
    this.getInfoDeposit();         // Вызов метода getInfoDeposit
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
    data.forEach((item) => {                       
      item.disabled = true;
    });

    // Выбор банка
    depositBank.disabled = true;
    // Чекбокм
    depositCheck.disabled = true;
  }

  // Функуия Показать результат
  showResult() {
    // Динамическое изменение Сумма накопления за период
    periodSelect.addEventListener('input', () => {
      let period = periodSelect.value;
      incomePeriodValue.value = 
      `${this.calcPeriod(period)} ${declOfNum(this.calcPeriod(period), ['рубль', 'рубля', 'рублей'])}`;
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
  } 
  
  // Функция добавления нового блока в Обязательные расходы
  addExpensesBlock() {      
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
    
    // Очищаем input
    cloneExpensesItem.querySelectorAll('input').forEach((item) => {
      item.value = '';
    });
  
    // Валидация
    this.langInput();
  
    // Удаляем все дополнительные блоки
    cancel.addEventListener('click', function(){
      cloneExpensesItem.children[0].value = '';
      cloneExpensesItem.children[1].value = '';
      cloneExpensesItem.remove();
    });
  }    
  
  // Функция добавления нового блока в Дополнительный доход
  addIncomeBlock() { 
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
    
    // Очищаем input
    cloneIncomeItem.querySelectorAll('input').forEach((item) => {
      item.value = '';
    });
    
     // Валидация
    this.langInput();  
  
    // Удаляем все дополнительные блоки
    cancel.addEventListener('click', function(){
      cloneIncomeItem.children[0].value = '';
      cloneIncomeItem.children[1].value = '';
      cloneIncomeItem.remove();
    });
  }

  // Получаем все расходы и доп доходы
  getExpInc() {
    const count = item => {
      const startStr = item.className.split('-')[0],     
        itemTitle = item.querySelector(`.${startStr}-title`).value,
        itemAmount = item.querySelector(`.${startStr}-amount`).value; 
        if (itemTitle !== '' && itemAmount !== '') {
          this[startStr][itemTitle] = itemAmount;
        }  
      };  
      incomeItems.forEach(count);
      expensesItems.forEach(count); 
      
      for (let key in this.income) {
        this.incomeMonth += +this.income[key];
      }
    }
  
  // Возможные расходы
  getAddExpenses() {
    // Запишем значения Возможных расходов в переменную
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach((item) => {
      let itemValue = item.trim();
      item = itemValue.replace(itemValue.charAt(0), itemValue.charAt(0).toUpperCase());
      if (item !== '') {
        this.addExpenses.push(item);
      }
    });
  }
  
  // Возможный доход
  getAddIncome() {
    // Перебираем все input
    additionalIncomeItem.forEach((item) => {
      let itemValue = item.value.trim();
      item = itemValue.replace(itemValue.charAt(0), itemValue.charAt(0).toUpperCase());
      if (itemValue !== '') {
        this.addIncome.push(item);
      }
    });
  }
  
  // Расходы за месяц
  getExpensesMonth() {
    // Сумируем все обязательные рассходы записываем в переменную expensesMonth 
    for(let item in this.expenses){
      this.expensesMonth += +this.expenses[item];
    } 
  }
  
  // Функция возвращает накопления за месяц
  getBudget() {
    // Процент от суммы вложения в  депозит
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    // Бюджет на месяц записываем в переменную
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
    // Бюджет на день
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }
  
  // Cрок достижения цели в месяцах
  getTargetMonth() {
    let target = Math.round(targetAmount.value / this.budgetMonth);
    if (target >= 0){
      return `${target} ${declOfNum(target, ['месяц', 'месяца', 'месяцев'])}`;
    } else {
      return 'Цель не будет достигнута';
    }
  }
  
  // Уровень дохода
  getStatusIncome() {
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
  }
  
  // Сумма накопления за период
  calcSaveMoney() {
    return this.budgetMonth * periodSelect.value;
  }
  // Для динамического изменения периода
  calcPeriod(period){
    return this.budgetMonth * +period;
  }
  
  // Функция валидации цифр и букв
  langInput() {
    inputAll.forEach((item) => {
      if (item.placeholder === 'Наименование' || item.placeholder === 'Название'){
        item.addEventListener('input', function () {
          let placeName = item.value,
            rep = /[-\.;+=@#$%^&*№;":?!<>`~":'a-zA-Z0-9]+$/i;
          if (rep.test(placeName)) {
            placeName = placeName.replace(rep, '');
            item.value = placeName;
          }
        });
      } else {
        item.addEventListener('input', function () {
          let placeSum = item.value,
            rep = /[-\.;+=@#$%^&*№;":?!<>`~`ёЁa-zA-Zа-яА-Я]/;
          if (rep.test(placeSum)) {
            placeSum = placeSum.replace(rep, '');
            item.value = placeSum;
          }
        });
      }
    });    
  }
  
  // Функция для range
  getRange() {
    periodAmount.textContent = periodSelect.value;
    return +periodSelect.value;
  }
  
  // Сброс всех полей
  reset() {
    inputAll.forEach((item) => {
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

    // Выбор банка
    depositBank.disabled = false;
    //depositCheck.disabled = false;
    /* // Делаем блоки не видимыми
    depositBank.style.display = 'none';
    depositAmount.style.display = 'none';
    depositPercent.style.display = 'none';
    // Делаем поля пустыми
    depositBank.value = '';
    depositAmount.value = '';
    depositPercent.value = ''; */
    console.log(this.deposit);
    if(depositCheck.checked === true){
      // Делаем блоки не видимыми
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositPercent.style.display = 'none';
      // Делаем поля пустыми
      depositBank.value = '';
      depositAmount.value = '';
      depositPercent.value = '';
      depositCheck.checked = false;
      
    }
  }
  
  // Депозит в банке
  getInfoDeposit() {
    if(this.deposit){
      // Значение поля выбора банка
      this.percentDeposit = depositPercent.value;
      // Значение поля сумма
      this.moneyDeposit = depositAmount.value;      
    }
  }
  
  // Функция определения банка
  changePercent() {
    // Value option
    const valueSelect = this.value;
    if(valueSelect === 'other'){
      depositPercent.value = '';
      depositPercent.style.display = 'inline-block';  
    } else{
      depositPercent.value = valueSelect;
      depositPercent.style.display = 'none';
    }  
  }
  
  // Депозит
  depositHundler() {
    // Если галочка стоит
    
    if(depositCheck.checked){
      // Делаем блок видимым
      depositBank.style.display = 'inline-block';
      // Делаем блок видимым
      depositAmount.style.display = 'inline-block';
      // Присваиваем значение true
      this.deposit = true;
      // Отслеживаем событие нажатой галочки
      depositBank.addEventListener('change', this.changePercent);
      
    } else {
      // Делаем блоки не видимыми
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositPercent.style.display = 'none';
      // Делаем поля пустыми
      depositBank.value = '';
      depositAmount.value = '';
      depositPercent.value = '';
      this.deposit = false;
      // Удаляем событие отслеживания нажатой галочки
      depositBank.removeEventListener('change', this.changePercent);
    }
  }

  // Cообщение об ошибке
  depositError() {
    if (+this.value < 0 || +this.value > 100) {
      alert('Введите корректное значение в поле проценты.');
      depositPercent.value = '';
    }
  }
  
  eventListener() {
  // Для кнопки Рассчитать
  start.addEventListener('click', this.start.bind(this));
  // Для кнопки Сбросить
  cancel.addEventListener('click', this.reset.bind(this));
  // Для '+' Обязательные расходы
  expensesAdd.addEventListener('click', this.addExpensesBlock.bind(this));
  // Для '+' Дополнительный доход
  incomeAdd.addEventListener('click', this.addIncomeBlock.bind(this));
  // Для range
  periodSelect.addEventListener('input', this.getRange);
  // Чекбокс - Депозит
  depositCheck.addEventListener('change', this.depositHundler.bind(this));
  // Поле ввода Проценты
  depositPercent.addEventListener('input', this.depositError);
  }
}

const appData = new AppData();
appData.eventListener();// Вызов метода вылидации
appData.langInput();








