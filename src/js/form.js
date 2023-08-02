import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createImageObject } from './imageObject';

const API_KEY = '38167390-c27f94e9d5334bbe499e3be3b';

var input = document.getElementsByName('searchQuery')[0];
var page = 1;
var displayedImages = 0;
var totalImages;

document.getElementsByClassName('gallery')[0].innerHTML = '';
document.getElementsByClassName('load-more')[0].style.visibility = 'hidden';

document.querySelector('.submit-button').addEventListener('click', () => {
  totalImages = getTotalNrOfImages();
  document.getElementsByClassName('gallery')[0].innerHTML = '';
  document.getElementsByClassName('load-more')[0].style.visibility = 'hidden';
  page = 1;
  displayedImages = 0;
  getData();
});

input.addEventListener('keypress', event => {
  if (event.key == 'Enter') {
    event.preventDefault();
    totalImages = getTotalNrOfImages();
    document.getElementsByClassName('gallery')[0].innerHTML = '';
    document.getElementsByClassName('load-more')[0].style.visibility = 'hidden';
    page = 1;
    displayedImages = 0;
    getData();
  }
});

document
  .getElementsByClassName('load-more')[0]
  .addEventListener('click', () => {
    page += 1;
    getData();
  });

async function getTotalNrOfImages() {
  var q = input.value.split(' ').join('+');
  var dataResponse = await fetch(
    `https://pixabay.com/api/?key=${API_KEY}&q=${q}&image_type=photo&orientation=horizontal&safesearch=true`
  );
  var dataJson = await dataResponse.json();
  return dataJson.totalHits;
}

async function getData() {
  if (displayedImages == 0) {
    getTotalNrOfImages().then(value => {
      totalImages = value;
    });
  }
  var q = input.value.split(' ').join('+');
  var dataResponse = await fetch(
    `https://pixabay.com/api/?key=${API_KEY}&q=${q}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
  );
  var dataJson = await dataResponse.json();
  if (dataJson.hits.length != 0) {
    for (let element of dataJson.hits) {
      if (displayedImages < totalImages) {
        createImageObject(
          element.webformatURL,
          element.largeImageURL,
          element.tags,
          element.likes,
          element.views,
          element.comments,
          element.downloads
        );
        displayedImages += 1;
      } else {
        document.getElementsByClassName('load-more')[0].style.visibility =
          'hidden';
        Notify.failure(
          `We're sorry, but you've reached the end of search results.`
        );
        break;
      }
    }
    if (displayedImages != totalImages) {
      document.getElementsByClassName('load-more')[0].style.visibility =
        'visible';
    }
  } else {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}
