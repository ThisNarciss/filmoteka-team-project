import axios from 'axios';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const trendingGallery = document.querySelector('.js-movie-card');

function onSearch(e) {
  e.preventDefault();
  const { query } = e.currentTarget;
  console.log(query.value);
}

const API_KEY = 'a148ed5961285512fd3954af576af4a0';

const TREND_URL = `/trending/movie/week`;
const GENRES_URL = `/genre/movie/list`;

async function movieTrending() {
  try {
    const response = await axios.get(`${TREND_URL}?api_key=${API_KEY}`);

    const arr = response.data;

    return arr;
  } catch (error) {
    console.error(error);
  }
}

async function movieGenres() {
  try {
    const genres = await axios.get(
      `${GENRES_URL}?api_key=${API_KEY}&language=en-US`
    );

    const arrGenres = genres.data;

    console.log('arrGenres', arrGenres);
    return arrGenres;
  } catch (error) {
    console.error(error);
  }
}

async function compareObject() {
  const genersObj = await movieGenres();
  const trendingObj = await movieTrending();

  let arrObj = [genersObj.genres, trendingObj.results];

  console.log('arrObj', arrObj);

  return arrObj;
}

compareObject().then(rendersMarkup).catch(console.error());

async function rendersMarkup(arr) {
  const arrData = arr[1];
  const arrGen = arr[0];
  console.log(arrData);
  console.log(arrGen);

  const murkUp = arrData
    .map(result => {
      const gen = result.genre_ids.map(num => {
        const findGen = arrGen.find(item => item.id === num);
        return findGen;
      });

      // console.log(gen);
      const newArrGen = gen.map(obj => obj.name);
      console.log(newArrGen);
      return `<li class="movie-card__list">
                <article>
                  <img class="movie-card__poster" src="https://www.themoviedb.org/t/p/w500${
                    result.poster_path
                  }" loading="lazy" alt="${result.title}">
                  <h2 class="movie-card__title" data-id="${result.id}">${
        result.title
      }</h2>
                    <div class="js-genres">
                       <p class="movie-card__geners">${newArrGen} | ${
        result.release_date.split('-')[0]
      }</p>
                    
                    </div>
              </article>
            </li>`;
    })
    .join('');

  trendingGallery.insertAdjacentHTML('beforeend', murkUp);
}
