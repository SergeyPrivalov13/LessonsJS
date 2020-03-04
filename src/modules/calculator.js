// Калькулятор расчёта стоимости
const calculator = (price = 100) => {
  const
    // Блок со всеми полями 
    calcBlock = document.querySelector('.calc-block'),
    // Поле Select
    calcType = document.querySelector('.calc-type'),
    // Поле Общая площадь*
    calcSquare = document.querySelector('.calc-square'),
    // Поле Количество помещений
    culcCount = document.querySelector('.calc-count'),
    // Поле Срок исполнения
    calcDay = document.querySelector('.calc-day'),
    // Результат
    total = document.getElementById('total'),
    // Поля ввода
    calcItem = calcBlock.querySelectorAll('input');

  // Функция подсчёта итоговой цены
  const countSum = () => {
    const 
      // Значение value у Select -> Option
      typeValue = calcType.options[calcType.selectedIndex].value,
      // Вычисление площади
      squareValue = +calcSquare.value;
    // Результата по умолчанию

    let result = 0,
      // Количество помещений по умолчанию
      countValue = 1,
      // Срок исполнения по умолчанию
      dayValue = 1;

    // Условие для кол-ва помещений
    if (culcCount.value > 1) {
      countValue += (culcCount.value - 1) / 10;
    }

    // Условие для срока исполнения
    if(calcDay.value && calcDay.value <= 5){
      dayValue *= 2;  
    } else if (calcDay.value && calcDay.value <= 10){
      dayValue *= 1.5;  
    }

    // Условие на заполненость полей 
    if(typeValue && squareValue){
      // Вычисляем результат
      result = price * typeValue * squareValue * countValue * dayValue;
    }

    // Выводим результат на страницу
    total.textContent = Math.floor(result);
  };

  // Отлавливаем изменение в блоке
  calcBlock.addEventListener('change', (event) => {
    let target = event.target;      
    // Проверяем были ли изминения в полях
    if(target.matches('select') || target.matches('input')){
      countSum();  
    }
  });

  // Валидация калькулятора
  const validationCalculator = () => {
    calcItem.forEach((elem) => {
      elem.addEventListener('input', () => {
        elem.value = elem.value.replace(/\D/, '');  
      });
    });  
  };
  validationCalculator();
};

export default calculator;