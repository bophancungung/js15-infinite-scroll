const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let isLoading = false;
let imagesLoaded = 0;
let totalImagesLoaded = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = 'PTsARMWUcaJgihnpeAkLc8lJCl0QkFzX3ir2CmNVbmc';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function checkImagesLoaded() {
  console.log('image loaded');
  imagesLoaded++;
  console.log('imgaes loaded:', imagesLoaded);
  if (imagesLoaded === totalImagesLoaded) {
    isLoading = true;
    loader.hidden = true;
    console.log('is loading:', isLoading);
  }
}

// Helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key])
  }
}

// Create elements for links & photos, add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImagesLoaded = photosArray.length;
  console.log('total images loaded:', totalImagesLoaded);
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank'
    });
    // Create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.description
    });
    // Event listener, check when each is finished loading
    img.addEventListener('load', checkImagesLoaded);
    // Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotosFromAPI() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  }
  catch(error) {
    console.log(error);
  }
}

// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', () => {
  const innerHeightScrollY = window.innerHeight + window.scrollY;
  const beforeOffsetHeight = document.body.offsetHeight - 1000;
  if (innerHeightScrollY >= beforeOffsetHeight && isLoading) {
    isLoading = false;
    getPhotosFromAPI();
  }
})


getPhotosFromAPI();