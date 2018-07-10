const $ = window.$;

export default function screen() {
  $(window).on('load', () => {
    const gradient = $('.screen__gradient');
    const delay = parseInt(gradient.attr('data-delay'), 10);
    setTimeout(() => {
      gradient.removeClass('is-anim');
    }, delay);
  });
}
