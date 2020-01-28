'use strict';

const
  // Доход за месяц
  money = +prompt('Ваш месячный доход?', 50000),
  // Дополнительный доход                       
  income = 'фрилансер',                                           
  // Дополнительные расходы
  addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
  // Депозит
  deposit = confirm('Есть ли у вас депозит в банке?'),            
  // Сумма накоплений                                               
  mission = 100000,
  // Обязательные рассходы 1    
  expenses1 = prompt('Введите обязательную статью расходов?', 'садик государственный' ),
  // Сумма обязательных расходов 1                 
  amount1 = +prompt('Во сколько это обойдется?', 2500),
  // Обязательные рассходы 2    
  expenses2 = prompt('Введите обязательную статью расходов?','садик частный'),
  // Сумма обязательных расходов 2                 
  amount2 = +prompt('Во сколько это обойдется?', 2500);
  // Бюджет на месяц                        
  //budgetMonth = money - amount1 - amount2,
  // Период округлённый в большую сторону
  //period = Math.ceil(mission / budgetMonth),
  // Дневной бюджет округлённый в меньшую сторону                      
  //budgetDay = Math.floor(getAccumulatedMonth() / 30);                       

//функция для склонения числительный
// n - число
// t - массив из 3 вариантов склонения  
const declOfNum = (n, t) => t[ (n%100>4 && n%100<20)? 2 : [2, 0, 1, 1, 1, 2][(n%10<5)?n%10:5] ],
  month = ['месяц', 'месяца', 'месяцев'];
const declOfMon = (n, t) => t[ (n%100>4 && n%100<20)? 2 : [2, 0, 1, 1, 1, 2][(n%10<5)?n%10:5] ],
  moneys = ['рубль', 'рубля', 'рублей'];

let showTypeOf = function(data){
  console.log(data, typeof(data));  
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

// Расходы за месяц
let getExpensesMonth = function(){
  return amount1 + amount2;
};
console.log(`Расходы за месяц: ${getExpensesMonth()} ${declOfMon(getExpensesMonth(), moneys)}`);

// Вывод возможных расходов в виде массива
console.log(addExpenses.toLowerCase().split(/,\s*/));

// Функция возвращает накопления за месяц
let getAccumulatedMonth = function (){
  // Объявляем переменную и присваиваем ей резултьтат
  let accumulatedMonth = money - getExpensesMonth();
  return accumulatedMonth;
};
console.log(`Накопления за месяц: ${getAccumulatedMonth()} ${declOfMon(getAccumulatedMonth(), moneys)}`);

// Бюджет на день
let getBudgetDay = function(){
  let budgetDay = getAccumulatedMonth() / 30 ;
  return budgetDay;
};
console.log(`Бюджет на день: ${getBudgetDay()} ${declOfMon(getBudgetDay(), moneys)}`);


// Cрок достижения цели в месяцах
let getTargetMonth = function(){
  return Math.ceil(mission / getAccumulatedMonth());
}; 
console.log(`Cрок достижения цели в месяцах: ${getTargetMonth()} ${declOfNum(getTargetMonth(), month)}`);

// Уровень дохода
let getStatusIncome = function(){
  if (getBudgetDay() > 1200) {
    return('У вас высокий уровень дохода!');  
  } else if (getBudgetDay() > 600 && getBudgetDay() < 1200) {
    return('У вас средний уровень дохода');  
  } else if (getBudgetDay() >= 0 && getBudgetDay() < 600) {
    return('К сожалению у вас уровень дохода ниже среднего');  
  } else {
    return('Что то пошло не так');  
  }
};
console.log(getStatusIncome());
