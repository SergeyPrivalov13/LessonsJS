// Валидация полей ввода
const inputValidation = () => {
  const inputs = document.querySelectorAll('input');

  inputs.forEach(elem => {
    elem.addEventListener('input', () => {
      if (elem.type === 'text') {
          elem.value = elem.value.replace(/[^а-яА-Я ]/, '');
      }
      if (elem.type === 'tel') {
          elem.value = elem.value.replace(/[^\+\d]/, '');
      }
    });
  });
};

export default inputValidation;