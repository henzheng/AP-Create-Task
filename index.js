import './index.css';
// Defining the DOM selectors as a constant object
const domSelectors = {
  mapButton: document.getElementById('map-button'),
  agentButton: document.getElementById('agent-button'),
  container: document.getElementById('output-container'),
  checkbox: document.getElementById('allow-repeats-checkbox'),
};

// Defining a function to generate a random set of maps or agent to be displayed
async function generateCards(query) {
  let API_URL;
  if (query === 'agents') {
    API_URL = `https://valorant-api.com/v1/${query}/?isPlayableCharacter=true`;
  }
  else if (query === 'maps') {
    API_URL = `https://valorant-api.com/v1/${query}/`;
  }
  const response = await fetch(API_URL);
  const rawData = await response.json();
  const data = rawData.data;

  domSelectors.container.innerHTML = '';
  const allowRepeats = domSelectors.checkbox.checked;
  const generatedArray = [];
  while (generatedArray.length < 3) {
    const index = Math.floor(Math.random() * data.length);
    const randomEntry = data[index];
    if (!allowRepeats && generatedArray.includes(randomEntry)) {
      continue;
    }
    generatedArray.push(randomEntry);
  }
  for (const entry of generatedArray) {
    const element = createHTMLElement(entry, query);
    domSelectors.container.appendChild(element);
  }
}

//Defining a function to create an HTML element given the data and type
function createHTMLElement(data, type) {
    if (type === 'maps') {
        const mapElement = document.createElement('div');
        mapElement.className = 'map';
        mapElement.innerHTML = `
          <h3 class="map-name">${data.displayName}</h3>
          <img src="${data.splash}" alt="Splash art of ${data.displayName}" class="map-splash">
          <p class="map-coordinates">${data.coordinates}</p>
        `;
        return mapElement;
    }
    else if (type == 'agents') {
        const agentElement = document.createElement('div');
        agentElement.className = 'agent';
        agentElement.innerHTML = `
        <h3 class="agent-name">${data.displayName}</h3>
        <img src="${data.displayIcon}" alt="${data.displayName}" class="agent-image">
        <img src="${data.role.displayIcon}" alt="${data.role.displayName} icon" class="agent-role-icon">
        <p class="agent-description">${data.description}</p>
      `;
      return agentElement;
    }
}

// Add event listeners to both the map and agent generate buttons
domSelectors.mapButton.addEventListener('click', (e) => {
    e.preventDefault();
    generateCards('maps');
});
domSelectors.agentButton.addEventListener('click', (e) => {
    e.preventDefault();
    generateCards('agents');
})