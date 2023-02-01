import {
  successfulAddToWatchedNotification,
  successfulAddToQueueNotification,
  isNotInWatchedNotification,
  isNotInQueueNotification,
  successfulDeleteFromWatchedNotification,
  successfulDeleteFromQueueNotification,
  errorNotification,
} from './notifications';

const addToWatchedBtn = document.querySelector('.js-add-to-watched-btn');
const addToQueueBtn = document.querySelector('.js-add-to-queue-btn');

export function handleAddToWatched() {
  if (addToWatchedBtn.textContent === 'Add to watched') {
    addMovieToWatched();
  } else if (addToWatchedBtn.textContent === 'Remove from watched') {
    removeMovieFromWatched();
  }
}

export function handleAddToQueue() {
  if (addToQueueBtn.textContent === 'Add to queue') {
    addMovieToQueue();
  } else if (addToQueueBtn.textContent === 'Remove from queue') {
    removeMovieFromQueue();
  }
}

export function isWatched() {
  const movieData = JSON.parse(localStorage.getItem('movie-from-open-modal'));
  const currentUser = 'watched-'.concat(localStorage.getItem('user-uid')) || '';
  const watchedMovies =
    JSON.parse(localStorage.getItem(`${currentUser}`)) || [];
  const isWatched = watchedMovies.some(movie => movie.id === movieData.id);
  console.log(movieData, watchedMovies, isWatched);

  if (isWatched) {
    addToWatchedBtn.textContent = 'Remove from watched';
  } else {
    addToWatchedBtn.textContent = 'Add to watched';
  }
}

export function isQueue() {
  const currentUser = 'queue-'.concat(localStorage.getItem('user-uid')) || '';
  const movieData = JSON.parse(localStorage.getItem('movie-from-open-modal'));
  const queueMovies = JSON.parse(localStorage.getItem(`${currentUser}`)) || [];
  const isWatched = queueMovies.some(movie => movie.id === movieData.id);

  if (isWatched) {
    addToQueueBtn.textContent = 'Remove from queue';
  } else {
    addToQueueBtn.textContent = 'Add to queue';
  }
}

function addMovieToWatched() {
  const currentUser = 'watched-'.concat(localStorage.getItem('user-uid')) || '';
  const movieData = JSON.parse(localStorage.getItem('movie-from-open-modal'));
  const watchedMovies =
    JSON.parse(localStorage.getItem(`${currentUser}`)) || [];
  if (watchedMovies.length === 0) {
    watchedMovies.push(movieData);
    localStorage.setItem(`${currentUser}`, JSON.stringify(watchedMovies));
    successfulAddToWatchedNotification();
    addToWatchedBtn.textContent = 'Remove from watched';
  } else if (watchedMovies.length > 0) {
    const isWatched = watchedMovies.some(movie => movie.id === movieData.id);
    if (!isWatched) {
      watchedMovies.push(movieData);
      localStorage.setItem(`${currentUser}`, JSON.stringify(watchedMovies));
      successfulAddToWatchedNotification();
      addToWatchedBtn.textContent = 'Remove from watched';
    }
  }
}

function addMovieToQueue() {
  const currentUser = 'queue-'.concat(localStorage.getItem('user-uid')) || '';
  const movieData = JSON.parse(localStorage.getItem('movie-from-open-modal'));
  const queueMovies = JSON.parse(localStorage.getItem(`${currentUser}`)) || [];

  if (queueMovies.length === 0) {
    queueMovies.push(movieData);
    localStorage.setItem(`${currentUser}`, JSON.stringify(queueMovies));
    successfulAddToQueueNotification();
    addToQueueBtn.textContent = 'Remove from queue';
  } else if (queueMovies.length > 0) {
    const isQueue = queueMovies.some(movie => movie.id === movieData.id);
    if (!isQueue) {
      queueMovies.push(movieData);
      localStorage.setItem(`${currentUser}`, JSON.stringify(queueMovies));
      successfulAddToQueueNotification();
      addToQueueBtn.textContent = 'Remove from queue';
    }
  }
}

function removeMovieFromWatched() {
  const movieData = JSON.parse(localStorage.getItem('movie-from-open-modal'));
  const currentUser = 'watched-'.concat(localStorage.getItem('user-uid')) || '';
  const watchedMovies =
    JSON.parse(localStorage.getItem(`${currentUser}`)) || [];
  const isWatchedIndex = watchedMovies.findIndex(
    movie => movie.id === movieData.id
  );
  if (isWatchedIndex === -1) {
    isNotInWatchedNotification();
    addToWatchedBtn.textContent = 'Add to watched';
  } else if (isWatchedIndex < watchedMovies.length) {
    watchedMovies.splice(isWatchedIndex, 1);
    localStorage.setItem(`${currentUser}`, JSON.stringify(watchedMovies));
    successfulDeleteFromWatchedNotification();
    addToWatchedBtn.textContent = 'Add to watched';
  } else errorNotification();
}

function removeMovieFromQueue() {
  const movieData = JSON.parse(localStorage.getItem('movie-from-open-modal'));
  const currentUser = 'queue-'.concat(localStorage.getItem('user-uid')) || '';
  const queueMovies = JSON.parse(localStorage.getItem(`${currentUser}`)) || [];
  const isQueueIndex = queueMovies.findIndex(
    movie => movie.id === movieData.id
  );
  if (isQueueIndex === -1) {
    isNotInQueueNotification();
    addToQueueBtn.textContent = 'Add to queue';
  } else if (isQueueIndex < queueMovies.length) {
    queueMovies.splice(isQueueIndex, 1);
    localStorage.setItem(`${currentUser}`, JSON.stringify(queueMovies));
    successfulDeleteFromQueueNotification();
    addToQueueBtn.textContent = 'Add to queue';
  } else errorNotification();
}
