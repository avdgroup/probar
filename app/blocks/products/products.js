/* eslint-disable max-len */
const $ = window.$;

export default function products() {
  let flag = true;

  $(window).on('scroll', () => {
    if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
      $('.products').find('.is-anim').removeClass('is-anim');
    } else if (flag) {
      let productsOffset = $('.screen_products').offset().top;
      if ($(window).width() <= 1020) {
        productsOffset -= 300;
      }
      const scrlTop = $('html, body').scrollTop();
      if (scrlTop >= productsOffset) {
        $('.products').find('.is-anim').each(function () {
          const $this = $(this);
          let delay = parseInt($this.attr('data-delay'), 10);
          if ($(window).width() <= 1020) {
            delay = 0;
          }
          setTimeout(() => {
            $this.removeClass('is-anim');
          }, delay);
        });
        flag = false;
      }
    }
  });
}
/* eslint-enable max-len */
