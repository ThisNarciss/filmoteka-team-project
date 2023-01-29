import axios from 'axios';
import createMarkUp from './create-mark-up';
import pagination from './pagination';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const API_KEY = '687f60735406ee0172c31461de2476ff';

const TREND_URL = `/trending/movie/week`;
const GENRES_URL = `/genre/movie/list`;

const navCurrentLink = document.querySelector('.js-library-page');

// localStorage.setItem('library-page', JSON.stringify(false));

// navCurrentLink.addEventListener('click', () => {
//   localStorage.setItem('library-page', JSON.stringify(true));
// });

localStorage.setItem('render-key', 'fetch-movies');
axios
  .get(`${GENRES_URL}?api_key=${API_KEY}&language=en-US`)
  .then(genres => localStorage.setItem('genres', JSON.stringify(genres.data)))
  .catch(error => console.error(error));

export async function movieTrending(page = 1) {
  try {
    const response = await axios.get(
      `${TREND_URL}?api_key=${API_KEY}&page=${page}`
    );

    const arr = response.data;

    return arr;
  } catch (error) {
    console.error(error);
  }
}

movieTrending()
  .then(data => {
    createMarkUp(data);
    console.log(data);
    pagination(1, data.total_pages);
  })
  .catch(console.error());
