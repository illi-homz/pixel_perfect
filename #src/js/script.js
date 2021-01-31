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
