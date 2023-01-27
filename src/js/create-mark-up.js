const trendingGallery = document.querySelector('.js-movie-card');

export default function createMarkUp(arr) {
  trendingGallery.innerHTML = '';
  const arrData = arr.results;
  const arrGen = JSON.parse(localStorage.getItem('genres')).genres;

  const murkUp = arrData
    .map(result => {
      const gen = result.genre_ids.map(num => {
        const findGen = arrGen.find(item => item.id === num);
        return findGen;
      });

      let newArrGen = gen.map(obj => obj.name);

      let startDate = '';

      if (Object.keys(result).includes('release_date')) {
        if (result.release_date !== '') {
          startDate = result.release_date.split('').slice(0, 4).join('');
        }
      }
      if (newArrGen.length > 2) {
        newArrGen = newArrGen.slice(0, 2).join(', ') + ', Other';
      } else {
        newArrGen = newArrGen.join(', ');
      }

      let posterLink = '#';

      if (result.poster_path !== null) {
        posterLink = `https://www.themoviedb.org/t/p/w500${result.poster_path}`;
      }
      console.log(posterLink);

      return `<li id="${result.id}" class="movie-card__list">
                <article>
                  <img class="movie-card__poster" src="https://www.themoviedb.org/t/p/w500${posterLink}" loading="lazy" alt="${result.title}">
                  <h2 class="movie-card__title" data-id="${result.id}">${result.title}</h2>
                    <div class="js-genres">
                       <p class="movie-card__geners">${newArrGen} | ${startDate}</p>
                    
                    </div>
              </article>
            </li>`;
    })
    .join('');

  trendingGallery.insertAdjacentHTML('beforeend', murkUp);
}
