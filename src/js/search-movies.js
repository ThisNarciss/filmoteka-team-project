import axios from 'axios';
import createMarkUp from './create-mark-up';
import { movieTrending } from './fetch-movies';
import {
  noMatchesNotification,
  emptyQueryNotification,
  errorNotification,
} from './notifications';

const trendingGallery = document.querySelector('.js-movie-card');

const searchInput = document.querySelector('.js-search-input');
const searchForm = document.querySelector('.js-search-form');
searchForm.addEventListener('submit', onSearchSubmit);

export function onSearchSubmit(evt) {
  evt.preventDefault();
  clearMarkup();
  const searchQuery = searchInput.value.trim();

  if (searchQuery == '') {
    emptyQueryNotification();
    returnToMain();
  } else {
    goSearch(searchQuery).then(function (response) {
      if (response.length === 0) {
        noMatchesNotification();
        returnToMain();
      } else {
        createMarkUp(response);
      }
    });
  }
  evt.currentTarget.reset();
}

async function goSearch(query) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=d60997a7e23cda835c1c23368c69f903&query=${query}`
    );
    const arr = response.data.results;
    return arr;
  } catch (error) {
    console.error(error);
  }
}

export function clearMarkup() {
  trendingGallery.innerHTML = '';
}

function returnToMain() {
  movieTrending().then(function (response) {
    if (response.length === 0) {
      noMatchesNotification();
    } else {
      createMarkUp(response);
    }
  });
}
