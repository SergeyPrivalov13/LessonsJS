document.addEventListener('DOMContentLoaded', () => {
  'use strict';

    const // Получаум элементы со страницы
    timerTimeDay = document.getElementById('timer-timeDay'),
    timerDay = document.getElementById('timer-day'),
    timerTime = document.getElementById('timer-time'),
    timerNewYear = document.getElementById('timer-newYear'),
    // Текущее время
    date = new Date(),
    // День недели
    dayWeek = date.getDay(),
    // Час
    hours = date.getHours(),
    // Дата Нового года в милисекундах
    newYear = new Date('31 december 2020 23:59:59').getTime(),
    // Текущее время в миллисекундах
    dateNow = date.getTime(),
    // Количество дней до нового года
    dateRemained = Math.floor((newYear - dateNow) / 1000 / 60 / 60 / 24),
    // Названия дней недели
    week = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  let day;

    if (hours <= 6) {
      timerTimeDay.textContent = `Доброй Ночи!`;
    } else if (hours > 6 && hours <= 11) {
      timerTimeDay.textContent = `Доброго Утра!`;
    } else if (hours >= 12 && hours <= 17) {
      timerTimeDay.textContent = `Доброго Дня!`;
    } else {
      timerTimeDay.textContent = `Доброго Вечера!`;
    }

    timerDay.textContent = `Сегодня: ${week[dayWeek]}`;
    timerTime.textContent = `Текущее время: ${date.toLocaleTimeString('en')}`;

    let str = dateRemained.toString().slice(-1),
        str2 = dateRemained.toString().slice(-2);    
    
    if (str > '1' && str <= '4') {
      day = `дня`;
    } else if (str > '4' && str <= '9' || str === '0' || str2 >= '11' && str2 <= '14') {
      day = `дней`;
    }
    timerNewYear.textContent = `До нового года осталось: ${dateRemained} ${day}`;
});