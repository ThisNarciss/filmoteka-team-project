import createLibraryMarkUp from './library-mark-up';
import chunk from './chunk-func';
import onClickBtnOueue from './library-movies';

const btnQueue = document.querySelector('.js-btn-queue');

// const parseFilmData = JSON.parse(localStorage.getItem('watched-movies'));
// const chunkArr = chunk(parseFilmData, 9);
const listRef = document.querySelector('.js-pagination-box');

const savedQueueMovies = localStorage.getItem('queue-movies');
// const parsedQueueMovies = JSON.parse(savedQueueMovies);
// const chunkArrQueue = chunk(parsedQueueMovies, 9);

let globalCurrentPage = 0;
let childIndex = 0;

listRef.addEventListener('click', renderPaginationMurkUp);

export default function pagination(currentPage, allPages) {
  let murkUp = '';
  let beforeTwoPage = currentPage - 2;
  let beforeOnePage = currentPage - 1;
  let afterTwoPage = currentPage + 2;
  let afterOnePage = currentPage + 1;
  globalCurrentPage = currentPage;

  if (currentPage > 1) {
    murkUp +=
      '<li class="item-pag"><button type="button" class="link-pag link-pag--btn btn-left btn-rotate"></button></li>';
  } else if (currentPage === 1) {
    murkUp +=
      '<li class="item-pag"><button type="button" class="link-pag link-pag--btn btn-rotate link-pag--hidden" ></button></li>';
  }

  if (currentPage > 1) {
    murkUp +=
      '<li class="item-pag item-none"><button type="button" class="link-pag" >1</button></li>';
  }
  if (currentPage > 4) {
    murkUp +=
      '<li class="item-pag item-none"><button type="button" class="link-pag btn-pointer-event" >...</button></li>';
  }
  if (currentPage > 3) {
    murkUp += `<li class="item-pag"><button type="button" class="link-pag" >${beforeTwoPage}</button></li>`;
  }
  if (currentPage > 2) {
    murkUp += `<li class="item-pag"><button type="button" class="link-pag" >${beforeOnePage}</button></li>`;
  }
  murkUp += `<li class="item-pag">
        <button type="button" class="link-pag" >${currentPage}</button>
      </li>`;
  if (allPages - 1 > currentPage) {
    murkUp += `<li class="item-pag"><button type="button" class="link-pag" >${afterOnePage}</button></li>`;
  }
  if (allPages - 2 > currentPage) {
    murkUp += `<li class="item-pag"><button type="button" class="link-pag" >${afterTwoPage}</button></li>`;
  }
  if (allPages - 3 > currentPage) {
    murkUp +=
      '<li class="item-pag item-none"><button type="button" class="link-pag btn-pointer-event" >...</button></li>';
  }
  if (allPages > currentPage) {
    murkUp += `<li class="item-pag item-none">
        <button type="button" class="link-pag" >${allPages}</button>
      </li>`;
  }

  if (allPages > currentPage) {
    murkUp +=
      '<li class="item-pag"><button type="button" class="link-pag link-pag--btn btn-right"></button></li>';
  } else if (allPages === currentPage) {
    murkUp +=
      '<li class="item-pag"><button type="button" class="link-pag link-pag--btn link-pag--hidden"></button></li>';
  }

  listRef.innerHTML = murkUp;

  createAccentCurrentPage(currentPage, allPages);
  createAccentCurrentPage(currentPage, allPages);
  const { height: cardHeight } = document
    .querySelector('.film-card-box')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: -(cardHeight * 2),
    behavior: 'smooth',
  });
}

function createAccentCurrentPage(page, allPages) {
  if (page < 5) {
    childIndex = page;
  } else if (page === allPages) {
    childIndex = 5;
  } else if (page <= 5) {
    childIndex = 0;
    childIndex = page;
  } else if (page === 6) {
    childIndex = 5;
  }
  const firstRef = listRef.children[childIndex].firstElementChild;
  firstRef.classList.add('current');
}

function renderPaginationMurkUp(evt) {
  if (Boolean(evt.target.closest('.btn-right'))) {
    globalCurrentPage += 1;
    if (window.screen.width > 1280) {
      if (btnQueue.classList.contains('pag-queue')) {
        const parsedQueueMovies = JSON.parse(savedQueueMovies);
        const chunkArrQueue = chunk(parsedQueueMovies, 9);
        createLibraryMarkUp(chunkArrQueue[globalCurrentPage - 1]);
        pagination(globalCurrentPage, chunkArrQueue.length);
      } else {
        const parseFilmData = JSON.parse(
          localStorage.getItem('watched-movies')
        );
        const chunkArr = chunk(parseFilmData, 9);
        createLibraryMarkUp(chunkArr[globalCurrentPage - 1]);
        pagination(globalCurrentPage, chunkArr.length);
      }
    } else if ((window.screen.width >= 768) & (window.screen.width < 1280)) {
      if (btnQueue.classList.contains('pag-queue')) {
        const parsedQueueMovies = JSON.parse(savedQueueMovies);
        const chunkArrQueue = chunk(parsedQueueMovies, 8);
        createLibraryMarkUp(chunkArrQueue[globalCurrentPage - 1]);
        pagination(globalCurrentPage, chunkArrQueue.length);
      } else {
        const parseFilmData = JSON.parse(
          localStorage.getItem('watched-movies')
        );
        const chunkArr = chunk(parseFilmData, 8);
        createLibraryMarkUp(chunkArr[globalCurrentPage - 1]);
        pagination(globalCurrentPage, chunkArr.length);
      }
    } else if (window.screen.width < 768) {
      if (btnQueue.classList.contains('pag-queue')) {
        const parsedQueueMovies = JSON.parse(savedQueueMovies);
        const chunkArrQueue = chunk(parsedQueueMovies, 4);
        createLibraryMarkUp(chunkArrQueue[globalCurrentPage - 1]);
        pagination(globalCurrentPage, chunkArrQueue.length);
      } else {
        const parseFilmData = JSON.parse(
          localStorage.getItem('watched-movies')
        );
        const chunkArr = chunk(parseFilmData, 4);
        createLibraryMarkUp(chunkArr[globalCurrentPage - 1]);
        pagination(globalCurrentPage, chunkArr.length);
      }
    }

    return;
  }
  if (Boolean(evt.target.closest('.btn-left'))) {
    globalCurrentPage -= 1;
    if (window.screen.width > 1280) {
      if (btnQueue.classList.contains('pag-queue')) {
        const parsedQueueMovies = JSON.parse(savedQueueMovies);
        const chunkArrQueue = chunk(parsedQueueMovies, 9);
        createLibraryMarkUp(chunkArrQueue[globalCurrentPage - 1]);
        pagination(globalCurrentPage, chunkArrQueue.length);
      } else {
        const parseFilmData = JSON.parse(
          localStorage.getItem('watched-movies')
        );
        const chunkArr = chunk(parseFilmData, 9);
        createLibraryMarkUp(chunkArr[globalCurrentPage - 1]);
        pagination(globalCurrentPage, chunkArr.length);
      }
    } else if ((window.screen.width >= 768) & (window.screen.width < 1280)) {
      if (btnQueue.classList.contains('pag-queue')) {
        const parsedQueueMovies = JSON.parse(savedQueueMovies);
        const chunkArrQueue = chunk(parsedQueueMovies, 8);
        createLibraryMarkUp(chunkArrQueue[globalCurrentPage - 1]);
        pagination(globalCurrentPage, chunkArrQueue.length);
      } else {
        const parseFilmData = JSON.parse(
          localStorage.getItem('watched-movies')
        );
        const chunkArr = chunk(parseFilmData, 8);
        createLibraryMarkUp(chunkArr[globalCurrentPage - 1]);
        pagination(globalCurrentPage, chunkArr.length);
      }
    } else if (window.screen.width < 768) {
      if (btnQueue.classList.contains('pag-queue')) {
        const parsedQueueMovies = JSON.parse(savedQueueMovies);
        const chunkArrQueue = chunk(parsedQueueMovies, 4);
        createLibraryMarkUp(chunkArrQueue[globalCurrentPage - 1]);
        pagination(globalCurrentPage, chunkArrQueue.length);
      } else {
        const parseFilmData = JSON.parse(
          localStorage.getItem('watched-movies')
        );
        const chunkArr = chunk(parseFilmData, 4);
        createLibraryMarkUp(chunkArr[globalCurrentPage - 1]);
        pagination(globalCurrentPage, chunkArr.length);
      }
    }

    return;
  }

  if (evt.target.nodeName !== 'BUTTON') {
    return;
  }
  if (evt.target.textContent === '...') {
    return;
  }

  const page = Number(evt.target.textContent);

  if (window.screen.width > 1280) {
    if (btnQueue.classList.contains('pag-queue')) {
      const parsedQueueMovies = JSON.parse(savedQueueMovies);
      const chunkArrQueue = chunk(parsedQueueMovies, 9);

      createLibraryMarkUp(chunkArrQueue[page - 1]);
      pagination(page, chunkArrQueue.length);
    } else {
      const parseFilmData = JSON.parse(localStorage.getItem('watched-movies'));
      const chunkArr = chunk(parseFilmData, 9);

      createLibraryMarkUp(chunkArr[page - 1]);
      pagination(page, chunkArr.length);
    }
  } else if ((window.screen.width >= 768) & (window.screen.width < 1280)) {
    if (btnQueue.classList.contains('pag-queue')) {
      const parsedQueueMovies = JSON.parse(savedQueueMovies);
      const chunkArrQueue = chunk(parsedQueueMovies, 8);

      createLibraryMarkUp(chunkArrQueue[page - 1]);
      pagination(page, chunkArrQueue.length);
    } else {
      const parseFilmData = JSON.parse(localStorage.getItem('watched-movies'));
      const chunkArr = chunk(parseFilmData, 8);

      createLibraryMarkUp(chunkArr[page - 1]);
      pagination(page, chunkArr.length);
    }
  } else if (window.screen.width < 768) {
    if (btnQueue.classList.contains('pag-queue')) {
      const parsedQueueMovies = JSON.parse(savedQueueMovies);
      const chunkArrQueue = chunk(parsedQueueMovies, 4);

      createLibraryMarkUp(chunkArrQueue[page - 1]);
      pagination(page, chunkArrQueue.length);
    } else {
      const parseFilmData = JSON.parse(localStorage.getItem('watched-movies'));
      const chunkArr = chunk(parseFilmData, 4);

      createLibraryMarkUp(chunkArr[page - 1]);
      pagination(page, chunkArr.length);
    }
  }
}
