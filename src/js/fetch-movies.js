import axios from 'axios';
import createMarkUp from './create-mark-up';
import pagination from './pagination';
import { failRequest } from './notifications';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { handleError, isUser } from './firebase';

const trendingGallery = document.querySelector('.js-movie-card');

const API_KEY = '687f60735406ee0172c31461de2476ff';

const TREND_URL = `/trending/movie/week`;
const GENRES_URL = `/genre/movie/list`;

// const navCurrentLink = document.querySelector('.js-library-page');

// localStorage.setItem('library-page', JSON.stringify(false));

// navCurrentLink.addEventListener('click', () => {
//   localStorage.setItem('library-page', JSON.stringify(true));
// });
const firebaseConfig = {
  apiKey: 'AIzaSyDFRxvG-cLncd4nzHUtwRVnlgrm2OeK7W8',
  authDomain: 'filmoteka-test-90b99.firebaseapp.com',
  projectId: 'filmoteka-test-90b99',
  storageBucket: 'filmoteka-test-90b99.appspot.com',
  messagingSenderId: '222913084900',
  appId: '1:222913084900:web:1011c02877eb5816a41bf1',
  measurementId: 'G-V4RKSJYRFE',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const form = document.querySelector('.auth-form');
const signInButton = document.querySelector('.form-button-sign-in');

localStorage.setItem('render-key', 'fetch-movies');
axios
  .get(`${GENRES_URL}?api_key=${API_KEY}&language=en-US`)
  .then(genres => localStorage.setItem('genres', JSON.stringify(genres.data)))
  .catch(error => console.error(error));

currentUser();

export async function movieTrending(page = 1) {
  try {
    const response = await axios.get(
      `${TREND_URL}?api_key=${API_KEY}&page=${page}`
    );

    const arr = response.data;

    return arr;
  } catch (error) {
    if (error.response) {
      // Запрос был сделан, и сервер ответил кодом состояния, который
      // выходит за пределы 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // Запрос был сделан, но ответ не получен
      // `error.request`- это экземпляр XMLHttpRequest в браузере и экземпляр
      // http.ClientRequest в node.js
      console.log(error.request);
    } else {
      // Произошло что-то при настройке запроса, вызвавшее ошибку
      console.log('Error', error.message);
    }
    console.log(error.config);
  }
}

movieTrending()
  .then(data => {
    if (data === undefined) {
      failRequest();
      return trendingGallery.insertAdjacentHTML(
        'beforeend',
        `<h1 class="failRequest" >Why did you deliberately break the code?</h1>`
      );
    }
    createMarkUp(data);
    pagination(1, data.total_pages);
  })
  .catch(console.error());

async function currentUser() {
  const currentUser = JSON.parse(localStorage.getItem('current-user')) || [];

  if (currentUser.length === 0) {
    return;
  }

  form.elements.email.value = currentUser[0];
  form.elements.password.value = currentUser[1];
  signInButton.textContent = 'Sign out';
  try {
    const response = await signInWithEmailAndPassword(
      auth,
      currentUser[0],
      currentUser[1]
    );
    const user = response.user;
    isUser(user);
  } catch (error) {
    console.log(error);
    handleError(error);
  }
}
