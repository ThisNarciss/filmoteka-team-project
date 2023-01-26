const trendingGallery = document.querySelector('.js-movie-card');

export default function createMarkUp(arr) {
  const arrData = arr;
  const arrGen = JSON.parse(localStorage.getItem('genres')).genres;
  console.log(arrData);
  const murkUp = arrData
    .map(result => {
      const gen = result.genre_ids.map(num => {
        const findGen = arrGen.find(item => item.id === num);
        return findGen;
      });

      const newArrGen = gen.map(obj => obj.name);

      return `<li id="${result.id}" class="movie-card__list">
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
