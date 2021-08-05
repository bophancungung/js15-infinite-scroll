// Unsplash API
const count = 10;
const apiKey = 'PTsARMWUcaJgihnpeAkLc8lJCl0QkFzX3ir2CmNVbmc';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get photos from Unsplash API
async function getPhotosFromAPI() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
  }
  catch(error) {
    console.log(error);
  }
}

getPhotosFromAPI();