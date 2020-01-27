'use strict';

let
  // Доход за месяц
  money = +prompt('Ваш месячный доход?'),
  // Дополнительный доход                       
  income = 'фрилансер',                                           
  // Дополнительные расходы
  addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
  // Депозит
  deposit = confirm('Есть ли у вас депозит в банке?'),            
  // Сумма накоплений                                               
  mission = 100000,
  // Обязательные рассходы 1    
  expenses1 = prompt('Введите обязательную статью расходов?'),
  // Сумма обязательных расходов 1                 
  amount1 = +prompt('Во сколько это обойдется?'),
  // Обязательные рассходы 2    
  expenses2 = prompt('Введите обязательную статью расходов?'),
  // Сумма обязательных расходов 2                 
  amount2 = +prompt('Во сколько это обойдется?'),
  // Бюджет на месяц                        
  budgetMonth = money - amount1 - amount2,
  // Период округлённый в большую сторону
  period = Math.ceil(mission / budgetMonth),
  // Дневной бюджет округлённый в меньшую сторону                      
  budgetDay = Math.floor(budgetMonth / 30);                       

//функция для склонения числительный
// n - число
// t - массив из 3 вариантов склонения  
const declOfNum = (n, t) => t[ (n%100>4 && n%100<20)? 2 : [2, 0, 1, 1, 1, 2][(n%10<5)?n%10:5] ],
  month = ['месяц', 'месяца', 'месяцев'];

console.log(typeof (money));
console.log(typeof (income));
console.log(typeof (deposit));

console.log(addExpenses.length);

console.log(`Период равен ${period} ${declOfNum(period, month)}`);
console.log('Цель заработать ' + mission + ' рублей/долларов/гривен/юани');

console.log(addExpenses.toLowerCase().split(/,\s*/));

console.log('Бюджет на месяц ' + budgetMonth);
console.log(`Цель будет достигнута за: ${period} ${declOfNum(period, month)}`);
console.log('Бюджет на день: ' + budgetDay);

if (budgetDay > 1200) {
  console.log('У вас высокий уровень дохода!');  
} else if (budgetDay > 600 && budgetDay < 1200) {
  console.log('У вас средний уровень дохода');  
} else if (budgetDay >= 0 && budgetDay < 600) {
  console.log('К сожалению у вас уровень дохода ниже среднего');  
} else {
  console.log('Что то пошло не так');  
}

//console.log('Доход за месяц: ' + money );
//console.log('Депозит ' + deposit);
//console.log(expenses1.toLowerCase().split(', '));
//console.log('Сумма расходов ' + amount1);
//console.log(expenses2.toLowerCase().split(', '));
//console.log('Сумма расходов ' + amount2);


