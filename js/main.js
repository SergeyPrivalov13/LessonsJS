let money = 50000,                                    // Доход за месяц
  income = 'фрилансер',                               // Дополнительный доход
  addExpenses = 'Интернет, Такси, Коммуналка',        // Дополнительные расходы
  deposit = true,
  mission = 20000,                                    // Сумма накоплений
  period = 4,
  budgetDay = money / 30;                             // Дневной бюджет

console.log(typeof (money));
console.log(typeof (income));
console.log(typeof (deposit));

console.log(addExpenses.length);

console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей/долларов/гривен/юани');

console.log(addExpenses.toLowerCase().split(', '));

console.log(budgetDay);

