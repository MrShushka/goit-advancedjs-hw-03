import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, clearGallery } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('#loader');

let lightbox = new SimpleLightbox('.gallery a');

form.addEventListener('submit', event => {
  event.preventDefault();
  console.log(event.target.elements);
  const query = event.target.elements.query.value.trim();
  if (!query) {
    iziToast.error({ title: 'Error', message: 'Please enter a search query!' });
    return;
  }

  clearGallery();
  loader.style.display = 'block';
  fetchImages(query)
    .then(images => {
      renderGallery(images);
      lightbox.refresh();
    })
    .catch(error => {
      iziToast.error({ title: 'Error', message: error.message });
    })
    .finally(() => {
      loader.style.display = 'none';
    });
});
