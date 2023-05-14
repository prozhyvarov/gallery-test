import "./css/style.css";
import { fetchImages } from './js/fetch-images';
import { renderGallery } from './js/render-gallery';

import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let query = '';
let page = 1;
let simpleLightBox;
const perPage = 40;

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.btn-load-more'),
};

refs.searchForm.addEventListener('submit', onFormSubmit)

async function onFormSubmit(e) {
  e.preventDefault();
  window.scrollTo({ top: 0 });
  page = 1;
  query = e.currentTarget.searchQuery.value.trim();
  refs.gallery.innerHTML = '';
  // loadMoreBtn.classList.add('is-hidden');

  if (query === '') {
    withoutValue();
  }
  try {
    const { data } = await fetchImages(query, page, perPage);
    if (data.totalHits === 0) {
      displayNoResultsAlert();
    } else {
      renderGallery(data.hits);
      simpleLightBox = new SimpleLightbox('.gallery a').refresh();
      alertImagesFound(data);

      if (data.totalHits > perPage) {
        // loadMoreBtn.classList.remove('is-hidden');
      }
    }
  } catch (error) {
    console.log(error);
  }
}
function alertImagesFound(data) {
  Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
}

function withoutValue() {
  Notiflix.Notify.failure('The search bar cannot be empty. Please type any criteria in the search bar.')
}

function alertEndOfSearch() {
  Notiflix.Notify.failure(
    "We're sorry, but you've reached the end of search results."
  );
}

function displayNoResultsAlert() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}


function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}