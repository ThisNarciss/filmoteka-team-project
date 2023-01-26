import axios from 'axios';
// import { createGalleryMarkup } from './cerateGalleryMarkUp';
// import { fetchMovies } from './fetch-movies';
const gallery = document.querySelector('.js-container');

const searchInput = document.querySelector('.js-search-input');
const searchForm = document.querySelector('.js-search-form');
searchForm.addEventListener('submit', onSearchSubmit);

export function onSearchSubmit(evt) {
  evt.preventDefault();
  clearMarkup();
  const searchQuery = searchInput.value.trim();

  if (searchQuery == '') {
    alert('fill the search query');
  } else {
    goSearch(searchQuery).then(function (response) {
      if (response.data.results.length === 0) {
        alert(
          'Sorry, there are no films matching your search query. Please try again.'
        );
        fetchMovies().then(function (response) {
          if (response.length === 0) {
            console.log(
              '"Sorry, there are no films matching your search query. Please try again."'
            );
          } else {
            createGalleryMarkup(response);
          }
        });
      } else {
        createGalleryMarkup(response);
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
    return response;
  } catch (error) {
    console.error(error);
  }
}

export function clearMarkup() {
  gallery.innerHTML = '';
}
