'use strict';

let isNumber = function(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const  
  // Дополнительный доход                       
  income = 'фрилансер',                                           
  // Дополнительные расходы
  addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
  // Депозит
  deposit = confirm('Есть ли у вас депозит в банке?'),            
  // Сумма накоплений                                               
  mission = 100000;
  // Обязательные рассходы 1    
let 
  // Доход за месяц
  money,
  // Обязательные рассходы 1
  expenses1,
  // Сумма обязательных расходов 1                 
  //amount1 = +prompt('Во сколько это обойдется?', 2500),
  // Обязательные рассходы 2    
  expenses2;
  // Сумма обязательных расходов 2                 
  //amount2 = +prompt('Во сколько это обойдется?', 2500);                        

//функция для склонения числительный
// n - число
// t - массив из 3 вариантов склонения  
const declOfNum = (n, t) => t[ (n%100>4 && n%100<20)? 2 : [2, 0, 1, 1, 1, 2][(n%10<5)?n%10:5] ],
  month = ['месяц', 'месяца', 'месяцев'];
const declOfMon = (n, t) => t[ (n%100>4 && n%100<20)? 2 : [2, 0, 1, 1, 1, 2][(n%10<5)?n%10:5] ],
  moneys = ['рубль', 'рубля', 'рублей'];

const start = function(){
  do {
    money = prompt('Ваш месячный доход?');    
  } while (!isNumber(money));
};
start();

const showTypeOf = function(data){
  console.log(data, typeof(data));  
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

// Расходы за месяц
const getExpensesMonth = function(){
  let sum = 0;

  for (let i = 0; i < 2; i++){
    if (i === 0) {
      expenses1 = prompt('Введите обязательную статью расходов?', 'садик государственный' );
    } else if (i === 1){
      expenses2 = prompt('Введите обязательную статью расходов?','садик частный');
    }
    let count;
    do {
      count = prompt('Во сколько это обойдется?');
    } while (!isNumber(count));

    sum += +count;    
  }

  return sum;
};
let expensesMonth = getExpensesMonth();
console.log(`Расходы за месяц: ${expensesMonth} ${declOfMon(expensesMonth, moneys)}`);

// Вывод возможных расходов в виде массива
console.log(addExpenses.toLowerCase().split(/,\s*/));

// Функция возвращает накопления за месяц
const getAccumulatedMonth = function (){
  // Объявляем переменную и присваиваем ей резултьтат
  let accumulatedMonth = money - expensesMonth;
  return accumulatedMonth;
};
console.log(`Накопления за месяц: ${getAccumulatedMonth()} ${declOfMon(getAccumulatedMonth(), moneys)}`);

// Бюджет на день
const getBudgetDay = function(){
  return getAccumulatedMonth() / 30 ;
};
console.log(`Бюджет на день: ${getBudgetDay()} ${declOfMon(getBudgetDay(), moneys)}`);

// Cрок достижения цели в месяцах
const getTargetMonth = function(){
  let num = Math.ceil(mission / getAccumulatedMonth());
  if (num >= 0){
    return `${num} ${declOfNum(num, month)}`;
  } else {
    return 'Цель не будет достигнута';
  }
}; 
console.log(`Cрок достижения цели в месяцах: ${getTargetMonth()}`);

// Уровень дохода
const getStatusIncome = function(){
  let budgetDay = getBudgetDay();
  if (budgetDay > 1200) {
    return('У вас высокий уровень дохода!');  
  } else if (budgetDay > 600 && budgetDay < 1200) {
    return('У вас средний уровень дохода');  
  } else if (budgetDay >= 0 && budgetDay < 600) {
    return('К сожалению у вас уровень дохода ниже среднего');  
  } else {
    return('Что то пошло не так');  
  }
};
console.log(getStatusIncome());


console.log(`Доход за месяц: ${money}`);
console.log(`Цель: ${mission}`);

