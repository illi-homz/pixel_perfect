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


class MainSlider {
  constructor(slider, slidesOnPage=1) {
    this.slider = slider
    this.counter = 0
    this.slidesOnPage = slidesOnPage
  }
  init() {
    this.sliderWidth = this.slider.clientWidth
    this.wrapper = this.slider.querySelector('.wrap')
    this.prev = this.slider.querySelector('.prev')
    this.next = this.slider.querySelector('.next')
    this.slides = this.slider.querySelectorAll('.item')
    this.slideWidth
    this.slidesLingth = this.slides.length
    this.slidesCounter = Math.ceil(this.slidesLingth/this.slidesOnPage)
    this.nav = this.slider.querySelector('.nav')
    this.dots = []
    this.shift = 0

    this.btnsInit()
    this.setSlidesWidth()
    this.createDots()
    this.dots[this.counter].classList.add('active')
    this.changeActiveBtns()
  }
  setSlidesWidth() {
    this.slideWidth =  100 / this.slidesOnPage
    this.slides.forEach(slide => {
      slide.style.minWidth = `${this.slideWidth}%`
    })
  }
  createDots() {
    const self = this
    for (let i = 0; i < this.slidesCounter; i++) {
      const dotItem = document.createElement('div')
      dotItem.classList.add('nav__item')
      dotItem.addEventListener('click', () => {
        self.counter = i
        self.moveSlide()
        self.changeActiveDot()
      })
      this.dots.push(dotItem)
      this.nav.appendChild(dotItem)
    }
  }
  btnsInit() {
    this.prev.addEventListener('click', () => {
      if (this.counter <= 0) {
        this.counter = this.slidesCounter - 1
        // this.shift = this.counter * this.slidesCounter * this.slideWidth
      } else {
        this.counter--
      }
      this.moveSlide('prev')
      this.changeActiveDot()
      this.changeActiveBtns()
    })
    this.next.addEventListener('click', () => {
      if (this.counter >= this.slidesCounter - 1) {
        this.counter = 0
      } else {
        this.counter++
      }
      this.moveSlide('next')
      this.changeActiveDot()
      this.changeActiveBtns()
    })
  }
  moveSlide(direction) {
    let end = this.slidesOnPage * this.slidesCounter - this.slidesLingth
    end = this.slidesOnPage - end
    console.log(end)
    if (this.counter === 0) {
      this.shift = 0
    }
    else if (this.counter === this.slidesCounter - 1) {
      if (direction === 'next') {
        this.shift += this.slideWidth * end
      }
    }
    else if (this.counter === 1) {
      if (direction === 'prev') {
        // this.shift = this.counter * this.slidesCounter * this.slideWidth
        this.shift -= this.slideWidth * end
      }
    }
    else {
      this.shift += this.slideWidth * this.slidesOnPage
    }
    this.move(this.shift)
  }
  move(shift) {
    this.wrapper.style['margin-left'] = `-${shift}%`
  }
  changeActiveBtns() {
    if (this.counter === 0) {
      this.prev.classList.remove('active')
    } else {
      this.prev.classList.add('active')
    }

    if (this.counter === this.slidesCounter - 1) {
      this.next.classList.remove('active')
    } else {
      this.next.classList.add('active')
    }
  }
  changeActiveDot() {
    this.dots.forEach((dot, i) => {
      dot.classList.remove('active')
      if (i === this.counter) {
        dot.classList.add('active')
      }
    })
  }
}
const slider = document.querySelector('.main-slider')

const mainSlider = new MainSlider(slider, 3)
mainSlider.init()









// const mainBill = document.querySelector('.main__bill')
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
