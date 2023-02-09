import './style.css'
const API_URL = 'https://valorant-api.com/v1/maps/'
let allowRepeats = false;
let maps = [];

const domSelectors = {
  button: document.getElementById('submit-button'),
  container: document.getElementById('output'),
  checkbox: document.getElementById('repeat-checkbox'),
}

async function getMaps() {
  const res = await fetch(API_URL);
  const data = await res.json();
  maps = data.data.map(e => ({
    displayName: e.displayName,
    splash: e.splash,
    coordinates: e.coordinates,
  }))
  maps.forEach(e => domSelectors.container.insertAdjacentHTML('beforeend', `
    <div class="map">
      <h3 class="map-name">${e.displayName}</h3>
      <img src="${e.splash}" alt="splash art of ${e.displayName}" class="map-splash">
      <p class="map-coordinates">${e.coordinates}</p>
    </div>
  `))
}

function generateMaps(event) {
  event.preventDefault();
  domSelectors.container.innerHTML = '';
  let generatedMaps = [];
  while (generatedMaps.length < 3) {
    const index = Math.floor(Math.random() * maps.length)
    const nextMap = maps[index];
    if (allowRepeats === false && generatedMaps.includes(nextMap)) {
      //pass
    }
    else {
      generatedMaps.push(maps[index])
    }
  }
  generatedMaps.forEach(e => {
    domSelectors.container.insertAdjacentHTML('beforeend', `
    <div class="map">
      <h3 class="map-name">${e.displayName}</h3>
      <img src="${e.splash}" alt="splash art of ${e.displayName}" class="map-splash">
      <p class="map-coordinates">${e.coordinates}</p>
    </div>
    `)
  })
}

domSelectors.button.addEventListener('click', generateMaps);
domSelectors.checkbox.addEventListener('change', () => { allowRepeats = !allowRepeats });
getMaps();