import pagination from './pagination-for-library';
import chunk from './chunk-func';
import createLibraryMarkUp from './library-mark-up';

// localStorage.setItem('render-key', 'library-movies');
const btnWatched = document.querySelector('.js-btn-watched');
const btnQueue = document.querySelector('.js-btn-queue');

btnQueue.addEventListener('click', onClickBtnOueue);
btnWatched.addEventListener('click', onClickBtnWatched);

// export default {
//   onClickBtnOueue,
//   onClickBtnWatched,
// };

export default function onClickBtnOueue() {
  // list.innerHTML = '';
  btnQueue.classList.add('pag-queue');
  try {
    const savedQueueMovies = localStorage.getItem('queue-movies');
    const parsedQueueMovies = JSON.parse(savedQueueMovies);
    const chunkArrQueue = chunk(parsedQueueMovies, 9);
    createLibraryMarkUp(chunkArrQueue[0]);
    pagination(1, chunkArrQueue.length);
  } catch (error) {
    console.log(error);
  }
}

function onClickBtnWatched() {
  // list.innerHTML = '';
  btnQueue.classList.remove('pag-queue');
  try {
    const savedWatchedMovies = localStorage.getItem('watched-movies');
    const parsedWatchedMovies = JSON.parse(savedWatchedMovies);
    const chunkArrWatched = chunk(parsedWatchedMovies, 9);
    createLibraryMarkUp(chunkArrWatched[0]);
    pagination(1, chunkArrWatched.length);
  } catch (error) {
    console.log(error);
  }
}

const parseFilmData = JSON.parse(localStorage.getItem('watched-movies'));

const chunkArr = chunk(parseFilmData, 9);

createLibraryMarkUp(chunkArr[0]);
pagination(1, chunkArr.length);
