import axios from 'axios';
import createMarkUp from './create-mark-up';
import { movieTrending } from './fetch-movies';
import pagination from './pagination';
import {
  noMatchesNotification,
  emptyQueryNotification,
  errorNotification,
} from './notifications';
import { showLoader, hideLoader } from './loader';

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
    goSearch(searchQuery, (page = 1)).then(function (response) {
      if (response.results.length === 0) {
        noMatchesNotification();
        returnToMain();
      } else {
        localStorage.setItem('film-name', searchQuery);
        createMarkUp(response);
        pagination(1, response.total_pages);
      }
    });
  }

  localStorage.setItem('render-key', 'search-movies');
  evt.currentTarget.reset();
}

export default async function goSearch(query, page = 1) {
  try {
    showLoader();
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=d60997a7e23cda835c1c23368c69f903&query=${query}&page=${page}`
    );
    const arr = response.data;
    hideLoader();
    return arr;
  } catch (error) {
    console.error(error);
  }
}

export function clearMarkup() {
  trendingGallery.innerHTML = '';
}

function returnToMain() {
  movieTrending()
    .then(data => {
      showLoader();
      createMarkUp(data);
      pagination(1, data.total_pages);
      hideLoader();
    })
    .catch(console.error());
}
