'use strict';

@@include('webpSupport.js')
@@include('slider.js')

const lg = 1440,
      md = 992.98,
      sm = 767.98,
      xs = 479.98;
let viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)


const slider = document.querySelector('.main-slider')
const mainSlider = new MainSlider(slider, 1)

const sliderNewBooks = document.querySelector('#slider-new-books')
const sliderReading = document.querySelector('#slider-reading')
const sliderNews = document.querySelector('#slider-news')


setSliders(viewport_width)


window.addEventListener('resize', () => {
  viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
  setSliders(viewport_width)

  if (viewport_width < sm) {
    initFooterSpoilers()
  }
})



function initFooterSpoilers() {
  const lists = document.querySelectorAll('.footer__list')
  lists.forEach(list => {
    const title = list.querySelector('h3')
    const body = list.querySelector('.animate')
    title.addEventListener('click', () => {
      if (!body.classList.contains('hidden')) {
        body.classList.add('hidden')
      }
      else {
        body.classList.remove('hidden')
      }
    })
  })
}

function setSliders(viewport_width) {
  if (viewport_width < sm) {
    new MainSlider(sliderNewBooks, 2)
    new MainSlider(sliderReading, 2)
    new MainSlider(sliderNews, 1)
  }
  else {
    new MainSlider(sliderNewBooks, 4)
    new MainSlider(sliderReading, 4)
    new MainSlider(sliderNews, 3)
  }
}

