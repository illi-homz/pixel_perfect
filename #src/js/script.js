'use strict';

@@include('webpSupport.js')
@@include('slider.js')


const slider = document.querySelector('.main-slider')
const mainSlider = new MainSlider(slider, 1)

const sliderNewBooks = document.querySelector('#slider-new-books')
const sliderNewBooksActive = new MainSlider(sliderNewBooks, 4)

const sliderReading = document.querySelector('#slider-reading')
const sliderReadingActive = new MainSlider(sliderReading, 4)

const sliderNews = document.querySelector('#slider-news')
const sliderNewsActive = new MainSlider(sliderNews, 3)


initFooterSpoilers()

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
