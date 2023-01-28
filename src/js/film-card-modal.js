import axios from 'axios';
import { handleAddToWatched } from './add-to-library';
import {
  handleAddToWatched,
  handleAddToQueue,
  isWatched,
  isQueue,
} from './add-to-library';

const closeBtn = document.querySelector('.modal-close-btn');
const list = document.querySelector('.movie-card');
const imgBox = document.querySelector('.modal-card-box');
const modalAbout = document.querySelector('.modal-film-content');
const modal = document.querySelector('.backdrop');
const watchedBtn = document.querySelector('.watched-btn');
const queueBtn = document.querySelector('.queue-btn');

list.addEventListener('click', onClick);

async function onClick(evt) {
  try {
    evt.preventDefault();
    document.addEventListener('click', onBackdropClick);
    const target = evt.target.closest('li');
    const id = target.getAttribute('id');
    const obj = await getMovieById(id);
    const filmObj = obj.data;
    localStorage.setItem('movie-from-open-modal', JSON.stringify(filmObj));

    createMarkupForOne(filmObj);
    isWatched();
    isQueue();
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

  console.log(genresArr);
  imgBox.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${obj.poster_path}" alt="${obj.title}" class="modal-img"/>`;
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
        <td class="description">${genresArr.join(', ')}</td>
      </tr>
    </tbody>
    </table>
      <h3 class="description-title">About</h3>
    <p class="description-text">${obj.overview}</p>`;
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
  }
}

function onCloseClick() {
  modal.classList.add('is-hidden');
  closeBtn.removeEventListener('click', onCloseClick);
}

function onBackdropClick(evt) {
  const target = evt.target;
  if (target.className === 'backdrop') {
    modal.classList.add('is-hidden');
    document.removeEventListener('click', onBackdropClick);
  }
}
