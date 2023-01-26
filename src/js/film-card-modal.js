import axios from 'axios';


const closeBtn = document.querySelector('.modal-close-btn');
const list = document.querySelector('.movie-card');
const imgBox = document.querySelector('.modal-card-box');
const modalAbout = document.querySelector('.modal-film-content');
const modal = document.querySelector('.backdrop');
const watchedBtn = document.querySelector('.watched-btn');
const queueBtn = document.querySelector('.queue-btn')

list.addEventListener('click', onClick);

async function onClick (evt){
    try{
        evt.preventDefault();
        const target = evt.target.closest('li');
        const id = target.getAttribute('id')
        const obj = await getMovieById(id);
        const filmObj = obj.data;

        createMarkupForOne(filmObj);
        modal.classList.remove('is-hidden');
        
        document.addEventListener("keydown", onClose)
        closeBtn.addEventListener('click', onCloseClick)

        if(!modal.classList.contains('is-hidden')){
            watchedBtn.addEventListener('click', handleAddToWatched);
            queueBtn.addEventListener('click', handleAddToQueue);
        }
        if(modal.classList.contains('is-hidden')){
            watchedBtn.removeEventListener('click', handleAddToWatched);
            queueBtn.removeEventListener('click', handleAddToQueue);
        }

    }catch(err){
        console.log(err)
    }

}

// --------------------------------------------------------ФУНКЦИЯ МАРКАПА, ЕСЛИ НУЖНЫ КЛАССЫ, ТО ДОБАВЛЯЙТЕ ИХ В ЭТУ РАЗМЕТКУ--------------------------------------------------
function createMarkupForOne(obj){
    let genresArr = obj.genres.map(obj => {
        return obj.name;
    });
    
    console.log(genresArr)
    imgBox.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${obj.poster_path}" alt="${obj.title}" />`;
    modalAbout.innerHTML = `<h2 class="">${obj.title}</h2>
    <div class="">
      <table><tbody>
      <tr>
        <td>Vote/Votes</td>
        <td>${Number(obj.vote_average).toFixed(2)}/${obj.vote_count}</td>
      </tr>
      <tr>
        <td>Popularity</td>
        <td>${Number(obj.popularity).toFixed(2)}</td>
      </tr>
      <tr>
        <td>Original title</td>
        <td>${obj.title}</td>
      </tr>
      <tr>
        <td>Genre</td>
        <td>${genresArr.join(', ')}</td>
      </tr>
    </tbody>
    </table>
    </div>
    <h3 class="">About</h3>
    <p class="">${obj.overview}</p>`
}
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

async function getMovieById(id){
    try{
        return await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=cbdd4abbcb92dd438a6c3b40fc45e1be`);
    }catch(err){
        console.log(err);
    }
    
}


 function onClose(evt){
    if(evt.key === 'Escape'){
        modal.classList.add('is-hidden');
        document.removeEventListener("click", onClose);
    }
    
}


 function onCloseClick(){
    modal.classList.add('is-hidden');
    closeBtn.removeEventListener('click', onCloseClick)
}



