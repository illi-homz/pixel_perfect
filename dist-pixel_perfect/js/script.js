"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Проверка поддержки webp браузером и добавление класса webp
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
    this.counter = 0;
    this.slidesOnPage = slidesOnPage;
  }

  _createClass(MainSlider, [{
    key: "init",
    value: function init() {
      this.sliderWidth = this.slider.clientWidth;
      this.wrapper = this.slider.querySelector('.wrap');
      this.prev = this.slider.querySelector('.prev');
      this.next = this.slider.querySelector('.next');
      this.slides = this.slider.querySelectorAll('.item');
      this.slideWidth;
      this.slidesLingth = this.slides.length;
      this.slidesCounter = Math.ceil(this.slidesLingth / this.slidesOnPage);
      this.nav = this.slider.querySelector('.nav');
      this.dots = [];
      this.shift = 0;
      this.btnsInit();
      this.setSlidesWidth();
      this.createDots();
      this.dots[this.counter].classList.add('active');
      this.changeActiveBtns();
    }
  }, {
    key: "setSlidesWidth",
    value: function setSlidesWidth() {
      var _this = this;

      this.slideWidth = 100 / this.slidesOnPage;
      this.slides.forEach(function (slide) {
        slide.style.minWidth = "".concat(_this.slideWidth, "%");
      });
    }
  }, {
    key: "createDots",
    value: function createDots() {
      var _this2 = this;

      var self = this;

      var _loop = function _loop(i) {
        var dotItem = document.createElement('div');
        dotItem.classList.add('nav__item');
        dotItem.addEventListener('click', function () {
          self.counter = i;
          self.moveSlide();
          self.changeActiveDot();
        });

        _this2.dots.push(dotItem);

        _this2.nav.appendChild(dotItem);
      };

      for (var i = 0; i < this.slidesCounter; i++) {
        _loop(i);
      }
    }
  }, {
    key: "btnsInit",
    value: function btnsInit() {
      var _this3 = this;

      this.prev.addEventListener('click', function () {
        if (_this3.counter <= 0) {
          _this3.counter = _this3.slidesCounter - 1; // this.shift = this.counter * this.slidesCounter * this.slideWidth
        } else {
          _this3.counter--;
        }

        _this3.moveSlide('prev');

        _this3.changeActiveDot();

        _this3.changeActiveBtns();
      });
      this.next.addEventListener('click', function () {
        if (_this3.counter >= _this3.slidesCounter - 1) {
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
    key: "moveSlide",
    value: function moveSlide(direction) {
      var end = this.slidesOnPage * this.slidesCounter - this.slidesLingth;
      end = this.slidesOnPage - end;
      console.log(end);

      if (this.counter === 0) {
        this.shift = 0;
      } else if (this.counter === this.slidesCounter - 1) {
        if (direction === 'next') {
          this.shift += this.slideWidth * end;
        }
      } else if (this.counter === 1) {
        if (direction === 'prev') {
          // this.shift = this.counter * this.slidesCounter * this.slideWidth
          this.shift -= this.slideWidth * end;
        }
      } else {
        this.shift += this.slideWidth * this.slidesOnPage;
      }

      this.move(this.shift);
    }
  }, {
    key: "move",
    value: function move(shift) {
      this.wrapper.style['margin-left'] = "-".concat(shift, "%");
    }
  }, {
    key: "changeActiveBtns",
    value: function changeActiveBtns() {
      if (this.counter === 0) {
        this.prev.classList.remove('active');
      } else {
        this.prev.classList.add('active');
      }

      if (this.counter === this.slidesCounter - 1) {
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
  }]);

  return MainSlider;
}();

var slider = document.querySelector('.main-slider');
var mainSlider = new MainSlider(slider, 3);
mainSlider.init(); // const mainBill = document.querySelector('.main__bill')
// const mainBookBill = document.querySelector('.main__book-bill')
// const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
// if (viewport_width < 992) {
//   mainBookBill.after(mainBill)
//   // mainBill.classList.add('done')
// }
// const slider = document.querySelector('.main__slider')
// window.addEventListener('resize', () => {
//   const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
//   if (viewport_width < 992) {
//     if (!mainBill.classList.contains('done')) {
//       mainBookBill.after(mainBill)
//       mainBill.classList.add('done')
//     }
//   }
//   else {
//     if (mainBill.classList.contains('done')) {
//       slider.after(mainBill)
//       mainBill.classList.remove('done')
//     }
//   }
// })
// // slider setting
// const sliders = document.querySelectorAll('.my-slider')
// sliders.forEach(slider => {
//   const sliderWidth = slider.clientWidth
//   const slidesCount = +slider.getAttribute('slides')
//   const slidesMdCount = +slider.getAttribute('slides-md')
//   console.log(slidesMdCount);
//   if (slidesMdCount && viewport_width > 768) {
//     const slides = slider.children[0].children
//     for (let i = 0; i < slides.length; i++) {
//       slides[i].style.width = sliderWidth/slidesMdCount + 'px'
//     }
//   }
//   else {
//     const slides = slider.children[0].children
//   for (let i = 0; i < slides.length; i++) {
//     slides[i].style.width = sliderWidth/slidesCount + 'px'
//   }
//   }
// })