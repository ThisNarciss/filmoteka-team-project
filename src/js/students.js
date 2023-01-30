
const openBtn = document.querySelector('.footer-authors');
const closeBtn = document.querySelector('.students-modal__close-btn');
const modal = document.querySelector('.backdrop-foot');
 



function showStudents(evt) {
  evt.preventDefault();
  modal.classList.remove('is-hidden');
  
  document.addEventListener('keydown', clickEscape);
  closeBtn.addEventListener('click', closeByClick);
};

function closeStudents(evt){
  modal.classList.add('is-hidden');
 
  document.removeEventListener('keydown', clickEscape);
  closeBtn.removeEventListener('click', closeByClick);
};

function clickEscape(evt) {
  if (evt.keyCode === 27) {
    closeStudents();
  }
};

function closeByClick(evt) {
  const target = evt.target;
  if (target.className === 'backdrop-foot') {
    modal.classList.add('is-hidden');
    document.removeEventListener('click', closeByClick);
    // libraryRenderAfterMovieRemove();
    body.style.overflow = 'visible';
  }
}
// function closeByClick(evt){
//   if (
//     !evt.target.classList.contains('is-hidden') &&
//     !evt.target.closest('.students-modal') &&
//     evt.target.className !== 'footer-authors') {
//     closeStudents();
//   }
// };
openBtn.addEventListener('click', showStudents);
closeBtn.addEventListener('click', closeStudents);
