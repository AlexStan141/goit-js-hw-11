export function createImageObject(
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads
) {
  document.getElementsByClassName('gallery')[0].innerHTML += `
  <div class="photo-card">
    <img src='${webformatURL}' alt='${tags}' loading="lazy" width="300" height="200" />
    <div class="info">
        <div class="info-item">
        <b>Likes</b>
        <p>${likes}</p>
        </div>
        <div class="info-item">
        <b>Views</b>
        <p>${views}</p>
        </div>
        <div class="info-item">
        <b>Comments</b>
        <p>${comments}</p>
        </div>
        <div class="info-item">
        <b>Downloads</b>
        <p>${downloads}</p>
        </div>
    </div>
  </div>
        `;
}
