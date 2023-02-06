import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // MODULE_ADVENTURES
  // Extract the city id from the URL's Query Param and return it
  let city = search.split("=")[1].trim();
  //console.log(city)
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // : MODULE_ADVENTURES
  //  Fetch adventures using the Backend API and return the data
  try {
    let adventurRes = await fetch(
      `${config.backendEndpoint}/adventures?city=${city}`
    );
    let data = await adventurRes.json();
    return data;
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // : MODULE_ADVENTURES
  // Populate the Adventure Cards and insert those details into the DOM
  let cardid = document.getElementById("data");
  adventures.forEach((element) => {
    let coloumdiv = document.createElement("div");
    coloumdiv.className = "col-lg-3 col-6 mb-4 position-relative";
    coloumdiv.innerHTML = `
      <div class="category-banner">${element.category}</div>
      <a href="detail/?adventure=${element.id}" id="${element.id}">
      <div class="activity-card">
      <img src="${element.image}" class="card-img-top" alt="${element.name}">
      <div class="d-flex text-center justify-content-md-between justify-content-center flex-column flex-md-row align-items-center p-2">
      <h5 class="">${element.name}</h5>
      <h6 class="">₹${element.costPerHead}</h6>
      </div>
        <div class="d-flex text-center justify-content-md-between justify-content-center flex-column flex-md-row align-items-center p-2">
        <p class="">Duration</p>
        <p class="">${element.duration} Hours</p>
        </div>
      </div>
      </a>`;
    cardid.appendChild(coloumdiv);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // : MODULE_FILTERS
  //  Filter adventures based on Duration and return filtered list
  let filterDurationList = list.filter(function filtredDuration(params) {
    if (params.duration > low && params.duration <= high) {
      return params;
    }
  });
  return filterDurationList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // : MODULE_FILTERS
  //  Filter adventures based on their Category and return filtered list
  let filterCategoryList = list.filter(function filtredCategory(params) {
    if (categoryList.length !== 0) {
      for (let cate of categoryList) {
        if (params.category === cate) return params;
      }
    } else return params;
  });
  return filterCategoryList;
}


//Implementation of combined filter function that covers the following cases :
// Filter by duration only
// Filter by category only
// Filter by duration and category together

function filterFunction(list, filters) {
  // : MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  if (filters.category.length !== 0)
    list = filterByCategory(list, filters.category);
  if (filters.duration) {
    let low = Number(filters.duration.split("-")[0]);
    let high = Number(filters.duration.split("-")[1]);
    list = filterByDuration(list, low, high);
  }
  // Place holder for functionality to work in the Stubs

  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  //: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  //: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let getItem = JSON.parse(window.localStorage.getItem("filters"));

  // Place holder for functionality to work in the Stubs
  return getItem;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  //: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let category = document.getElementById("category-list");
  let n = 0;
  if (filters.category.length !== 0) {
    for (let pils of filters.category) {
      let pillsDiv = document.createElement("div");
      pillsDiv.className = "category-filter";
      pillsDiv.id = `category-filter-${++n}`;
      //pillsDiv.innerHTML = `<div id="${pils}" class="cross" onclick="crossFunction(event)" value='${pils}'>${pils} &#10006</div>`;
      pillsDiv.innerHTML = `<span id="${pils}">${pils}</span><button class="cross" onClick="crossFunction(event,${pils})">&#10006</button>`;
      category.appendChild(pillsDiv);
    }
  }
  getFiltersFromLocalStorage();
}

async function addNewAdventure(city) {
  try {
    const response = await fetch(`${config.backendEndpoint}/adventures/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        city: `${city}`,
      }),
    });

    let data = await response.json();
    addAdventureToDOM(data);
  } catch (error) {
    return null;
  }
}

export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
  addNewAdventure,
};
