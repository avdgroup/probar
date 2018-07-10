const $ = window.$;

export default function carousel() {
  let canScrollChange = true;
  let scrollChange = false;
  let arrowChange = false;
  let screenChange = false;

  // анимация гексагонов
  function startHex() {
    const orderAnimDelay = parseInt($('.carousel').find('.is-orderanim').attr('data-delay'), 10);
    setTimeout(() => {
      const carouselEl = $('.carousel');
      const count = parseInt(carouselEl.attr('data-count'), 10);
      const startIndex = parseInt(carouselEl.attr('data-start'), 10);
      const nextIndex = startIndex === count ? 1 : startIndex + 1;
      const nnextIndex = nextIndex === count ? 1 : nextIndex + 1;
      const prevIndex = startIndex === 1 ? count : startIndex - 1;
      const pprevIndex = prevIndex === 1 ? count : prevIndex - 1;
      const startItem = carouselEl.find(`.carousel__item[data-index="${startIndex}"]`);
      const nextItem = carouselEl.find(`.carousel__item[data-index="${nextIndex}"]`);
      const nnextItem = carouselEl.find(`.carousel__item[data-index="${nnextIndex}"]`);
      const prevItem = carouselEl.find(`.carousel__item[data-index="${prevIndex}"]`);
      const pprevItem = carouselEl.find(`.carousel__item[data-index="${pprevIndex}"]`);
      setTimeout(() => {
        nnextItem.addClass('carousel__item_left');
      }, 0);
      setTimeout(() => {
        nnextItem.removeClass('carousel__item_left').addClass('carousel__item_cleft');
        nextItem.addClass('carousel__item_left');
      }, 500);
      setTimeout(() => {
        nnextItem.removeClass('carousel__item_cleft').addClass('carousel__item_active');
        nextItem.removeClass('carousel__item_left').addClass('carousel__item_cleft');
        startItem.addClass('carousel__item_left');
      }, 1000);
      setTimeout(() => {
        nnextItem.removeClass('carousel__item_active').addClass('carousel__item_cright');
        nextItem.removeClass('carousel__item_cleft').addClass('carousel__item_active');
        startItem.removeClass('carousel__item_left').addClass('carousel__item_cleft');
        prevItem.addClass('carousel__item_left');
      }, 1500);
      setTimeout(() => {
        nnextItem.removeClass('carousel__item_cright').addClass('carousel__item_right');
        nextItem.removeClass('carousel__item_active').addClass('carousel__item_cright');
        startItem.removeClass('carousel__item_cleft').addClass('carousel__item_active');
        prevItem.removeClass('carousel__item_left').addClass('carousel__item_cleft');
        pprevItem.addClass('carousel__item_left');
      }, 2000);
    }, orderAnimDelay);
  }

  // псевдо 3d анимация
  function startAnim() {
    const activeScene = $('.carousel__scene.is-active');
    const totalFrames = parseInt(activeScene.attr('data-count'), 10);
    const animationDuration = parseInt(activeScene.attr('data-duration'), 10);
    const timePerFrame = animationDuration / totalFrames;
    let timeWhenLastUpdate;
    let timeFromLastUpdate;
    let frameNumber = 1;

    // 'step' function will be called each time browser rerender the content
    // we achieve that by passing 'step' as a parameter to 'requestAnimationFrame' function
    function step(startTime) {
      // 'startTime' is provided by requestAnimationName function,
      // and we can consider it as current time
      // first of all we calculate how much time has passed from the last time when frame was update
      if (!timeWhenLastUpdate) timeWhenLastUpdate = startTime;
      timeFromLastUpdate = startTime - timeWhenLastUpdate;

      // then we check if it is time to update the frame
      if (timeFromLastUpdate > timePerFrame) {
        // hide all frames
        activeScene.find('.bar-animation').css('opacity', 0);
        // and show the required one
        activeScene.find(`.bar-animation-${frameNumber}`).css('opacity', 1);
        // reset the last update time
        timeWhenLastUpdate = startTime;

        // then increase the frame number
        if (frameNumber < totalFrames) {
          frameNumber += 1;
        }
      }

      requestAnimationFrame(step);
    }

    // start the animation
    requestAnimationFrame(step);

    setTimeout(() => {
      scrollChange = true;
      arrowChange = true;
    }, animationDuration);
  }

  // первичная анимация элементов
  $(window).on('load', () => {
    $('.carousel .is-anim').each(function () {
      const $this = $(this);
      const delay = parseInt($this.attr('data-delay'), 10);
      setTimeout(() => {
        $this.removeClass('is-anim');
        if ($this.attr('data-animation')) {
          startAnim();
        }
      }, delay);
    });
    startHex();
  });

  // переключение слайдов
  function changeItem(targetIndex) {
    scrollChange = false;
    arrowChange = false;

    const carouselEl = $('.carousel');
    const count = parseInt(carouselEl.attr('data-count'), 10);
    let currentIndex = parseInt(carouselEl.attr('data-current'), 10);

    const diff = targetIndex - currentIndex;
    let backDiff;
    let forwardDiff;
    let direction;

    if (diff > 0) {
      forwardDiff = targetIndex - currentIndex;
      backDiff = currentIndex + (count - targetIndex);
    } else if (diff < 0) {
      forwardDiff = targetIndex + (count - currentIndex);
      backDiff = currentIndex - targetIndex;
    }
    if (forwardDiff < backDiff) {
      direction = 'forward';
    } else {
      direction = 'back';
    }

    const activeScene = carouselEl.find('.carousel__scene.is-active');
    const targetScene = carouselEl.find(`.carousel__scene[data-index="${targetIndex}"]`);
    const activeDescription = carouselEl.find('.carousel__description.is-active');
    const targetDescription = carouselEl.find(`.carousel__description[data-index="${targetIndex}"]`);
    activeScene.removeClass('is-active').addClass('is-postactive');
    activeDescription.removeClass('is-active');

    function changeIndex() {
      if (direction === 'forward') {
        if (currentIndex === count) {
          currentIndex = 1;
        } else {
          currentIndex += 1;
        }
      } else if (direction === 'back') {
        if (currentIndex === 1) {
          currentIndex = count;
        } else {
          currentIndex -= 1;
        }
      }
    }

    function changeIcons() {
      const nextIndex = currentIndex === count ? 1 : currentIndex + 1;
      const nnextIndex = nextIndex === count ? 1 : nextIndex + 1;
      const prevIndex = currentIndex === 1 ? count : currentIndex - 1;
      const pprevIndex = prevIndex === 1 ? count : prevIndex - 1;

      const item = carouselEl.find('.carousel__item');
      const targetItem = carouselEl.find(`.carousel__item[data-index="${currentIndex}"]`);
      const nextItem = carouselEl.find(`.carousel__item[data-index="${nextIndex}"]`);
      const nnextItem = carouselEl.find(`.carousel__item[data-index="${nnextIndex}"]`);
      const prevItem = carouselEl.find(`.carousel__item[data-index="${prevIndex}"]`);
      const pprevItem = carouselEl.find(`.carousel__item[data-index="${pprevIndex}"]`);

      if (direction === 'forward') {
        carouselEl.find('.carousel__item_left').addClass('carousel__item_opposite carousel__item_hidden');
      } else {
        carouselEl.find('.carousel__item_right').addClass('carousel__item_opposite carousel__item_hidden');
      }

      item.removeClass('carousel__item_active carousel__item_cright carousel__item_right carousel__item_left carousel__item_cleft');
      targetItem.addClass('carousel__item_active');
      nextItem.addClass('carousel__item_cright');
      nnextItem.addClass('carousel__item_right');
      prevItem.addClass('carousel__item_cleft');
      pprevItem.addClass('carousel__item_left');

      setTimeout(() => {
        carouselEl.find('.carousel__item_hidden').removeClass('carousel__item_hidden');
      }, 250);

      setTimeout(() => {
        carouselEl.find('.carousel__item_opposite').removeClass('carousel__item_opposite');
      }, 500);

      const nextArrow = carouselEl.find('.carousel__arrow_next');
      const prevArrow = carouselEl.find('.carousel__arrow_prev');
      nextArrow.attr('data-index', nextIndex);
      prevArrow.attr('data-index', prevIndex);

      const dot = carouselEl.find('.carousel__dot');
      const targetDot = carouselEl.find(`.carousel__dot[data-index="${targetIndex}"]`);
      dot.removeClass('is-active');
      targetDot.addClass('is-active');

      carouselEl.attr('data-current', currentIndex);
    }

    function checkIndex() {
      if (currentIndex === targetIndex) {
        setTimeout(() => {
          activeScene.removeClass('is-postactive').addClass('is-hidden');
          activeDescription.addClass('is-hidden');
          targetScene.removeClass('is-hidden').addClass('is-preactive');
          targetDescription.removeClass('is-hidden');
        }, 250);

        setTimeout(() => {
          targetScene.removeClass('is-preactive').addClass('is-active');
          targetDescription.addClass('is-active');
          startAnim();
          $('.screen__scroll-btn').addClass('is-active');

          if (targetIndex === count) {
            screenChange = true;
            canScrollChange = false;
          }
        }, 500);

        changeIcons();
      } else {
        changeIcons();
        changeIndex();
        setTimeout(() => {
          checkIndex();
        }, 750);
      }
    }

    changeIndex();
    checkIndex();
  }

  $(document).on('click', '.carousel__arrow', function (e) {
    e.preventDefault();
    if (arrowChange) {
      const targetIndex = parseInt($(this).attr('data-index'), 10);
      changeItem(targetIndex);
    }
  });

  $(document).on('click', '.carousel__dot', function (e) {
    e.preventDefault();
    const targetIndex = parseInt($(this).attr('data-index'), 10);
    changeItem(targetIndex);
  });

  // left: 37, up: 38, right: 39, down: 40,
  // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
  const keys = { 32: 1, 33: 1, 34: 1, 35: 1, 36: 1, 37: 1, 38: 1, 39: 1, 40: 1 };

  function preventDefault(e) {
    const ev = e || window.event;
    if (ev.preventDefault) {
      ev.preventDefault();
    }
    ev.returnValue = false;

    if (scrollChange && canScrollChange) {
      if (/rv:11\.0/.test(navigator.userAgent.toLowerCase()) && ev.wheelDelta < 0) {
        const currentIndex = parseInt($('.carousel').attr('data-current'), 10);
        const nextIndex = currentIndex + 1;
        changeItem(nextIndex);
      } else if (ev.deltaY && ev.deltaY > 0) {
        const currentIndex = parseInt($('.carousel').attr('data-current'), 10);
        const nextIndex = currentIndex + 1;
        changeItem(nextIndex);
      }
    }

    if (screenChange) {
      if (/rv:11\.0/.test(navigator.userAgent.toLowerCase()) && ev.wheelDelta < 0) {
        $('.screen__scroll-btn').click();
        screenChange = false;
      } else if (ev.deltaY && ev.deltaY > 0) {
        $('.screen__scroll-btn').click();
        screenChange = false;
      }
    }
  }

  function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
      preventDefault(e);
      return false;
    }
    return true;
  }

  function disableScroll() {
    if (window.addEventListener) { // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
    }
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = preventDefault; // older browsers, IE
    document.onkeydown = preventDefaultForScrollKeys;
  }

  function enableScroll() {
    if (window.removeEventListener) {
      window.removeEventListener('DOMMouseScroll', preventDefault, false);
    }
    window.onwheel = null;
    window.onmousewheel = null;
    document.onkeydown = null;
  }

  disableScroll();

  $(document).on('click', '.screen__scroll-btn', function (e) {
    e.preventDefault();
    $('.screen.is-hidden').removeClass('is-hidden');
    enableScroll();
    const target = $($(this).attr('href'));
    if (target.length > 0) {
      $('body, html').stop().animate({
        scrollTop: target.offset().top,
      }, 1000, 'swing');
    }
  });

  $(document).on('touchend', '.carousel__arrow, .carousel__dot', () => {
    $('.screen.is-hidden').removeClass('is-hidden');
    enableScroll();
  });
}
