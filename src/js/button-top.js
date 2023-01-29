const buttonTop = document.querySelector('.button-top');
const amountScroll = 400;
window.addEventListener('scroll', onScrollPage);

export default function onScrollPage() {
  const scrollPage = window.pageYOffset;
  if (scrollPage > amountScroll) {
    buttonTop.classList.add('button-top__show');
    window.setTimeout(() => {
      this.buttonTop.classList.add('button-top__show');
    }, 600);
  } else {
    buttonTop.classList.remove('button-top__show');
    window.setTimeout(() => {
      this.buttonTop.classList.add('button-top__show');
    }, 600);
  }
}
