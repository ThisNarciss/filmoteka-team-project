import { Report } from 'notiflix/build/notiflix-report-aio';

// Для використання функцій виклику повідомлень зробіть собі імпорт потрібних функцій в файл.

const options = {
  svgSize: '50px',
  svgColor: '#ff6b01',
  buttonBackground: '#ff6b01',
  titleMaxLength: 80,
  backOverlayClickToClose: true,
  cssAnimationDuration: 500,
};

// Функція виводить повідомлення про помилку, коли щось не так із відповіддю сервера. Додавати в catch.
export function notiflixErrorMessage() {
  Report.failure(
    'There are some problems! Try again later.',
    '',
    'Try again',
    options
  );
}

// Функція виводить повідомлення, що за даним запитом нічого не знайдено.
export function notiflixNoMatchesMessage() {
  Report.failure(
    'Sorry, there are no films matching your search query! Please try again.',
    '',
    'Try again',
    options
  );
}

// Функція виводить прохання ввести щось в інпут, якщо користувач натиснув submit без введення запиту.
export function notiflixEmptyQueryMessage() {
  Report.failure('Please enter your search query!', '', 'OK', options);
}
