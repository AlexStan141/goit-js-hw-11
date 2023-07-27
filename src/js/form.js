import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createImageObject } from './imageObject';

const API_KEY = '38167390-c27f94e9d5334bbe499e3be3b';

var input = document.getElementsByName('searchQuery')[0];

input.value = 'cats';

async function getData() {
  var q = input.value.split(' ').join('+');
  var dataResponse = await fetch(
    `https://pixabay.com/api/?key=${API_KEY}&q=${q}&image_type=photo&orientation=horizontal&safesearch=true`
  );
  var dataJson = await dataResponse.json();
  document.getElementsByClassName('gallery')[0].innerHTML = '';
  if (dataJson.hits.length != 0) {
    for (let element of dataJson.hits) {
      createImageObject(
        element.webformatURL,
        element.largeImageURL,
        element.tags,
        element.likes,
        element.views,
        element.comments,
        element.downloads
      );
    }
    Notify.success(`Horray!We found ${dataJson.totalHits} results.`);
  } else {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}

document.querySelector('.submit-button').addEventListener('click', () => {
  getData();
});
input.addEventListener('keypress', event => {
  if (event.key == 'Enter') {
    event.preventDefault();
    getData();
  }
});
