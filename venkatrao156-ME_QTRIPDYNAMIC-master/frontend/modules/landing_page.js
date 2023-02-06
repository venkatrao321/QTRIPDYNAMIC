import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    let response = await fetch(`${config.backendEndpoint}/cities`);
    let data = response.json();
    return data;
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let parentDiv = document.getElementById("data");

  /////// /////////////coloum data///////////////////
  let coloumdiv = document.createElement("div");
  coloumdiv.className = "col-lg-3 col-12 col-sm-6 mb-4 p-3";
  let coloum = parentDiv.appendChild(coloumdiv);

  //////////////anchor link to adventure///////////
  let linktoadventure = document.createElement("a");
  linktoadventure.setAttribute("href", `pages/adventures/?city=${id}`);
  linktoadventure.setAttribute('id',`${id}`)
  let anchorlink = coloum.appendChild(linktoadventure);

  /////////////////////tile class////////////////
  let tileDiv = document.createElement("div");
  tileDiv.className = "tile";
  let tile = anchorlink.appendChild(tileDiv);

  ////////////////image elelments class/////////////
  let cardImage = document.createElement("img");
  cardImage.setAttribute("src", `${image}`);
  cardImage.setAttribute("alt", `${city}`);
  tile.appendChild(cardImage);

  /////////////////////tile text///////////////////
  let tiletext = document.createElement("div");
  tiletext.className = "tile-text text-center";
  tiletext.innerText = `${city}`;
  let city_name=tile.appendChild(tiletext);

  //////////////////description//////////////////
  let descrip=document.createElement("p");
  descrip.innerText=`${description}`;
  city_name.appendChild(descrip);
}

export { init, fetchCities, addCityToDOM };
