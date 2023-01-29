(() => {
  const refs = {
    openModalBtn: document.querySelector('[data-team-modal-open]'),
    closeModalBtn: document.querySelector('[data-team-modal-close]'),
    modal: document.querySelector('.backdrop-team'),
  };

  refs.openModalBtn.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle('is-hidden');
  }

  document.addEventListener('keydown', onClose);

  function onClose(evt) {
    if (evt.key === 'Escape') {
      refs.modal.classList.add('is-hidden');
      document.removeEventListener('click', onClose);
    }
  }
})();

const modal = document.querySelector('.backdrop-team');
modal.addEventListener('click', onBackdropClick);

function onBackdropClick(evt) {
  const target = evt.target;
  if (target.className === 'backdrop-team') {
    modal.classList.add('is-hidden');
    document.removeEventListener('click', onBackdropClick);
  }
}
