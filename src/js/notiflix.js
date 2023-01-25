import { Report } from 'notiflix/build/notiflix-report-aio';

const options = {
  svgSize: '50px',
  svgColor: '#ff6b01',
  buttonBackground: '#ff6b01',
  titleMaxLength: 80,
  backOverlayClickToClose: true,
  cssAnimationDuration: 500,
};

export function notiflixErrorMessage() {
  Report.failure(
    'There are some problems! Try again later.',
    '',
    'Try again',
    options
  );
}

export function notiflixNoMatchesMessage() {
  Report.failure(
    'Sorry, there are no films matching your search query! Please try again.',
    '',
    'Try again',
    options
  );
}

export function notiflixEmptyQueryMessage() {
  Report.failure('Please enter your search query!', '', 'OK', options);
}
