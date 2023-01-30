import pagination from './pagination-for-library';
import chunk from './chunk-func';
import createLibraryMarkUp from './library-mark-up';

const btnWatched = document.querySelector('.js-btn-watched');
const btnQueue = document.querySelector('.js-btn-queue');
const paginationContainer = document.querySelector('.js-pagination-box');
const modal = document.querySelector('.modal-film-card');
const emptyLibraryPage = document.querySelector('.empty-library');
const filmsContainer = document.querySelector('.js-container');

btnQueue.addEventListener('click', onClickBtnOueue);
btnWatched.addEventListener('click', onClickBtnWatched);

export function renderLibrary() {
  const savedWatchedMovies = localStorage.getItem('watched-movies');
  const parsedWatchedMovies = JSON.parse(savedWatchedMovies) || [];

  if (parsedWatchedMovies.length === 0) {
    emptyLibraryPage.style.display = 'flex';
    filmsContainer.style.display = 'none';
  } else {
    modal.classList.add('modal-in-library');
    emptyLibraryPage.style.display = 'none';
    filmsContainer.style.display = 'block';
    if (window.screen.width > 1280) {
      const chunkArr = chunk(parsedWatchedMovies, 9);
      createLibraryMarkUp(chunkArr[0]);
      pagination(1, chunkArr.length);
    } else if ((window.screen.width >= 768) & (window.screen.width < 1280)) {
      const chunkArr = chunk(parsedWatchedMovies, 8);
      createLibraryMarkUp(chunkArr[0]);
      pagination(1, chunkArr.length);
    } else if (window.screen.width < 768) {
      const chunkArr = chunk(parsedWatchedMovies, 4);
      createLibraryMarkUp(chunkArr[0]);
      pagination(1, chunkArr.length);
    }
  }
}

export function onClickBtnOueue() {
  btnQueue.classList.add('pag-queue');
  btnWatched.classList.remove('library-header__button--watched');
  btnQueue.classList.add('library-header__button--queue');

  const savedQueueMovies = localStorage.getItem('queue-movies');
  const parsedQueueMovies = JSON.parse(savedQueueMovies) || [];

  if (parsedQueueMovies.length === 0) {
    emptyLibraryPage.style.display = 'flex';
    filmsContainer.style.display = 'none';
    return;
  } else {
    try {
      paginationContainer.classList.remove('is-hidden');
      modal.classList.add('modal-in-library');
      emptyLibraryPage.style.display = 'none';
      filmsContainer.style.display = 'block';
      if (window.screen.width > 1280) {
        const chunkArrQueue = chunk(parsedQueueMovies, 9);
        createLibraryMarkUp(chunkArrQueue[0]);
        pagination(1, chunkArrQueue.length);
      } else if ((window.screen.width >= 768) & (window.screen.width < 1280)) {
        const chunkArrQueue = chunk(parsedQueueMovies, 8);
        createLibraryMarkUp(chunkArrQueue[0]);
        pagination(1, chunkArrQueue.length);
      } else if (window.screen.width < 768) {
        const chunkArrQueue = chunk(parsedQueueMovies, 4);
        createLibraryMarkUp(chunkArrQueue[0]);
        pagination(1, chunkArrQueue.length);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export function onClickBtnWatched() {
  btnQueue.classList.remove('pag-queue');
  btnWatched.classList.add('library-header__button--watched');
  btnQueue.classList.remove('library-header__button--queue');

  const savedWatchedMovies = localStorage.getItem('watched-movies');
  const parsedWatchedMovies = JSON.parse(savedWatchedMovies) || [];

  if (parsedWatchedMovies.length === 0) {
    emptyLibraryPage.style.display = 'flex';
    filmsContainer.style.display = 'none';
    return;
  }

  try {
    paginationContainer.classList.remove('is-hidden');
    modal.classList.add('modal-in-library');
    emptyLibraryPage.style.display = 'none';
    filmsContainer.style.display = 'block';

    if (window.screen.width > 1280) {
      const chunkArrWatched = chunk(parsedWatchedMovies, 9);
      createLibraryMarkUp(chunkArrWatched[0]);
      pagination(1, chunkArrWatched.length);
    } else if ((window.screen.width >= 768) & (window.screen.width < 1280)) {
      const chunkArrWatched = chunk(parsedWatchedMovies, 8);
      createLibraryMarkUp(chunkArrWatched[0]);
      pagination(1, chunkArrWatched.length);
    } else if (window.screen.width < 768) {
      const chunkArrWatched = chunk(parsedWatchedMovies, 4);
      createLibraryMarkUp(chunkArrWatched[0]);
      pagination(1, chunkArrWatched.length);
    }
  } catch (error) {
    console.log(error);
  }
}

renderLibrary();
