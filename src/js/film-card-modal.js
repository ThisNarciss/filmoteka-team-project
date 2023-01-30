import axios from 'axios';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import {
  handleAddToWatched,
  handleAddToQueue,
  isWatched,
  isQueue,
} from './add-to-library';

Loading.init({
  svgSize: '120px',
  svgColor: '#c4c4c4',
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
});

const closeBtn = document.querySelector('.modal-close-btn');
const list = document.querySelector('.movie-card');
const imgBox = document.querySelector('.modal-card-box');
const modalAbout = document.querySelector('.modal-film-content');
const modal = document.querySelector('.backdrop');
const watchedBtn = document.querySelector('.watched-btn');
const queueBtn = document.querySelector('.queue-btn');
const body = document.querySelector('body');
const modalCard = document.querySelector('.modal-film-card');

list.addEventListener('click', onClick);

async function onClick(evt) {
  try {
    evt.preventDefault();
    body.style.overflow = 'hidden';
    document.addEventListener('click', onBackdropClick);
    const target = evt.target.closest('li');
    const id = target.getAttribute('id');
    const obj = await getMovieById(id);
    Loading.circle();
    const filmObj = obj.data;
    localStorage.setItem('movie-from-open-modal', JSON.stringify(filmObj));

    createMarkupForOne(filmObj);
    isWatched();
    isQueue();
    Loading.remove(500);
    modal.classList.remove('is-hidden');

    document.addEventListener('keydown', onClose);
    closeBtn.addEventListener('click', onCloseClick);

    if (!modal.classList.contains('is-hidden')) {
      watchedBtn.addEventListener('click', handleAddToWatched);
      queueBtn.addEventListener('click', handleAddToQueue);
    }
    if (modal.classList.contains('is-hidden')) {
      watchedBtn.removeEventListener('click', handleAddToWatched);
      queueBtn.removeEventListener('click', handleAddToQueue);
    }
  } catch (err) {
    console.log(err);
  }
}

// --------------------------------------------------------ФУНКЦИЯ МАРКАПА, ЕСЛИ НУЖНЫ КЛАССЫ, ТО ДОБАВЛЯЙТЕ ИХ В ЭТУ РАЗМЕТКУ--------------------------------------------------
function createMarkupForOne(obj) {
  let genresArr = obj.genres.map(obj => {
    return obj.name;
  });

  let aboutDescription = obj.overview;

  if (aboutDescription.length === Number(0)) {
    aboutDescription =
      'Currently description in unavailiable due to lack of information from producers';
  }

  if (genresArr.length === Number(0)) {
    genresArr = 'Info is not specified';
  } else {
    genresArr = genresArr.join(', ');
  }

  let ifPhotoTrue = `https://image.tmdb.org/t/p/w500${obj.poster_path}`;

  if (obj.poster_path === null) {
    ifPhotoTrue = `https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/No_image_available_500_x_500.svg/500px-No_image_available_500_x_500.svg.png`;
  }

  imgBox.innerHTML = `<img src="${ifPhotoTrue}" alt="${obj.title}" class="modal-img"/>`;
  modalAbout.innerHTML = `<h2 class="modal-title">${obj.title}</h2>
        <table><tbody>
      <tr>
        <td class="characteristic td">Vote/Votes</td>
        <td class="description"><span class="vote">${Number(
          obj.vote_average
        ).toFixed(
          2
        )}</span>&nbsp;<span class="characteristic">/</span> &nbsp; ${
    obj.vote_count
  }</td>
      </tr>
      <tr>
        <td class="characteristic td">Popularity</td>
        <td class="description">${Number(obj.popularity).toFixed(2)}</td>
      </tr>
      <tr>
        <td class="characteristic td">Original title</td>
        <td class="description description-title">${obj.title}</td>
      </tr>
      <tr>
        <td class="characteristic td">Genre</td>
        <td class="description">${genresArr}</td>
      </tr>
    </tbody>
    </table>
      <h3 class="description-title">About</h3>
    <p class="description-text">${aboutDescription}</p>`;
}
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

async function getMovieById(id) {
  try {
    return await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=cbdd4abbcb92dd438a6c3b40fc45e1be`
    );
  } catch (err) {
    console.log(err);
  }
}

function onClose(evt) {
  if (evt.key === 'Escape') {
    modal.classList.add('is-hidden');
    document.removeEventListener('click', onClose);
    body.style.overflow = 'visible';
  }
}

function onCloseClick() {
  modal.classList.add('is-hidden');
  closeBtn.removeEventListener('click', onCloseClick);
  // libraryRenderAfterMovieRemove();
  body.style.overflow = 'visible';
}

function onBackdropClick(evt) {
  const target = evt.target;
  if (target.className === 'backdrop') {
    modal.classList.add('is-hidden');
    document.removeEventListener('click', onBackdropClick);
    // libraryRenderAfterMovieRemove();
    body.style.overflow = 'visible';
  }
}
