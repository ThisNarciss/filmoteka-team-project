

const btnWathed = document.querySelector('.js-btn-watched');
const btnQueue = document.querySelector('.js-btn-queue');
const list = document.querySelector('.js-movie-card')

btnQueue.addEventListener('click', onClickBtnOueue);
btnWathed.addEventListener('click', onClickBtnWatched);

export default {
    onClickBtnOueue,
    onClickBtnWatched
}

function onClickBtnOueue(e) {
    list.innerHTML='';
    try {
        const savedQueueMovies = localStorage.getItem("queue-movies");
        const parsedQueueMovies = JSON.parse(savedQueueMovies);
        console.log(parsedQueueMovies);
        createMarkup(parsedQueueMovies)
        
    } catch (error) {
        console.log(error)
    }   

  
}

function onClickBtnWatched(e) {    
    list.innerHTML='';
    try {
        const savedWatcedMovies = localStorage.getItem("watched-movies");
        const parsedWatcedMovies = JSON.parse(savedWatcedMovies);
        console.log(parsedWatcedMovies);
        createMarkup(parsedWatcedMovies)
        
    } catch (error) {
        console.log(error)
    }
   
}

function createMarkup(arr) {
    const markup = arr.map(item =>       
        `<li id="${item.id}" class="movie-card__list">
         <article>
             <img class="movie-card__poster" src="https://www.themoviedb.org/t/p/w500${item.poster_path}" loading="lazy" alt="${item.title}">
          <div class="js-genres">
             <h2 class="movie-card__title" data-id="${item.id}">${item.title}</h2>
             <p class="movie-card__geners">${item.genres.map(genre => genre.name).slice(0, 2)} | ${item.release_date}</p>
                    
          </div>
         </article>
        </li>`).slice(0, 9).join('');    
      

    
    list.insertAdjacentHTML('beforeend', markup) 
}
