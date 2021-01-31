'use strict'; // Проверка поддержки webp браузером и добавление класса webp

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function testWebP(callback) {
  var webP = new Image();

  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };

  webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support == true) {
    document.querySelector('body').classList.add('webp');
  } else {
    document.querySelector('body').classList.add('no-webp');
  }
});

var MainSlider = /*#__PURE__*/function () {
  function MainSlider(slider) {
    var slidesOnPage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    _classCallCheck(this, MainSlider);

    this.slider = slider;
    this.slidesOnPage = slidesOnPage;
    this.init();
  }

  _createClass(MainSlider, [{
    key: "init",
    value: function init() {
      this.counter = 0;
      this.wrapper = this.slider.querySelector('.wrap');
      this.prev = this.slider.querySelector('.prev');
      this.next = this.slider.querySelector('.next');
      this.slides = this.slider.querySelectorAll('.item');
      this.slidesCounter = this.slides.length;
      this.dotsCounter = Math.ceil(this.slidesCounter / this.slidesOnPage);
      this.nav = this.slider.querySelector('.nav');
      this.dots = [];
      this.shiftMain = 0;
      this.end = this.slidesCounter % this.slidesOnPage;
      this.slideWidth = 100 / this.slidesOnPage;
      this.sliderWidth = this.slider.clientWidth;
      this.wrapperWidth = this.slidesCounter * this.slideWidth;
      this.navBtnsInit();
      this.setSlidesWidth();
      this.setNavDots();
      this.changeActiveBtns();
    }
  }, {
    key: "setSlidesWidth",
    value: function setSlidesWidth() {
      var _this = this;

      this.slides.forEach(function (slide) {
        slide.style.minWidth = "".concat(_this.slideWidth, "%");
      });
    }
  }, {
    key: "setNavDots",
    value: function setNavDots() {
      var _this2 = this;

      if (!this.nav) return;

      var _loop = function _loop(i) {
        var dotItem = document.createElement('div');
        dotItem.classList.add('nav__item');
        dotItem.addEventListener('click', function () {
          _this2.counter = i;

          _this2.changeActiveDot();

          var shift = 100 * i;

          if (i === _this2.dotsCounter - 1) {
            _this2.shiftMain = _this2.wrapperWidth - 100;

            _this2.move(_this2.shiftMain);
          } else {
            _this2.shiftMain = shift;

            _this2.move(_this2.shiftMain);
          }
        });

        _this2.dots.push(dotItem);

        _this2.nav.appendChild(dotItem);
      };

      for (var i = 0; i < this.dotsCounter; i++) {
        _loop(i);
      }

      this.dots[this.counter].classList.add('active');
    }
  }, {
    key: "navBtnsInit",
    value: function navBtnsInit() {
      var _this3 = this;

      this.prev.addEventListener('click', function () {
        if (_this3.counter <= 0) {
          _this3.counter = _this3.dotsCounter - 1;
        } else {
          _this3.counter--;
        }

        _this3.moveSlide('prev');

        _this3.changeActiveDot();

        _this3.changeActiveBtns();
      });
      this.next.addEventListener('click', function () {
        if (_this3.counter >= _this3.dotsCounter - 1) {
          _this3.counter = 0;
        } else {
          _this3.counter++;
        }

        _this3.moveSlide('next');

        _this3.changeActiveDot();

        _this3.changeActiveBtns();
      });
    }
  }, {
    key: "changeActiveBtns",
    value: function changeActiveBtns() {
      if (this.counter === 0) {
        this.prev.classList.remove('active');
      } else {
        this.prev.classList.add('active');
      }

      if (this.counter === this.dotsCounter - 1) {
        this.next.classList.remove('active');
      } else {
        this.next.classList.add('active');
      }
    }
  }, {
    key: "changeActiveDot",
    value: function changeActiveDot() {
      var _this4 = this;

      this.dots.forEach(function (dot, i) {
        dot.classList.remove('active');

        if (i === _this4.counter) {
          dot.classList.add('active');
        }
      });
    }
  }, {
    key: "moveSlide",
    value: function moveSlide(direction) {
      var shift = 100;

      if (direction === 'next') {
        if (this.counter === 0) {
          this.shiftMain = 0;
          this.move(this.shiftMain);
        } else if (this.shiftMain + 2 * shift > this.wrapperWidth) {
          this.shiftMain += this.end * this.slideWidth;
          this.move(this.shiftMain);
        } else {
          this.shiftMain += shift;
          this.move(this.shiftMain);
        }
      } else if (direction === 'prev') {
        if (this.counter === this.dotsCounter - 1) {
          this.shiftMain = this.wrapperWidth - 100;
          this.move(this.shiftMain);
        } else if (this.shiftMain - shift < 0) {
          this.shiftMain = 0;
          this.move(this.shiftMain);
        } else {
          this.shiftMain -= shift;
          this.move(this.shiftMain);
        }
      }
    }
  }, {
    key: "move",
    value: function move(shift) {
      this.wrapper.style['margin-left'] = "-".concat(shift, "%");
    }
  }]);

  return MainSlider;
}();

var slider = document.querySelector('.main-slider');
var mainSlider = new MainSlider(slider, 1);
var sliderNewBooks = document.querySelector('#slider-new-books');
var sliderNewBooksActive = new MainSlider(sliderNewBooks, 4);
var sliderReading = document.querySelector('#slider-reading');
var sliderReadingActive = new MainSlider(sliderReading, 4);
var sliderNews = document.querySelector('#slider-news');
var sliderNewsActive = new MainSlider(sliderNews, 3);
initFooterSpoilers();

function initFooterSpoilers() {
  var lists = document.querySelectorAll('.footer__list');
  lists.forEach(function (list) {
    var title = list.querySelector('h3');
    var body = list.querySelector('.animate');
    title.addEventListener('click', function () {
      if (!body.classList.contains('hidden')) {
        body.classList.add('hidden');
      } else {
        body.classList.remove('hidden');
      }
    });
  });
}