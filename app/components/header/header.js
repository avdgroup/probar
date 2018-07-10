const $ = window.$;

export default function header() {
  $(document).on('click', '.header__burger', function (e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).parents('.header').find('.header__menu').toggleClass('is-active');
  });

  $(window).on('resize', () => {
    if ($(window).width() > 1248) {
      $('.header__menu').removeClass('is-active');
    }
  });

  $(document).on('click', '.header__side-logo', (e) => {
    const wHeight = $(window).height();
    const scrlTop = $('html, body').scrollTop();
    if (scrlTop >= wHeight) {
      e.preventDefault();
      $('body, html').stop().animate({
        scrollTop: 0,
      }, 1000, 'swing');
    }
  });

  $(document).on('click', '.header__menu', (e) => {
    e.stopPropagation();
  });

  $(document).on('click', () => {
    $('.header__menu').removeClass('is-active');
  });
}
