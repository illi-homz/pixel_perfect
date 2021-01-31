class MainSlider {
  constructor(slider, slidesOnPage=1) {
    this.slider = slider
    this.slidesOnPage = slidesOnPage

    this.init()
  }
  init() {
    this.counter = 0
    this.wrapper = this.slider.querySelector('.wrap')
    this.prev = this.slider.querySelector('.prev')
    this.next = this.slider.querySelector('.next')
    this.slides = this.slider.querySelectorAll('.item')
    this.slidesCounter = this.slides.length
    this.dotsCounter = Math.ceil(this.slidesCounter/this.slidesOnPage)
    this.nav = this.slider.querySelector('.nav')
    this.dots = []
    this.shiftMain = 0
    this.end = this.slidesCounter % this.slidesOnPage
    this.slideWidth = 100 / this.slidesOnPage
    this.sliderWidth = this.slider.clientWidth
    this.wrapperWidth = this.slidesCounter * this.slideWidth

    this.navBtnsInit()
    this.setSlidesWidth()
    this.setNavDots()
    this.changeActiveBtns()
  }
  setSlidesWidth() {
    this.slides.forEach(slide => {
      slide.style.minWidth = `${this.slideWidth}%`
    })
  }
  setNavDots() {
    if (!this.nav) return
    for (let i = 0; i < this.dotsCounter; i++) {
      const dotItem = document.createElement('div')
      dotItem.classList.add('nav__item')
      dotItem.addEventListener('click', () => {
        this.counter = i
        this.changeActiveDot()

        const shift = 100 * i
        if ( i === this.dotsCounter - 1 ) {
          this.shiftMain = this.wrapperWidth - 100
          this.move(this.shiftMain)
        }
        else {
          this.shiftMain = shift
          this.move(this.shiftMain)
        }
      })
      this.dots.push(dotItem)
      this.nav.appendChild(dotItem)
    }
    this.dots[this.counter].classList.add('active')
  }
  navBtnsInit() {
    this.prev.addEventListener('click', () => {
      if (this.counter <= 0) {
        this.counter = this.dotsCounter - 1
      } else {
        this.counter--
      }
      this.moveSlide('prev')
      this.changeActiveDot()
      this.changeActiveBtns()
    })
    this.next.addEventListener('click', () => {
      if (this.counter >= this.dotsCounter - 1) {
        this.counter = 0
      } else {
        this.counter++
      }
      this.moveSlide('next')
      this.changeActiveDot()
      this.changeActiveBtns()
    })
  }
  changeActiveBtns() {
    if (this.counter === 0) {
      this.prev.classList.remove('active')
    } else {
      this.prev.classList.add('active')
    }

    if (this.counter === this.dotsCounter - 1) {
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
  moveSlide(direction) {
    const shift = 100

    if ( direction === 'next' ) {
      if ( this.counter === 0 ) {
        this.shiftMain = 0
        this.move(this.shiftMain)
      }
      else if ( this.shiftMain + 2*shift > this.wrapperWidth ) {
        this.shiftMain += this.end * this.slideWidth
        this.move(this.shiftMain)
      }
      else {
        this.shiftMain += shift
        this.move(this.shiftMain)
      }
    }

    else if ( direction === 'prev' ) {
      if ( this.counter === this.dotsCounter - 1 ) {
        this.shiftMain = this.wrapperWidth - 100
        this.move(this.shiftMain)
      }
      else if ( this.shiftMain - shift < 0 ) {
        this.shiftMain = 0
        this.move(this.shiftMain)
      }
      else {
        this.shiftMain -= shift
        this.move(this.shiftMain)
      }
    }
  }
  move(shift) {
    this.wrapper.style['margin-left'] = `-${shift}%`
  }
}
