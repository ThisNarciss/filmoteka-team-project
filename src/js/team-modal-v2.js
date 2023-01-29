(() => {
  const refs = {
    openModalBtn: document.querySelector('[data-team-modal-open]'),
    closeModalBtn: document.querySelector('[data-team-modal-close]'),
    modal: document.querySelector('[data-team-modal]'),
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
